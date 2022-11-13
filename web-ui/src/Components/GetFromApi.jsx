import { useState, useEffect } from 'react'
const axios = require('axios').default

export async function getFixedAssets(url){
  try{
    const response = await axios.get(url)
    return response
  }catch(apiError){
    return apiError
  }
}

export async function deleteFixedAssets(url){
  try{
    const response = await axios.delete(url)
    return response
  }catch(apiError){
    return apiError
  }
}

export default function getFromApi(url){
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getFromUrl() {
      try {
        const {data} = await axios.get(url);
        setApiData(data);
      } catch (apiError) {
        setError(apiError);
      }
    }
    getFromUrl()
  }, []);
  return {apiData, error }
};
