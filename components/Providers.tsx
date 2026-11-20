"use client";

import type { ReactNode } from "react";
import { ToastStack, ToastStackProvider } from "@/components/ui/ToastStack";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastStackProvider timeout={5000} limit={3}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-3 z-[120] h-[160px]">
        <ToastStack />
      </div>
    </ToastStackProvider>
  );
}
