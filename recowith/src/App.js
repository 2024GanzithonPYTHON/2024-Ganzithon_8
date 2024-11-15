import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main.jsx";
import Splash from "./pages/Splash/Splash.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/splash" element={<Splash />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
