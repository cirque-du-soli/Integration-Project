import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbars/mainNavbar";
import Footer from "../../components/Navbars/footer";
import { AuthContext } from "../../contexts/authContext";

function Main() {
  const { userState, selMosaic } = useContext(AuthContext);
  const [mosaicInfo, setMosaicInfo] = useState({});

  useEffect(() => {
    // Fetch mosaic info
    const fetchMosaicInfo = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/mosaics/byID?id=${selMosaic}`
        );
        console.log(response.data);
        setMosaicInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMosaicInfo();
  }, [selMosaic]);

  return (
    <>
      <div>
        <Navbar username={userState} />
        <h1>{selMosaic}</h1>
        <h1>{mosaicInfo.title}</h1>
        <div className="flex justify-evenly">
          {/* tailwind css ^^^^*/}
          {mosaicInfo.columns.map((column) => (
            <div key={column._id}>
              <h2>{column.title}</h2>
              <button>add new tile</button>
              <div>{/*render tiles*/}</div>
            </div>
          ))}
          <div>
            <button>add new column</button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Main;
