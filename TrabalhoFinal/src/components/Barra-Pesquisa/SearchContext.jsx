import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [termoBusca, setTermoBusca] = useState('');

  return (
    <SearchContext.Provider value={{ termoBusca, setTermoBusca }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);