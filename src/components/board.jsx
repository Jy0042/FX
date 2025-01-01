// import { useEffect, useState } from 'react';

// const board = () => {

// }

// const boardWrite = ({setMessage}) => {

//     const onChangeHandler = (e) => {
//         console.log(e);
//         setMessage(e.target.value);
//     }

//     return (
//         <div>
//             <label>게시글 입력</label>
//             <input 
//                 type="text"
//                 onChange={(e) => onChangeHandler(e)}
//                 placeholder="게시글을 입력하시오"
//             />
//         </div>
//     );
// }

// export default boardWrite;
import React from 'react';
import PropTypes from 'prop-types';

const BoardWrite = ({ setMessage }) => {
  const onChangeHandler = (e) => {
    console.log(e.target.value); // e.target.value만 출력하는 것이 더 유용함
    setMessage(e.target.value);
  };

  return (
    <div>
      <label htmlFor="boardInput">게시글 입력</label>
      <input
        id="boardInput"
        type="text"
        onChange={onChangeHandler} // 직접 전달 가능
        placeholder="게시글을 입력하시오"
      />
    </div>
  );
};

BoardWrite.propTypes = {
  setMessage: PropTypes.func.isRequired, // setMessage가 반드시 함수여야 함
};

export default BoardWrite;