import { useRef } from 'react';
import { BrowserRouter, NavLink, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './Components/Pages/Home';
import QuotesList from './Components/Pages/QuotesList';
import AuthorList from './Components/Pages/AuthorList';
import CategoriesList from './Components/Pages/CategoriesList';

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

  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
            <h1>Eve<span>Quote</span></h1>
            <nav className="App-nav">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/quotes">Quotes</NavLink>
              <NavLink to="/authors">Authors</NavLink>
              <NavLink to="/categories">Categories</NavLink>
            </nav>
            <p>🍎 🍏 🍊</p>
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
