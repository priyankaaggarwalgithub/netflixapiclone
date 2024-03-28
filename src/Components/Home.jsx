import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

const Card = ({ img, title }) => {
  return (
    <div>
      <img className="card" src={img} alt="NA" />
      <h4
        style={{ color: "#d6171e", fontSize: "smaller", textAlign: "center" }}
      >
        {title}
      </h4>
    </div>
  );
};
const apikey = "4ae7a37cc3c13b531b62b1cc03868ced";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";
const upcoming = "upcoming";
const nowplaying = "now_playing";
const popular = "popular";
const toprated = "top_rated";

const Row = ({ title, arr = [] }) => {
  return (
    <div className="row">
      <h2>{title}</h2>
      <div>
        {arr.map((item, index) => (
          <Card
            key={index}
            img={`${imgUrl}/${item.poster_path}`}
            title={item.title}
          />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const [upComingMovies, setUpcomingMovies] = useState([]);
  const [nowplayingMovies, setnowplayingMovies] = useState([]);
  const [popularMovies, setpopularMovies] = useState([]);
  const [topratedMovies, settopratedMovies] = useState([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const data = await axios.get(
        `${url}/movie/${upcoming}?api_key=${apikey}&page=2`
      );
      setUpcomingMovies(data.results);
    };
    const fetchNowPlaying = async () => {
      const {
        data: { results },
      } = await axios.get(
        `${url}/movie/${nowplaying}?api_key=${apikey}&page=4`
      );
      setnowplayingMovies(results);
    };
    const fetchPopular = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${popular}?api_key=${apikey}&page=6`);
      setpopularMovies(results);
    };
    const fetchToprated = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${toprated}?api_key=${apikey}`);
      settopratedMovies(results);
    };
    fetchUpcoming();
    fetchNowPlaying();
    fetchPopular();
    fetchToprated();
  }, []);

  return (
    <section className="home">
      <div
        className="banner"
        style={{
          backgroundImage: popularMovies[0]
            ? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})`
            : "rgb(16, 16, 16)",
        }}
      >
        {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
        {popularMovies[0] && <p>{popularMovies[0].overview}</p>}

        <div>
          <button>
            <BiPlay /> Play{" "}
          </button>
          <button>
            My List <AiOutlinePlus />{" "}
          </button>
        </div>
      </div>
      <Row title={"Upcoming Movies"} arr={upComingMovies} />
      <Row title={"Now Playing Movies"} arr={nowplayingMovies} />
      <Row title={"Popular Movies"} arr={popularMovies} />
      <Row title={"Top Rated Movies"} arr={topratedMovies} />
    </section>
  );
};

export default Home;
