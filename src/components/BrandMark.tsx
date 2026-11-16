/** A single, shared stem joins the hook of the J to the bowl and leg of the R. */
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`monogram ${className}`}
      viewBox="0 0 72 72"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fillRule="evenodd"
        d="M8 14h36c12 0 19 6 19 16 0 7-4 12-11 14l13 17H50L40 46h-3c0 10-6 16-17 16H8V50h10c5 0 7-3 7-8V26H8V14Zm29 11v10h7c5 0 7-2 7-5s-2-5-7-5h-7Z"
      />
    </svg>
  );
}
