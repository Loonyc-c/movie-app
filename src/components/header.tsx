import { Button } from "./ui/button"
import { ChevronDown } from "lucide-react"
import LogoBlue from "./incons/logo-blue"
import DayThemeLogo from "./incons/day-theme-logo"
import SearchIcon from "./incons/search-icon"

export const Header = () => {
 
    // const handleClickOnGenre = () => {
    //      <div className="w-500px h-200px bg-black-500"> </div>
    // }

    return (
        <div className="w-screen h-[60px] flex justify-between pt-[5px]">
            <LogoBlue />
            <div className="w-[500px] h-[35px] flex gap-[10px] ">
                
                <Button className="h-[35px]" > <ChevronDown /> Genre </Button>
                <div className="flex w-[100%] items-center gap-[10px] border border-black rounded pl-[10px] pr-[10px]"> 
                    <SearchIcon/>
                    <input className="w-[100%]" placeholder="search" type="text" />
                </div>
                
            </div>
            <Button className="bg-transparen border w-[35px] h-[35px]"> <DayThemeLogo /></Button>
        </div>
    )
}