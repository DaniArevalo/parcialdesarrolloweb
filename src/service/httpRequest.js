import axios from "axios";

const url = 'https://rickandmortyapi.com/api/character' 

export const getAllcharacters = async () => {
    const response = await axios.get(url)
    return response.data.results
}

export const getCharacterById = async (id)=> {
    const response = await axios.get (`${url}/${id}`)
    return response.data
}