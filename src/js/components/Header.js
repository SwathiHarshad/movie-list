import React, { useEffect, useState } from 'react'

export default function Header(props){
  let genre = props.genre.genreArray
  let year = props.year.yearArray
  let movie = props.movie.movieArray
  let toUpdateFilter = props.toUpdateFilter
  let toUpdateSearch = props.toUpdateSearch


  useEffect(()=>{
    const listener=(event)=>{
      let element = document.getElementsByClassName('options')
      if(!event.target.parentElement.className.includes('options') && !event.target.parentElement.className.includes('choice')){
        for(let i=0; i<element.length; i++){
          element[i].className = 'options hide'
          element[i].previousElementSibling.className = 'triangle hide'
        }
      }
      
    }

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
    
  })

  toggle=(event)=>{
    let className = event.currentTarget.lastElementChild.className
    if(!event.target.parentElement.className.includes('options') && !event.target.parentElement.className.includes('choice') ){

      if(className.includes('hide')){
        event.currentTarget.lastElementChild.previousElementSibling.className = 'triangle'
        event.currentTarget.lastElementChild.className = 'options'
      } else {
        event.currentTarget.lastElementChild.previousElementSibling.className = 'triangle hide'
        event.currentTarget.lastElementChild.className = 'options hide'
      }
    }
  }

  return(
    <div className="container position-relative">
      <div className="display-flex left-filter">
        <div className="position-relative filter-container" onClick={(e)=>toggle(e)}>
          <div className="input-btn" >Genre</div>

          <span className="triangle hide"></span>

          <div className='option hide'>
            {(genre)? genre.map((data, i)=>(
            <div key={i+''} className="choice"  >
              <input type="checkbox" onClick={(e)=>toUpdateFilter(e, "genre", i)} className="checkbox" id={data} name="filter" value={data}/><label htmlFor={data}>{data}</label>
            </div>)) : ''}
          </div>
        </div>
        <div className="position-relative filter-container" onClick={(e)=>toggle(e)}>
          <div className="input-btn">Year</div>
          <span className="triangle hide"></span>

          <div className='option hide'>
            {(year)? year.map((data, i)=>(
            <div key={i} className="choice" >
              <input type="checkbox" onClick={(e)=>toUpdateFilter(e, "year", i)} className="checkbox" id={data} name="filter" value={data}/><label htmlFor={data}>{data}</label>

            </div>)) : ''}
          </div>
        </div>
      </div>
      <div className="display-flex left-filter" >
        <div className="radio" onClick={(e)=> toUpdateFilter(e, 'type', 'movie')}>

          <input type="radio" className="radioBox" id="movie" name="filter" value="movie"/><label htmlFor="movie">Movie</label>
        </div>
        <div className="radio" onClick={(e)=> toUpdateFilter(e, 'type', 'book')}>
          <input type="radio" id="book" className="radioBox" name="filter" value="book"/><label htmlFor="book">Book</label>
        </div>
      </div>
      <div className="filter-container right-filter">
        <input className="input-btn" placeholder="Search" onKeyUp={(e)=>toUpdateSearch(e)}></input>
        <div>
          {
            (movie && props.searchMovie.searchMovie)? 
            <div>
              <span className="triangle"></span>
              <div className='options search'>
              {
                movie.map((data)=> (<div onClick={(e)=>toUpdateSearch(e, data)} key={data}>{data}</div>)) 
              } 
              </div>
            </div>: ''
          }
        </div>
        
      </div>
      <div className="filter-container clear-filter" onClick={(e)=>toUpdateFilter(e, 'allClear')}>
        Clear the filter
      </div>
    </div>
  )
}