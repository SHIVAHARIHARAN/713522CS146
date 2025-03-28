
import React, { useState } from 'react';
import axios from 'axios';


const API_ENDPOINTS = {
  p: 'http://20.244.56.144/test/primes',
  f: 'http://20.244.56.144/test/fibo',
  r: 'http://20.244.56.144/test/rand',
  e: 'http://20.244.56.144/test/e'      
};


const API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzMTQ5ODQzLCJpYXQiOjE3NDMxNDk1NDMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjRkNGE2MGMwLWQyNGItNGYzNS05NWZmLWI2YmM2OGIwNWYwOCIsInN1YiI6InNoaXZhaGFyaWhhcmFubmFnYXJhakBnbWFpbC5jb20ifSwiY29tcGFueU5hbWUiOiJnb01hcnQiLCJjbGllbnRJRCI6IjRkNGE2MGMwLWQyNGItNGYzNS05NWZmLWI2YmM2OGIwNWYwOCIsImNsaWVudFNlY3JldCI6IlpEdHVtWFJLWHpLeVV0QUoiLCJvd25lck5hbWUiOiJTaGl2YWhhcmloYXJhbiIsIm93bmVyRW1haWwiOiJzaGl2YWhhcmloYXJhbm5hZ2FyYWpAZ21haWwuY29tIiwicm9sbE5vIjoiNzEzNTIyQ1MxNDYifQ.W6mmdyifbA0yzbgyCPyGyCJBxVMj9000PxDxZmCdqSA'; 

const WINDOW_SIZE = 10;

const App = () => {
  const [numberType, setNumberType] = useState('p'); 
  const [numbers, setNumbers] = useState([]);
  const [average, setAverage] = useState(0);

  
  const fetchNumbers = async () => {
    try {
      const url = API_ENDPOINTS[numberType];
      
      
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}` 
        }
      });

      console.log('API Response:', response.data);

    
      if (response.data && response.data.numbers) {
        updateWindow(response.data.numbers);
      } else {
        alert('Invalid data received from API');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to fetch numbers');
    }
  };


  const updateWindow = (newNumbers) => {
    const updatedNumbers = [...numbers, ...newNumbers].slice(-WINDOW_SIZE);
    setNumbers(updatedNumbers);

    const sum = updatedNumbers.reduce((acc, num) => acc + num, 0);
    const avg = sum / updatedNumbers.length;
    setAverage(avg.toFixed(2)); 
  };

  return (
    <div className="container">
      <h2>Average Calculator Microservice</h2>

      <div className="select-container">
        <label>Select Number Type:</label>
        <select value={numberType} onChange={(e) => setNumberType(e.target.value)}>
          <option value="p">Prime Numbers (p)</option>
          <option value="f">Fibonacci Numbers (f)</option>
          <option value="e">Even Numbers (e)</option>
          <option value="r">Random Numbers (r)</option>
        </select>
      </div>

      
      <button onClick={fetchNumbers}>Fetch Numbers</button>

     
      <div className="results">
        <h4> Fetched Numbers:</h4>
        <p>{numbers.join(', ') || 'No numbers yet!'}</p>
      </div>

      
      <div className="average">
        <h4>Average of Last {WINDOW_SIZE} Numbers:</h4>
        <p>{average || '0'}</p>
      </div>
    </div>
  );
};

export default App;
