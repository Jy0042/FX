import React, { useState, useRef } from 'react';
import { MdCloudUpload } from 'react-icons/md';

function Uploader({ loadImage }) {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('No Selector file');
  const [isActive, setActive] = useState(false);

  const imgRef = useRef(null);

  const readImage = (file) => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      // if (imgRef.current) {
      //   imgRef.current.src = e.target.result;
      // }
      // setImage(e.target.result);
      // console.log('이미지:', image);
      // loadImage(image);
      const imageSrc = e.target.result; // 로드된 이미지를 변수에 저장
      if (imgRef.current) {
        imgRef.current.src = imageSrc;
      }
      setImage(imageSrc); // 상태 업데이트
      console.log('이미지:', imageSrc); // 로드된 이미지 즉시 출력
      loadImage(imageSrc); // 부모 컴포넌트로 이미지 전달
    };

    reader.readAsDataURL(file);
    // console.log('reader.readAsDataURL(file) : ', reader.readAsDataURL(file));
  };
  const handleDragStart = () => {
    setActive(true);
  };
  const handleDragEnd = () => {
    setActive(false);
  };
  const handleDragOver = (event) => {
    event.preventDefault(); // 필수 1
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    // readImage(file);
    if (file) {
      setFileName(file.name);
      readImage(file);
    }
    setActive(false);
    // 드롭된 파일 핸들링
    // ...
  };

  return (
    <div>
      <div
        onClick={() => document.querySelector('.input-field').click()}
        className={`d-flex flex-column justify-content-center align-items-center rounded p-3 ${
          isActive ? 'active' : ''
        }`}
        onDragEnter={handleDragStart} // dragstart 핸들러 추가
        onDragLeave={handleDragEnd} // dragend 핸들러 추가
        onDragOver={handleDragOver} // dragover 핸들러 추가
        onDrop={handleDrop}
        style={{ height: '260px', width: 'auto', border: 'dotted gray', cursor: 'pointer' }}
      >
        <div>
          <input
            type="file"
            accept="image/*"
            className="input-field"
            hidden
            onChange={({ target: { files } }) => {
              // files[0] && setFileName(files[0].name);
              // if (files) {
              //   setImage(URL.createObjectURL(files[0]));
              // }
              if (files[0]) {
                setFileName(files[0].name);
                readImage(files[0]);
              }
            }}
          />
          {image ? (
            <img src={image} width={690} height={150} alt={fileName} />
          ) : (
            <div className="text-center">
              <MdCloudUpload color="gray" size={50} />
              <p className="text-secondary fs-5">
                사진을 드래그 앤 드롭 하시거나, 클릭하여 업로드하시오
              </p>
              <p className="text-secondary fs-6">PNG, JPG 5MB 이하</p>
            </div>
          )}
        </div>
        {/* </label> */}
      </div>
    </div>
  );
}

export default Uploader;
