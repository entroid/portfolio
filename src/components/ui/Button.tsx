import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary";

type CommonProps = {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps | "href"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<ComponentProps<typeof Link>, keyof CommonProps | "href"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const base = cn(
  "inline-flex items-center gap-1 font-mono text-label tracking-label uppercase transition-colors duration-150",
  focusRing,
);

const variantClassName: Record<ButtonVariant, string> = {
  primary: cn(
    base,
    "border border-accent px-6 py-3 text-accent",
    "hover:bg-accent hover:text-bg focus-visible:bg-accent focus-visible:text-bg",
  ),
  secondary: cn(base, "group border border-transparent px-1 py-1 text-fg"),
};

/**
 * Exposes the variant classes for callers that need Button's look on a
 * different link primitive (e.g. the Hero CTA uses next-intl's locale-aware
 * `Link` instead of plain `next/link`, since it must preserve the current
 * locale) — Button itself stays a generic, non-locale-aware primitive.
 */
export const buttonClassName = variantClassName;

const bracket =
  "inline-block opacity-0 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0";

function SecondaryContent({ children }: { children: ReactNode }) {
  return (
    <>
      <span aria-hidden="true" className={cn(bracket, "-translate-x-1")}>
        [
      </span>
      <span>{children}</span>
      <span aria-hidden="true" className={cn(bracket, "translate-x-1")}>
        ]
      </span>
    </>
  );
}

export function Button(props: ButtonProps) {
  const { variant = "secondary", className, children, href, ...rest } = props;

  const content =
    variant === "secondary" ? (
      <SecondaryContent>{children}</SecondaryContent>
    ) : (
      children
    );

  const classes = cn(variantClassName[variant], className);

  if (href !== undefined) {
    return (
      <Link
        href={href}
        className={classes}
        {...(rest as Omit<ComponentProps<typeof Link>, "href" | "className">)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
