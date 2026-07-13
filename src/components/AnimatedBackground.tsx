const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" style={{ background: "#E0E5EC" }}>
      {/* soft ambient glows */}
      <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-40 animate-float"
        style={{ background: "radial-gradient(circle, rgba(108,99,255,0.15), transparent 65%)" }}
      />
      <div
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-40 animate-float"
        style={{ background: "radial-gradient(circle, rgba(56,178,172,0.12), transparent 65%)", animationDelay: "1.5s" }}
      />
    </div>
  );
};

export default AnimatedBackground;
