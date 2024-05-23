import React, { useEffect, useState } from 'react'


const NewReview = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ title: '', content: '' });

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000');

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('messageeeeee'+message);
      if (message.type === 'reviews') {
        setReviews(message.reviews);
      } else if (message.type === 'addReview') {
        setReviews([...reviews, message.review]);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket closed');
    };

    return () => {
      ws.close();
    };
  }, [reviews]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleSubmit = () => {
    // Send a WebSocket message to add a new review
    const ws = new WebSocket('ws://localhost:8000');
    console.log('newReviewwwwwwwww'+newReview.title +' '+newReview.content);
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'addReview', review: newReview }));
    };
  };
  return (
    <div className="App">
    <h1>Reviews</h1>
    <ul>
      {reviews.map((review) => (
        <li key={review._id}>
          <strong>{review.title}</strong>: {review.content}
        </li>
      ))}
    </ul>
    <div>
      <h2>Add Review</h2>
      <input type="text" name="title" value={newReview.title} onChange={handleChange} placeholder="Title" />
      <input type="text" name="content" value={newReview.content} onChange={handleChange} placeholder="Content" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  </div>

  )
}

export default NewReview