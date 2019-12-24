import React, { useEffect, useState } from 'react';
import { fetchImageList } from '../api/s3';

const Photos: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    fetchImageList().then(response => setImages(response));
  }, []);

  return (
    <React.Fragment>
      <div>This is where my photos will go.</div>
      <ul>
        {images.map(name => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Photos;
