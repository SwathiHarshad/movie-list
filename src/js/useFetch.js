import React, { useEffect, useState } from 'react'

export function useFetch(){
  const [responseData, setResponseData] = useState([])
  useEffect(()=>{
    let url = 'https://raw.githubusercontent.com/HubSpotWebTeam/CodeExercise/main/src/js/data/data.json'
    const getData = async()=>{
      try {
        const response = await fetch(url);
        const json = await response.json();
        setResponseData(json.media)
      } catch (error) {
        console.log("error", error);
      }
    }
    getData()
  },[])
  return [responseData]
}