export const AnimatedBorderDeleteButton = ({ children, ...props}) => {
  return (
    <button
        className="relative bg-transparent border border-border
        text-foreground
        hover:bg-red-500/10 hover:border-red-500/70 group
        hover:text-red-400
        transition-all duration-300
        focus:outline-none focus-visible:ring-2
        focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background
        disabled:opacity-50 disabled:cursor-not-allowed
        px-4 py-3 text-lg font-medium rounded-full
        group gap-2 shrink-0 overflow-hidden
        " {...props}
    >
      {/* Animated SVG Border */}
      <svg
        className="absolute left-0 top-0 w-full h-full pointer-events-none download-cv-border"
        viewBox="0 0 200 60"
        preserveAspectRatio="none"
        style={{ overflow: "visible" }}
      >
        <path
          d="M 30,1 A 29,29 0 0 0 1,30 L 1,30 A 29,29 0 0 0 30,59 L 170,59 A 29,29 0 0 0 199,30 L 199,30 A 29,29 0 0 0 170,1 Z"
          fill="none"
          stroke="red"
          strokeWidth="2"
          strokeDasharray="400 550"
          strokeDashoffset="400"
          strokeLinecap="round"
          strokeLinejoin="round"
          // className="animated-border-path"
        />
      </svg>
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};
