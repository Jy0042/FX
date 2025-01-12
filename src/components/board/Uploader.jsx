import React, { useState, useRef } from 'react';
import { MdCloudUpload } from 'react-icons/md';

function Uploader() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('No Selector file');
  const [isActive, setActive] = useState(false);

  const imgRef = useRef(null);

  const readImage = (file) => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      if (imgRef.current) {
        imgRef.current.src = e.target.result;
      }
      setImage(e.target.result);
    };

    reader.readAsDataURL(file);
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
    <main>
      <form
        onClick={() => document.querySelector('.input-field').click()}
        className={`d-flex flex-column justify-content-center align-items-center rounded p-3 ${
          isActive ? 'active' : ''
        }`}
        onDragEnter={handleDragStart} // dragstart 핸들러 추가
        onDragLeave={handleDragEnd} // dragend 핸들러 추가
        onDragOver={handleDragOver} // dragover 핸들러 추가
        onDrop={handleDrop}
        style={{ height: '260px', width: '690px', border: 'dotted gray', cursor: 'pointer' }}
      >
        <div>
          <input
            type="file"
            accept="image/*"
            className="input-field"
            hidden
            onChange={({ target: { files } }) => {
              files[0] && setFileName(files[0].name);
              if (files) {
                setImage(URL.createObjectURL(files[0]));
              }
            }}
          />
          {image ? (
            <img src={image} width={690} height={150} alt={fileName} />
          ) : (
            <div className="text-center">
              <MdCloudUpload color="gray" size={50} />
              <p className="text-secondary fs-5">Drag and drop an image here, or click to select</p>
              <p className="text-secondary fs-6">PNG, JPG up to 5MB</p>
            </div>
          )}
        </div>
        {/* </label> */}
      </form>
    </main>
  );
}

export default Uploader;
