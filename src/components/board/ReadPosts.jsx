import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from './Post';
import { useInView } from 'react-intersection-observer';
import { readPosts } from '../../utils/api';

const ReadPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const { ref, inView } = useInView(); // Intersection Observer
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await readPosts();
        if (!Array.isArray(res)) {
          throw new Error('Invalid response data');
        }
        setPosts(res);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Pagination 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    const totalPages = Math.ceil(posts.length / postsPerPage);
    if (pageNumber < 1) pageNumber = 1;
    if (pageNumber > totalPages) pageNumber = totalPages;
    setCurrentPage(pageNumber);
  };

  // Pagination 버튼
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startPage = Math.max(1, Math.floor((currentPage - 1) / 5) * 5 + 1);
  const endPage = Math.min(startPage + 4, totalPages);

  const handleClick = (postId) => {
    navigate(`/v1/posts/${postId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!posts.length) return <p>No posts available</p>;

  return (
    <div>
      {/* Pagination */}
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => paginate(currentPage - 1)}>
            Previous
          </button>
        </li>
        {Array.from({ length: endPage - startPage + 1 }).map((_, index) => {
          const pageNumber = startPage + index;
          return (
            <li
              key={pageNumber}
              className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}
            >
              <button className="page-link" onClick={() => paginate(pageNumber)}>
                {pageNumber}
              </button>
            </li>
          );
        })}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => paginate(currentPage + 1)}>
            Next
          </button>
        </li>
      </ul>

      {/* Posts */}
      <div className="card">
        {currentPosts.map((post) => (
          <div
            key={post.post_id} // 고유한 key 속성
            onClick={() => handleClick(post.post_id)}
            style={{ cursor: 'pointer' }}
          >
            <Post post={post} />
          </div>
        ))}
      </div>

      {/* Intersection Observer */}
      <h1 className="text-center" ref={ref}>
        Load more posts...
      </h1>
    </div>
  );
};

export default ReadPosts;
