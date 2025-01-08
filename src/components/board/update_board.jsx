import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const UpdateBoard = ({ post }) => {
    // const [title, setTitle] = useState(post.title);
    // const [content, setContent] = useState(post.content);
    const [isEditing, setIsEditing] = useState(false);


    const handleEdit = async () => {
        const res = await fetch('/api/board/updatePost', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: post.id, title, content }),
        });
    
        if (res.ok) {
          alert('게시글이 수정되었습니다.');
          setIsEditing(false);
        } else {
          alert('본인이 작성한 게시글만 수정할 수 있습니다.');
          console.error('Failed to update the post');
        }
      };

    return(
        <div>
            <button onClick={handleEdit}>수정</button>
        </div>
    );
}

export default UpdateBoard;
