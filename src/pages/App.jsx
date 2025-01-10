import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../styles/App.css';
import Header from '../components/Header';
import Body from '../components/Body';
import Community from './Community';
import WritePage from './WritePage';
// import ViewBoardPage from './ReadBoard';
import ReadPost from '../components/board/ReadPost';
import ViewChart from './ViewChart';
import CurrencyConverter from '../components/converter/CurrencyConverter';
import GuideSection from '../components/GuideSection';
import Footer from '../components/Footer';

function App() {
  return (
    <>
      <Router>
        <Header />
        <body className="d-flex justify-content-center align-items-center rounded p-3">
          <Routes className="col-md-8">
            <Route path="/" element={<Body />} /> {/* 기본 페이지 */}
            <Route path="/community" element={<Community />} /> {/* 커뮤니티 페이지 */}
            <Route path="/chart" element={<ViewChart />} />
            <Route path="/post" element={<WritePage />} /> {/* 글쓰기 페이지 라우팅 */}
            <Route path="/v1/posts/:postId" element={<ReadPost />} /> {/* 게시물 상세 */}
          </Routes>
        </body>
        <GuideSection />
      </Router>
      <Footer />
    </>
  );
}

export default App;
