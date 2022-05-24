import { useEffect, useRef } from 'react';
import { BrowserRouter, NavLink, Route, Routes, Navigate, Link } from 'react-router-dom';
import './App.css';
import Home from './Components/Pages/Home';
import QuotesList from './Components/Pages/QuotesList';
import AuthorList from './Components/Pages/AuthorList';
import CategoriesList from './Components/Pages/CategoriesList';
import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome'

function App() {
  let sideTitle = useRef();
  let sideBottom = useRef();

  const updateTitle = (text)=> {
    if(sideTitle.current){
      sideTitle.current.innerText = text;
    }
  }

  const updateSubTitle = (text)=> {
    if(sideBottom.current){
      sideBottom.current.innerText = text;
    }
  }

  useEffect(() => {
    document.body.style.zoom = "100%";
  }, []);

  const scrollNavHorizontal = (e) => {
    e.currentTarget.scrollIntoView({behavior: 'smooth', block: 'start'})
  }
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
            <h1 className="App-title">Eve<span>Quote</span></h1>
            <nav className="App-nav">
              <NavLink to="/" onClick={scrollNavHorizontal}>Home</NavLink>
              <NavLink to="/quotes" onClick={scrollNavHorizontal}>Quotes</NavLink>
              <NavLink to="/authors" onClick={scrollNavHorizontal}>Authors</NavLink>
              <NavLink to="/categories" onClick={scrollNavHorizontal}>Categories</NavLink>
            </nav>
            <div className="social-links">
              <a href="https://play.google.com/store/apps/dev?id=6428398715878309895&hl=en&gl=US" target="_blank"><i class="fab fa-google-play"></i></a>
              <a href="https://github.com/iMJ007" target="_blank"><i class="fab fa-github"></i></a>
              <a href="https://twitter.com/MohammedJunaidG" target="_blank"><i class="fab fa-twitter"></i></a>
              <a href="https://junaidgandhi.com" target="_blank"><i class="fab fa-connectdevelop"></i></a>
            </div>
        </header>
        
        <main className="app-body">
          <div className="vertical-side-column">
            <p className="vertical-side-title" ref={sideTitle}></p>
            <p className="vertical-side-bottom" ref={sideBottom}></p>
          </div>
          <Routes>
            <Route path="/" element={<Home updateTitle={updateTitle} updateSubTitle={updateSubTitle}/> } />
            <Route path="/quotes" element={<QuotesList updateTitle={updateTitle} updateSubTitle={updateSubTitle} />}/>
            <Route path="/authors" element={<AuthorList updateTitle={updateTitle} updateSubTitle={updateSubTitle} />}/>
            <Route path="/categories" element={<CategoriesList updateTitle={updateTitle} updateSubTitle={updateSubTitle} />}/>
            <Route path="*" element={<Navigate to="/"/>}/>

          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
