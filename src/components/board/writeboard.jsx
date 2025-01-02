import { useState } from 'react';

const WriteBoard = () => {
    // const {user} 
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async(e) => {
        if (!title.trim() || !content.trim()) {
            setErrorMessage('제목과 내용을 모두 입력해주세요.');
            return;
        }

    }
    return (
        <form onSubmit={handleSubmit} className='mb-4'></form>
    );
}

export default WriteBoard;