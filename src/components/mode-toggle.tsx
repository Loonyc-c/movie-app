"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import DayThemeLogo from "./icons/day-theme-logo"
import NightThemeIcon from "./icons/night-theme-icon"
import { useTheme } from "next-themes"

const ModeToggle=() =>{
  const {theme, setTheme } = useTheme()

  return (
  //  <div className="flex">
  //   <Button onClick={()=> setTheme("light")}> <DayThemeLogo/></Button>
  //   <Button onClick={()=> setTheme("dark")}> <NightThemeIcon /> </Button>
  //  </div>
   <Button
     onClick={() => setTheme(theme === "light" ? "dark" : "light")}
     className="flex border items-center gap-2 transition-colors bg-white dark:bg-[#09090B] hover:opacity-30"
   >
     {theme === "light" ? <NightThemeIcon /> : <DayThemeLogo />}
   </Button>
  )
}

export default ModeToggle
