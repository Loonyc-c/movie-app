'use client'

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useEffect, useState } from "react"
import { fetchSearchedMovie } from "../utils/api"
import ImbdStar from "@/components/icons/imbd-star"
import { fetchGenres } from "../utils/api"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import PaginationComponent from "@/components/pagination"

type Genres = {
    id: number
    name: string
}
type Movie = {
    title: string
    id: number
    poster_path: string
    vote_average: number
    original_title: string
}

const SearchResult = () => {

    // const [searchValue, setSearchValue] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [genres, setGenres] = useState<Genres[]>([])
    const router = useRouter()
    const searchParams = useSearchParams()
    const searchValue = searchParams.get('value') || ''
    const selectedGenre = JSON.parse(searchParams.get('genres') || "[]")
    const [filteredGenre, setFilteredGenre] = useState<Movie[]>([])
    const [totalResult, setTotalResult] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    useEffect(() => {
        const getGenres = async () => {
            const result = await fetchGenres()
            setGenres(result.genres)
        }
        getGenres()
    }, [])

    const handleUpdateParams = (g: number) => {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set("page", String(currentPage));

        const updatedGenres = new Set(selectedGenre);
        if (updatedGenres.has(g)) {
            updatedGenres.delete(g);
        } else {
            updatedGenres.add(g);
        }

        if (updatedGenres.size > 0) {
            newParams.set('genres', JSON.stringify([...updatedGenres]));
        } else {
            newParams.delete('genres');
        }

        router.push(`?${newParams.toString()}`);
    };

    useEffect(() => {
        const getSearchedAndFilteredMovie = async () => {
            try {
                const result = await fetchSearchedMovie(searchValue, currentPage);
                // console.log(result)

                if (selectedGenre.length === 0) {
                    setFilteredGenre(result.results);
                    setTotalPages(result.total_pages)
                    setTotalResult(result.total_results)
                    return;
                } else {
                    const filteredMovies = result.results.filter((movie) =>
                        movie.genre_ids.some((genreId: number) => selectedGenre.includes(genreId))
                    );
                    setFilteredGenre(filteredMovies);
                    setTotalPages(result.total_pages)
                    setTotalResult(result.total_results)
                }


            } catch (error) {
                console.error(error);
            }
        };
        getSearchedAndFilteredMovie();
    }, [searchParams, currentPage, searchValue]);

    console.log(searchValue)

    return (
        <div className="w-screen h-full flex flex-col items-center gap-[30px]">
            <Header />
            <div className="w-[1280px] h-full flex flex-col gap-[30px]">
                <div>
                    <h1 className="font-extrabold text-[32px]">Search Results</h1>
                </div>
                <div className=" flex">
                    <div className="w-[70%] h-full flex flex-col gap-[30px] pr-[20px] border-r-2">
                        <h1 className="font-extrabold text-[20px]">{totalResult} results for "{searchValue}"</h1>
                        <div className="w-full h-full grid grid-cols-4 flex justify-between">
                            {
                                filteredGenre.map((movie) => (
                                    <div key={movie.id} className="w-[180px] h-[350px] group relative cursor-pointer rounded-lg overflow-hidden mb-[20px] ">
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

                    <div className="w-[30%] h-auto pl-[20px]">
                        <div className="mb-[20px]">
                            <h1 className="text-[26px] font-extrabold">Genres</h1>
                            <h4>See lists of movies by genre</h4>
                        </div>
                        <div className="w-full h-auto flex flex-wrap gap-[5px] ">
                            {
                                genres.map((genre) => (
                                    <div key={genre.id} onClick={() => handleUpdateParams(genre.id)}>
                                        <Button className="h-[20px] py-[5px] text-[12px] border rounded-full bg-white dark:bg-[#09090B] text-black dark:text-white ">
                                            {genre.name}
                                            <ChevronRight />
                                        </Button>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
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

export default SearchResult