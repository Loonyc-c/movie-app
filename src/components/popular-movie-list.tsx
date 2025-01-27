'use client'

import { Button } from "./ui/button"
import { useState } from "react"
import { useEffect } from "react"
import ImbdStar from "./icons/imbd-star"

export const PopularMovieList = () => {

    const [allPopularMovies, setAllPopularMovies] = useState([])

    const moviesApiKey = "api_key=1f25dddf1c81350b49714e3329104a98"
    const baseUrl = "https://api.themoviedb.org/3"
    const apiUrl = baseUrl + "/movie/popular?language=en-US&page=1&" + moviesApiKey

    const getPopularMovies = async () => {
        try {

            const response = await fetch(apiUrl)

            const result = await response.json()
            const movies = result.results
            setAllPopularMovies(movies)
            // console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getPopularMovies()
    }, [])
    // console.log(allPopularMovies)

    return (
        <div className="w-[1280px] mt-[50px] px-[30px]">
            <div className="flex justify-between mb-[20px]">
                <h1 className="text-[30px] font-extrabold">Popular</h1>
                <Button> See more </Button>
            </div>

            <div className=" w-[100%] gap-[10px] grid grid-cols-5 flex">
                {allPopularMovies.slice(0, 10).map((movie) => (
                    <div key={movie.id} className=" flex grid grid-col-2 h-[440px] w-[230px]">
                        <div className="bg-black">  
                        <img
                            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full h-auto"
                        />
                        </div>
                        <div className="bg-gray-500 gap-[5px] h-[95px] px-[10px] py-[5px]">
                            <div className="gap-[5px] flex items-center">
                                <ImbdStar />
                                <div>
                                    <span className="font-bold">{movie.vote_average}</span>
                                    <span className="text-[12px]">/10</span>
                                </div>
                            </div>

                            <h4 >{movie.original_title} </h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}