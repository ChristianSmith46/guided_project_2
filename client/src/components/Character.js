import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export function Character() {
    const [characters, setCharacters] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        async function getCharacters() {
            const data = await fetch('http://localhost:3000/api/characters');
            const chars = await data.json();
            setCharacters(chars);
        }
        getCharacters();
    }, []);

    return (
        <>
            <div>
                <h1>Star Wars Universe Lookup</h1>
                <label>Who you looking for? <span className="small">(Regular expressions are cool
                    here)</span></label>
                <input id="searchString" />
            </div>
            <section id="charactersList">
                {characters.map((character) => (
                    <div key={character.id}>
                        <h1 onClick={() => navigate(`/character/${character.id}`)}>{character.name}</h1>
                    </div>
                )
                )}
            </section>
        </>
    )
}