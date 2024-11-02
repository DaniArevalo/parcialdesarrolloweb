import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllcharacters } from './service/httpRequest';
import CharacterDetail from './CharacterDetail'; // Importa el componente de detalles

function App() {
  const [character, setCharacter] = useState([]); // Almacena los datos de los personajes
  const [filter, setFilter] = useState(''); // Estado para almacenar el valor del filtro

  useEffect(() => {
    const getCharacterDataRequest = async () => {
      const characterData = await getAllcharacters();
      setCharacter(characterData);
    };
    getCharacterDataRequest();
  }, []);

  // Filtrar personajes basados en el filtro seleccionado
  const filteredCharacters = character.filter(item => {
    return (
      item.gender.toLowerCase().includes(filter.toLowerCase()) ||
      item.species.toLowerCase().includes(filter.toLowerCase()) ||
      item.status.toLowerCase().includes(filter.toLowerCase())
    );
  });

  return (
    <Router>
      <Routes>
        {/* Ruta principal que muestra la lista de personajes */}
        <Route
          path="/"
          element={
            <>
              <h1 className='text-center my-3'>Titulo</h1>

              {/* Input para filtrar */}
              <div className="text-center my-3">
                <input
                  type="text"
                  placeholder="Filtrar por género, especie o estado"
                  className="form-control w-50 mx-auto"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
              </div>

              <div className='cardContainer'>
                {filteredCharacters.map((item) => (
                  <div className="card" key={item.id}>
                    <img src={item.image} className="card-img-top" alt={item.name} />
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">Género: {item.gender}</p>
                      <p className="card-text">Especie: {item.species}</p>
                      <p className="card-text">Estado: {item.status}</p>
                      {/* Botón para navegar a otro componente */}
                      <Link to={`/character/${item.id}`} className="btn btn-primary">
                        Ver detalles
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          }
        />

        {/* Ruta para el detalle de cada personaje */}
        <Route path="/character/:id" element={<CharacterDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
