import axios from "axios";

// URL para obtener la lista de bebidas
const url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink';

export const getAllCharacters = async () => {
  try {
    const response = await axios.get(url);
    console.log(response.data); // Para confirmar que los datos se obtienen correctamente
    return response.data.drinks; // Retorna la lista de bebidas
  } catch (error) {
    console.error("Error fetching drinks:", error);
    return [];
  }
};

export const getCharacterById = async (id) => {
  try {
    const detailUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await axios.get(detailUrl);
    console.log(response.data); // Para confirmar que el detalle se obtiene correctamente
    return response.data.drinks[0]; // Retorna el detalle de la bebida
  } catch (error) {
    console.error("Error fetching drink details:", error);
    return null;
  }
};

