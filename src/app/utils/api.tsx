'use client'
import { default as axios } from 'axios';
import { useEffect } from 'react';

const apiKey = "api_key=1f25dddf1c81350b49714e3329104a98"
const moviesApi = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    // apiKey: "api_key=1f25dddf1c81350b49714e3329104a98"
})

export const fetchUpcomingMovies = async (currentPage: number) => {
    try {
        const response = await moviesApi.get(`/movie/upcoming?language=en-US&page=${currentPage}&${apiKey}`)
        return (response.data)
    } catch (error) {
        console.log(error)
    }
}

export const fetchPopularMovies = async (currentPage: number) => {
    try {
        const response = await moviesApi.get(`/movie/popular?language=en-US&page=${currentPage}&${apiKey}`)
        return (response.data)
    } catch (error) {
        console.log(error)
    }
}

export const fetchTopRatedMovies = async (currentPage: number) => {
    try {
        const response = await moviesApi.get(`/movie/top_rated?language=en-US&page=${currentPage}&${apiKey}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const fetchDetailedMovie = async (id: string) => {
    try {
        const response = await moviesApi.get(`/movie/${id}?language=en-US&${apiKey}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const fetchMovieCredit = async (id: string) => {
    try {
        const response = await moviesApi.get(`/movie/${id}/credits?language=en-US&${apiKey}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
export const fetchSimilarMovie = async (id:string) => {
    try {
        const response = await moviesApi.get(`/movie/${id}/similar?language=en-US&page=1&${apiKey}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
export const fetchMovieTrailer = async (id:string) =>{
    try{
        const response = await moviesApi.get(`/movie/${id}/videos?language=en-US&${apiKey}`)
        return response.data
    }catch(error){
        console.log(Error)
    }
}
export const fetchGenres = async () => {
    try {
        const response = await moviesApi.get(`/genre/movie/list?language=en&${apiKey}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const fetchFilteredGenres = async (id:string, currentPage:number)=>{
    try{
        const response = await moviesApi.get(`/discover/movie?language=en&with_genres=${id}&page=${currentPage}&${apiKey}`)
        return response.data
    }catch(error){
        console.log(error)
    }
}

export const fetchSearchedMovie = async (searchValue:string,currentPage:number) =>{
    try{
        const response = await moviesApi.get(`/search/movie?query=${searchValue}&language=en-US&page=${currentPage}&${apiKey}`)
        return response.data
    } catch(error){
        console.log(error)
    }
}