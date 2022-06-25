//Components
import "./App.css";
import SignIn from "./components/login/SignIn";
import SignUp from "./components/login/SignUp";
import NavBar from "./components/NavBar";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Accounts from "./components/Accounts/Accounts";
import NotFound from "./components/NotFound";
import Reports from "./components/Reports/Reports";
import AccCateManage from "./components/Manage/AccCateManage";
//Redux
import { getCurrentUserId } from "./store/statusSlice";
import { useSelector } from "react-redux";
//Libraries
import { Route, Routes, Navigate } from "react-router-dom";

function App() {
  const userId = useSelector(getCurrentUserId);
  return (
    <div className="App">
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {userId !== -1 && (
          <Route element={<NavBar />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/manage" element={<AccCateManage />} />
            <Route path="/" element={<NotFound />} />
          </Route>
        )}
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </div>
  );
}

export default App;
