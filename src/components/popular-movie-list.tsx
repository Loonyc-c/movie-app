'use client'

import { Button } from "./ui/button"
import { useState } from "react"
import { useEffect } from "react"
import ImbdStar from "./icons/imbd-star"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { fetchPopularMovies } from "@/app/utils/api"
type Movie = {
    id: number
    title: string
    poster_path: string
    vote_average: number
    original_title: string
}

export const PopularMovieList = () => {

    const [allPopularMovies, setAllPopularMovies] = useState<Movie[]>([])
    
    useEffect(() => {
        const getPopularMovies = async () => {
            const data = await fetchPopularMovies(1)
            setAllPopularMovies(data.results)
        }
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

            <div className=" w-[100%] gap-6  grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-5 sm:grid-cols-4 xs:grid-cols-3 xss:grid-cols-2">
                {allPopularMovies.slice(0, 10).map((movie) => (
                    <Link key={movie.id} href={`/detail/${movie.id}`}>

                        <div key={movie.id} className="group relative cursor-pointer rounded-lg overflow-hidden  h-[440px] w-[100%]">
                            <div className="relative w-full h-[80%]">
                                <img
                                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>

                            </div>
                            <div className="bg-[#f6f6f6] dark:bg-[#313131] gap-[5px] h-[20%] px-[10px] py-[5px]">
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