import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCharacterById } from './service/httpRequest';

function CharacterDetail() {
  const { id } = useParams();
  const [drink, setDrink] = useState(null);

  useEffect(() => {
    const fetchDrinkDetail = async () => {
      const drinkData = await getCharacterById(id);
      setDrink(drinkData);
    };
    fetchDrinkDetail();
  }, [id]);

  if (!drink) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h2>{drink.strDrink}</h2>
      <img src={drink.strDrinkThumb} alt={drink.strDrink} className="img-fluid" />
      <p><strong>Categoría:</strong> {drink.strCategory}</p>
      <p><strong>Tipo de Vaso:</strong> {drink.strGlass}</p>
      <p><strong>Instrucciones:</strong> {drink.strInstructions}</p>
    </div>
  );
}

export default CharacterDetail;
