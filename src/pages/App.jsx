import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { Route, Routes } from "'react-dom/client'";

import '../styles/App.css';
import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';
import Community from './Community'; // Community 페이지 컴포넌트 import
import ViewChart from './ViewChart';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Header />
        {/* <Body/> */}
        <Routes>
          <Route path="/" element={<Body />} /> {/* 기본 페이지 */}
          <Route path="/community" element={<Community />} /> {/* 커뮤니티 페이지 */}
          {/* <Route path="/chart" element={}/> */}
          <Route path="/chart" element={<ViewChart />} />
        </Routes>
      </Router>

      <Footer />
    </>
  );
}

export default App;
