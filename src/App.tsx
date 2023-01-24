import { useEffect, useState } from 'react';
import './App.css';

interface Quote {
  text: string
  author: string
}

function App() {
  const [quotes, setQuotes] = useState([])
  const [quote, setQuote] = useState<Quote | null>(null)
  const randomColor = "#"+((1<<24)*Math.random()|0).toString(16);

  useEffect(() => {
    getQuotes()
  }, [])

  const getQuotes = async () => {
    const response = await fetch('https://type.fit/api/quotes')
    const data = await response.json()

    const index = Math.floor(Math.random() * 1001)
    setQuotes(data)
    setQuote(data[index])
  }


  return (
    <div className="container-fluid app" style={{ background: randomColor }}>
      <div id="quote-box">
        <h1 id="text" style={{ color: randomColor }} className='text-center mt-5 px-3'>"{quote?.text}."</h1>
        <p id="author" className="text-right mt-1 px-3" style={{ color: randomColor }}> - {quote?.author}</p>
        
        <div className='d-flex justify-content-around align-items-center'>
          <a id="tweet-quote" href="twitter.com/intent/tweet" target="_blank" style={{ background: randomColor }} className="btn btn-primary mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
            </svg>
          </a>

          <button type="button" className="mb-3 btn btn-primary" id="new-quote" style={{ background: randomColor }} onClick={() => {
            const index = Math.floor(Math.random() * 1001)
            setQuote(quotes[index])
          }}>
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
