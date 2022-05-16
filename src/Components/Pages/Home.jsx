import React, { useEffect, useState } from 'react'
import './Home.css';
import '../Animation.css'

export default function Home({updateTitle, updateSubTitle}) {
    let [url, setUrl] = useState('https://evequote-json-server.herokuapp.com/quotes');
    let [quote, setQuote] = useState(null);
    let [isPending, setIsPending] = useState(true);
    let [error, setError] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async  () => {
            setIsPending(true);
            setError(false);

            try {
                
                const response = await fetch(`https://evequote-json-server.herokuapp.com/quotes?_start=${Math.floor(Math.random() * 2205)}&_limit=1`, { signal : controller.signal});
                if(!response.ok){
                    throw new Error(response.statusText);
                }
                const fetchedQuote = (await response.json())[0];
                const authorResponse = await fetch(`https://evequote-json-server.herokuapp.com/authors?_start=${fetchedQuote.authorIndex}&_limit=1`, { signal : controller.signal})
                if(!authorResponse.ok){
                    throw new Error(authorResponse.statusText);
                }
                fetchedQuote.author = (await authorResponse.json())[0];
                // console.log(fetchedQuote);
                setIsPending(false);
                setQuote(fetchedQuote);
                setError(false);
            } catch (err) {
                setIsPending(false);
                setError('Error fetching data');
                console.log(err);
            }
        }

        fetchData();

        return () => {
            controller.abort();
        }
    }, [url]);
    
  return (
    <div className="home-container">
        {isPending && <div className="loading">Loading ...</div>}
        {error && <div className="error">Error</div>}
        {updateTitle &&  updateTitle("Random Quote")}
        {quote && updateSubTitle && updateSubTitle("#" + quote.quoteCategory)}
        {quote && (
            <>
                <div className="author-image-container">
                    <img src={quote.author.picUrl} alt={quote.author.name} />
                    <div className="home-author-name-container">
                        <span className="name-dash"></span>
                        <h3>{quote.author.name}</h3>
                    </div>
                </div>
                <p className="home-quote">{quote.quote}</p>
            </>
        )}
    </div>
  )
}
