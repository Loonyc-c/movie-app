'use client'

import { useParams, useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { fetchFilteredGenres, fetchGenres } from "@/app/utils/api"
import Link from "next/link"
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
import { useRouter } from "next/navigation"
type Id = {
    id: string
}
type Genres = {
    id: number
    name: string
}
type Movie = {
    title: string
    original_title: string
    vote_average: number
    poster_path: string
}

const Genres = () => {
    const { id } = useParams<Id>()
    const [currentPage, setCurrentPage] = useState(1)
    const [genres, setGenres] = useState<Genres[]>([])
    const [filteredGenre, setFiltereGenre] = useState<Movie[]>([])
    const router = useRouter()
    const searchParams = useSearchParams()
    const searchGenres = JSON.parse(searchParams.get('genres') || "[]")

    useEffect(() => {
        const getGenres = async () => {
            const { genres } = await fetchGenres()
            setGenres(genres)
        }
        getGenres()
    }, [fetchGenres])

    useEffect(() => {
        const getFilteredGenres = async () => {
            try {
                const result = await fetchFilteredGenres(id,currentPage);
                setFiltereGenre(result.results);
            } catch (error) {
                console.error(error);
            }
        };
        getFilteredGenres()
    }, [id,currentPage])

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handleUpdateParams = (g: number) => {
        const newParams = new URLSearchParams(searchParams)
        // const getGenres = newParams.get('genres')
        // const setPage = newParams.set("page=", currentPage)
        newParams.set("page", String(currentPage))
        searchGenres.push(g)
        newParams.set('genres', JSON.stringify(searchGenres))

        router.push(`?${newParams.toString()}`)
    }

    return (
        <div className="flex flex-col gap-[30px] items-center">
            <Header />
            <div className="w-[1280px] h-full">
                <div className="">
                    <h1 className="font-extrabold text-[30px]">Search Filter</h1>
                </div>
                <div className="w-full h-full flex">
                    <div className="h-full w-[40%]">
                        <div>
                            <h1>Genres</h1>
                            <h4>See lists of movies by genre</h4>
                        </div>
                        <div className="w-full h-[200px] flex flex-wrap gap-[5px]">
                            {
                                genres.map((genre) => (
                                    <div key={genre.id} onClick={() => handleUpdateParams(genre.id)}>
                                        <Button className="h-[20px] py-[5px] text-[12px] rounded-full">
                                            {genre.name}
                                            <ChevronRight />
                                        </Button>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                    <div className="h-full w-full border-l-2  pl-[30px] gap-[20px] flex justify-between grid grid-cols-4">
                        {
                            filteredGenre.map((movie) => (
                                <div className="w-[180px] h-[350px] group relative cursor-pointer rounded-lg overflow-hidden ">
                                    <div className="relative">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                            alt={movie.title}
                                            className="w-full h-[150px] sm:h-[250px]"
                                        />
                                        <div className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>

                                    </div>
                                    <div className="bg-[#f6f6f6] dark:bg-[#313131] gap-[5px] h-full px-[10px] py-[5px]">
                                        <div className="gap-[5px] flex items-center">
                                            <ImbdStar />
                                            <div>
                                                <span className="font-bold">{movie.vote_average}</span>
                                                <span className="text-[10px]">/10</span>
                                            </div>
                                        </div>

                                        <h4 >{movie.original_title} </h4>
                                    </div>

                                </div>
                            ))
                        }

                    </div>
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
    )
}

export default Genres