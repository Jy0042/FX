import React, { useState } from 'react';
import { updatePosts } from '../../utils/api';

const UpdatePost = ({ post, onSave }) => {
  const handleEdit = async () => {
    const res = await updatePosts(post.post_id, post.title, post.content);

    if (res.status == 200) {
      alert('게시글이 수정되었습니다.');
      const updatedPost = post;
      onSave(updatedPost);
    }
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={handleEdit}>
        저장
      </button>
    </div>
  );
};

export default UpdatePost;
