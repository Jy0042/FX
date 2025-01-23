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
      const imageSrc = e.target.result;
      if (imgRef.current) {
        imgRef.current.src = imageSrc;
      }
      setImage(imageSrc);
      loadImage(imageSrc);
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
    event.preventDefault();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      readImage(file);
    }
    setActive(false);
  };

  return (
    <div>
      <div
        onClick={() => document.querySelector('.input-field').click()}
        className={`d-flex flex-column justify-content-center align-items-center rounded p-3 ${
          isActive ? 'active' : ''
        }`}
        onDragEnter={handleDragStart}
        onDragLeave={handleDragEnd}
        onDragOver={handleDragOver}
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
      </div>
    </div>
  );
}

export default Uploader;
