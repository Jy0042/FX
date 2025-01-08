import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UpdateBoard from './update_board';
import DeleteBoard from './delete_board';
import good from '../../assets/good.png';

const ViewBoard = () => {
//   const [title, setTitle] = useState(post.title);
//   const [content, setContent] = useState(post.contents);

  const postTime = new Date(); //작성시간
    const { postId } = useParams(); // URL에서 게시물 ID를 가져옴
    const [post, setPost] = useState(null); // 게시물 데이터 저장
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
          try {
            const res = await fetch(`http://localhost:3000/api/posts/${postId}`); // API 호출
            if (!res.ok) {
              throw new Error("Failed to fetch post");
            }
            const data = await res.json();
            setPost(data);
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        };
        fetchPost();
      }, [postId]);
    //   }, [postId]);
    
    useEffect(() => {
        console.log('link post:', post);
      }, [post]);

      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error}</p>;
      if (!post) return <p>No post found</p>;

  return (
    <div>
        <div className="col-md-8"> 
            <input
                // type="text"
                // placeholder="제목을 입력하세요"
                // className="form-control mb-3 text-light border-secondary" // 가로 길이를 늘림
                // value={post.title}
                type="text"
                className="form-control mb-3 text-dark border-secondary"
                value={post.title} // 제목 데이터 바인딩
                readOnly
            />
            <img
                src="https://via.placeholder.com/150"
                alt="게시글 이미지"
                className="img-fluid"
                style={{ maxWidth: '100%', height: 'auto' }}
            />
            <textarea
                className="form-control mb-3 text-dark border-secondary"
                rows="8" // 높이를 조정
                value={post.contents}
                readOnly
            ></textarea>
        </div>

        <div className="col-md-4 d-flex justify-content-center">
            <DeleteBoard post={post}/>
            <UpdateBoard/>
        </div>
    </div>
  );
};


export default ViewBoard;