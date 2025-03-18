'use client';

import { useState } from "react";
import "./Keystore.css";

const headers = { 
  'Content-Type': 'application/json', 
};

export default function KeyStorePage() {
  
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [actions, setActions] = useState<{ action: string; key: string; value?: string }[]>([]);
  const [jsonPreview, setJsonPreview] = useState('Store will appear here');

  const addSetAction = () => {
    if (key && value !== undefined) {
      setActions([...actions, { action: 'set', key, value }]);
      setKey('');
      setValue('');
    }
  };

  const addDeleteAction = () => {
    if (key) {
      setActions([...actions, { action: 'delete', key }]);
      setKey('');
      setValue('');
    }
};

  const getKeyValue = async () => {
    if (key) {
      try {
        const res = await fetch(`/api/keystore?key=${key}`, {
          method: 'GET',
          headers,
        });
        const data = await res.json();
        setValue(data.value);
      } catch (error) {
          console.error('Error retrieving value:', error);
          setValue('');
      }
    }
  };

  const handleCommit = async () => {
    if (actions.length) {
      try {
          const res = await fetch('/api/transaction/commit', {
            method: 'POST',
            headers,
            body: JSON.stringify({ actions }),
          });
          const data = await res.json();
          setJsonPreview(JSON.stringify(data, null, 2));
          setActions([]);
      } catch (error) {
          console.error('Error committing actions:', error);
      }
    }
  };

  const rollback = async() => {
    try {
      const res = await fetch('/api/transaction/rollback', {
        method: 'POST',
        headers,
      });
      const data = await res.json();
      setJsonPreview(JSON.stringify(data, null, 2));
      setActions([]);
    } catch (error) {
        console.error('Error committing actions:', error);
    }
  };

  const preview = async() => {

  };
  
  return (
    <div className="flex space-x-8 p-8">

      {/* First section: Actions user can take */}
      <div className="flex flex-col space-y-4 w-1/3">
        <h2 className="text-lg font-semibold">Actions</h2>
          <div>
            <label className="block text-sm font-medium">Key</label>
            <input className="mt-1 p-2 border border-gray-300 rounded" type="text"
              value={key} onChange={(e) => setKey(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Value</label>
            <input className="mt-1 p-2 border border-gray-300 rounded" type="text"
              value={value} onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div className="flex space-x-2 mt-4">
              <button className="p-2 bg-blue-500 text-white rounded" onClick={addSetAction}>Set</button>
              <button className="p-2 bg-green-500 text-white rounded" onClick={getKeyValue}>Get</button>
              <button className="p-2 bg-red-500 text-white rounded" onClick={addDeleteAction}>Delete</button>
          </div>
      </div>

      {/* Second Section: List of Transactions */}
      <div className="flex flex-col space-y-4 w-1/3">
          <h2 className="text-lg font-semibold">Transactions</h2>
          <ul className="space-y-2">
              {actions.map((action, index) => (
                  <li key={index} className="p-2 border rounded">
                      {action.value ? 
                      (<p>{`${action.action.toUpperCase()} ${action.key}: ${action.value}`}</p>) :
                      (<p>{`${action.action.toUpperCase()} ${action.key}`}</p>)}
                  </li>
              ))}
          </ul>
          <button className="p-2 bg-purple-500 text-white rounded" onClick={handleCommit}>Commit</button>
          <button className="p-2 bg-purple-500 text-white rounded" onClick={rollback}>Rollback</button>
      </div>

      {/* Third Section: JSON Previewer */}
      <div className="flex flex-col w-1/3">
          <h2 className="text-lg font-semibold">JSON Previewer</h2>
          <div className="flex-1 p-4 border rounded overflow-auto previewer">
              <pre>{jsonPreview}</pre>
          </div>
          <button className="p-2 bg-purple-500 text-white rounded" onClick={preview}>Preview</button>
      </div>
  </div>
  );
}
