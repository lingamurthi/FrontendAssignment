import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReviewsListView from "./Components/ReviewsListView";
import NewReview from "./Components/NewReview";
import EditReview from "./Components/EditReview";

const App = () => {

  return (
    <div>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<ReviewsListView />}></Route>
          <Route path="/new" element={<NewReview />}></Route>
          <Route path="/:id" element={<EditReview />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
};

export default App;
