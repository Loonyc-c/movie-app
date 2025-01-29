'use client'

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import ImbdStar from "@/components/icons/imbd-star";

type Movie = {
    poster_path: string
    backdrop_path: string
    vote_average:number
    vote_count:number
    original_title:string
    release_date:number
}

const Detailed = () => {
    const [movie, setMovie] = useState<Movie[]>([])
    const { id } = useParams()
    // const params= useParams<{id:number}>()

    const moviesApiKey = "api_key=1f25dddf1c81350b49714e3329104a98"
    const baseUrl = "https://api.themoviedb.org/3"
    const apiUrl = `${baseUrl}/movie/${id}?language=en-US&${moviesApiKey}`;


    const getDetailedMove = async () => {
        try {
            const response = await fetch(apiUrl)
            const result = await response.json()
            setMovie(result)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDetailedMove()
    }, [])

    console.log(movie)
    console.log(id)
    console.log(apiUrl)

    return (
        <div className="w-full h-full bg-red-500 flex flex-col gap-[30px] items-center justify-center">
            <Header />
            <div className="w-[1080px] bg-yellow-500 flex flex-col gap-[30px]">
                <div className="w-full flex justify-between">
                    <div >
                        <h1>{movie.original_title}</h1>
                        <p> {movie.release_date}</p>
                    </div>
                    <div>
                        <p>rating</p>
                        <div className="flex items-center">
                            <ImbdStar/>
                            <div>
                                <p>{movie.vote_average}</p>
                                <p>{movie.vote_count}</p>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="flex justify-between">
                    <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className="w-[300px] h-[400px]"
                    
                    />  
                    <img 
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    className="w-[750px] h-[400px]"  
                    />  
                </div>

            </div>

            <div className="w-[1080px] h-[600px] bg-black">

            </div>
            <div className="w-[1080px] h-[600px] bg-green-500">

            </div>
            <Footer/>

        </div>
    )
}

export default Detailed