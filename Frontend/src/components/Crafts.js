import React from 'react';

function Crafts({ author, src }) {
  return (
    <div className="gallery-item">
      <img src={src} alt={author} width="250px" />
      <small>
        <p>Made by</p>
        <p>
          <i className="fas fa-user"></i>
          <b>{author}</b>
        </p>
      </small>
    </div>
  );
}

export default Crafts;
