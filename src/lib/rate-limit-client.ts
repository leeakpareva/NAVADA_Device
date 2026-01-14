// Frontend Rate Limiting Logic

const LIMITS = {
  requestsPerHour: 20,
  requestsPerMinute: 3,
};

interface RateLimitData {
  hour: number[]; // timestamps of requests in the last hour
  minute: number[]; // timestamps of requests in the last minute
}

export const checkFrontendRateLimit = (): { allowed: boolean; message?: string } => {
  if (typeof window === 'undefined') return { allowed: true };

  const now = Date.now();
  const storedData = sessionStorage.getItem('raven-rate-limit');
  let data: RateLimitData = storedData ? JSON.parse(storedData) : { hour: [], minute: [] };

  // Filter out old timestamps
  data.hour = data.hour.filter(t => now - t < 60 * 60 * 1000);
  data.minute = data.minute.filter(t => now - t < 60 * 1000);

  if (data.minute.length >= LIMITS.requestsPerMinute) {
    return {
      allowed: false,
      message: "You're learning fast! Take a breather (max 3 requests/minute)."
    };
  }

  if (data.hour.length >= LIMITS.requestsPerHour) {
    return {
      allowed: false,
      message: "Learning limit reached. Take a break and try again in an hour!"
    };
  }

  return { allowed: true };
};

export const recordRequest = () => {
  if (typeof window === 'undefined') return;

  const now = Date.now();
  const storedData = sessionStorage.getItem('raven-rate-limit');
  let data: RateLimitData = storedData ? JSON.parse(storedData) : { hour: [], minute: [] };

  // Filter first to keep array size manageable
  data.hour = data.hour.filter(t => now - t < 60 * 60 * 1000);
  data.minute = data.minute.filter(t => now - t < 60 * 1000);

  data.hour.push(now);
  data.minute.push(now);

  sessionStorage.setItem('raven-rate-limit', JSON.stringify(data));
};
