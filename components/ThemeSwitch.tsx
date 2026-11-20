"use client";

import { useEffect, useState } from "react";
import { ThemeMode, type ThemeModeValue } from "@/components/ui/ThemeMode";

function apply(mode: ThemeModeValue) {
  const dark = mode === "dark" || (mode === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.setAttribute("data-home-theme", dark ? "dark" : "light");
}

export default function ThemeSwitch({ className }: { className?: string }) {
  const [mode, setMode] = useState<ThemeModeValue>("system");

  useEffect(() => {
    let saved: ThemeModeValue = "system";
    try { saved = (localStorage.getItem("theme") as ThemeModeValue) || "system"; } catch {}
    setMode(saved);
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => { if ((localStorage.getItem("theme") || "system") === "system") apply("system"); };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <ThemeMode
      value={mode}
      className={className}
      onValueChange={(m) => {
        setMode(m);
        try { localStorage.setItem("theme", m); } catch {}
        apply(m);
      }}
    />
  );
}
