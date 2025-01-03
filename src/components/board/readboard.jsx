import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Board from './board';

const ReadBoardList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10); // 페이지 당 보여질 포스트 수
    const [query, setQuery] = useState('');

    const { userId } = useParams();

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            // const res = await fetch(`/api/board?query=${encodeURIComponent(query)}`);
            // const res = await fetch(`http://localhost:3000/api/users/${userId}`);
            const res = await fetch(`http://localhost:3000/community`);
            // const res = 0;
            if (!res.ok) {
              throw new Error('Failed to fetch posts');
            }
            const data = await res.json();
            console.log('data', data);
            setPosts(data);
          } catch (error) {
            setError((error).message);
          } finally {
            setLoading(false);
          }
        };
    fetchPosts();
    // },[query]);
    },[userId]);

    useEffect(() => {
      console.log('Updated posts:', posts);
      // console.log('posts id:', posts[0].id);
    }, [posts]);

    return (
        <div>
          <p>게시글: {posts.id}</p>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
              {/* <h2>{post.title}</h2>
              <p>{post.contents}</p> */}
              <Board key={post.id} post={post}/>
             </li>
            ))}
          </ul>
        </div>
    );
}
export default ReadBoardList;