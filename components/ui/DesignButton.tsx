// Source: InitStudio (https://initstudio.aekkarat.com) by bballaek
// components/ui/DesignButton.tsx
"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import styles from "./design-button.module.css";

export type DesignButtonVariant = "primary" | "secondary" | "tertiary" | "outline" | "ghost" | "danger" | "link";
export type DesignButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: DesignButtonVariant; size?: "sm" | "md" | "lg" };

export const DesignButton = forwardRef<HTMLButtonElement, DesignButtonProps>(function DesignButton({ variant = "primary", size = "md", type = "button", className, ...props }, ref) {
  return <button ref={ref} type={type} data-variant={variant} data-size={size} className={cn(styles.button, className)} {...props} />;
});

export function DesignButtonShowcase() {
  return <div className={styles.showcase} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
    <div className={styles.row} style={{ display: "flex", position: "relative", flexDirection: "row", flexWrap: "nowrap" }}>{(["primary", "secondary", "tertiary", "outline", "ghost", "danger", "link"] as const).map(variant => <DesignButton key={variant} variant={variant}>{variant.charAt(0).toUpperCase() + variant.slice(1)}</DesignButton>)}</div>
    <div className={styles.row} aria-label="Button sizes" style={{ display: "flex", position: "relative", flexDirection: "row", flexWrap: "nowrap" }}>{(["sm", "md", "lg"] as const).map(size => <DesignButton key={size} size={size}>{size}</DesignButton>)}</div>
  </div>;
}
