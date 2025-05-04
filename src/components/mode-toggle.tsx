"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import DayThemeLogo from "./icons/day-theme-logo";
import NightThemeIcon from "./icons/night-theme-icon";
import { useTheme } from "next-themes";

const ModeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      className="flex border items-center gap-2 transition-colors bg-white dark:bg-[#09090B] hover:opacity-30"
    >
      {resolvedTheme === "light" ? <NightThemeIcon /> : <DayThemeLogo />}
    </Button>
  );
};

export default ModeToggle;
