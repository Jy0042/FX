import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UpdatePost from './UpdatePost';
import DeletePost from './DeletePost';
import { good, example, share, frame, author } from '../../assets';
import Uploader from './Uploader';
import { readPost } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const ReadPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({
    title: '',
    content: '',
    author: '',
    updated_at: '',
    like_count: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await readPost(postId);
        setPost(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
    console.log('posts', post);
  }, [postId]);

  const handleSave = (updatedPost) => {
    setPost(updatedPost);
    setIsEditing(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!post) return <p>No post found</p>;

  return (
    <div className="container my-4">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <button className="btn btn-primary" onClick={() => navigate('/community')}>
              목록
            </button>
            {isEditing ? (
              <div>
                <UpdatePost post={post} onSave={handleSave} />
              </div>
            ) : (
              <div className="d-flex">
                <DeletePost post={post} />
                <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                  수정
                </button>
              </div>
            )}
          </div>
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
            </div>
          ) : (
            <div>
              <div className="d-flex px-4">
                <h1 className="card-title">{post.title}</h1>
              </div>
              <div className="d-flex justify-content-start align-items-center mb-3 px-4">
                <small className="text-muted">
                  <img src={author} alt="좋아요 아이콘" className="me-1 mx-1" />
                  <strong>{post.nickname}</strong>{' '}
                  <img src={frame} alt="날짜 아이콘" className="me-1 mx-1" /> {post.updated_at}
                </small>
              </div>
              <div className="mx-3 my-5">
                {post.image ? (
                  <img
                    src={post.image}
                    alt="Post"
                    style={{ maxWidth: '100%', height: 'auto' }}
                    className="me-2"
                  />
                ) : (
                  <img
                    src={example}
                    alt="Author"
                    style={{ maxWidth: '100%', height: 'auto' }}
                    className="me-2"
                  />
                )}
              </div>

              <div className="d-flex px-4">
                <p className="card-text my-4 content-container">{post.content}</p>
              </div>
              <div className="card-footer d-flex justify-content-start align-items-center">
                <img src={good} alt="좋아요 아이콘" className="me-1" />

                <small className="text-muted me-3">{post.like_count}</small>
                <button className="btn btn-link text-muted">
                  <img src={share} alt="공유 아이콘" />
                  공유
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadPost;
