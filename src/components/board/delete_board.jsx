  import React, { useState } from "react";
  import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
  import PropTypes from "prop-types";

  const DeleteBoard = ({ post }) => {

      const [title, setTitle] = useState(post.title);
      const [content, setContent] = useState(post.content);

      console.log(post);
      const handleDelete = async () => {
          if (confirm('정말 삭제하시겠습니까?')) {
            const res = await fetch(`http://localhost:3000/api/posts/${post.id}`, {
              method: 'delete',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id: post.id }),
            });
      
            if (res.ok) {
              alert('게시글이 삭제되었습니다.');
            } 
            // else {
            //   alert('본인이 작성한 게시글만 삭제할 수 있습니다.');
            //   console.error('Failed to delete the post');
            // }
          }
        };

      return(
          <div>
              <button onClick={handleDelete}>삭제</button>
          </div>
      );
  }

  DeleteBoard.propTypes = {
    post: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      content: PropTypes.string,
    }).isRequired,
  };

  export default DeleteBoard;
