import './App.css'

import { Routes, Route } from "react-router-dom";

import Header from './components/Header'
import News from './pages/News'
import Notes from './pages/Notes'
import StackOverflow from './pages/StackOverflow'
import Study from './pages/Study'
import Home from './pages/Home'

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/study" element={<Study />} />
        <Route path="/stack-overflow" element={<StackOverflow />} />
      </Routes>
    </div>
  )
}

export default App;
