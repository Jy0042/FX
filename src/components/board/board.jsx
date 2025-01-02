import React, {useState} from 'react';
import PropTypes from 'prop-types';
import review from '../../assets/review.png'
import good from '../../assets/good.png'
import author from '../../assets/author.png'

const Board = ({ setMessage }) => {
  const [title, setTitle] = useState(setMessage.title);
  const onChangeHandler = (e) => {
    console.log(e.target.value); // e.target.value만 출력하는 것이 더 유용함
    setMessage(e.target.value);
  };

  return (
    <div className="row align-items-start  bg-dark text-light"> {/* Flex container */}
    {/* 왼쪽: 제목, 내용, 작성자, 좋아요/댓글 */}
    <div className="col-md-8"> {/* 게시글 영역 */}
      <input
        type="text"
        placeholder="제목을 입력하세요"
        className="form-control mb-3 bg-dark text-light border-secondary" // 가로 길이를 늘림
        onChange={onChangeHandler}
      />
      <textarea
        placeholder="내용을 입력하세요"
        className="form-control mb-3 bg-dark text-light border-secondary"
        rows="3" // 높이를 조정
        onChange={onChangeHandler}
      ></textarea>
      <div className="d-flex align-items-center mb-2">
        <img src={author} alt="작성자 아이콘" className="me-2"/>
        작성자
      </div>
      <div className="d-flex align-items-center">
        <img src={good} alt="좋아요 아이콘" className="me-1" />
        <span className="me-3">좋아요</span>
        <img src={review} alt="댓글 아이콘" className="me-1" />
        <span>댓글</span>
      </div>
    </div>

    {/* 오른쪽: 이미지 */}
    <div className="col-md-4 d-flex justify-content-center">
      <img
        src="https://via.placeholder.com/150"
        alt="게시글 이미지"
        className="img-fluid"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  </div>
  );
};

Board.propTypes = {
  setMessage: PropTypes.func.isRequired, // setMessage가 반드시 함수여야 함
};

export default Board;