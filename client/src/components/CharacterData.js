import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function CharacterData() {
    const [charData, setCharData] = useState({});
    const [planetData, setPlanetData] = useState({});
    const [films, setFilms] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        async function getCharData() {
            const data = await fetch(`http://localhost:3000/api/characters/${id}`);
            const char = await data.json();
            setCharData(char);
        }
        async function getPlanets() {
            const data = await fetch(`http://localhost:3000/api/characters/${id}/planets`);
            const planets = await data.json();
            setPlanetData(planets);
        }
        async function getFilms() {
            const data = await fetch(`http://localhost:3000/api/characters/${id}/films`);
            const films = await data.json();
            setFilms(films);
        }
        getCharData();
        getFilms();
    }, []);

    useEffect(() => {
        async function getWorld(worldId) {
            const data = await fetch(`http://localhost:3000/api/planets/${worldId}`);
            const worldData = await data.json();
            setPlanetData(worldData);
        }
        if (charData?.homeworld) {
            getWorld(charData.homeworld);
        }
    }, [charData]);



    return (
        <>
            <h1 id="name">{charData.name}</h1>
            <section id="generalInfo">
                <p>Height: <span id="height"></span>{charData.height} cm</p>
                <p>Mass: <span id="mass"></span>{charData.mass} kg</p>
                <p>Born: <span id="birth_year">{charData.birth_year}</span></p>
            </section>
            <section id="planets">
                <h2>Homeworld</h2>
                <p>{planetData.name}</p>
            </section>
            <section id="films">
                <h2>Films appeared in</h2>
                <ul>{films.map((film) => (
                    <li key={film.id}>
                        {film.title}
                    </li>
                ))
                }</ul>
            </section>
        </>
    )
}