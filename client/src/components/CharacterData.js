import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function CharacterData() {
    const [charData, setCharData] = useState({});
    const { id } = useParams();

    useEffect(() => {
        async function getCharData() {
            const data = await fetch(`http://localhost:3000/api/characters/${id}`);
            const char = await data.json();
            setCharData(char);
        }
        getCharData();
    }, [])



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
                <p><span id="homeworld"></span></p>
            </section>
            <section id="films">
                <h2>Films appeared in</h2>
                <ul></ul>
            </section>
        </>
    )
}