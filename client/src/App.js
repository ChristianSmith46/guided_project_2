import logo from './logo.svg';
import './App.css';
import { Router, Routes, Route } from 'react-router-dom';
import { Character } from './components/Character';
import { CharacterData } from './components/CharacterData';
import { FilmData } from './components/FilmData';
import { PlanetData } from './components/PlanetData';

function App() {
  return (
    <Routes >
      <Route path='/character/:id' element={<CharacterData />} />
      <Route path='/film/:id' element={<FilmData />} />
      <Route path='/planet/:id' element={<PlanetData />} />
      <Route path='*' element={<Character />} />
    </Routes>
  );
}

export default App;
