import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EachArticle = () => {
  const { id } = useParams();
  const [eachArticle, setEachArticle] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/article/${id}`
      );
      setEachArticle(response.data.data);
    };

    fetchData();
  }, []);

  return <div>{eachArticle._id}</div>;
};

export default EachArticle;
