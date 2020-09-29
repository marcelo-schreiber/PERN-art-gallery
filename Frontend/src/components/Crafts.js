import React from 'react';

function Crafts({ author, src }) {
  return (
    <div className="gallery-item">
      <img src={src} alt={author} width="250px" />
      <small>
        <i className="fas fa-user"></i>&nbsp;&nbsp;
        {author}
      </small>
    </div>
  );
}

export default Crafts;
