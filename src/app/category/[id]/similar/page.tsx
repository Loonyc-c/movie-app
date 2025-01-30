'use client'

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import ImbdStar from "@/components/icons/imbd-star"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

type Movie = {
    id:number
    poster_path:string
    original_title: string
    vote_average:number
}


const SimilarMoviePage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [similarMovie, setSimilarMovie] = useState<Movie[]>([])

    const { id } = useParams()
    const moviesApiKey = "api_key=1f25dddf1c81350b49714e3329104a98"
    const baseUrl = "https://api.themoviedb.org/3"

    const similarMovieUrl = `${baseUrl}/movie/${id}/similar?language=en-US&page=${currentPage}&${moviesApiKey}`;

    useEffect(() => {
        const getSimilarMovie = async () => {
            try {
                const response = await fetch(similarMovieUrl)
                const result = await response.json()
                const similarMovies = result.results
                setSimilarMovie(similarMovies)
            }
            catch (error) {
                console.log(error)
            }
        }
        getSimilarMovie()

    }, [similarMovieUrl])
    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }



    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>

            <div className="flex flex-col items-center gap-[30px]">
                <Header />
                <div className="w-[1280px] gap-[30px] flex flex-col ">
                    <h1 className="text-[30px] font-extrabold">More Like This</h1>
                    <div className="w-full h-full flex gap-[20px] grid grid-cols-5" >
                        {
                            similarMovie.map((movie) => (
                                <div key={movie.id} className="group relative cursor-pointer rounded-lg overflow-hidden  h-[440px] w-[230px]">
                                    <div className="relative">
                                        <img
                                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
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
                            ))
                        }

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
                                    [1, 2, 3, 4, 5, 6].map((page) => (
                                        <PaginationLink key={page} className="border" href="#" onClick={() => handlePageChange(page)}>
                                            {page}
                                        </PaginationLink>
                                    ))
                                }
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
export default SimilarMoviePage