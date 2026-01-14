export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-transparent to-green-900/5 animate-pulse" />
    </div>
  );
}