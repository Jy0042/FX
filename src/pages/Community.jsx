import { useState } from 'react';
import ReadPosts from '../components/board/ReadPosts';
import SearchForm from '../components/board/SearchForm';
import { useNavigate } from 'react-router-dom';

const Community = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const toWritePage = () => {
    console.log('페이지 이동');
    navigate('/post');
  };

  return (
    <form
      className="community-container"
      style={{ maxWidth: '1440px', margin: '0 auto', padding: '20px' }}
    >
      <div className="position-absolute top-0 start-50 translate-middle-x">
        <h1 className="display-4 font-weight-bold text-center mt-5">커뮤니티 페이지</h1>
        <SearchForm />
        <div className="container">
          <ReadPosts />
          <button onClick={toWritePage}>글쓰기</button>
        </div>
      </div>
    </form>
  );
};

export default Community;
