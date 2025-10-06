'use client'

import { useState, useEffect } from 'react'

export default function TestFetching() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      console.log(process.env.NEXT_PUBLIC_API_URL)
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}products`);
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