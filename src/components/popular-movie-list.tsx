import { Button } from "./ui/button"

export const PopularMovieList = ()=> {
    return (
        <div className="h-[950px] bg-red-500 mt-[50px] px-[30px]">
        <div className="flex justify-between">  
            <h1 className="text-[30px]">Popular</h1>
            <Button> See more </Button>
        </div>
        <div className="bg-black w-[100%] h-[90%]"></div>
    </div>
    )
}