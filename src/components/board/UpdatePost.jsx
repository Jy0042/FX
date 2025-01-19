import React, { useState } from 'react';
import { updatePosts } from '../../utils/api';

const UpdatePost = ({ post, onSave }) => {
  // const [title, setTitle] = useState(post.title);
  // const [content, setContent] = useState(post.content);
  console.log('UpdatePost실행시 post:', post);

  const handleEdit = async () => {
    const res = await updatePosts(post.post_id, post.title, post.content);

    if (res.status == 200) {
      alert('게시글이 수정되었습니다.');
      const updatedPost = post;
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
