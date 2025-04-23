import React from 'react';
import '../style/Hotplace.css';

function Hotplace() {
  const places = [
    {
      id: 1,
      image: '/images/img1.jpg',
      tag: '#가족여행'
    },
    {
      id: 2,
      image: '/images/img1.jpg',
      tag: '#바다'
    },
    {
      id: 3,
      image: '/images/img1.jpg',
      tag: '#문화'
    },
    {
      id: 4,
      image: '/images/img1.jpg',
      tag: '#신혼여행'
    },
    {
      id: 5,
      image: '/images/img1.jpg',
      tag: '#체험학습'
    },
    {
      id: 6,
      image: '/images/img1.jpg',
      tag: '#휴양지'
    },
    {
      id: 7,
      image: '/images/img1.jpg',
      tag: '#관광지'
    },
    {
      id: 8,
      image: '/images/img1.jpg',
      tag: '#커플여행'
    },
  ];

  return (
    <div>
      <h1>인기 여행지</h1>
      <div className="image-list">
        {places.map(place => (
          <div key={place.id} className="image-item">
            <img src={place.image} alt="여행지 이미지" className="place-image" />
            <div className="tag">{place.tag}</div>
          </div>
        ))}
      </div>
      <button className="load-more">더보기</button>
    </div>
  );
}

export default Hotplace;
