import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

function StarRating({ rating, reviewCount }) {
  
  const stars = [];
  

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<FaStar key={i} color="#ffc107" />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {

      stars.push(<FaStarHalfAlt key={i} color="#ffc107" />);
    } else {
      stars.push(<FaRegStar key={i} color="#e4e5e9" />);
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {stars}
      {reviewCount && (
        <span style={{ marginLeft: '8px', fontSize: '0.9rem', color: '#666' }}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
}

export default StarRating;