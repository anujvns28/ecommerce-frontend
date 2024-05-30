import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const MyComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');

  // Parsing query parameters on component mount
  useEffect(() => {
    const initialCategory = searchParams.get('category');
    setCategory(initialCategory || '');

    const initialSort = searchParams.get('sort');
    setSort(initialSort || '');
  }, [searchParams]);

  // Function to update specific query parameters
  const updateCategory = (newCategory) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (newCategory) {
      newSearchParams.set('category', newCategory);
    } else {
      newSearchParams.delete('category');
    }
    setSearchParams(newSearchParams);
  };

  const updateSort = (newSort) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (newSort) {
      newSearchParams.set('sort', newSort);
    } else {
      newSearchParams.delete('sort');
    }
    setSearchParams(newSearchParams);
  };

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setCategory(newCategory);
    updateCategory(newCategory);
  };

  const handleSortChange = (event) => {
    const newSort = event.target.value;
    setSort(newSort);
    updateSort(newSort);
  };

  return (
    <div>
      <h1>Categories and Sorting</h1>
      <div>
        <h2>Select Category</h2>
        <select value={category} onChange={handleCategoryChange}>
          <option value="">None</option>
          <option value="books">Books</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
        </select>
      </div>

      <div>
        <h2>Sort By</h2>
        <select value={sort} onChange={handleSortChange}>
          <option value="">None</option>
          <option value="price">Price</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>

      
    </div>
  );
};

export default MyComponent;
