import React from "react";

const StarRating = ({ rating, quantity }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<i className="fas fa-star"></i>);
    } else if (i > rating && i - 1 < rating) {
      stars.push(<i className="fas fa-star-half-alt"></i>);
    } else {
      stars.push(<i className="far fa-star"></i>);
    }
  }
  return (
    <>
      <span className="text-warning">
        {stars.map((star, i) => (
          <span key={i}>{star}</span>
        ))}
        <span className="fw-bold fs-5">{quantity ? ` (${quantity})` : ""}</span>
      </span>
    </>
  );
};

export default StarRating;