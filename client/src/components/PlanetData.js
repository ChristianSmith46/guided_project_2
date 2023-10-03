import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

export function PlanetData() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [planetData, setPlanetData] = useState({});
    const [films, setFilms] = useState([]);
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        async function getPlanetData() {
            const data = await fetch(`http://localhost:3000/api/planets/${id}`);
            const planet = await data.json();
            setPlanetData(planet);
        }
        async function getFilms() {
            const data = await fetch(`http://localhost:3000/api/planets/${id}/films`);
            const filmList = await data.json();
            setFilms(filmList);
        }
        async function getCharacters() {
            const data = await fetch(`http://localhost:3000/api/planets/${id}/characters`);
            const characterList = await data.json();
            setCharacters(characterList);
        }
        getPlanetData();
        getFilms();
        getCharacters();
    }, [id]);
    return (
        <>
            <h1 id="name">{planetData.name}</h1>
            <section id="generalInfo">
                <p>Terrain: {planetData.terrain}</p>
                <p>Population: {planetData.population}</p>
            </section>
            <section id="characters">
                <h2>Characters</h2>
                <ul>{characters.map((character) => (
                    <li key={character.id} onClick={() => navigate(`/character/${character.id}`)}>
                        {character.name}
                    </li>
                ))}</ul>
            </section>
            <section id="films">
                <h2>Films appeared in</h2>
                <ul>{films.map((film) => (
                    <li key={film.id} onClick={() => navigate(`/film/${film.id}`)}>
                        {film.title}
                    </li>
                ))}</ul>
            </section>
        </>
    )
}