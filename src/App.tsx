import React, { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

let ID_COUNT = 0;
interface Quote {
  id: number;
  content: string;
  author: string;
}

function App() {
  const [boxClass, setBoxClass] = useState("box");
  const [searched, setSerached] = useState(false);
  const [random, setRandom] = useState("");
  const [author, setAuthor] = useState("");
  const [quotes, setQuotes] = useState<Quote[]>([]);

  async function searchQuotes(query : String) {
    const result = await fetch("https://usu-quotes-mimic.vercel.app/api/search?query=" + query);
    let json = await result.json();
    let quotes = json["results"];
    setQuotes([]);
    for (const quote of quotes) {
      const newQuote : Quote = {
        id: ID_COUNT++,
        content: quote["content"],
        author: quote["author"]
      };
      setQuotes([...quotes, newQuote]);
    }
    setBoxClass("notBox");
  }

  function search(event : React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRandom("");
    setAuthor("");
    searchQuotes(event.currentTarget.query.value);
  }

  async function randomQuote() {
    const result = await fetch("https://usu-quotes-mimic.vercel.app/api/random");
    let json = await result.json();
    setRandom(json["content"]);
    setAuthor(" - " + json["author"]);
  }

  useEffect(() => {
    randomQuote();
  }, []);

  return (
    <div id={boxClass}>
      <div className="App">
        <h1>Quote Search</h1>
        <div id="input-container">
          <form id="form" onSubmit={search}>
            <input id="search" type="text" name="query"/>
          </form>
        </div>
        <div>
          <p>
            {random}
          </p>
          <p id="author">
            {author}
          </p>
        </div>
        <div id="quotes-container">
          {
            quotes.map((quote) => (
              <div className="quote" key={quote.id}>
                <p>
                  {quote.content}
                </p>
                <p id="author">
                  {" - " + quote.author}
                </p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default App
