import React from 'react';

const blogs = [
  {
    title: 'React Learning',
    author: 'Stephen Biz',
    description: 'Welcome to learning React!'
  },
  {
    title: 'Installation',
    author: 'Schwezdneier',
    description: 'You can install React from npm.'
  }
];

function BlogDetails() {
  return (
    <div className="column">
      <h2>Blog Details</h2>
      {blogs.map((blog, index) => (
        <div key={index}>
          <strong>{blog.title}</strong><br />
          <em>{blog.author}</em><br />
          <span>{blog.description}</span><br /><br />
        </div>
      ))}
    </div>
  );
}

export default BlogDetails;
