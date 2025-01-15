import React, { useState } from 'react';
import Uploader from './Uploader';
import { createPost } from '../../utils/api';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [imgFile, setImgFile] = useState('');

  let [inputCount, setInputCount] = useState(0);
  let [textCount, setTextareaCount] = useState(0);

  const inputCounter = (e) => {
    //input에 입력한 글자 세는 함수
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

    // const res = await fetch(`http://localhost:3000/api/v1/posts`, {
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ title, content }),
    // });
    const res = await createPost(title, content, null);

    console.log('리스폰스', res);

    if (!title.trim() || !content.trim()) {
      setErrorMessage('제목과 내용을 모두 입력해주세요.');
      return;
    }
    if (res.ok) {
      alert('게시글이 작성되었습니다.');
      window.location.reload(); //게시글 작성후 페이지 새로고침
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {errorMessage && <p className="mb-2 text-sm">{errorMessage}</p>}
      <input
        type="text"
        value={title}
        placeholder="Enter hour title here..."
        className="form-control" // 가로 길이를 늘림
        // style="color: black;"
        onChange={(e) => inputCounter(e.target.value)}
      />
      <h6 className="d-flex justify-content-end align-items-end">{inputCount}/100</h6>
      <textarea
        placeholder="Write your content here..."
        color="gray"
        value={content}
        className="form-control mb-3 "
        rows="10" // 높이를 조정
        onChange={(e) => textCounter(e.target.value)}
      />
      <h6 className="d-flex justify-content-end align-items-end">{textCount}words</h6>
      <Uploader />
      <div className="d-flex justify-content-end align-items-end rounded p-3">
        <button className="btn btn-outline-secondary">Cancel</button>
        <button type="submit" className="btn btn-primary">
          Publish
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
