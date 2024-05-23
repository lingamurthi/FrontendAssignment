import React, { useState } from 'react';

const EditReview = ({ review, onUpdate }) => {
  const [editedReview, setEditedReview] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedReview({ ...editedReview, [name]: value });
  };

  const handleSubmit = () => {
    // Send update request to WebSocket server
    const updateMessage = {
      type: 'updateReview',
      review: {
        id: review._id,
        title: editedReview.title,
        content: editedReview.content
      }
    };
    onUpdate(updateMessage);
  };

  return (
    <div className="App">
      <h2>Edit Review</h2>
      <input type="text" name="title" value={editedReview.title || review.title} onChange={handleChange} placeholder="Title" />
      <input type="text" name="content" value={editedReview.content || review.content} onChange={handleChange} placeholder="Content" />
      <button onClick={handleSubmit}>Update</button>
    </div>
  );
};

export default EditReview;
