import {useState} from "react";
import PostBoard from "../components/board/postboard";

const WritePage = () => {
    // let [inputCount, setInputCount] = useState(0);
    // let [textCount, setTextareaCount] = useState(0);

    // const textCounter = (e) => {    //textarea에 입력한 글자 세는 함수
    //     setTextareaCount(e.target.value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, "$&$1$2").length);
    //     //한글일 경우 3Byte, 그외 1Byte로 계산
    // }

    // const inputCounter = (e) => {   //input에 입력한 글자 세는 함수
    //     setInputCount(e.target.value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, "$&$1$2").length);
    // }
    return(
        <div>
            {/* <input
                type="text"
                placeholder="Enter hour title here..."
                className="form-control mb-3 " // 가로 길이를 늘림
                onChange={inputCounter}
            />
            <h6>{inputCount}/100</h6>
            <textarea
                placeholder="Write your content here..."
                className="form-control mb-3 "
                rows="10" // 높이를 조정
                onChange={textCounter}
            />
            <h6>{textCount}words</h6>
            <button className="btn btn-outline-secondary">Cancel</button>
            <button className="btn btn-primary">Publish</button> */}
            <PostBoard/>
        </div>
    );
}

export default WritePage;