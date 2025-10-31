import { useState } from 'react'
import myImage1 from './pic1.jpg' // Adjust the path as needed
import myImage2 from './pic2.png' // Adjust the path as needed
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  // Inline style object for big background image div
  const bigImageStyle = {
    backgroundImage: `url(${myImage1})`,
    width: '300px',
    height: '300px',
    margin: '0 auto 20px',
    borderRadius: '8px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
  <div
    className="big-image"
    style={bigImageStyle}
    aria-label="My first image"
    role="img"
  />
</a>

        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={myImage2} alt="My second image" className="logo" />
        </a>
      </div>

      <h1>Welcome!</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <p>Let's build something cool together!</p>
      </div>

      <p className="read-the-docs">
        Click on the images above to learn more
      </p>
    </>
  )
}

export default App
