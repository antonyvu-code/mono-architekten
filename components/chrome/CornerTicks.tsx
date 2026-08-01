const tick = "pointer-events-none fixed z-40 h-3.5 w-3.5 border-ink/35 hidden md:block";

/** Lab Noir signature: four 14px viewfinder brackets framing the viewport. */
export default function CornerTicks() {
  return (
    <div aria-hidden="true">
      <span className={`${tick} left-3 top-3 border-l border-t`} />
      <span className={`${tick} right-3 top-3 border-r border-t`} />
      <span className={`${tick} bottom-3 left-3 border-b border-l`} />
      <span className={`${tick} bottom-3 right-3 border-b border-r`} />
    </div>
  );
}
