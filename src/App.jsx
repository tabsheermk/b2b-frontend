import axios from "axios";
import { useContext, useEffect } from "react";
import {Context, server} from "./main";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/Sign-in";
import SignUp from "./pages/Sign-up";
import Header from "./components/Header";


function App() {

  const { isSeller, setUser, setIsAuthenticated, setLoading } = useContext(Context);

  const user = isSeller ? "sellers" : "buyers";

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${server}/api/v1/${user}/me`, { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch((err) => {
        setUser({});
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);


  return (
     <Router>
      <Header />
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/profile" element={<Profile />} />
       <Route path="/sign-in" element={<SignIn />} />
       <Route path="/sign-up" element={<SignUp />} />
     </Routes>
   </Router>
  )
}

export default App
