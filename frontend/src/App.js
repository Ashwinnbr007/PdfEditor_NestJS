import './App.css';

function App() {

  async function handleLoad() {
    const url = process.env.REACT_APP_API_URL;
    console.log(url)
    let res = await fetch(url)
    let response = await res.json()
    console.log(response)
  }

  return (
    <div className='main'>
      <span>
        <button onClick={handleLoad}>
          load PDF
        </button>
        <button>
          save PDF
        </button>
      </span>
    </div>
  );
}

export default App;
