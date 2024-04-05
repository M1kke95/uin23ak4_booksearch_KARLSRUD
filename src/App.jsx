import { useState, useEffect } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/home'
import Layout from './components/Layout'
function App() {
  const [content, setContent] = useState([])
  const [query, setQuery] = useState("")

  
  const getData = async() =>{
    try{
      const response = await fetch(`https://openlibrary.org/search.json?q=${query}`)
      const data = await response.json()
      setContent(data.results)
    }catch(error){
      console.error("Det har skjedd en feil", error)
    }
  }
  
  useEffect(()=>{
    getData()
  },[query])
  return (
    
   <>
   
   <Layout>
    <Routes>
      <Route index element={<Home setQuery={setQuery}/>}/>
    </Routes>
    </Layout>
  
   </>
  )
}

export default App
