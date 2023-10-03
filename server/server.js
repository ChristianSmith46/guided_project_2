const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const path = require('path');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'swapi';

const port = 3000;

const app = express();
app.use(cors());

app.get('/api/characters', async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('characters');
        const charactersArr = await collection.find({}).toArray();
        res.json(charactersArr);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/api/films', async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('films');
        const filmsArr = await collection.find({}).toArray();
        res.json(filmsArr);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/api/planets', async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('planets');
        const planetsArr = await collection.find({}).toArray();
        res.json(planetsArr);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/api/characters/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('characters');
        const character = await collection.findOne({ id });
        if (!character) res.json({ error: "No Character found" })
        else res.json(character);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/api/films/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('films');
        const film = await collection.findOne({ id });
        if (!film) res.json({ error: "No film found" })
        else res.json(film);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/api/planets/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('planets');
        const planet = await collection.findOne({ id });
        if (!planet) res.json({ error: "No planet found" })
        else res.json(planet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/api/films/:id/characters', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('films');
        const filmData = await collection.aggregate([
            { $match: { id } },
            {
                $lookup: {
                    from: 'films_characters',
                    localField: 'id',
                    foreignField: 'film_id',
                    as: 'characterList',
                    pipeline: [
                        {
                            $lookup: {
                                from: 'characters',
                                localField: 'character_id',
                                foreignField: 'id',
                                as: 'character'
                            }
                        },
                        {
                            $unwind: "$character"
                        }
                    ]
                }
            }
        ]).toArray();

        const characters = filmData[0]?.characterList.map((item) => {
            return item.character;
        });

        if (!characters) res.json({ error: "No characters found" })
        else res.json(characters);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/api/films/:id/planets', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('films');
        const filmData = await collection.aggregate([
            { $match: { id } },
            {
                $lookup: {
                    from: 'films_planets',
                    localField: 'id',
                    foreignField: 'film_id',
                    as: 'planetList',
                    pipeline: [
                        {
                            $lookup: {
                                from: 'planets',
                                localField: 'planet_id',
                                foreignField: 'id',
                                as: 'planet'
                            }
                        },
                        {
                            $unwind: "$planet"
                        }
                    ]
                }
            }
        ]).toArray();

        const planets = filmData[0]?.planetList.map((item) => {
            return item.planet;
        });

        if (!planets) res.json({ error: "No planets found" })
        else res.json(planets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/api/characters/:id/films', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('characters');
        const characterData = await collection.aggregate([
            { $match: { id } },
            {
                $lookup: {
                    from: 'films_characters',
                    localField: 'id',
                    foreignField: 'character_id',
                    as: 'filmList',
                    pipeline: [
                        {
                            $lookup: {
                                from: 'films',
                                localField: 'film_id',
                                foreignField: 'id',
                                as: 'film'
                            }
                        },
                        {
                            $unwind: "$film"
                        }
                    ]
                }
            }
        ]).toArray();

        const films = characterData[0]?.filmList.map((item) => {
            return item.film;
        });

        if (!films) res.json({ error: "No films found" })
        else res.json(films);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/api/planets/:id/films', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('planets');
        const planetData = await collection.aggregate([
            { $match: { id } },
            {
                $lookup: {
                    from: 'films_planets',
                    localField: 'id',
                    foreignField: 'planet_id',
                    as: 'filmList',
                    pipeline: [
                        {
                            $lookup: {
                                from: 'films',
                                localField: 'film_id',
                                foreignField: 'id',
                                as: 'film'
                            }
                        },
                        {
                            $unwind: "$film"
                        }
                    ]
                }
            }
        ]).toArray();

        const films = planetData[0]?.filmList.map((item) => {
            return item.film;
        });

        if (!films) res.json({ error: "No films found" })
        else res.json(films);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/api/planets/:id/characters', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('characters');
        const character = await collection.find({ homeworld: id }).toArray();
        if (!character) res.json({ error: "No Characters found" })
        else res.json(character);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

app.use(express.static('./public'));
app.get('*', function (req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, './public') });
});



app.listen(port, () => {
    console.log(`Listening on ${port}`)
});