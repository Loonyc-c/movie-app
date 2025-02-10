'use client'

import { useState } from "react"
import { useEffect } from "react"
import ImbdStar from "@/components/icons/imbd-star"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { fetchPopularMovies } from "@/app/utils/api"
import PaginationComponent from "@/components/pagination"


type Movie = {
    id: number
    title: string
    poster_path: string
    vote_average: number
    original_title: string
}
const Popular = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const [allPopularMovies, setAllPopularMovies] = useState<Movie[]>([])
    const [totalPages,setTotalPages] = useState(0)



    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    useEffect(() => {
        const getMovies = async () => {
            const result = await fetchPopularMovies(currentPage)
            setAllPopularMovies(result.results)
            setTotalPages(result.total_pages)
        }
        getMovies()
    }, [currentPage])

    return (

        <div className="flex flex-col gap-[30px]">
            <Header />
            <div className="max-w-screen-xl mx-auto px-[30px]">
                <div className="flex justify-between mb-[20px]">
                    <h1 className="text-2xl sm:text-3xl font-extrabold">Popular</h1>
                </div>

                <div className="w-[100%] gap-6  grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-5 sm:grid-cols-4 xs:grid-cols-3 xss:grid-cols-2">
                    {allPopularMovies.map((movie) => (
                        <Link key={movie.id} href={`/detail/${movie.id}`}>

                            <div key={movie.id} className="group relative cursor-pointer rounded-lg overflow-hidden  h-[440px] w-full">
                                <div className="relative h-[80%] w-full">
                                    <img
                                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                        alt={movie.title}
                                        className="w-full h-full sm:h-[345px]"
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
            <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            />

            <Footer />
        </div>
    )
}

export default Popular