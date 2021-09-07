import React, { useEffect, useState } from 'react';
import { useFetch } from '../useFetch';
import Header from './Header';
import '../../styles/movieList.scss'

export default function MovieList(props) {

  const [genreArray, setGenreArray]  = useState([])
  const [yearArray, setYearArray] = useState([])
  const [movieArray, setMovieArray] = useState([])
  const [searchMovie, setSearchMovie] = useState('')
  const [genre, setGenre] =useState([])
  const [year, setYear] = useState([])

  const [sortedArray, setSortedArray] = useState([])
  const [radioCheck, setRadioCheck] = useState(false)

  const [responseData] = useFetch()

  useEffect(()=>{
    if(responseData !== []){
      getSeparateArray()
    }
  },[responseData])

  getSeparateArray=()=>{
    let tempGenre = []
    let tempYear = []
    let tempMovie = []
    for(let i=0; i<responseData.length; i++){
      let subGenre = responseData[i].genre
      if(!tempYear.includes(responseData[i].year)){
        tempYear.push(responseData[i].year)
      }
      if(!tempMovie.includes(responseData[i].title)){
        tempMovie.push((responseData[i].title).charAt(0).toUpperCase() + (responseData[i].title).slice(1))
      }

      for(let j=0; j<subGenre.length; j++){
        let genre = (subGenre[j].charAt(0)).toUpperCase() + (subGenre[j]).slice(1) 
        if(!tempGenre.includes(genre)){
          tempGenre.push( genre )
        }
      }
    }
    setYearArray([...tempYear].sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0)))
    setGenreArray([...tempGenre].sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0)))
    setMovieArray([...tempMovie].sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0)))
    setSortedArray( [...responseData].sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)))
  }

  filterArray=(type, mode, Search, condition)=>{
    let tempArray = []
    let CompareArray = (radioCheck && condition !== 'main')? sortedArray : responseData
    if(typeof(Search) === 'string'){
      for(let i=0; i< CompareArray.length; i++){
        if( mode !== 'complete' && (CompareArray[i][type]).toLowerCase().includes(Search.toLowerCase()) && !tempArray.includes(Search.toLowerCase())){
          tempArray.push(CompareArray[i][type])
        } else {
          if((CompareArray[i][type]).includes(Search.toLowerCase()) && !tempArray.includes(Search.toLowerCase())){
            tempArray.push(CompareArray[i])
          }
        }
      }
    } else{
      let sortArray = (type === 'genre')? genre: year
      for(let i=0; i<CompareArray.length; i++){
        for(let j=0; j<sortArray.length;j++){
          if((CompareArray[i][type]).includes(sortArray[j]) && !tempArray.includes(sortArray[j])){
            tempArray.push(CompareArray[i])
            break;
          }
        }
      }

    }
   setSortedArray(()=> tempArray)
  }

  toUpdateFilter = (event, type, index) =>{
    let array = []
    if(type === 'genre'){
      let compare = genreArray[index].toLowerCase()
      if(genre.includes(compare)){
        let position = genre.indexOf(compare)
        genre.splice(position,1)
        filterArray('genre', 'complete',genre)

      } else{
        array = genre
        setGenre([...genre,compare])
        array.push(compare)
        filterArray('genre', 'complete',array)
      }

    } else if(type === 'year'){
      let compare = yearArray[index].toLowerCase()
      if(year.includes(compare)){
        let position = year.indexOf(compare)
        year.splice(position,1)
        filterArray('year', 'complete',year)

      } else{
        setYear([...year,compare])
        array = year
        array.push(compare)
        filterArray('year', 'complete',array)
      }

    } else if(type === 'type') {
      filterArray(type, "complete", index, 'main')
      setRadioCheck(true)
    }
    
    if(type === 'allClear'){
      getSeparateArray()
      setYear([])
      setGenre([])
      let check = document.getElementsByClassName('checkbox')
      for(let j=0; j<check.length;j++){
        check[j].checked = false
      }
      let radio = document.getElementsByClassName('radioBox')
      for (let i=0; i<radio.length; i++){
        radio[i].checked = false
      }
    }
  }

  toUpdateSearch = (event, data)=>{
    setSearchMovie(event.target.value)
    if(event.target.value === ""){
      getSeparateArray()
      return
    } else if(data !== undefined){
      setSearchMovie(data)
    }
    let completeArray = []
    let subArray = []
    for(let i=0; i< responseData.length; i++){
      if((responseData[i].title).toLowerCase().includes(searchMovie.toLowerCase()) && !subArray.includes(searchMovie.toLowerCase())){
        subArray.push(responseData[i].title)
        completeArray.push(responseData[i])
      } 
    }
    setMovieArray(subArray)
    setSortedArray(completeArray)
  }

  return(
    <div className="movie-container display-flex">
      <div class="goBack"onClick={()=>props.setExercise()}>
        Go back
      </div>
      <Header searchMovie={{searchMovie}} year={{yearArray}} genre={{genreArray}} movie={{movieArray}} toUpdateSearch= {toUpdateSearch} toUpdateFilter = {toUpdateFilter}></Header>
      {
        (sortedArray)? 
        <div className="container display-flex movie-cards">
          {
            sortedArray.map((data, i)=> {
              return(
              <div key={i} className="card-container">
                <img src={data.poster} className='imageCSS' alt={data.title} />
                <div>
                  <span>{data.title} ({data.year})</span>
                </div>
                <div>
                  <span>Genre: </span>
                  {
                    (data.genre)? data.genre.map((genre, i)=>{
                      return(
                        <span>{genre.charAt(0).toUpperCase() + genre.slice(1)}{(i+1 < data.genre.length )? ', ': '.'}</span>
                      )
                    }) :''
                  }
                </div>
              </div>)
            })
          }
        </div>: ''
      }
    </div>
  )
} 