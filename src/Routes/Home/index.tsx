import { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/home.css";
import { Link } from "react-router-dom";

import { register } from "swiper/element/bundle";

register();

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface modelFilmes {
  id: number;
  title: string;
  poster_path: string;
}

function Home() {
  const [filmes, setFilmes] = useState<Array<modelFilmes>>([]);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("/movie/now_playing", {
        params: {
          api_key: "f9c58a93d70fa8f301b9bbbd836ef8d4",
          language: "pt-BR",
          page: 1,
        },
      });

      setFilmes(response.data.results.slice(0, 10));
    }

    loadFilmes();
  }, []);

  return (
    <div className="container">
      <Swiper
        slidesPerView={5}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        className="listMovies"
      >
        {filmes.map((filme) => {
          return (
            <SwiperSlide key={filme.id}>
              <article>
                <strong>{filme.title}</strong>
                <img
                  src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                ></img>
                <Link to={`filme/${filme.id}`}>Acessar</Link>
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Home;
