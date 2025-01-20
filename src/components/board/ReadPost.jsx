import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UpdatePost from './UpdatePost';
import DeletePost from './DeletePost';
import { good, example, share } from '../../assets';
import Uploader from './Uploader';
import { readPost } from '../../utils/api';

const ReadPost = () => {
  const { postId } = useParams(); // URL에서 게시물 ID를 가져옴
  const [post, setPost] = useState({
    title: '',
    content: '',
    author: '',
    updated_at: '',
    like_count: 0,
  }); // 게시물 초기 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await readPost(postId); // API 요청
        console.log('fetch후 data', data);
        setPost(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleSave = (updatedPost) => {
    setPost(updatedPost); // 업데이트된 데이터를 반영
    setIsEditing(false); // 읽기 모드로 복귀
    console.log('수정 완료 후 post 상태:', post);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!post) return <p>No post found</p>;

  return (
    <div className="container my-4">
      <div className="card">
        <div className="card-body">
          {isEditing ? (
            <div>
              <input
                type="text"
                className="form-control mb-3 text-dark border-secondary"
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
              />
              <textarea
                className="form-control mb-3 text-dark border-secondary"
                rows="8"
                value={post.content}
                onChange={(e) => setPost({ ...post, content: e.target.value })}
              ></textarea>
              <Uploader />
              <UpdatePost post={post} onSave={handleSave} />
            </div>
          ) : (
            <div>
              <h1 className="card-title">{post.title}</h1>
              <div className="d-flex justify-content-center align-items-center mb-3">
                <small className="text-muted">
                  <strong>{post.author}</strong> &middot; {post.updated_at} &middot; Guidelines
                </small>
              </div>
              <img
                src={post.image_url || example}
                alt="Author"
                style={{ maxWidth: '100%', height: 'auto' }}
                className="me-2"
              />
              <p className="card-text">{post.content}</p>
              <div className="card-footer bg-white d-flex justify-content-start align-items-center">
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
