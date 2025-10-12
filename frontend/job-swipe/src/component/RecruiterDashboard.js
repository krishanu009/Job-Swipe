import React, { useEffect,useState } from "react";
import JobSwipe from './JobSwipe'
import Header from './Header'
import NewJobApplication from "./NewJobApplication";
import Home from "./Home";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import ApplicationSwipe from "./ApplicationSwipe";
import PostedApplication from "./PostedApplication";
import RecruiterJobPostingDashboard from "./RecruiterJobPostingDashboard";
import RecruiterHome from "./RecruiterHome";
import RecruiterProfile from "./RecruiterProfile";
function RecruiterDashboard() {
    const [selectedPage, setSelectedPage] = useState("home");
    const [user,setUser] = useState("");
    const [userInfo,setUserInfo] = useState("");
    const navigate = useNavigate();


    useEffect(()=>{
      if (
        localStorage.getItem('RecruiterToken') == "" ||
        localStorage.getItem('RecruiterToken') == null
      ) {
        navigate("/");
      } else {
        getUser();
      }
    },[]);

    useEffect(() => {
      const token = localStorage.getItem('RecruiterToken');
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
      localStorage.removeItem('RecruiterToken');
      navigate("/");
    }

    const getUser = async () => {
      console.log('RecruiterToken',localStorage.getItem('RecruiterToken'));
      axios
        .get("/user/current", {
          headers: { Authorization: "Bearer " + localStorage.getItem('RecruiterToken') },
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
     await axios.get(process.env.REACT_APP_GET_HR_BY_ID + "/" + id).then((r) => {
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
      <div className="relative z-0">
        {/* {selectedPage === 'job' && <PostedApplication userInfo = {user}></PostedApplication>} */}
        {selectedPage === 'job' && <RecruiterJobPostingDashboard userInfo = {userInfo}></RecruiterJobPostingDashboard>}
        {/* {selectedPage === 'profile' && <NewJobApplication logout={logout} userInfo={userInfo} getUser={getUser}></NewJobApplication>} */}
        {selectedPage === 'profile' && <RecruiterProfile logout={logout} userInfo={userInfo} getUser={getUser}></RecruiterProfile>}
        {selectedPage ==='home' && <RecruiterHome></RecruiterHome>}

      </div>
    </>
  )
}

export default RecruiterDashboard
