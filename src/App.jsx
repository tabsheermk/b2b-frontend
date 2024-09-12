import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/Sign-in";
import SignUp from "./pages/Sign-up";


function App() {
    console.log("hello")
  return (
     <Router>
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
