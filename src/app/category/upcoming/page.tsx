'use client'
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import ImbdStar from "@/components/icons/imbd-star"
import { Header } from "@/components/header"

const Upcoming = () => {

    const [upComingMovies, setUpComingMovies] = useState([])

    const moviesApiKey = "api_key=1f25dddf1c81350b49714e3329104a98"
    const baseUrl = "https://api.themoviedb.org/3"
    const apiUrl = baseUrl + "/movie/upcoming?language=en-US&page=1&" + moviesApiKey

    // console.log(apiUrl)

    const getUpcomingMovies = async () => {
        try {

            const response = await fetch(apiUrl)
            const result = await response.json()
            const movies = result.results
            setUpComingMovies(movies)
            // console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getUpcomingMovies()
    }, [])

    return (
        <div className=" w-screen flex flex-col justify-center items-center ">
            <Header/>

            <div className="w-[1280px]">
            <div className="flex justify-between mb-[20px]">
                <h1 className="text-[30px] font-extrabold">Upcoming</h1>
            </div>
            <div className=" w-[100%] gap-[10px] grid grid-cols-5 flex">
                {upComingMovies.slice(0, 20).map((movie) => (
                    <div key={movie.id} className="rounded-lg flex grid grid-col-2 h-[440px] w-[230px]">
                        <div className="overflow-hidden">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className=""
                            />
                        </div>
                        <div className=" bg-[#71717A] gap-[5px] h-[95px] px-[10px] py-[5px]">
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
        </div>
    )
}

export default Upcoming