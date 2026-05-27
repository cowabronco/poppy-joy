import { cn } from "@/lib/utils";

type DrawnHeartProps = {
  className?: string;
};

export function DrawnHeart({ className }: DrawnHeartProps) {
  return (
    <svg
      viewBox="0 0 32 28"
      aria-hidden
      className={cn("inline-block shrink-0", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 24.5c-.4 0-.8-.2-1.1-.5C13.2 22.4 4 16.2 4 10.2 4 6.4 6.8 3.5 10.6 3.5c2.2 0 4.2 1.1 5.4 2.8 1.2-1.7 3.2-2.8 5.4-2.8 3.8 0 6.6 2.9 6.6 6.7 0 6-9.2 12.2-10.9 13.8-.3.3-.7.5-1.1.5z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.2 8.8c.6-.9 1.6-1.3 2.5-1"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}
