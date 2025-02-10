'use client'
import { useState, useEffect } from "react"
import ImbdStar from "@/components/icons/imbd-star"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { fetchUpcomingMovies } from "@/app/utils/api"
import PaginationComponent from "@/components/pagination"

type Movie = {
    title: string
    id: number
    original_title: string
    poster_path: string
    vote_average: number

}

const Upcoming = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const [upComingMovies, setUpComingMovies] = useState<Movie[]>([])
    const [totalPages, setTotalPages] = useState(0)

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    useEffect(() => {
        const getMovies = async () => {
            const data = await fetchUpcomingMovies(currentPage)
            setUpComingMovies(data.results)
            setTotalPages(data.total_pages)
        }
        getMovies()
    }, [currentPage])

    return (

        <div className="flex flex-col gap-[30px]">
            <Header />
            <div className=" max-w-screen-xl mx-auto px-[30px]">
                <div className="flex justify-between mb-[20px]">
                    <h1 className="text-2xl sm:text-3xl font-extrabold">Upcoming</h1>

                </div>
                <div className="w-[100%] gap-6  grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-5 sm:grid-cols-4 xs:grid-cols-3 xss:grid-cols-2">
                    {upComingMovies.map((movie) => (
                        <Link key={movie.id} href={`/detail/${movie.id}`}>

                            <div
                                key={movie.id}
                                className="group cursor-pointer rounded-lg overflow-hidden h-[440px] w-full relative"
                            >
                                <div className="relative w-full h-[80%]">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
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
                                    <h4>{movie.original_title}</h4>
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

export default Upcoming