// Backend Rate Limiting Logic

interface SessionData {
  requests: number[]; // timestamps
}

// In-memory store (Note: This resets on server restart/redeploy)
// For a production serverless environment, use Redis (e.g., @upstash/redis or ioredis)
const sessionStore = new Map<string, SessionData>();

const LIMITS = {
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 20,
  minuteWindowMs: 60 * 1000, // 1 minute
  maxRequestsPerMinute: 3
};

// Periodic cleanup to prevent memory leaks (runs every 10 minutes)
if (typeof setInterval !== 'undefined') {
    setInterval(() => {
        const now = Date.now();
        for (const [sessionId, data] of sessionStore.entries()) {
            // Keep if there are requests within the largest window
            const hasRecentRequests = data.requests.some(t => now - t < LIMITS.windowMs);
            if (!hasRecentRequests) {
                sessionStore.delete(sessionId);
            }
        }
    }, 10 * 60 * 1000); // 10 minutes
}

export function checkBackendRateLimit(sessionId: string): { allowed: boolean; message?: string } {
  const now = Date.now();
  let data = sessionStore.get(sessionId);

  if (!data) {
    data = { requests: [] };
    sessionStore.set(sessionId, data);
  }

  // Filter old requests (Sliding window for hourly limit)
  // We keep requests that are within the hourly window
  data.requests = data.requests.filter(t => now - t < LIMITS.windowMs);

  // Check Minute Limit (Burst Protection)
  const requestsLastMinute = data.requests.filter(t => now - t < LIMITS.minuteWindowMs).length;
  if (requestsLastMinute >= LIMITS.maxRequestsPerMinute) {
      return {
          allowed: false,
          message: "You're learning fast! Take a breather (max 3 requests/minute)."
      };
  }

  // Check Hourly Limit
  if (data.requests.length >= LIMITS.maxRequests) {
    return {
      allowed: false,
      message: "Learning limit reached. Take a break and try again later!"
    };
  }

  // Record request
  data.requests.push(now);

  return { allowed: true };
}
