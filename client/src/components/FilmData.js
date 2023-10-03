import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

export function FilmData() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [filmData, setFilmData] = useState({});
    const [characters, setCharacters] = useState([]);
    const [planets, setPlanets] = useState([]);

    useEffect(() => {
        async function getFilmData() {
            const data = await fetch(`http://localhost:3000/api/films/${id}`);
            const film = await data.json();
            setFilmData(film);
        }
        async function getCharacters() {
            const data = await fetch(`http://localhost:3000/api/films/${id}/characters`);
            const characterList = await data.json();
            setCharacters(characterList);
        }
        async function getPlanets() {
            const data = await fetch(`http://localhost:3000/api/films/${id}/planets`);
            const planetList = await data.json();
            setPlanets(planetList);
        }
        getFilmData();
        getCharacters();
        getPlanets();

    }, [id]);
    return (
        <>
            <h1 id="film">{filmData.title}</h1>
            <div id="generalInfo">
                <p>{filmData.opening_crawl}</p>
                <p>Director: {filmData.director}</p>
                <p>Release Date: {filmData.release_date}</p>
            </div>
            <section id="characters">
                <h2>Characters in film</h2>
                <ul>{characters.map((character) => (
                    <li key={character.id} onClick={() => navigate(`/character/${character.id}`)}>
                        {character.name}
                    </li>
                ))}</ul>
            </section>
            <section id="planets">
                <h2>Planets in film</h2>
                <ul>{planets.map((planet) => (
                    <li key={planet.id} onClick={() => navigate(`/planet/${planet.id}`)}>
                        {planet.name}
                    </li>
                ))}</ul>
            </section>
        </>
    )
}