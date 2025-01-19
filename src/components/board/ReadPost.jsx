import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UpdatePost from './UpdatePost';
import DeletePost from './DeletePost';
// import good from '../../assets/good.png';
// import example from '../../assets/example.png';
// import share from '../../assets/share.png';
import { good, example, share } from '../../assets';
import Uploader from './Uploader';
import { readPost } from '../../utils/api';

const ReadPost = () => {
  //   const [title, setTitle] = useState(post.title);
  //   const [content, setContent] = useState(post.content);

  const { postId } = useParams(); // URL에서 게시물 ID를 가져옴
  const [post, setPost] = useState(null); // 게시물 데이터 저장
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await readPost(postId); // Use readPosts to fetch post data
        console.log('fetch후 data', data);
        console.log('fetch후 image', data.image);
      
        // Buffer 데이터를 Base64로 변환
        // if (data.image && data.image.data) {
        //   const base64Image = `data:image/png;base64,${btoa(
        //     String.fromCharCode(...new Uint8Array(data.image.data))
        //   )}`;
        //   data.image = base64Image;
        // }
        // console.log('base64 변형후 image', data.image);
        setPost(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

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
            <div>
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
            </div>
          ) : (
            <div>
              <h1 className="card-title">{post.title}</h1>
              <div className="d-flex justify-content-center align-items-center mb-3">
                <small className="text-muted">
                  <strong>{post.author}</strong> &middot; {post.updated_at} &middot; Guidelines
                </small>
              </div>
              {/* <img
                // src="https://via.placeholder.com/40"
                src={post.image}
                alt="Author"
                style={{ maxWidth: '100%', height: 'auto' }}
                className="me-2"
              /> */}
              <div>
                {post.image ? (
                  <img
                    // src="https://via.placeholder.com/40"
                    src={post.image}
                    alt="Post"
                    style={{ maxWidth: '100%', height: 'auto' }}
                    className="me-2"
                  />
                ) : (
                  <img
                    // src="https://via.placeholder.com/40"
                    src={example}
                    alt="Author"
                    style={{ maxWidth: '100%', height: 'auto' }}
                    className="me-2"
                  />
                )}
              </div>
              <p className="card-text">{post.content}</p>
              <div className="card-footer d-flex justify-content-start align-items-center">
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
