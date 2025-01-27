"use client"

import { Button } from "./ui/button"
import { ChevronDown } from "lucide-react"
import LogoBlue from "./icons/logo-blue"
import DayThemeLogo from "./icons/day-theme-logo"
import SearchIcon from "./icons/search-icon"

export const Header = ({ onClick }) => {
    return (
        <div className={`w-[1280px] h-[60px] flex justify-between pt-[5px] } `}>
            <LogoBlue />
            <div className="w-[500px] h-[35px] flex gap-[10px] ">
                
                <Button className="h-[35px]" > <ChevronDown /> Genre </Button>
                <div className="flex w-[100%] items-center gap-[10px] border border-black rounded pl-[10px] pr-[10px]"> 
                    <SearchIcon/>
                    <input className="w-[100%]" placeholder="search" type="text" />
                </div>
                
            </div>
            <Button 
            onClick={onClick} 
            className="bg-transparent border w-[35px] h-[35px]">
                <DayThemeLogo />
            </Button>
        </div>
    )
}