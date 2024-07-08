import { io } from "socket.io-client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chats from "./pages/Chats";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Invalid404Err from "./pages/Invalid404Err";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AppContextProvider } from "./context/AppContext";
import Friends from "./pages/Friends";
import About from "./pages/About";
import Download from "./pages/Download";
import Privacy from "./pages/Privacy";
import ProtectedRoute from "./components/ProtectedRoute";
import Disliked from "./pages/Disliked";
import Contact from "./pages/Contact";

const server = io(`${import.meta.env.VITE_BACKEND_URL}`);

const App = () => {
  return (
    <>
      <AppContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/chats"
              element={
                <ProtectedRoute>
                  <Chats />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/friends"
              element={
                <ProtectedRoute>
                  <Friends />
                </ProtectedRoute>
              }
            />
              <Route
              path="/profile/disliked"
              element={
                <ProtectedRoute>
                  <Disliked/>
                </ProtectedRoute>
              }
            />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/about" element={<About />} />
            <Route path="/download" element={<Download />} />

            <Route path="/register" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            <Route path="/*" element={<Invalid404Err />} />
          </Routes>
          <Footer />
        </Router>
      </AppContextProvider>
    </>
  );
};

export default App;
