import React, { useEffect, useState } from 'react';
import './App.scss';
import COLORS_ARRAY from './arrayColors.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';



let quoteDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";


function App() {
    const [quote, setQuote] = useState("Dream big and dare to fail.");
    const [author, setAuthor] = useState("Norman Vaughan");
    const [quotesArray, setQuotesArray] = useState(null);
    const [accentColor, setAccentColor] = useState('#282c34');

    const fetchQuotes = async (url) => {
      const response = await fetch(url);
      const parsedJSON = await response.json();
      setQuotesArray(parsedJSON.quotes);
    }

   
    useEffect(() => {
      fetchQuotes(quoteDBUrl)
    }, []);



    const generateRandomNum = () => {
        return Math.floor(Math.random() * quotesArray.length);
    }


    const getRandomQuote = (i) => {
        setAccentColor(COLORS_ARRAY[i])
        setQuote(quotesArray[i].quote);
        setAuthor(quotesArray[i].author);
    }
    return ( 
      <div className = "App">
        <header className = "App-header" style={{backgroundColor:accentColor, color:accentColor}}>
          <div id="quote-box">
          
          <p id="text"><span id ="quote-icon"> <FontAwesomeIcon icon ={faQuoteLeft}/></span>
          {quote}
          </p> 
          <p id="author">-{author}</p> 
          <div className="buttons">
          <div className="button">
          <a id="tweet-quote" href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)} style={{backgroundColor:accentColor}}>
            <FontAwesomeIcon icon ={faTwitter}/>
          </a>
          </div>
          <button id="new-quote" style={{backgroundColor:accentColor, borderColor:accentColor, color:'white'}} onClick = {() => getRandomQuote(generateRandomNum())}>
          New Quote
          </button>
          </div>
         

        </div>
        </header>  
        </div>
    );
}

export default App;