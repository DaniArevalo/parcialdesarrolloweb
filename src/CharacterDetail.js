import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCharacterById } from './service/httpRequest'; 
import './CharacterDetail.css'; 

function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      const data = await getCharacterById(id);
      setCharacter(data);
    };
    fetchCharacter();
  }, [id]);

  if (!character) return <p className="text-center my-5">Cargando...</p>;

  return (
    <div className="container my-5">
      <div className="card mx-auto" style={{ maxWidth: '500px' }}>
        <img src={character.image} className="card-img-top" alt={character.name} />
        <div className="card-body text-center">
          <h2 className="card-title">{character.name}</h2>
          <p className="card-text"><strong>Género:</strong> {character.gender}</p>
          <p className="card-text"><strong>Especie:</strong> {character.species}</p>
          <p className="card-text"><strong>Estado:</strong> {character.status}</p>
          <a href="/" className="btn btn-primary mt-3">Volver</a>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetail;
