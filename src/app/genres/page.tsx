"use client";

import { useParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { fetchFilteredGenres, fetchGenres } from "@/app/utils/api";
import { useRouter } from "next/navigation";
import ImbdStar from "@/components/icons/imbd-star";
import PaginationComponent from "@/components/pagination";

type Id = {
  id: string;
};
type Genres = {
  id: number;
  name: string;
};
type Movie = {
  title: string;
  original_title: string;
  vote_average: number;
  poster_path: string;
  id: number;
};

const Genres = () => {
  const { id } = useParams<Id>();
  const [currentPage, setCurrentPage] = useState(1);
  const [genres, setGenres] = useState<Genres[]>([]);
  const [filteredGenre, setFilteredGenre] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch genres on mount
  useEffect(() => {
    const getGenres = async () => {
      const { genres } = await fetchGenres();
      setGenres(genres);
    };
    getGenres();
  }, []);

  // Handle updating search params (client-side)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const genreParam = urlParams.get("genres");
    if (genreParam) {
      setSelectedGenre(JSON.parse(genreParam));
    }
    setLoading(false);
  }, []);

  // Fetch filtered genres based on selected genre and current page
  useEffect(() => {
    const getFilteredGenres = async () => {
      try {
        // Convert selectedGenre array to a comma-separated string
        const genreIds = selectedGenre.join(",");
        const result = await fetchFilteredGenres(genreIds, currentPage);
        setFilteredGenre(result.results);
        setTotalPages(result.total_pages);
      } catch (error) {
        console.error(error);
      }
    };

    if (!loading) {
      getFilteredGenres();
    }
  }, [selectedGenre, currentPage, loading]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleUpdateParams = (g: number) => {
    const updatedGenres = new Set(selectedGenre);
    if (updatedGenres.has(g)) {
      updatedGenres.delete(g); // Remove if exists
    } else {
      updatedGenres.add(g); // Add if not exists
    }

    setSelectedGenre([...updatedGenres]);

    const newParams = new URLSearchParams(window.location.search);
    newParams.set("page", String(currentPage));

    // Convert updatedGenres array to JSON string
    if (updatedGenres.size > 0) {
      newParams.set("genres", JSON.stringify([...updatedGenres]));
    } else {
      newParams.delete("genres");
    }

    router.push(`?${newParams.toString()}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-[30px] items-center">
      <Header />
      <div className="max-w-screen-xl h-full lg:flex px-[20px] ">
        <div className="lg:w-[30%] w-full h-auto lg:border-r-2 ">
          <h1 className="font-extrabold text-[30px]">Search Filter</h1>
          <div className=" pr-[20px] lg:sticky lg:top-[120px] flex flex-col gap-[20px]">
            <div>
              <h1 className="text-[26px] font-extrabold">Genres</h1>
              <h4>See lists of movies by genre</h4>
            </div>
            <div className="lg:h-[200px] mb-[30px] flex flex-wrap gap-[10px] ">
              {genres.map((genre) => {
                const isSelected = selectedGenre.includes(genre.id);
                return (
                  <div
                    key={genre.id}
                    onClick={() => handleUpdateParams(genre.id)}
                  >
                    <Button
                      className={`h-[20px] py-[5px] text-[12px] border rounded-full 
                      ${
                        isSelected
                          ? "bg-black text-white"
                          : "bg-white text-black dark:bg-[#09090B] dark:text-white"
                      }`}
                    >
                      {genre.name}
                      <ChevronRight />
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="h-full w-full lg:w-[70%] lg:pl-[30px] gap-[20px] justify-between grid xss:grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-3 xl:grid-cols-4">
          {filteredGenre.map((movie) => (
            <div
              key={movie.id}
              className="w-full h-auto group relative cursor-pointer rounded-lg overflow-hidden "
            >
              <div className="relative">
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
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

                <h4>{movie.original_title} </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />

      <Footer />
    </div>
  );
};

export default Genres;
