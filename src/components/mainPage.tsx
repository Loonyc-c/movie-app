"use client"

import { Header } from "./header"
import { NowPlayingMovies } from "./now-playing-movie.tsx"
import { UpcomingMoviesList } from "./upcoming-movies-list"
import { PopularMovieList } from "./popular-movie-list"
import { TopRatedMovieList } from "./top-movie-list"
import { Footer } from "./footer"

export const MainPage = () => {


    return (
        <div className={`w-screen h-full gap-[20px] flex flex-col items-center}`}>
            <Header/>
            <NowPlayingMovies />
            <UpcomingMoviesList />
            <PopularMovieList />
            <TopRatedMovieList />
            <Footer />
        </div>


    )
}