
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import RestaurantFinder from "../apis/RestaurantFinder";

const AddReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [rating, setRating] = useState("default");
  const [review, setReview] = useState("");

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post(`/${id}/add-review`, {
        name,
        rating,
        review,
      });
      console.log(response);
      navigate('/');
      // addRestaurant(response.data.data.restaurant);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-2">
      <form>
        <div className="row">
          <div className="form-group col-8">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="name"
              className="form-control"
              value={name}
              onInput={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group col-4">
            <label htmlFor="rating">Rating</label>
            <select
              name="rating"
              id="rating"
              className="custom-select form-select"
              value={rating}
              onInput={(e) => setRating(e.target.value)}
            >
              <option value="default">Select rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="review">Review</label>
          <textarea
            id="review"
            rows="7"
            className="form-control"
            value={review}
            onInput={(e) => setReview(e.target.value)}
          ></textarea>
        </div>
        <button
          onClick={handleSubmitReview}
          className="btn btn-primary"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReview;