import logo from './logo.svg';
import './App.css';
import { Router, Routes, Route } from 'react-router-dom';
import { Character } from './components/Character';
import { CharacterData } from './components/CharacterData';

function App() {
  return (
    <Routes >
      <Route path='/character/:id' element={<CharacterData />} />
      <Route path='*' element={<Character />} />
    </Routes>
  );
}

export default App;
