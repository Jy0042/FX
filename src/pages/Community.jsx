import { useState } from 'react';
import ReadPosts from '../components/board/ReadPosts';
import SearchForm from '../components/board/SearchForm';
import { useNavigate } from 'react-router-dom';

const Community = () => {
  const navigate = useNavigate();

  const toWritePage = () => {
    console.log('페이지 이동');
    navigate('/post');
  };

  return (
    <div className="community-container container py-5">
      {/* 커뮤니티 페이지 제목 */}
      <h1 className="display-4 font-weight-bold text-center mb-4">커뮤니티 페이지</h1>

      {/* 검색 폼 */}
      <div className="mb-4">
        <SearchForm />
      </div>

      {/* 게시글 리스트 */}
      <div className="mb-4">
        <ReadPosts />
      </div>

      {/* 글쓰기 버튼 */}
      <div className="text-center">
        <button
          className="btn btn-primary"
          onClick={toWritePage}
          type="button" // 기본 submit 방지
        >
          글쓰기
        </button>
      </div>
    </div>
  );
};

export default Community;
