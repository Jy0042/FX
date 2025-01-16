import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { good, review, author } from '../../assets';

const Post = ({ post }) => {
  const postTime = new Date(); //작성시간
  // const [isImage, setIsImage] = useState(false);
  // setIsImage(false);
  const isImage = false;

  return (
    <div
      className="row align-items-start  bg-dark text-light p-3"
      style={{ height: '250px', width: '1000px', borderRadius: '8px' }}
    >
      {/* 왼쪽: 제목, 내용, 작성자, 좋아요/댓글 */}
      <div
        className="col-md-8 d-flex flex-column justify-content-between"
        style={{
          height: '100%', // 부모 높이 기준으로 정렬
        }}
      >
        {/* 게시글 영역 */}
        <h4 className="card-title text-start mb-2">{post.title}</h4>
        <p
          className="card-text text-start mb-3 text-align-top"
          style={{
            // padding-top: '100px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3, // Adjust the number of visible lines
            WebkitBoxOrient: 'vertical',
            lineHeight: '1.5',
            maxHeight: '4.5em', // lineHeight * WebkitLineClamp
          }}
        >
          {post.content}
        </p>

        <div className="d-flex align-items-center mb-1">
          <img
            src={author}
            alt="작성자 아이콘"
            className="rounded-circle me-2"
            style={{ width: '30px', height: '30px' }}
          />
          <span className="me-3">작성자</span>

          <span className="me-3">Time </span>
          {post.created_at}
          {/* {new Date(postTime.getTime() + 9 * 60 * 60 * 1000).toLocaleString('ko-KR')} */}
          {/* 우선 현재시간 표시 작성시간 기준으로 ~시간전으로 표시 예정 */}
        </div>

        <div className="d-flex align-items-center">
          <img src={good} alt="좋아요 아이콘" className="me-1" />
          <span className="me-3">{post.like_count}</span>
          <img src={review} alt="댓글 아이콘" className="me-1" />
          <span>{post.like_count}</span>
        </div>
      </div>
      {/* 오른쪽: 이미지 */}
      <div className="col-md-4 d-flex justify-content-end">
        {isImage ? (
          <img
            src="https://via.placeholder.com/150"
            alt="게시글 이미지"
            className="img-fluid"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        ) : (
          <img
          // src="https://via.placeholder.com/150"
          // alt="게시글 이미지"
          // className="img-fluid"
          // style={{ maxWidth: '100%', height: 'auto' }}
          />
        )}
      </div>
    </div>
  );
};

// Post.propTypes = {
//   setMessage: PropTypes.func.isRequired, // setMessage가 반드시 함수여야 함
// };

export default Post;
