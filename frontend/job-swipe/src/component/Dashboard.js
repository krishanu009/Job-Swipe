import React, { useEffect,useState } from "react";
import JobSwipe from './JobSwipe'
import Header from './Header'
import NewJobApplication from "./NewJobApplication";
import Home from "./Home";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
function Dashboard() {
    const [selectedPage, setSelectedPage] = useState("home");
    const [user,setUser] = useState("");
    const [userInfo,setUserInfo] = useState("");
    const navigate = useNavigate();


    useEffect(()=>{
      if (
        localStorage.getItem("token") == "" ||
        localStorage.getItem("token") == null
      ) {
        navigate("/");
      } else {
        getUser();
      }
    },[]);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        // fetchAndSetLocalData();
        const expirationTime = getTokenExpiration(token);
        // console.log("expirationTime",expirationTime);
        if (expirationTime) {
          const currentTime = Date.now();
          const timeLeft = expirationTime - currentTime;
          // console.log("time left",timeLeft);
          if (timeLeft > 0) {
            // Set a timeout to log the user out when the token expires
            setTimeout(() => {
              logout();
            }, timeLeft);
          } else {
            logout(); // Token already expired
          }
        }
      }
    }, []);
    const logout = () => {
      localStorage.removeItem("token");
      navigate("/");
    }

    const getUser = async () => {
      console.log("token",localStorage.getItem("token"));
      axios
        .get("/user/current", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((r) => {

          console.log(r.data)
          setUser(r.data);
          getUserInfo(r.data.id);
         

        })
        .catch((e) => {
          console.log(e);
          // navigate("/");
        });
    };
  
    const getUserInfo =  async (id) => {
     await axios.get(process.env.REACT_APP_GET_USER_BY_ID + "/" + id).then((r) => {
      console.log("getUserInfo",r.data);
      setUserInfo(r.data);
    })
    .catch((e) => {
      console.log("getUserInfo err",e);
      
    });
    }

    const getTokenExpiration = (token) => {
      const decoded = jwtDecode(token);
      if (!decoded.exp) {
        return null;
      }
      //console.log("decoded",decoded);
      return decoded.exp * 1000; // exp is in seconds, convert to milliseconds
    };
  return (
    <>
      <div className="sticky top-0 z-10">
        <Header selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
      </div>
      <div className="p-8 relative z-0">
        {selectedPage === 'job' && <JobSwipe />}
        {selectedPage === 'profile' && <NewJobApplication logout={logout} userInfo={userInfo} getUser={getUser}></NewJobApplication>}
        {selectedPage ==='home' && <Home></Home>}
      </div>
    </>
  )
}

export default Dashboard
