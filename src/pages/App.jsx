import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import '../styles/App.css'
import Header from "../components/Header";
import Body from "../components/Body";
import Footer from "../components/Footer";
import Community from './Community_page';  
import WritePage from './Write_page';  


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Header/>
      <div>
        <Routes className="col-md-8">
          <Route path="/" element={<Body />} /> {/* 기본 페이지 */}
          <Route path="/community" element={<Community />} /> {/* 커뮤니티 페이지 */}
          <Route path="/write" element={<WritePage />} /> {/* Writing page route */}
          {/* <Route path="/users" element={<Users />} />
          <Route path="/users/:userId" element={<UserDetail />} /> */}
        </Routes>
      </div>
    </Router>
    <Footer/>

    </>
  )
}

export default App
