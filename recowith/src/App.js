import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main.jsx";
import Splash from "./pages/Splash/Splash.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Findpw from "./pages/Findpw/Findpw.jsx";
import Write from "./pages/Write/Write.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/splash" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/findpw" element={<Findpw />} />
        <Route path="/write" element={<Write />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
