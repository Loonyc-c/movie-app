'use client'

import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { fetchFilteredGenres, fetchGenres } from "@/app/utils/api"

const Genres = () => {

    const { id } = useParams()
    const [currentPage, setCurrentPage] = useState(1)
    const [genres, setGenres] = useState([])
    const [filteredGenre, setFiltereGenre] = useState([])

    const moviesApiKey = "api_key=1f25dddf1c81350b49714e3329104a98"
    const baseUrl = "https://api.themoviedb.org/3"
    const filteredApi = baseUrl + `discover/movie?language=en&with_genres=${id}&page=${currentPage}&` + moviesApiKey


    const genresApi = `${baseUrl}/genre/movie/list?language=en&${moviesApiKey}`
    console.log(genresApi)


    // fetchFiltered({ page: 1 })

    // useEffect(()=>{
    //     const getGenres = async ()=>{
    //         const response = await fetch(genresApi)
    //         const result = await response.json()
    //         const genres = result.genres
    //         setGenres(genres)

    //     }
    //     getGenres()
    // },[genresApi])

    useEffect(() => {
        const getGenres = async () => {
            const { genres } = await fetchGenres()
            setGenres(genres)
        }
        getGenres()
    }, [fetchGenres])



    // useEffect(() => {
    //     const getFilteredGenres = async () => {
    //         const response = await fetch(filteredApi)
    //         const result = await response.json()
    //         setFiltereGenre(result)
    //     }
    //     getFilteredGenres()

    // }, [filteredApi])

    useEffect(()=>{
        
const getFilteredGenres = async () =>{
    try {
        const data = await fetchFilteredGenres(currentPage, Number(id)); 
        setFiltereGenre(data);
    } catch (error) {
        console.error("Error fetching genres:", error);
    }
};
       getFilteredGenres()
    },[currentPage,id])

    // console.log(filteredGenre)



    return (
        <div className="flex flex-col items-center">
            <Header />
            <div className="w-[1280px] h-[1500px] bg-yellow-500">
                <div className="">
                    <h1 className="font-extrabold text-[30px]">Search Filter</h1>
                </div>
                <div className="w-full h-full bg-green-500 flex">
                    <div className="h-full w-[40%] bg-red-500">
                        <div>
                            <h1>Genres</h1>
                            <h4>See lists of movies by genre</h4>
                        </div>
                        <div className="w-full h-[200px] flex flex-wrap gap-[5px]">
                            {
                                genres.map((genre) => (
                                    <div key={genre.id} >
                                        <Button className="h-[20px] py-[5px] text-[12px] rounded-full">
                                            {genre.name}
                                            <ChevronRight />
                                        </Button>


                                    </div>

                                ))
                            }

                        </div>
                    </div>
                    <div className="h-full w-full bg-black"></div>
                </div>

            </div>
            <Footer />

        </div>
    )
}

export default Genres