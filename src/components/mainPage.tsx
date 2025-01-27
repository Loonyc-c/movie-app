"use client"

import { Header } from "./header"
import { NowPlayingMovies } from "./now-playing-movie.tsx"
import { UpcomingMoviesList } from "./upcoming-movies-list"
import { PopularMovieList } from "./popular-movie-list"
import { TopRatedMovieList } from "./top-movie-list"
import { Footer } from "./footer"
import { useState } from "react"

export const MainPage = () => {
        const [dayTheme, setDayTheme] = useState(true); 
    
        const handleThemeChange = () => {
            setDayTheme((prevTheme) => !prevTheme); 
        };

    return (
        <div className={`w-screen h-full gap-[20px] flex flex-col items-center ${dayTheme ? "bg-white" : "bg-black"}`}>
            <Header 
             onClick={handleThemeChange}
             />
            <NowPlayingMovies />
            <UpcomingMoviesList />
            <PopularMovieList />
            <TopRatedMovieList />
            <Footer />
        </div>


    )
}