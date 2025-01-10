import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Post from './Post';
import { useInView } from 'react-intersection-observer';
import { Colors } from 'chart.js';

const ReadPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5); // 페이지 당 보여질 포스트 수

  const [isLoading, setIsLoading] = useState(false);
  const [postArr, setPostArr] = useState([]);

  const { ref, inView } = useInView();

  const { userId } = useParams();
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    const fetchPosts = async () => {
      try {
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
    console.log('화면에 있습니까?', inView);

    // paginate(currentPage + 1);
  }, [userId]);
  // }, [inView]);

  useEffect(() => {
    console.log('Updated posts:', posts);
  }, [posts]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  // const lastPage = 2;

  // 페이지 변경 함수
  const paginate = (pageNumber) => {
    console.log('페이지번호 : ', pageNumber);
    if (pageNumber < 1) {
      // if (pageNumber < 1 || lastPage < pageNumber) {
      pageNumber = 1;
    } else if (pageNumber > Math.ceil(posts.length / postsPerPage)) {
      pageNumber = Math.ceil(posts.length / postsPerPage);
    }
    setCurrentPage(pageNumber + 1);
  };

  // 현재 페이지 기준으로 표시할 페이지 버튼의 시작과 끝 설정
  const startPage = Math.max(1, Math.floor((currentPage - 1) / 5) * 5 + 1);
  const endPage = Math.min(startPage + 4, Math.ceil(posts.length / postsPerPage));

  const handleClick = (postId) => {
    navigate(`/v1/posts/${postId}`); // 게시물 ID를 포함한 경로로 이동
    console.log(postId);
  };

  // const useGetPost = () => {
  //   return useInfiniteQuery({
  //     queryKey: ['top-board'],
  //     queryFn: ({ pageParam }) => {
  //       return fetchBoard(pageParam);
  //     },
  //     getNextPageParam: (last) => {
  //       if (last.page < last.total_pages) {
  //         return last.page + 1;
  //       }
  //       return undefined;
  //     },
  //     initialPageParam: 1,
  //   });
  // };

  return (
    <div>
      {/* <p>게시글: {posts.id}</p> */}
      <span className="input-group-text"></span>
      <ul
        className="pagination"
        style={{
          display: 'flex',
          justifyContent: 'center',
          listStyleType: 'none',
          padding: 0,
          textAlign: 'center',
          width: '100%',
        }}
      >
        <li
          className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
          style={{
            display: 'inline-block',
            marginRight: '10px',
          }}
        >
          <button className="page-link" onClick={() => paginate(currentPage - 1)}>
            Previous
          </button>
        </li>

        {/* 페이지 번호 버튼들 */}
        {Array.from({ length: endPage - startPage + 1 }).map((_, index) => {
          const pageNumber = startPage + index;
          return (
            <li
              key={pageNumber}
              className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}
              style={{
                display: 'inline-block',
                marginRight: '10px',
              }}
            >
              <button
                className="page-link"
                onClick={() => paginate(pageNumber)}
                style={{
                  textDecoration: currentPage === pageNumber ? 'underline' : 'none',
                }}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}

        {/* 다음 버튼 */}
        <li
          className={`page-item ${
            currentPage === Math.ceil(posts.length / postsPerPage) ? 'disabled' : ''
          }`}
          style={{
            display: 'inline-block',
            marginLeft: '10px',
          }}
        >
          <button className="page-link" onClick={() => paginate(currentPage + 1)}>
            Next
          </button>
        </li>
      </ul>
      <ul>
        {currentPosts.map((post) => (
          <div onClick={() => handleClick(post.id)} style={{ cursor: 'pointer' }}>
            <Post key={post.id} post={post} />
            <span className="input-group-text">{/* <i className="bi bi-search"></i> */}</span>
          </div>
        ))}
      </ul>
      <h1 className="color:white;" ref={ref}>
        load data
      </h1>
    </div>
  );
};
export default ReadPosts;
