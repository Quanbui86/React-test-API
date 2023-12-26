import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState(null)
  const [filmData, setFilmData] = useState(null)
  const [selectedGenreName, setSelectedGenreName] = useState('');
  const [selectedGenreId, setSelectedGenreId] = useState('');
const get = ()=>{
  fetch('https://api.datamuse.com/words?ml=ringing+in+the+ears')
  .then(res => res.json())
  .then(data => {
    console.log(data)
  })
  .catch(error => console.error('Error:', error));
} 

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODhlZmU3YTIyZmM1NWJlM2IyOTg3ZjE1ZWNmNDFlNCIsInN1YiI6IjY1NGYyNjQ0MjkzODM1NDNmNDg2MDkyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FWHK4DfBohjiYyiqykkvprCiNY1BvLDR2mbePlzhzII'
  }
};
fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
  .then(response => response.json())
  .then(response => {
    console.log(response)
    !data&&setData(response)
  })
  .catch(err => console.error(err));
let genres = [];
if(data){
  for (let i=0; i<data.genres.length; i++){
  genres.push(data.genres[i])
  }
  console.log(genres)
}
fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${selectedGenreId}`, options)
  .then(response => response.json())
  .then(response =>{ 
    console.log(response)
    !filmData&&setFilmData(response)
    })
  .catch(err => console.error(err));
  useEffect(()=>{
    setFilmData()
  },[selectedGenreId, selectedGenreName])
  /*const handleSelectChange = (event) => {
    setSelectedGenreId(event.target.value)
    const selectedGenreName = event.target.options[event.target.selectedIndex].text;
    setSelectedGenre(selectedGenreName);
  }*/
  //{isLoading?<pre>{JSON.stringify(filmData.results, null, 2)}</pre>:<p>Loading...</P>}
  const handleSelectChange = (event) => {
    const selectedGenre = genres.find(genre => genre.id === Number(event.target.value));
    setSelectedGenreId(selectedGenre.id);
    setSelectedGenreName(selectedGenre.name);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <pre>{JSON.stringify(genres, null, 2)}</pre>
        {<ul>{genres.map(genre=><li>{genre.name}</li>)}</ul>}
        <p>Select genre...</p>
        {<select onChange={handleSelectChange}>
          <option value="">Choose one...</option>
          {genres.map((genre, index)=>(
            <option key={index} value={genre.id}>
              {genre.name}
            </option>
          ))}
          </select>}
          <p>{selectedGenreId}</p>
          <p>{selectedGenreName}</p>
        {selectedGenreId&&filmData&&<pre>{JSON.stringify(filmData.results, null, 2)}</pre>}
      </header>
    </div>
  );
}

export default App;
