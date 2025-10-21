import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    const res = await axios.get('http://localhost:5000/api/branches');
    setBranches(res.data);
  };

  const handleUpdate = async (id, field, value) => {
    const updatedBranch = branches.find(branch => branch.id === id);
    const newValue = { ...updatedBranch, [field]: value };
    await axios.put(`http://localhost:5000/api/branches/${id}`, newValue);
    fetchBranches();
  };

  return (
    <div className="App">
      <h1>Kamala Hydroponics - Daily Tracker</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Branch</th>
            <th>Water Check</th>
            <th>Nutrient Check</th>
            <th>Temp Check</th>
            <th>Issues</th>
            <th>Solution</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {branches.map(branch => (
            <tr key={branch.id}>
              <td>{branch.branch}</td>
              <td>
                <input
                  type="checkbox"
                  checked={branch.water_check}
                  onChange={e => handleUpdate(branch.id, 'water_check', e.target.checked)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={branch.nutrient_check}
                  onChange={e => handleUpdate(branch.id, 'nutrient_check', e.target.checked)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={branch.temp_check}
                  onChange={e => handleUpdate(branch.id, 'temp_check', e.target.checked)}
                />
              </td>
              <td>
                <input
                  value={branch.issues}
                  onChange={e => handleUpdate(branch.id, 'issues', e.target.value)}
                />
              </td>
              <td>
                <input
                  value={branch.solution}
                  onChange={e => handleUpdate(branch.id, 'solution', e.target.value)}
                />
              </td>
              <td>{branch.last_updated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
