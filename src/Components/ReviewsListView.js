import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ReviewsListView = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000');
    
    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const updatedReviews = JSON.parse(event.data);
      setReviews(updatedReviews);
      console.log(reviews);
    };

    ws.onclose = () => {
      console.log('WebSocket closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleDelete = (id) => {
    // Implement delete functionality
    // Send a message to the WebSocket server indicating the review to be deleted
  };

  return (
    <div>
      <h2>All Reviews</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Content</th>
            <th>Date-time</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, index) => (
            <tr key={review._id}>
              <td>{index + 1}</td>
              <td>{review.title}</td>
              <td>{review.content}</td>
              <td>{review.datetime}</td>
              <td>
                <Link to={`/${review._id}`}>Edit</Link>
              </td>
              <td>
                <button onClick={() => handleDelete(review._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      <Link to="/new"><button>New Review</button></Link>  
      </div>
    </div>
  );
}

export default ReviewsListView