"use client"

import { Button } from "./ui/button"
import { ChevronDown } from "lucide-react"
import LogoBlue from "./icons/logo-blue"
import SearchIcon from "./icons/search-icon"
import { useEffect, useState } from "react"
import { ChangeEvent } from "react";
import ImbdStar from "./icons/imbd-star"
import { ChevronRight } from "lucide-react"
import ModeToggle from "./mode-toggle"
import Link from "next/link"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


type Movie = {
    id: number
    title: string
    poster_path: string
    vote_average: number
    release_date: number
}

type Genre = {
    name: string
    id: number
}

export const Header = () => {

    const [searchValue, setSearchValue] = useState<string>("")
    const [filteredData, setFilteredData] = useState<Movie[]>([])
    const [genre, setGenre] = useState<Genre[]>([])

    const moviesApiKey = "api_key=1f25dddf1c81350b49714e3329104a98"
    const baseUrl = "https://api.themoviedb.org/3"
    const apiUrl = baseUrl + `/search/movie?query=${searchValue}&language=en-US&page=${1}&` + moviesApiKey


    const getSearchedMovie = async () => {
        try {
            const response = await fetch(apiUrl)
            const result = await response.json()
            const movies = result.results
            setFilteredData(movies)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getSearchedMovie()
    }, [searchValue])


    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        // const filtered = 
    }
    // console.log(filteredData)

    const shouldDisplay = searchValue.length > 0 && filteredData.length > 0;

    const genreUrl = baseUrl + "/genre/movie/list?language=en&" + moviesApiKey

    const getGenre = async () => {
        try {
            const response = await fetch(genreUrl)
            const result = await response.json()
            const genre = result.genres
            setGenre(genre)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getGenre()
    }, [])

    // console.log(genre)

    return (
        <div className="bg-white dark:bg-[#09090B] w-screen sticky top-0 z-50 relative flex  justify-center">
            <div className={` relative w-full max-w-[1280px] mx-auto h-[50px] flex items-center justify-between } `}>
                <Link href="/">
                    <LogoBlue />
                </Link>

                <div className="w-[500px] h-[35px] flex gap-[10px] ">
                    <DropdownMenu >
                        <DropdownMenuTrigger className="bg-white dark:bg-[#09090B] flex gap-[5px] border justify-center items-center w-[100px] rounded-lg"><ChevronDown className="w-[15px]" /> Genre</DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[500px] h-[220px]">
                            <DropdownMenuLabel>
                                <h1>Genres</h1>
                                <p>See lists of movies by genre</p>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex flex-wrap">
                                {
                                    genre.map((genre) => (
                                        <div key={genre.id}>
                                            <Button className="h-[20px] ">
                                                {genre.name}
                                                <ChevronRight className="w-[10px] " />
                                            </Button>

                                        </div>
                                    ))
                                }
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="flex w-full sm:w-[300px] items-center gap-[10px] border rounded-lg pl-[10px] pr-[10px]">
                        <SearchIcon />
                        <input onChange={handleSearchChange} className="w-[100%] bg-white dark:bg-[#09090B]" placeholder="search" type="text" />
                    </div>
                    {shouldDisplay && (
                        <div className=" rounded-lg pt-[10px] pl-[10px] absolute mt-[50px] z-30 flex flex-col w-[600px] h-[] border  bg-white">
                            {filteredData.slice(0, 5).map((movie) => (

                                <div key={movie.id} className="flex gap-[10px] border-b-2 py-[10px]">
                                    <img
                                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                        alt={movie.title}
                                        className="w-[80px] h-[100px] h-auto object-cover rounded-lg"
                                    />
                                    <div>
                                        <p className="font-extrabold">{movie.title}</p>
                                        <div className="flex items-center gap-[5px]">
                                            <ImbdStar />
                                            <div className="">
                                                <span className="font-semibold">{movie.vote_average}</span>
                                                <span className="text-[12px]">/10</span>
                                            </div>
                                        </div>
                                        <p className="text-[14px] font-semibold">{movie.release_date}</p>
                                    </div>
                                </div>
                            ))}
                            <p className="my-[20px]">See all result for "{searchValue}"</p>
                        </div>
                    )}
                </div>

                <ModeToggle />
            </div>

        </div>
    )
}