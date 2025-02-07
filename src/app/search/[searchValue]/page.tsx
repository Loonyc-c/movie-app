// import { useState,useEffect } from "react"

// import { Header } from "@/components/header"
// import { useParams } from "next/navigation"
// import { useRouter } from "next/router"
// import { useSearchParams } from "next/navigation"


// const Search = ()=>{

//        const router = useRouter()
//         const searchParams = useSearchParams()
//         const searchedValue = JSON.parse(searchParams.get('genres') || "[]")
//     // const {searchValue} = useParams()
//     // // const [searchedMovie, setSearchedMovie] = useState([])

//     // useEffect(()=>{
//     //    const getSearchedMovie = async () =>{
//     //     try{
//     //         const result = await fetchSearchedMovie(searchValue, currentPage)
//     //         setSearchedMovie(result)
//     //     } catch(error){
//     //         console.log(error)
//     //     }
//     //    }
//     //    getSearchedMovie()
//     // },[searchValue])

//     return (
//         <div>
//             <Header />
//         </div>
//     )
// }
// export default Search