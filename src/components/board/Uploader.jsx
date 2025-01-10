import React, { useState } from 'react';
import { MdCloudUpload } from 'react-icons/md';

function Uploader() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('No Selector file');

  return (
    <main>
      <form
        onClick={() => document.querySelector('.input-field').click()}
        className="d-flex flex-column justify-content-center align-items-center rounded p-3"
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
      </form>
    </main>
  );
}

export default Uploader;
