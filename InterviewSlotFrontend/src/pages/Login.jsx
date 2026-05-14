import { useState } from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    loginUser
} from "../services/AuthService";

function Login() {

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({

        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    // =========================
    // HANDLE INPUT
    // =========================
    const handleChange = (e) => {

        setLoginData({

            ...loginData,

            [e.target.name]:
                e.target.value
        });
    };

    // =========================
    // HANDLE LOGIN
    // =========================
    const handleLogin = async () => {

        if (
            !loginData.email ||
            !loginData.password
        ) {

            alert(
                "Please fill all fields"
            );

            return;
        }

        try {

            setLoading(true);

            const user =
                await loginUser(loginData);

            // SAVE USER
            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

            alert(
                "Login Successful"
            );

            // ROLE BASED NAVIGATION
            if (
                user.role ===
                "ROLE_ADMIN"
            ) {

                navigate(
                    "/admin-dashboard"
                );

            } else {

                navigate(
                    "/user-dashboard"
                );
            }

        } catch (error) {

            console.log(error);

            alert(
                "Invalid Email or Password"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-md-5 col-lg-4">

                        <div className="card shadow-lg border-0 rounded-4">

                            <div className="card-body p-5">

                                {/* TITLE */}
                                <div className="text-center mb-4">

                                    <h1 className="fw-bold text-primary">
                                        Login
                                    </h1>

                                    <p className="text-muted">
                                        Interview Slot Booking Management System
                                    </p>

                                </div>

                                {/* EMAIL */}
                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter Email"
                                        className="form-control form-control-lg"
                                        value={loginData.email}
                                        onChange={handleChange}
                                    />

                                </div>

                                {/* PASSWORD */}
                                <div className="mb-4">

                                    <label className="form-label fw-semibold">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Enter Password"
                                        className="form-control form-control-lg"
                                        value={loginData.password}
                                        onChange={handleChange}
                                    />

                                </div>

                                {/* LOGIN BUTTON */}
                                <button
                                    className="btn btn-primary btn-lg w-100 mb-3"
                                    onClick={handleLogin}
                                    disabled={loading}
                                >

                                    {loading
                                        ? "Logging in..."
                                        : "Login"}

                                </button>

                                {/* REGISTER LINK */}
                                <p className="text-center mb-0">

                                    Don't have an account?

                                    {" "}

                                    <Link
                                        to="/register"
                                        className="fw-bold text-decoration-none"
                                    >
                                        Register
                                    </Link>

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;