import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Review = ({ review }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Review</h2>
      <ReactMarkdown children={review || "No review available."} remarkPlugins={[remarkGfm]} />
    </div>
  );
};

export default Review;
