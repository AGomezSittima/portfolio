export const glassButtonClass =
  "glass glass-interactive rounded-full text-foreground";

// Page-coloured layer under a floating glass control, so content
// scrolling under it doesn't wash out its labels.
export const glassHaloClass =
  "relative flex before:pointer-events-none before:absolute before:inset-1 before:-z-10 before:rounded-full before:bg-background/50 before:scroll-edge";

export const navItemClass =
  "inline-flex h-9 items-center justify-center gap-2 rounded-full px-2.5 text-sm font-medium tracking-[-0.005em] text-body outline-none dark:text-foreground/80 transition-colors duration-200 hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-[current=location]:bg-(--glass-capsule) aria-[current=location]:text-foreground aria-[current=location]:shadow-[inset_0_1px_0_0_var(--glass-highlight)] sm:px-3.5 [&_svg]:size-4 sm:[&_svg]:hidden";

export const tagPillClass =
  "tag h-6 gap-1.5 rounded-full border-(--glass-border) bg-(--glass-fill) px-2.5 font-normal text-body shadow-[inset_0_1px_0_0_var(--glass-highlight),0_0_0_0.5px_rgba(20,40,80,0.08)] transition-colors duration-200";

export const tagPillHoverClass =
  "hover:bg-(--glass-fill-hover) hover:text-foreground";
