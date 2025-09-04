import { useEffect, useState } from "react";
import axios from "axios";

function useFindApi() {
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [findList, setFindList] = useState([]);
  useEffect(() => {
    axios
      .get( "https://data.moa.gov.tw/Service/OpenData/TransService.aspx?UnitId=IFJomqVzyB0i"
      )
      .then((res) => {
      
        setFindList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return { findList, loading, error };
}
export default useFindApi;
