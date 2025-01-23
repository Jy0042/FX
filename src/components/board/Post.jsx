import React from 'react';
import { good, review, author } from '../../assets';

const Post = ({ post }) => {
  return (
    <div
      className="row align-items-start  bg-light text-dark p-3 mb-2"
      style={{
        height: '250px',
        width: '1000px',
        borderRadius: '8px',
        border: 'groove',
      }}
    >
      <div
        className="col-md-8 d-flex flex-column justify-content-between"
        style={{
          height: '100%',
        }}
      >
        <h4 className="card-title text-start mb-2">{post.title}</h4>
        <p
          className="card-text text-start mb-3 text-align-top"
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            lineHeight: '1.5',
            maxHeight: '4.5em',
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
          <span className="me-3">{post.nickname}</span>

          <span className="me-3"></span>
          {post.updated_at}
        </div>

        <div className="d-flex align-items-center">
          <img src={good} alt="좋아요 아이콘" className="me-1" />
          <span className="me-3">{post.like_count}</span>
          <img src={review} alt="댓글 아이콘" className="me-1" />
          <span>{post.like_count}</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
