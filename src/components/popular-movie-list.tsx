'use client'

import { Button } from "./ui/button"
import { useState } from "react"
import { useEffect } from "react"
import ImbdStar from "./icons/imbd-star"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

type Movie = {
    id: number
    title: string
    poster_path: string
    vote_average: number
    original_title: string
}

export const PopularMovieList = () => {

    const [allPopularMovies, setAllPopularMovies] = useState<Movie[]>([])

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
        <div className="max-w-screen-xl mx-auto mt-[50px] px-[30px]">
            <div className="flex justify-between mb-[20px]">
                <h1 className="text-2xl sm:text-3xl font-extrabold">Popular</h1>
                <Link href="/category/popular">
                    <Button>
                        See more
                        <ArrowRight />
                    </Button>
                </Link>
            </div>

            <div className=" w-[100%] gap-4 sm:gap-6 md:gap-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 flex">
                {allPopularMovies.slice(0, 10).map((movie) => (
                    <Link key={movie.id} href={`/detail/${movie.id}`}>

                        <div key={movie.id} className="group relative cursor-pointer rounded-lg overflow-hidden  h-[440px] w-[230px]">
                            <div className="relative">
                                <img
                                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full h-[260px] sm:h-[345px]"
                                />
                                <div className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>

                            </div>
                            <div className="bg-[#f6f6f6] dark:bg-[#313131] gap-[5px] h-[95px] px-[10px] py-[5px]">
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
                    </Link>
                ))}
            </div>
        </div>
    )
}