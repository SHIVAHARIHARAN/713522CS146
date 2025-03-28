import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [userData, setuserData] = useState({});

  useEffect(() => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const apiToken = import.meta.env.VITE_API_TOKEN;

    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${apiToken}`, 
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log('API Response:', response.data); 
        setuserData(response.data.users || {}); 
      })
      .catch((error) => {
        console.error(
          'Error fetching data:',
          error.response?.data || error.message
        );
      });
  }, []);

  return (
    <div>
      <h1>Users Data</h1>
      {Object.keys(userData).length > 0 ? (
        <ul>
          {Object.keys(userData).map((key) => (
            <li key={key}>
              <strong>ID:</strong> {key} <br />
              <strong>Name:</strong> {userData[key]}
            </li>
          ))}
        </ul>
      ) : (
        <p>No data found here</p>
      )}
    </div>
  );
};

export default App;
