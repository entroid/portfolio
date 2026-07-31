import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type ContainerProps = HTMLAttributes<HTMLDivElement>;

export function Container({ className, children, ...rest }: ContainerProps) {
  return (
    <div
      className={cn(
        "content-container",
        "mx-auto w-full max-w-[1280px] px-4 md:px-6 py-2",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
