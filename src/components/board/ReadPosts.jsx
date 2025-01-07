import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Post from './Post';

const ReadPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // 현재 포스트
  const [postsPerPage] = useState(10); // 페이지 당 보여질 포스트 수
  const [query, setQuery] = useState('');

  const { userId } = useParams();
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // const res = await fetch(`/api/board?query=${encodeURIComponent(query)}`);
        // const res = await fetch(`http://localhost:3000/api/users/${userId}`);
        const res = await fetch(`http://localhost:3000/community`);
        if (!res.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await res.json();
        console.log('data', data);
        setPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [userId]);

  useEffect(() => {
    console.log('Updated posts:', posts);
  }, [posts]);

  // const handleClick = (e) => {
  //   navigate(`/view`); // 원하는 경로로 페이지 전환
  // };

  const handleClick = (postId) => {
    navigate(`/v1/posts/${postId}`); // 게시물 ID를 포함한 경로로 이동
    console.log(postId);
  };

  return (
    <div>
      <p>게시글: {posts.id}</p>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <div onClick={() => handleClick(post.id)} style={{ cursor: 'pointer' }}>
              <Post key={post.id} post={post} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ReadPosts;
