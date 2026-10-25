export const glassButtonClass =
  "glass glass-interactive rounded-full text-foreground";

// Page-coloured layer under a floating glass control, so content
// scrolling under it doesn't wash out its labels.
export const glassHaloClass =
  "relative flex before:pointer-events-none before:absolute before:inset-1 before:-z-10 before:rounded-full before:bg-background/50 before:scroll-edge";

export const navItemClass =
  "inline-flex h-9 items-center justify-center gap-2 rounded-full px-2.5 text-sm font-medium tracking-[-0.005em] text-body outline-none dark:text-foreground/80 transition-[color,background-color,box-shadow] duration-300 ease-out hover:text-primary-on-glass focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-[current=location]:bg-(--glass-capsule) aria-[current=location]:text-foreground aria-[current=location]:shadow-(--glass-capsule-shadow) sm:px-3.5 [&_svg]:size-4 sm:[&_svg]:hidden";

export const tagPillClass =
  "tag h-6 gap-1.5 rounded-full border-(--tag-border) bg-(--tag-fill) px-2.5 font-normal text-body shadow-[inset_0_1px_0_0_var(--glass-highlight)] transition-[color,background-color,border-color] duration-200";

export const tagPillHoverClass =
  "hover:border-primary/30 hover:bg-primary/8 hover:text-primary-on-glass focus-visible:text-primary-on-glass active:bg-primary/12";

export const tagPillLinkClass = "group gap-1 pr-2";
