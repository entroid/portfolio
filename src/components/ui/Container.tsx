import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type ContainerProps = HTMLAttributes<HTMLDivElement>;

export function Container({ className, children, ...rest }: ContainerProps) {
  return (
    <div
      className={cn(
        "content-container",
        "mx-auto w-full max-w-[1280px] px-4 md:px-8",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
