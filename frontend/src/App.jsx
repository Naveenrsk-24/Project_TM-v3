import { useState, useEffect } from 'react'

function App() {
  const [data, setData] = useState([]);

  useEffect(()=>{
    async function fetchData() {
      console.log(import.meta.env.VITE_API_URL)
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}posts`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
     <h1>Hello</h1>
      <div>
        {data.length > 0 ? (
          data.map((item, index) => (
            <p key={index}>
              {item.title}: {item.body}
            </p>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  )
}

export default App
