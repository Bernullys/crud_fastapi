import { useState } from 'react';
import Header from './Components/Header/Header';
import Body from './Components/Body/Body';
import Search from './Components/Search/Search';
import Add from './Components/Add/Add';
import Update from './Components/Update/Update';
import Delete from './Components/Delete/Delete';

import './App.css';

function App() {

  const [page, setPage] = useState("home")

  function renderPage () {
    switch (page) {
      case "home":
        return <Body goTo = {setPage } />
      case "search":
        return <Search goTo={ setPage }/>
      case "add":
        return <Add goTo = { setPage }/>
      case "update":
        return <Update goTo = { setPage }/>
      case "delete":
        return <Delete goTo = { setPage }/>
      default:
        return "Not Found"  
    }
  }

  return (
    <>
      <Header goTo={setPage}/>
      <div>
        { renderPage() }
      </div>
    </>
  )
}

export default App;
