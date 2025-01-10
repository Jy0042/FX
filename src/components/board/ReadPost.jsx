import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UpdatePost from './UpdatePost';
import DeletePost from './DeletePost';
import good from '../../assets/good.png';
import Uploader from './Uploader';

const ReadPost = () => {
  //   const [title, setTitle] = useState(post.title);
  //   const [content, setContent] = useState(post.content);

  const postTime = new Date(); //작성시간
  const { postId } = useParams(); // URL에서 게시물 ID를 가져옴
  const [post, setPost] = useState(null); // 게시물 데이터 저장
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/v1/posts/${postId}`); // API 호출
        if (!res.ok) {
          throw new Error('Failed to fetch post');
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

  useEffect(() => {
    console.log('link post:', post);
  }, [post]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!post) return <p>No post found</p>;

  const handleSave = (updatedPost) => {
    setPost(updatedPost); // 업데이트된 데이터를 반영
    setIsEditing(false); // 읽기 모드로 복귀
  };

  return (
    <div>
      <div className="col-md-8">
        {isEditing ? (
          <form>
            수정중
            <input
              type="text"
              className="form-control mb-3 text-dark border-secondary"
              value={post.title} // 제목 데이터 바인딩
              onChange={(e) => setPost({ ...post, title: e.target.value })} // 수정 중 데이터 반영
            />
            <textarea
              className="form-control mb-3 text-dark border-secondary"
              rows="8" // 높이를 조정
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })} // 수정 중 데이터 반영
            ></textarea>
            <Uploader />
            <UpdatePost post={post} onSave={handleSave} />
            {/* <img
              src="https://via.placeholder.com/150"
              alt="게시글 이미지"
              className="img-fluid"
              style={{ maxWidth: '100%', height: 'auto' }}
            /> */}
          </form>
        ) : (
          <div>
            기본
            <input
              type="text"
              className="form-control mb-3 text-dark border-secondary"
              value={post.title} // 제목 데이터 바인딩
              readOnly
            />
            <textarea
              className="form-control mb-3 text-dark border-secondary"
              rows="8" // 높이를 조정
              value={post.content}
              readOnly
            ></textarea>
            {/* <img
              // src="https://via.placeholder.com/150"
              // alt="게시글 이미지"
              // className="img-fluid"
              style={{ maxWidth: '100%', height: 'auto' }}
            /> */}
            {/* <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" /> */}
            <Uploader />
          </div>
        )}
      </div>

      <div className="col-md-4 d-flex justify-content-center">
        <DeletePost post={post} />
        <button onClick={() => setIsEditing(true)}>수정</button>
        {/* <UpdateBoard post={post} onClick={() => setIsEditing(true)}/> */}
      </div>
    </div>
  );
};

export default ReadPost;
