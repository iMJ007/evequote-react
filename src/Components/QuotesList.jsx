import { useRef, useState } from 'react';
import Masonry from 'react-masonry-css';
import {useFetch} from '../hooks/useFetch'
import './QuotesList.css'

export default function QuotesList({updateTitle, updateSubTitle}) {
    let [page, setPage] = useState(1);
    let {data: quotes, isPending, error } = useFetch(`http://localhost:3000/quotes?_page=${page}&_limit=20`);
    let {data: authors } = useFetch('http://localhost:3000/authors');
    const toast = useRef();
    const hoveredCard = useRef();

    const handleHover = (e) => {
        if (hoveredCard.current && hoveredCard.current !== e.target){
            hoveredCard.current.querySelector('.copy').classList.remove('hovered');
        }

        hoveredCard.current = e.target;
        let view = e.target.querySelector('.copy');
        if (!view){
            view = e.target.parentElement.querySelector('.copy');
            hoveredCard.current = e.target.parentElement;
        }
        if (view) view.classList.add('hovered');
    }

    const handleHoverExit = (e) => {
        
        let view = e.target.querySelector('.copy');
        if (!view){
            view = e.target.parentElement.querySelector('.copy');
        }

        if (view) view.classList.remove('hovered');
    }
    
    const copy = (quote, name) => {
        toast.current.classList.add('shown');
        toast.current.innerText = `${name}'s quote copied to clipboard!`
        navigator.clipboard.writeText(quote.quote + "\n\n- " + name);
        setTimeout(() =>{toast.current.classList.remove('shown');}, 2000);
    }

    const handlePaginate = (e) => {
        if (e.target.id == 'next') {
            setPage(page + 1);
        } else {
            setPage(page - 1);
        }
    }
    
    const breakpointColumnsObj = {
        default: 5,
        1100: 4,
        700: 2,
        500: 1
    };
  return (
    <div className="quotes-list-root">
        {isPending && <div>Fetching Quotes...</div>}
        {error && <div>Error fetching</div>}
        {updateTitle &&  updateTitle("Random Quote")}
        {quotes && updateSubTitle && updateSubTitle("#" + quotes.length)}
        {quotes && authors && <Masonry 
            breakpointCols={breakpointColumnsObj}
            className="quotes-list"
            columnClassName='quotes-list-col'>
            {quotes.map((quote, index) => (
                <div key={index} className="quote-card" onMouseEnter={handleHover} onMouseLeave={handleHoverExit} onClick={(e) => copy(quote, authors[quote.authorIndex].name)}>
                    <div className="copy">Click anywhere to copy</div>
                    <p>{quote.quote}</p>
                    <img src={authors[quote.authorIndex].picUrl} />
                    <h6>{authors[quote.authorIndex].name}</h6>
                </div>
            ))}
        </Masonry>}
        <div className="toast" ref={toast}></div>
        <div className="paginate-button-container">
            <span className="paginate-button" id="previous" onClick={handlePaginate}>&lt;</span>
            <span className="paginate-button" id="next"  onClick={handlePaginate}>&gt;</span>
        </div>
    </div>
  )
}
