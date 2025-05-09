"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import BigStar from "@/components/icons/big-star";
import ImbdStar from "@/components/icons/imbd-star";
import Link from "next/link";
import PlayIcon from "@/components/icons/play-icon";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import ReactPlayer from "react-player/youtube";
import { fetchDetailedMovie } from "@/app/utils/api";
import { fetchMovieCredit } from "@/app/utils/api";
import { fetchSimilarMovie } from "@/app/utils/api";
import { fetchMovieTrailer } from "@/app/utils/api";
import { ArrowRight } from "lucide-react";

type Movie = {
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  original_title: string;
  release_date: number;
  genres: Genre[];
  overview: string;
  cast: string;
  id: number;
};

type Genre = {
  id: number;
  name: string;
};

type SimilarMovie = {
  id: number;
  poster_path: string;
  original_title: string;
  vote_average: number;
};

type Cast = {
  id: string;
  name: string;
};

type Crew = {
  adult: boolean;
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
};

type Credit = {
  cast: Cast[];
  crew: Crew[];
  id: number;
};

type MovieTrailer = {
  id: string;
  key: string;
};

type Id = {
  id: string;
};

const Detailed = () => {
  const [movie, setMovie] = useState<Movie>({} as Movie);
  const [credit, setCredit] = useState<Credit>({} as Credit);
  const [similarMovies, setSimilarMovies] = useState<SimilarMovie[]>([]);
  const [movieTrailer, setMovieTrailer] = useState<MovieTrailer>(
    {} as MovieTrailer
  );
  const { id } = useParams<Id>();

  useEffect(() => {
    const getDetailedMovie = async () => {
      try {
        const result = await fetchDetailedMovie(id as string);
        setMovie(result);
      } catch (error) {
        console.log(error);
      }
    };
    getDetailedMovie();
  }, [id]);

  useEffect(() => {
    const getMovieCredit = async () => {
      try {
        const response = await fetchMovieCredit(id as string);
        setCredit(response);
      } catch (error) {
        console.log(error);
      }
    };
    getMovieCredit();
  }, [id]);

  console.log();

  const director =
    credit?.crew?.find((member: Crew) => member.job === "Director")?.name || "";
  const writer =
    credit?.crew?.find((member: Crew) => member.job === "Writer")?.name || "";

  // console.log(movie)

  useEffect(() => {
    const getSimilarMovie = async () => {
      try {
        const response = await fetchSimilarMovie(id as string);
        setSimilarMovies(response.results);
      } catch (error) {
        console.log(error);
      }
    };
    getSimilarMovie();
  }, [id]);

  useEffect(() => {
    const getMovieTrailer = async () => {
      try {
        const result = await fetchMovieTrailer(id);
        setMovieTrailer(
          result.results.find(
            (video: any) => video.type === "Trailer" && video.site === "YouTube"
          )
        );
      } catch (error) {
        console.log(error);
      }
    };
    getMovieTrailer();
  }, [id]);

  console.log(similarMovies);

  return (
    <div className="flex flex-col gap-[30px]">
      <div className="w-full h-full flex flex-col gap-[30px] items-center justify-center">
        <Header />
        <div className="max-w-screen-lg mx-auto flex flex-col gap-[30px]">
          <div className="flex flex-col justify-between">
            <div className="flex justify-between">
              <div>
                <h1 className="font-extrabold text-[30px]">
                  {movie.original_title}
                </h1>
                <p> {movie.release_date}</p>
              </div>
              <div>
                <p className="text-[12px]">rating</p>
                <div className="flex items-center gap-[5px]">
                  <BigStar />
                  <div>
                    <div className="flex ">
                      <p className="text-[16px]">{movie.vote_average}</p>
                      <p className="text-[14px] text-gray-500">/10</p>
                    </div>

                    <p className="text-[12px] text-gray-500">
                      {movie.vote_count}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-[30px] w-full h-auto  lg:h-[400px]">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                className=" hidden lg:block"
              />
              <div className="relative w-[70%] h-full">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  className=" "
                />
                <div className="absolute inset-0 bg-black/40 p-[20px] flex items-end">
                  <div className="text-white flex items-center gap-[10px] ">
                    <Dialog>
                      <div className="flex gap-[20px]">
                        <DialogTrigger className="w-[40px] h-[40px] flex justify-center items-center bg-white rounded-full">
                          <PlayIcon />
                        </DialogTrigger>
                        <DialogTrigger>
                          <p>Play trailer</p>
                        </DialogTrigger>
                      </div>

                      <DialogContent className="w-[500px]">
                        {
                          <div
                            key={movieTrailer?.id}
                            className="w-full h-[400px]"
                          >
                            <ReactPlayer
                              url={`https://www.youtube.com/watch?v=${movieTrailer?.key}`}
                              width="100%"
                              height="100%"
                            />
                          </div>
                        }
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full h-auto flex-col gap-[20px]">
            <div className="flex gap-[20px]">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                className="w-[100px] h-full object-cover lg:hidden"
              />
              <div className="w-full h-auto">
                <div className="flex gap-[10px] mb-[20px]">
                  {" "}
                  {movie.genres?.map((genre) => (
                    <Button
                      className="h-[20px] text-[12px] rounded-xl"
                      key={genre.id}
                    >
                      {genre.name}
                    </Button>
                  ))}
                </div>
                <div className="w-full h-auto">
                  <p className="text-base"> {movie.overview}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[0px]">
              <div className="flex gap-[20px] border-b-2 py-[10px]">
                <h4 className="font-extrabold">Director</h4>
                <span>{director}</span>
              </div>
              <div className="flex gap-[20px] border-b-2 py-[10px]">
                <h4 className="font-extrabold">Writers</h4>
                <span>{writer}</span>
              </div>
              <div className="flex gap-[20px] border-b-2 py-[10px]">
                <h4 className="font-extrabold">Stars</h4>
                <div className="flex gap-[10px]">
                  {credit?.cast?.slice(0, 5).map((cast) => (
                    <p key={cast.id}> {cast.name} </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col  gap-[20px] ">
            <div className="flex justify-between">
              <div className="w-[200px] h-auto">
                <h1 className="font-extrabold text-[30px]">More like this</h1>
              </div>
              <Link key={movie.id} href={`/category/${movie.id}/similar`}>
                <Button>See more</Button>
              </Link>
            </div>
            <div className=" justify-between grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-5 sm:grid-cols-4 xs:grid-cols-3 xss:grid-cols-2">
              {similarMovies.length > 0 &&
                similarMovies.slice(0, 5).map((movie) => (
                  <Link key={movie.id} href={`/detail/${movie.id}`}>
                    <div
                      key={movie.id}
                      className="group relative cursor-pointer rounded-lg overflow-hidden w-[150px] lg:w-[195px]  "
                    >
                      <div className="relative">
                        <img
                          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                          className="h-[300px]"
                        />
                        <div className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                      </div>
                      <div className="bg-[#f6f6f6] dark:bg-[#313131] px-[10px] py-[5px]  h-[90px] overflow-hidden">
                        <div className="flex items-center gap-[5px]">
                          <ImbdStar />
                          <div className="flex items-center">
                            <p>{movie.vote_average}</p>
                            <p className="text-[14px] text-gray-500">/10</p>
                          </div>
                        </div>
                        <h4>{movie.original_title}</h4>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
            {similarMovies.length === 0 && (
              <div className="w-full h-[200px] flex flex-col justify-center items-center gap-[10px]">
                <h1 className="text-[20px] font-medium">
                  No exact matches, but explore similar ones based on what you
                  love!{" "}
                </h1>
                <Link href={`/genres`}>
                  <button className="border flex items-center justify-center rounded-full px-[15px] py-[5px] bg-black dark:bg-white text-white dark:text-black">
                    <h1 className="text-[16px] font-medium">find more</h1>
                    <ArrowRight className="w-[20px] h-[15px]" />
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Detailed;
