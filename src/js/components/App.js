import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import MovieList from './MovieList';
import FirstExercise from './FirstExercise'

export default function HelloMessage () {
  const [showExercise, setShowExercise] =  useState(false)
  toUpdateExercise = ()=>{
    setShowExercise(!showExercise)
  }
  return (
    <div>
    {
      (showExercise)? <MovieList setExercise={toUpdateExercise}></MovieList> : <FirstExercise setExercise={toUpdateExercise}></FirstExercise>
    }
    </div>
  );
}
 