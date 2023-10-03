import axios from "axios";
import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [modelData, setModelData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`http://localhost:8000/${url}`);
        setModelData(res.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        console.log("useFetch error: " + err.message);
      }
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`http://localhost:8000/${url}`);
      setModelData(res.data);
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
  };
  return { modelData, isLoading, error, reFetch };
};

export default useFetch;
