import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  let [inputCount, setInputCount] = useState(0);
  let [textCount, setTextareaCount] = useState(0);

  const inputCounter = (e) => {
    //input에 입력한 글자 세는 함수
    // title = e.target.value;
    // setTitle(e.target.value); // 입력된 값을 상태에 저장
    // setInputCount(e.target.value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, "$&$1$2").length);
    setTitle(e); // 입력된 값을 상태에 저장
    setInputCount(e.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, '$&$1$2').length);
  };

  const textCounter = (e) => {
    //textarea에 입력한 글자 세는 함수
    setContent(e);
    setTextareaCount(e.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, '$&$1$2').length);
    //한글일 경우 3Byte, 그외 1Byte로 계산
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('title', title);
    console.log('content', content);

    const res = await fetch(`http://localhost:3000/api/v1/posts`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });

    console.log('리스폰스', res);

    if (!title.trim() || !content.trim()) {
      setErrorMessage('제목과 내용을 모두 입력해주세요.');
      return;
    }
    if (res.ok) {
      alert('게시글이 작성되었습니다.');
      window.location.reload(); // Refresh the page after creating a post
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {errorMessage && <p className="mb-2 text-sm">{errorMessage}</p>}
      <input
        type="text"
        value={title}
        placeholder="Enter hour title here..."
        className="form-control mb-3 " // 가로 길이를 늘림
        onChange={(e) => inputCounter(e.target.value)}
      />
      <h6>{inputCount}/100</h6>
      <textarea
        placeholder="Write your content here..."
        value={content}
        className="form-control mb-3 "
        rows="10" // 높이를 조정
        onChange={(e) => textCounter(e.target.value)}
      />
      <h6>{textCount}words</h6>
      <button className="btn btn-outline-secondary">Cancel</button>
      <button type="submit" className="btn btn-primary">
        Publish
      </button>
    </form>
  );
};

export default CreatePost;
