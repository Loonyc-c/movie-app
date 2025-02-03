'use client'
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import ImbdStar from "@/components/icons/imbd-star"
import { Header } from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import { Footer } from "@/components/footer"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import Link from "next/link"
import { fetchUpcomingMovies } from "@/app/utils/api"

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
    
    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }
    
    useEffect(()=>{
       const getMovies = async ()=> {
            const data = await fetchUpcomingMovies(currentPage)
            setUpComingMovies(data.results)
       }
       getMovies()
    },[currentPage])

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div className="flex flex-col gap-[30px]">
                <Header />
                <div className=" max-w-screen-xl mx-auto px-[30px]">
                    <div className="flex justify-between mb-[20px]">
                        <h1 className="text-2xl sm:text-3xl font-extrabold">Upcoming</h1>

                    </div>
                    <div className="w-[100%] gap-[30px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {upComingMovies.map((movie) => (
                                                <Link key={movie.id} href={`/detail/${movie.id}`}>

                            <div
                                key={movie.id}
                                className="group cursor-pointer rounded-lg overflow-hidden h-[440px] w-[230px] relative"
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
                <div>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>

                                <PaginationPrevious href="#"
                                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                                />
                            </PaginationItem>

                            <PaginationItem>
                                {
                                    [1, 2, 3, 5, 6, 7,8,9,10].map((page) => (
                                        <PaginationLink key={page} className="border" onClick={() => handlePageChange(page)} href="#">
                                            {page}
                                        </PaginationLink>
                                    ))
                                }
                                {/* <PaginationLink className="border" href="#">1</PaginationLink> */}
                            </PaginationItem>

                            <PaginationItem>
                                <PaginationNext href="#"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>

                </div>
                <Footer />
            </div>
        </ThemeProvider>
    )
}

export default Upcoming