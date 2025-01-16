import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UpdatePost from './UpdatePost';
import DeletePost from './DeletePost';
import { good, example, share } from '../../assets';
import Uploader from './Uploader';
import { readPost } from '../../utils/api';

const ReadPost = () => {
  const { postId } = useParams(); // URL에서 게시물 ID를 가져옴
  const [post, setPost] = useState(null); // 게시물 데이터 저장
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // const pId = parseInt(postId);
        // const data = await readPost(postId); // Use readPosts to fetch post data
        // const res = await fetch(`http://localhost:3000/api/v1/posts/${postId}`);
        // console.log('res', res);
        // // setPost(data); // Set the post data

        // if (!res.ok) {
        //   throw new Error('Failed to fetch post');
        // }
        // const data = await res.json();
        // console.log('fetch후 data', data);
        const data = await readPost(postId); // Use readPosts to fetch post data
        setPost(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  // useEffect(() => {
  //   console.log('link post:', post);
  // }, [post]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!post) return <p>No post found</p>;

  const handleSave = (updatedPost) => {
    setPost(updatedPost); // 업데이트된 데이터를 반영
    setIsEditing(false); // 읽기 모드로 복귀
    console.log('수정버튼 누를때 post', post);
  };

  return (
    <div className="container my-4">
      <div className="card">
        <div className="card-body">
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
              {/* <input
                type="text"
                // className="form-control mb-3 text-dark border-secondary"
                className="card-title"
                value={post.title} // 제목 데이터 바인딩
                readOnly
              /> */}
              <h1 className="card-title">{post.title}</h1>
              <div className="d-flex justify-content-center align-items-center mb-3">
                {/* <div> */}
                <small className="text-muted">
                  <strong>{post.author}</strong> &middot; {post.updated_at} &middot; Guidelines
                </small>
                {/* </div> */}

                {/* <Uploader /> */}
              </div>
              <img
                // src="https://via.placeholder.com/40"
                src={example}
                alt="Author"
                style={{ maxWidth: '100%', height: 'auto' }}
                className="me-2"
              />
              {/* <textarea
                className="form-control mb-3 text-dark border-secondary"
                rows="8" // 높이를 조정
                value={post.content}
                readOnly
              ></textarea> */}
              <p className="card-text">{post.content}</p>
              <div className="card-footer  bg-white d-flex justify-content-start align-items-center">
                <img src={good} alt="좋아요 아이콘" className="me-1" />
                <small className="text-muted me-3">{post.like_count}</small>

                <button className="btn btn-link text-muted">
                  <img src={share} alt="공유 아이콘" />
                  Share
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="col-md-4 d-flex justify-content-center">
          <DeletePost post={post} />
          <button onClick={() => setIsEditing(true)}>수정</button>
        </div>
      </div>
    </div>
  );
};

export default ReadPost;
