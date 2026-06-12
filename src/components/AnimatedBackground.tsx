const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-dot-grid" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] accent-glow" />
    </div>
  );
};

export default AnimatedBackground;
