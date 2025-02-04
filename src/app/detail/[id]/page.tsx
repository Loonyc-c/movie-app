'use client'

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import BigStar from "@/components/icons/big-star";
import ImbdStar from "@/components/icons/imbd-star";
import Link from "next/link";
import PlayIcon from "@/components/icons/play-icon";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import ReactPlayer from 'react-player/youtube'
import { fetchDetailedMovie } from "@/app/utils/api";
import { fetchMovieCredit } from "@/app/utils/api";
import { fetchSimilarMovie } from "@/app/utils/api";
import { fetchMovieTrailer } from "@/app/utils/api";

type Movie = {
    poster_path: string
    backdrop_path: string
    vote_average: number
    vote_count: number
    original_title: string
    release_date: number
    genres: Genre[]
    overview: string
    cast: string
    id: number

}

type Genre = {
    id: number
    name: string
}

type SimilarMovie = {
    id: number
    poster_path: string
    original_title: string
    vote_average: number

}

type Cast = {
    id: string
    name: string
}

type Crew = {
    adult: boolean
    credit_id: string
    department: string
    gender: number
    id: number
    job: string
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
}

type Credit = {
    cast: Cast[]
    crew: Crew[]
    id: number
}

type MovieTrailer = {
    id: string
    key: string
}

type Id = {
    id: string
}

