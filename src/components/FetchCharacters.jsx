const url = 'https://rickandmortyapi.com/api/character';

const FetchCharacters = async() =>{
    let response = await fetch(url,{mode:'cors'});
    const data = await response.json();
    const objArray = data.results.map((character) => ({
        id: character.id,
        name: character.name,
        image: character.image
      }));
      return objArray;
}

export default FetchCharacters;
