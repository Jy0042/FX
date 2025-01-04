import {useState} from 'react';
import Board from '../components/board/board'
import ReadBoardList from '../components/board/read_board';
import SearchBox from '../components/board/search_box'
import { useNavigate } from 'react-router-dom';

const Community = () => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const toWritePage = () => {
        navigate("/write");
    }

    return (
        <div className="community-container" style={{ maxWidth: '1440px', margin: '0 auto', padding: '20px' }}>
  <div className="position-absolute top-0 start-50 translate-middle-x">
    <h1 className="display-4 font-weight-bold text-center mt-5">커뮤니티 페이지</h1>
    <SearchBox />
    <div className="container">
      {/* <Board/> */}
      <ReadBoardList/>
      <button onClick={toWritePage}>글쓰기</button>
    </div>
  </div>
</div>
    )
};

export default Community;
