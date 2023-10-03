const express = require('express');

const port = 3000;

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/characters', (req, res) => {

});

app.get('/api/films', (req, res) => {
    
});

app.get('/api/planets', (req, res) => {
    
});

app.get('/api/characters/:id', (req, res) => {
    const id = req.params.id;
});

app.get('/api/films/:id', (req, res) => {
    const id = req.params.id;
    
});

app.get('/api/planets/:id', (req, res) => {
    const id = req.params.id;
    
});

app.get('/api/films/:id/characters', (req, res) => {
    const id = req.params.id;
    
});

app.get('/api/films/:id/planets', (req, res) => {
    const id = req.params.id;
    
});

app.get('/api/characters/:id/films', (req, res) => {
    const id = req.params.id;
    
});

app.get('/api/planets/:id/films', (req, res) => {
    const id = req.params.id;
    
});

app.get('/api/planets/:id/characters', (req, res) => {
    const id = req.params.id;
    
});



app.listen(port, () => {
    console.log(`Listening on ${port}`)
});