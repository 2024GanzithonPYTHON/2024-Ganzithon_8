import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/fonts/font.css";
import Main from "./pages/Main/Main.jsx";
import Splash from "./pages/Splash/Splash.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Findpw from "./pages/Findpw/Findpw.jsx";
import Write from "./pages/Write/Write.jsx";
import AiMessage from './pages/AiMessage/AiMessage';
import Community from './pages/Community/Community';
import DiaryCompare from './pages/DiaryCompare/DiaryCompare';
import DiaryReview from './pages/DiaryReview/DiaryReview';
import RecordSee from './pages/Community/RecordSee';


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
        <Route path="/ai-message" element={<AiMessage />} />
        <Route path="/community" element={<Community />} />
        <Route path="/record-see" element={<RecordSee />} />
        <Route path="/diary-compare" element={<DiaryCompare />} />
        <Route path="/diary-review" element={<DiaryReview />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
