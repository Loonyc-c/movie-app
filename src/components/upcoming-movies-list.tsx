import { Button } from "./ui/button"

export const UpcomingMoviesList = ()=> {
    return (
        <div className="h-[950px] bg-green-500 mt-[50px] px-[30px]">
            <div className="flex justify-between">  
                <h1 className="text-[30px]">Upcoming</h1>
                <Button> See more </Button>
            </div>
            <div className="bg-red-500 w-[100%] h-[90%]"></div>
        </div>
    )
}