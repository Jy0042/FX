import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import '../styles/App.css'
import Header from "../components/Header";
import Body from "../components/Body";
import Footer from "../components/Footer";
import Community from './Community_page';  // Community 페이지 컴포넌트 import



function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Header/>
      <div className="main-container" style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <Routes className="col-md-8">
          <Route path="/" element={<Body />} /> {/* 기본 페이지 */}
          <Route path="/community" element={<Community />} /> {/* 커뮤니티 페이지 */}
        </Routes>
      </div>
    </Router>
    <Footer/>

    </>
  )
}

export default App
