'use client'

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import ImbdStar from "@/components/icons/imbd-star"
import PaginationComponent from "@/components/pagination"
import { fetchSimilarMovie } from "@/app/utils/api"
import Link from "next/link"

type Movie = {
    id: number
    poster_path: string
    original_title: string
    vote_average: number
}
type Id = {
    id: string
}


const SimilarMoviePage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [similarMovie, setSimilarMovie] = useState<Movie[]>([])
    const [totalPages,setTotalPages] =useState(0)

    const { id } = useParams<Id>()


    useEffect(() => {
        const getSimilarMovie = async () => {
            try {
                const result = await fetchSimilarMovie(id)
                setSimilarMovie(result.results)
                setTotalPages(result.total_pages)
            } catch (error) {
                console.log(error)
            }
        }
        getSimilarMovie()
    }, [id])

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    return (


            <div className="flex flex-col items-center gap-[30px]">
                <Header />
                <div className="max-w-screen-xl mx-auto px-[30px] ">
                    <h1 className="text-[30px] font-extrabold">More Like This</h1>
                    <div className="w-[100%] gap-6  grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-5 sm:grid-cols-4 xs:grid-cols-3 xss:grid-cols-2" >
                        {
                            similarMovie.map((movie) => (
                                <Link key={movie.id} href={`/detail/${movie.id}`}>

                                    <div key={movie.id} className="group relative cursor-pointer rounded-lg overflow-hidden  h-[440px] w-full">
                                        <div className="relative h-[80%] w-full">
                                            <img
                                                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
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
                            ))
                        }

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
export default SimilarMoviePage