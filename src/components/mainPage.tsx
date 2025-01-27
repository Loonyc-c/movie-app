import { Header } from "./header"
import { PopularMovieSlider } from "./popular-movie-slider"
import { UpcomingMoviesList } from "./upcoming-movies-list"
import { PopularMovieList } from "./popular-movie-list"
import { TopRatedMovieList } from "./top-movie-list"

export const MainPage = ()=> {
     const moviesApiKey = "1f25dddf1c81350b49714e3329104a98"
     

    return (
    <div> 
        <Header />  
        <PopularMovieSlider />
        <UpcomingMoviesList />
        <PopularMovieList />
        <TopRatedMovieList />

    </div>
     
     
    )
}