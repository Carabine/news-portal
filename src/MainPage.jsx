import './App.css';
import axios from "axios"
import { useEffect, useState } from "react"
import parse from 'html-react-parser'

const MainPage = () => {
  const [news, setNews] = useState([])

  useEffect(async () => {
    const res = await axios.get("http://localhost:5000/api/news")
    setNews(res.data)
  }, [])

  return <>
  <h2>Main Page</h2>
  {
    news.map(n => (
      <div className='news-block' key={n._id}>
        <h2>{parse(n.title)}</h2>
        <h4>{parse(n.body)}</h4>
      </div>
    ))
  }
  </>
}

export default MainPage