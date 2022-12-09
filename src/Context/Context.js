import React,{ createContext, useState } from "react";

const LoadContext = createContext();

function LoadProvider({ children }) {
  const [loadList, setLoadList] = useState(false);

  const ChangeLoad = () => {
    setLoadList(!loadList)
  };

  const blabla = {
    loadList,
    ChangeLoad
  };

  return (
    <LoadContext.Provider value={blabla}>
      {children}
    </LoadContext.Provider>
  );
}

export { LoadProvider, LoadContext };