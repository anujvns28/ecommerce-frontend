import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function MultiValueComponent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Retrieve the 'items' parameter from the URL
    const itemsParam = searchParams.get('items');
    if (itemsParam) {
      setItems(itemsParam.split(',')); // Convert the comma-separated string back to an array
    }
  }, [searchParams]);

  const handleAddItem = (newItem) => {
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    // Update the URL with the new comma-separated string
    setSearchParams({ items: updatedItems.join(',') });
  };

  return (
    <div>
      <h1>Items List</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={() => handleAddItem('NewItem')}>Add Item</button>
    </div>
  );
}

export default MultiValueComponent;
