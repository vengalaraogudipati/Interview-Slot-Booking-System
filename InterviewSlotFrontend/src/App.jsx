import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

// =========================
// PAGES
// =========================
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

import CreateSlot from "./pages/CreateSlot";
import ViewSlots from "./pages/ViewSlots";
import MyBookings from "./pages/MyBookings";
import AdminBookings from "./pages/AdminBookings";

// =========================
// ROUTES
// =========================
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* ========================= */}
                {/* PUBLIC ROUTES */}
                {/* ========================= */}

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* ========================= */}
                {/* ADMIN ROUTES */}
                {/* ========================= */}

                <Route
                    path="/admin-dashboard"
                    element={
                        <ProtectedRoute
                            role="ROLE_ADMIN"
                        >

                            <AdminDashboard />

                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/create-slot"
                    element={
                        <ProtectedRoute
                            role="ROLE_ADMIN"
                        >

                            <CreateSlot />

                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin-bookings"
                    element={
                        <ProtectedRoute
                             role="ROLE_ADMIN"
                    >

                              <AdminBookings />

                        </ProtectedRoute>
                   }
               />

                {/* ========================= */}
                {/* USER ROUTES */}
                {/* ========================= */}

                <Route
                    path="/user-dashboard"
                    element={
                        <ProtectedRoute
                            role="ROLE_USER"
                        >

                            <UserDashboard />

                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/view-slots"
                    element={
                        <ProtectedRoute
                            roles={["ROLE_USER", "ROLE_ADMIN"]}
                        >

                            <ViewSlots />

                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/my-bookings"
                    element={
                        <ProtectedRoute
                            role="ROLE_USER"
                        >

                            <MyBookings />

                        </ProtectedRoute>
                    }
                />

                {/* ========================= */}
                {/* PAGE NOT FOUND */}
                {/* ========================= */}

                <Route
                    path="*"
                    element={

                        <h2 className="text-center mt-5">

                            404 - Page Not Found

                        </h2>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;