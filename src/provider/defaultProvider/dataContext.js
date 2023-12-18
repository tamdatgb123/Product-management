import React from "react";

const DataContext = React.createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/data");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Get data failed", error);
      }
    };
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>
  );
};

export const useData = () => {
  return React.useContext(DataContext);
};
