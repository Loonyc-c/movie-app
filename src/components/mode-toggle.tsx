"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import DayThemeLogo from "./icons/day-theme-logo"
import NightThemeIcon from "./icons/night-theme-icon"
import { useTheme } from "next-themes"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
   <div className="flex">
    <Button onClick={()=> setTheme("light")}> <DayThemeLogo/></Button>
    <Button onClick={()=> setTheme("dark")}> <NightThemeIcon /> </Button>
   </div>
  )
}
