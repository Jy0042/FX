import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../styles/App.css';
import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';
import Community from './community_page';
import WritePage from './write_page';
import ViewBoardPage from './view_board_page';
import ReadBoard from '../components/board/ReadPost';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Header />
        <body>
          <Routes className="col-md-8">
            <Route path="/" element={<Body />} /> {/* 기본 페이지 */}
            <Route path="/community" element={<Community />} /> {/* 커뮤니티 페이지 */}
            <Route path="/write" element={<WritePage />} /> {/* 글쓰기 페이지 라우팅 */}
            {/* <Route path="/view" element={<ViewBoardPage />} /> 글쓰기 페이지 라우팅 */}
            <Route path="/post/:postId" element={<ReadBoard />} /> {/* 게시물 상세 */}
          </Routes>
        </body>
      </Router>
      <Footer />
    </>
  );
}

export default App;
