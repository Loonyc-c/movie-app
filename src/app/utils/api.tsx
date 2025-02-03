'use client'
import { default as axios } from 'axios';
import { useEffect } from 'react';

const apiKey = "api_key=1f25dddf1c81350b49714e3329104a98"
const moviesApi = axios.create({
    baseURL: "https://api.themoviedb.org/3",
})

export const fetchUpcomingMovies = async () => {
    try{
        const response = await moviesApi.get(`/movie/upcoming?language=en-US&page=1&${apiKey}`)
        return(response.data)
    } catch (error){
        console.log(error)
    }
}

export const fetchPopularMovies = async () => {
    try {
        const response = await moviesApi.get(`/movie/popular?language=en-US&page=1&${apiKey}`)
        return (response.data)
    } catch(error) {
        console.log(error)
    }
}

export const fetchTopRatedMovies = async () => {
    try {
        const response = await moviesApi.get(`/movie/top_rated?language=en-US&page=1&${apiKey}`)
        return response.data
    } catch(error) {
        console.log(error)
    }
}

export const fetchGenres = async () =>{
    try{
        const response = await moviesApi.get(`/genre/movie/list?language=en&${apiKey}`)
        return response.data
    } catch(error){
        console.log(error)
    }
}