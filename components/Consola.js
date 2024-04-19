import React, { useState } from 'react';
import '../css/web.css';

function App() {
  const [url, setUrl] = useState('');
  const [element, setElement] = useState('');
  const [resultWeb, setElementWeb] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, element }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setElementWeb(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  };

  return (
    <div className="scrape-container">
      <header className="scrape-header">
        <h1 className="scrape-title">Scraped </h1>
        <form onSubmit={handleSubmit} className="scrape-form">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
            required
            className="scrape-input"
          />
          <input
            type="text"
            value={element}
            onChange={(e) => setElement(e.target.value)}
            placeholder="Enter HTML Element format img, h1, h2..."
            required
            className="scrape-input"
          />
          <button type="submit" className="scrape-button">Scrape</button>
        </form>
        <ul className="scrape-list">
          {resultWeb.map((item, index) => (
            element === 'img' ? 
              <li key={index} className="scrape-item"><img src={item} alt={`Scraped image ${index}`} width="300" height="200"/></li> :
              <li key={index} className="scrape-item">{item}</li>
          ))}
        </ul>
      </header>
    </div>
  );
};

export default App;






