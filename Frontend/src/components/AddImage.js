import React, { useState } from 'react';

function AddImage({ canvas, context }) {
  const [author, setAuthor] = useState('');
  const saveImage = async () => {
    try {
      const url = canvas.current.toDataURL('image/jpeg', 0.4);
      const body = { img: url, author: author };
      await fetch(`/gallery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      context.clearRect(0, 0, canvas.width, canvas.height);
      setAuthor('');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={saveImage}>
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        minLength="3"
        maxLength="10"
        placeholder="Author"
        required
      />
      <button type="submit" value="Submit">
        <i className="fas fa-plus-square"></i> Gallery
      </button>
    </form>
  );
}

export default AddImage;
