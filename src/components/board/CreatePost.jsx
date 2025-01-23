import React, { useState } from 'react';
import Uploader from './Uploader';
import { createPost } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  let [inputCount, setInputCount] = useState(0);
  let [textCount, setTextareaCount] = useState(0);

  const navigate = useNavigate();

  const inputCounter = (e) => {
    setTitle(e);
    setInputCount(e.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, '$&$1$2').length);
  };

  const textCounter = (e) => {
    setContent(e);
    setTextareaCount(e.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, '$&$1$2').length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      const res = await createPost(title, content, null);
      if (res) {
        alert('성공적으로 글이 작성되었습니다다.');
        navigate('/community');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('게시글 작성 에러 발생.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mb-4">
      {errorMessage && <p className="mb-2 text-sm">{errorMessage}</p>}
      <input
        type="text"
        value={title}
        placeholder="제목을 입력하시오..."
        className="form-control" // 가로 길이를 늘림
        // style="color: black;"
        onChange={(e) => inputCounter(e.target.value)}
      />
      <h6 className="d-flex justify-content-end align-items-end">{inputCount}/100</h6>
      <textarea
        placeholder="내용을 입력하시오..."
        color="gray"
        value={content}
        className="form-control mb-3 "
        rows="10" // 높이를 조정
        onChange={(e) => textCounter(e.target.value)}
      />
      <h6 className="d-flex justify-content-end align-items-end">{textCount}words</h6>
      <Uploader />
      <div className="d-flex justify-content-end align-items-end rounded p-3">
        <button
          type="button"
          className="btn btn-outline-secondary mx-3"
          onClick={() => navigate('/community')}
        >
          취소
        </button>
        <button type="submit" className="btn btn-primary">
          작성
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
