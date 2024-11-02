import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllCharacters } from './service/httpRequest';
import CharacterDetail from './CharacterDetail'; // Importa el componente de detalles

function App() {
  const [drinks, setDrinks] = useState([]); // Almacena los datos de las bebidas
  const [filter, setFilter] = useState(''); // Estado para almacenar el valor del filtro

  useEffect(() => {
    const getCharacterDataRequest = async () => {
      const drinksData = await getAllCharacters();
      setDrinks(drinksData);
    };
    getCharacterDataRequest();
  }, []);

  // Filtrar bebidas basadas en el nombre
  const filteredDrinks = drinks.filter(item => 
    item.strDrink.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Router>
      <Routes>
        {/* Ruta principal que muestra la lista de bebidas */}
        <Route
          path="/"
          element={
            <>
              <h1 className='text-center my-3'>Lista de Bebidas</h1>

              {/* Input para filtrar */}
              <div className="text-center my-3">
                <input
                  type="text"
                  placeholder="Filtrar por nombre de bebida"
                  className="form-control w-50 mx-auto"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
              </div>

              <div className='cardContainer'>
                {filteredDrinks.map((item) => (
                  <div className="card" key={item.idDrink}>
                    <img src={item.strDrinkThumb} className="card-img-top" alt={item.strDrink} />
                    <div className="card-body">
                      <h5 className="card-title">{item.strDrink}</h5>
                      {/* Botón para navegar a otro componente */}
                      <Link to={`/character/${item.idDrink}`} className="btn btn-primary">
                        Ver detalles
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          }
        />

        {/* Ruta para el detalle de cada bebida */}
        <Route path="/character/:id" element={<CharacterDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
