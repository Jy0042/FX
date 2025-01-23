import React from 'react';
import { deletePost } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const DeletePost = ({ post }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const res = await deletePost(post.post_id);
      if (res) {
        alert('게시글이 삭제되었습니다.');
        navigate('/community');
      } else {
        alert('본인이 작성한 게시글만 삭제할 수 있습니다.');
        console.error('Failed to delete the post');
      }
    }
  };

  return (
    <div className="mx-2">
      <button className="btn btn-primary" onClick={handleDelete}>
        삭제
      </button>
    </div>
  );
};

export default DeletePost;