const Detailed = () => {
    const [movie, setMovie] = useState<Movie>({} as Movie)
    const [credit, setCredit] = useState<Credit>({} as Credit)
    const [similarMovies, setSimilarMovies] = useState<SimilarMovie[]>([])
    const [movieTrailer, setMovieTrailer] = useState<MovieTrailer>({} as MovieTrailer)
    const { id } = useParams<Id>()
    // const params= useParams<{id:number}>()

    const moviesApiKey = "api_key=1f25dddf1c81350b49714e3329104a98"
    const baseUrl = "https://api.themoviedb.org/3"



    useEffect(() => {
        const getDetailedMovie = async () => {
            try {
                const result = await fetchDetailedMovie(id as string)
                setMovie(result)

            } catch (error) {
                console.log(error)
            }
        }
        //  argument of type 'string | string [] | undefined' is not assignable to parameter of type ' string', type 'undefined' is not assignable to type 'string'
        getDetailedMovie()
    }, [id])

    useEffect(() => {
        const getMovieCredit = async () => {
            try {
                const response = await fetchMovieCredit(id as string)
                setCredit(response)
            } catch (error) {
                console.log(error)
            }
        }
        getMovieCredit()
    }, [id])



    const director = credit?.crew?.find((member: Crew) => member.job === "Director")?.name || "";
    const writer = credit?.crew?.find((member: Crew) => member.job === "Writer")?.name || "";

    // console.log(movie)

    useEffect(() => {
        const getSimilarMovie = async () => {
            try {
                const response = await fetchSimilarMovie(id as string)
                setSimilarMovies(response.results)

            } catch (error) {
                console.log(error)
            }
        }
        getSimilarMovie()
    }, [id])


    useEffect(() => {
        const getMovieTrailer = async () => {
            try {
                const result = await fetchMovieTrailer(id)
                setMovieTrailer(result.results.find((video: any) => video.type === "Trailer" && video.site === "YouTube"))
            } catch (error) {
                console.log(error)
            }
        }
        getMovieTrailer()
    }, [id])

    console.log(movieTrailer)

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>

            <div className="flex flex-col gap-[30px]">
                <div className="w-full h-full flex flex-col gap-[30px] items-center justify-center">
                    <Header />
                    <div className="w-[1080px] flex flex-col justify-between">
                        <div className="w-full flex justify-between">
                            <div >
                                <h1 className="font-extrabold text-[30px]">{movie.original_title}</h1>
                                <p> {movie.release_date}</p>
                            </div>
                            <div>
                                <p className="text-[12px]">rating</p>
                                <div className="flex items-center gap-[5px]">
                                    <BigStar />
                                    <div>
                                        <div className="flex ">
                                            <p className="text-[16px]">{movie.vote_average}</p>
                                            <p className="text-[14px] text-gray-500">/10</p>
                                        </div>

                                        <p className="text-[12px] text-gray-500">{movie.vote_count}</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between mt-[30px] h-[400px]">
                            <img
                                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                className="w-[300px] "
                            />
                            <div className="relative">
                                <img
                                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                    className="w-[750px] h-full "
                                />
                                <div className="absolute inset-0 bg-black/40 p-[20px] flex items-end">
                                    <div className="text-white flex items-center gap-[10px] ">
                                        <Dialog >
                                            <div className="flex gap-[20px]">
                                                <DialogTrigger className="w-[40px] h-[40px] flex justify-center items-center bg-white rounded-full">

                                                    <PlayIcon />

                                                </DialogTrigger>
                                                <DialogTrigger>
                                                    <p>Play trailer</p>
                                                </DialogTrigger>
                                            </div>

                                            <DialogContent className="">
                                                {
                                                    <div key={movieTrailer.id} className="w-[500px] h-[400px]" >
                                                        <ReactPlayer

                                                            url={`https://www.youtube.com/watch?v=${movieTrailer.key}`}
                                                        />
                                                    </div>
                                                }
                                            </DialogContent>
                                        </Dialog>


                                    </div>

                                </div>


                            </div>

                        </div>

                    </div>

                    <div className="w-[1080px] flex flex-col gap-[20px]">
                        <div className="flex gap-[10px]"> {
                            movie.genres?.map((genre) => (
                                <Button className="h-[20px] text-[12px] rounded-xl" key={genre.id}>{genre.name}</Button>
                            ))
                        }
                        </div>
                        <p> {movie.overview}</p>
                        <div className="flex flex-col gap-[0px]">
                            <div className="flex gap-[20px] border-b-2 py-[10px]">
                                <h4 className="font-extrabold">Director</h4>
                                <span>{director}</span>
                            </div>
                            <div className="flex gap-[20px] border-b-2 py-[10px]">
                                <h4 className="font-extrabold">Writers</h4>
                                <span>{writer}</span>
                            </div>
                            <div className="flex gap-[20px] border-b-2 py-[10px]">
                                <h4 className="font-extrabold">Stars</h4>
                                <div className="flex gap-[10px]">
                                    {credit?.cast?.slice(0, 5).map((cast) => {
                                        return <p className="text-black" key={cast.id}> {cast.name} </p>
                                    })}
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="w-[1080px] flex flex-col  gap-[20px] ">
                        <div className="flex justify-between">
                            <h1 className="font-extrabold text-[30px]" >More like this</h1>
                            <Link key={movie.id} href={`/category/${movie.id}/similar`}>

                                <Button>See more</Button>
                            </Link>
                        </div>
                        <div className="flex justify-between">
                            {
                                similarMovies.slice(0, 5).map((movie) => (
                                    <Link key={movie.id} href={`/detail/${movie.id}`}>

                                        <div key={movie.id} className="group relative cursor-pointer rounded-lg w-[195px]">
                                            <div className="relative">
                                                <img
                                                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                                    className="h-[300px]"
                                                />
                                                <div className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                                            </div>
                                            <div className="bg-[#f6f6f6] dark:bg-[#313131]  h-[90px] overflow-hidden">
                                                <div className="flex items-center gap-[5px]">
                                                    <ImbdStar />
                                                    <div className="flex items-center">
                                                        <p>{movie.vote_average}</p>
                                                        <p className="text-[14px] text-gray-500">/10</p>
                                                    </div>
                                                </div>
                                                <h4>{movie.original_title}</h4>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }

                        </div>

                    </div>
                    <Footer />

                </div>
            </div>
        </ThemeProvider>
    )
}

export default Detailed