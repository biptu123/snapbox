import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signin from "./pages/Signin/Signin";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Signup from "./pages/Signup/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/Verify/Verify";
import PrivateRoute from "./components/Routes/Private";
import Dashboard from "./pages/User/Dashboard.jsx";
import AdminRoutes from "./components/Routes/AdminRoutes.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import UsersList from "./pages/Admin/UsersList.jsx";
import Services from "./pages/Services/Services.jsx";
import About from "./pages/About/About.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/signin" Component={Signin} />
        <Route path="/signup" Component={Signup} />
        <Route path="/services" Component={Services} />
        <Route path="/about" Component={About} />
        <Route path="/verify/:token" Component={Verify} />
        <Route path="/" Component={PrivateRoute}>
          <Route path="user" Component={Dashboard} />
        </Route>
        <Route path="/" Component={AdminRoutes}>
          <Route path="admin" Component={AdminDashboard} />
          <Route path="admin/users" Component={UsersList} />
        </Route>
        <Route path="/*" Component={Home} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
