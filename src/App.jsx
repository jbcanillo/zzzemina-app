import "./App.css";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserManagement from "./pages/UserManagement";
import SeminarManagement from "./pages/SeminarManagement";
import BookingManagement from "./pages/BookingManagement";
import Bookings from "./pages/Bookings";
import Seminars from "./pages/Seminars";
import Seminar from "./pages/Seminar";

function App() {
  useEffect(() => {
    document.title = "Zzzemina";
  }, []);

  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <div>
            <Routes>
              <Route
                path="/"
                element={
                  <Layout>
                    <Home />
                  </Layout>
                }
              />
                <Route
                path="/login"
                element={
                  <Layout>
                    <Login />
                  </Layout>
                }
              />
              <Route
                path="/register"
                element={
                  <Layout>
                    <Register />
                  </Layout>
                }
              />
              <Route
                path="/manage_users"
                element={
                  <Layout>
                    <UserManagement />
                  </Layout>
                }
              />
              <Route
                path="/manage_seminars"
                element={
                  <Layout>
                    <SeminarManagement />
                  </Layout>
                }
              />
              <Route
                path="/manage_bookings"
                element={
                  <Layout>
                    <BookingManagement />
                  </Layout>
                }
              />
               <Route
                path="/my_bookings"
                element={
                  <Layout>
                    <Bookings />
                  </Layout>
                }
              />
              <Route
                path="/browse_seminars"
                element={
                  <Layout>
                    <Seminars />
                  </Layout>
                }
              />
               <Route
                path="/seminar/:id"
                element={
                  <Layout>
                    <Seminar />
                  </Layout>
                }
              />
              {/* Catch-all Route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
