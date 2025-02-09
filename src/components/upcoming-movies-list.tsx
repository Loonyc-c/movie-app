'use client'

import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import ImbdStar from "./icons/imbd-star"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { fetchUpcomingMovies } from "@/app/utils/api"

type Movie = {
    title: string
    id: number
    poster_path: string
    vote_average: number
    original_title: string
}

export const UpcomingMoviesList = () => {
    const [upComingMovies, setUpComingMovies] = useState<Movie[]>([])

    useEffect(() => {
        const getUpcomingMovies = async () => {
            const movies = await fetchUpcomingMovies(1);
            setUpComingMovies(movies.results);
        };
        getUpcomingMovies();
    }, []);

    // console.log(upComingMovies)



    return (
        <div className="max-w-screen-xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between mb-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold">Upcoming</h1>
                <Link href="/category/upcoming">
                    <Button className="bg-none">
                        See more
                        <ArrowRight/>

                    </Button>
                </Link>
            </div>
            <div className="w-[100%] gap-6  grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-5 ">
                {upComingMovies.slice(0, 10).map((movie) => (
                    <Link key={movie.id} href={`/detail/${movie.id}`}>
                        <div
                            key={movie.id}
                            className="group cursor-pointer rounded-lg overflow-hidden h-[440px]  w-[230px]    relative"
                        >
                            <div className="relative">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full h-[260px] sm:h-[345px] object-cover"
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
                                <h4>{movie.original_title}</h4>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}