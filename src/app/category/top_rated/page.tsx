'use client'

import { useState, useEffect } from "react"
import ImbdStar from "@/components/icons/imbd-star"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import PaginationComponent from "@/components/pagination"
import Link from "next/link"
import { fetchTopRatedMovies } from "@/app/utils/api"

type TopMovie = {
    title: string
    id: number
    poster_path: string
    vote_average: number
    original_title: string
}

const TopRatedMovieList = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const [allTopRatedMovies, setAllTopRatedMovies] = useState<TopMovie[]>([])
    const [totalPages,setTotalPages] = useState(0)

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        const getAllTopRatedMovies = async () => {
            try {
                const result = await fetchTopRatedMovies(currentPage)
                setAllTopRatedMovies(result.results)
                setTotalPages(result.total_pages)
            } catch (error) {
                console.log(error)
            }
        }
        getAllTopRatedMovies()
    }, [currentPage])




    // console.log("this is top rated movies:", allTopRatedMovies)



    return (

        <div className="flex flex-col gap-[30px]">
            <Header />

            <div className="max-w-screen-xl mx-auto  px-[30px]">
                <div className="flex justify-between mb-[20px]">
                    <h1 className="text-2xl sm:text-3xl font-extrabold">Top Rated</h1>
                </div>
                <div className="gap-[30px] w-[100%] h-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 flex">
                    {allTopRatedMovies.map((movie) => (
                        <Link key={movie.id} href={`/detail/${movie.id}`}>

                            <div key={movie.id}
                                className="group cursor-pointer relative rounded-lg overflow-hidden h-[440px] w-[230px]">
                                <div className="relative">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
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
                                    <h4 >{movie.original_title} </h4>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div>
                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                />

            </div>
            <Footer />
        </div>
    )
}

export default TopRatedMovieList