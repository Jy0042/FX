import React, { useState, useEffect, useRef } from 'react';
import '../styles/App.css'; // CSS를 별도 파일로 관리
// import { useNavigate } from 'react-router-dom';

const InfiniteScroll = () => {
  const [items, setItems] = useState([]); // 현재 화면에 표시되는 아이템
  const [start, setStart] = useState(0); // 시작 인덱스
  const [end, setEnd] = useState(20); // 끝 인덱스
  const [loading, setLoading] = useState(false); // 로딩 상태
  const containerRef = useRef(null); // 컨테이너 참조
  const maxItemsOnScreen = 100; // 한 화면에 표시될 아이템 개수
  const itemsPerLoad = 20; // 한 번에 불러올 데이터 수

  // const navigate = useNavigate();

  // 데이터 로드 함수
  const fetchData = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/community?start=${start}&end=${end}`
      );
      const newData = await response.json();

      // 새로운 아이템 추가
      setItems((prevItems) => [...prevItems, ...newData]);

      // 다음 데이터 범위 설정
      setStart(end);
      setEnd(end + itemsPerLoad);

      // 오래된 데이터 삭제
      if (containerRef.current.children.length > maxItemsOnScreen) {
        setItems((prevItems) => prevItems.slice(-maxItemsOnScreen));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // 이전 데이터 로드 함수
  const fetchPrevData = async () => {
    if (loading) return;

    const firstItem = items[0];
    const pend = firstItem ? parseInt(firstItem.replace('Item ', '')) - 1 : 0;
    const pstart = pend - itemsPerLoad;

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/community?start=${start}&end=${end}`
      );
      const newData = await response.json();

      // 새로운 아이템 추가
      setItems((prevItems) => [...newData, ...prevItems]);

      // 오래된 데이터 삭제
      if (containerRef.current.children.length > maxItemsOnScreen) {
        setItems((prevItems) => prevItems.slice(0, maxItemsOnScreen));
      }

      // 스크롤 위치 조정
      const firstItemHeight = containerRef.current.firstChild.clientHeight;
      const beforeLoadingPos = firstItemHeight * newData.length;
      window.scrollTo(0, beforeLoadingPos);
    } catch (error) {
      console.error('Error fetching previous data:', error);
    } finally {
      setLoading(false);
    }
  };

  // 스크롤 이벤트 처리
  useEffect(() => {
    const handleScroll = () => {
      if (!loading && window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        fetchData();
      } else if (!loading && window.scrollY === 0) {
        fetchPrevData();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, start, end]);

  return (
    <div>
      <h1>무한 스크롤 테스트</h1>
      <p>여기는 본문</p>
      <div id="scroll-container" ref={containerRef}>
        {items.map((item, index) => (
          <div key={index} className="item">
            {item}
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default InfiniteScroll;
