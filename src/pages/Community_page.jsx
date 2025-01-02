import {useState} from 'react';
import Board from '../components/board/board'
import SearchBox from '../components/board/search_box'

const Community = () => {
    const [message, setMessage] = useState('');

    return (
        // <div>
        //     <div className="position-absolute top-0 start-50 translate-middle-x">
        //     </div>
        //     {/* 헤더때문에 하나 div 줘야 글자가 보임 */}
        //     <div className="position-absolute top-0 start-50 translate-middle-x">
        //         <h1 className="display-4 font-weight-bold text-center mt-5">커뮤니티 페이지</h1>
        //         <SearchBox/>
        //         <div className="container w-100 mx-auto"  style={{ maxWidth: '1440px', margin: '0 auto' }}>
        //             <Board setMessage={setMessage}/>
        //         </div>
        //     </div>
        // </div>
        <div className="community-container" style={{ maxWidth: '1440px', margin: '0 auto', padding: '20px' }}>
  <div className="position-absolute top-0 start-50 translate-middle-x">
    <h1 className="display-4 font-weight-bold text-center mt-5">커뮤니티 페이지</h1>
    <SearchBox />
    <div className="container">
      <Board setMessage={setMessage} />
    </div>
  </div>
</div>
    )
};

export default Community;
