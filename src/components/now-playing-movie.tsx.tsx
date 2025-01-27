'use client'

import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import ImbdStar from "./icons/imbd-star";
import 'swiper/css';
import 'swiper/css/navigation';
import { Button } from "./ui/button";
import { Navigation } from 'swiper/modules';
import PlayIconBlack from "./icons/play-icon-black";


export const NowPlayingMovies = () => {
    const [allPopularMovies, setAllPopularMovies] = useState([])

    const moviesApiKey = "api_key=1f25dddf1c81350b49714e3329104a98"
    const baseUrl = "https://api.themoviedb.org/3"
    const apiUrl = baseUrl + "/movie/now_playing?language=en-US&page=1&" + moviesApiKey

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
        <Swiper
            navigation={true}
            modules={[Navigation]}
            className="h-[600px] flex w-[100%] ">
            {allPopularMovies.map((movie) => (
                <SwiperSlide key={movie.id} className="relative h-[440px] w-[230px]">
                    <img
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-auto object-cover"
                    />
                    <div className="w-[400px] h-[300px] absolute top-[200px] left-[100px] z-20  text-white">
                        <div className="flex flex-col gap-[10px]">
                            <p className="text-[10px]">Now Playing:</p>
                            <p className="font-extrabold">{movie.original_title}</p>
                            <div className="flex items-center gap-[5px]">
                                <ImbdStar />
                                <div>
                                    <span className="font-bold text-[12px]">{movie.vote_average}</span>
                                    <span className="text-[10px]">/10</span>
                                </div>
                            </div>
                            <div className="w-[100%] h-[100px] overflow-hidden">
                                <p>{movie.overview}</p>
                            </div>
                            <Button className="bg-white w-[150px]">
                                <PlayIconBlack />

                              <p className="text-black">Watch Trailer</p>
                            </Button>

                        </div>

                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}