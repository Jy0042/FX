import { useState } from 'react';
import ReadPosts from '../components/board/ReadPosts';
import SearchForm from '../components/board/SearchForm';
import { useNavigate } from 'react-router-dom';

const Community = () => {
  const navigate = useNavigate();

  const toWritePage = () => {
    navigate('/post');
  };

  return (
    <div className="container container py-5">
      {/* 커뮤니티 페이지 제목 */}
      <h1 className="display-4 font-weight-bold text-center mb-4">커뮤니티 페이지</h1>
      {/* 검색 폼 */}
      <div className="mb-4">
        <SearchForm />
      </div>
      {/* 글쓰기 버튼 */}
      <div className="d-flex justify-content-end text-center  mb-4">
        <button
          className="d-flex justify-content-end btn btn-primary"
          onClick={toWritePage}
          type="button" // 기본 submit 방지
        >
          글쓰기
        </button>
      </div>
      {/* 게시글 리스트 */}
      <div className="d-flex justify-content-center mb-4">
        <ReadPosts />
      </div>
    </div>
  );
};

export default Community;
