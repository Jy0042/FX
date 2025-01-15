import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const UpdatePost = ({ post, onSave }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const handleEdit = async () => {
    console.log('업데이트할post', post);
    const res = await fetch(`http://localhost:3000/api/v1/posts/${post.id}`, {
      // method: 'PATCH',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: post.id, title: post.title, content: post.content }),
    });

    if (res.ok) {
      alert('게시글이 수정되었습니다.');
      const updatedPost = await res.json(); // 백엔드에서 수정된 데이터를 반환하도록 설정
      onSave(updatedPost); // 수정된 데이터를 부모 컴포넌트로 전달
    }
  };

  return (
    <div>
      <button onClick={handleEdit}>저장</button>
    </div>
  );
};

export default UpdatePost;
