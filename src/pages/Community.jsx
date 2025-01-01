import {useState} from 'react';
// import board from '../components/board'
import BoardWrite from '../components/board'

const Community = () => {
    const [setMessage] = useState('');

    return (
        <div>게시판
            <BoardWrite setMessage={setMessage}/>
        </div>
    )
};

export default Community;