import { useState,useEffect } from 'react'

function App() {
  const [searchTerm,setSearchTerm] = useState("");
  const[movies,setMovies] = useState([])
  const[loading,setLoading]= useState(true)

const API_URL = "http://www.omdbapi.com/?apikey=28437600";

async function searchMovie(title) {
  setLoading(true);
  const response = await fetch(`${API_URL}&s=${title}`);
  const data = await response.json();
  setLoading(false);
  setMovies(data.Search || []);

}

  useEffect(()=>{
    searchMovie("")
  },[])

  return(
    <div>
      <input value={searchTerm} onChange={function(e){
        setSearchTerm(e.target.value)
      }} type='text' placeholder='Enter movie name.'></input>
      
      <button onClick={() => searchMovie(searchTerm)}>Enter</button>

        <div>
      {!searchTerm ? <h3>Enter a movie name!!!</h3>: null}


        {loading ? (
          <p>Loading...</p>
        ) : movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.imdbID} data={movie} />
          ))
        ) : (
          <p>No movies found</p>
        )}

      </div>

    </div>


  )
}

function MovieCard({data}){
  const [details,setDetails] = useState(null)

  useEffect(()=>{
      async function fetchDetails(){
      const response = await fetch(`http://www.omdbapi.com/?apikey=28437600&i=${data.imdbID}`)
      const detailedData = await response.json()
      setDetails(detailedData)
      }

      fetchDetails();
      
    },[data.imdbID])


  return(
    <div style={{backgroundColor:"Yellow",borderRadius:20,width:400,padding:8,margin:10}}>
      <h3>{data.Title}</h3>
      
       {details ? (
        <>
          <p><strong>Actors:</strong> {details.Actors}</p>
          <p><strong>Released:</strong> {details.Released}</p>
        </>
      ) : (
        <p>Loading details...</p>
      )}
      
    </div>
  )

}



export default App
