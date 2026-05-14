import { useState } from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    registerUser
} from "../services/AuthService";

function Register() {

    const navigate = useNavigate();

    const [user, setUser] = useState({

        name: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    // =========================
    // HANDLE INPUT
    // =========================
    const handleChange = (e) => {

        setUser({

            ...user,

            [e.target.name]:
                e.target.value
        });
    };

    // =========================
    // HANDLE REGISTER
    // =========================
    const handleRegister = async () => {

        if (
            !user.name ||
            !user.email ||
            !user.password
        ) {

            alert(
                "Please fill all fields"
            );

            return;
        }

        try {

            setLoading(true);

            await registerUser(user);

            alert(
                "Registration Successful"
            );

            setUser({

                name: "",
                email: "",
                password: ""
            });

            setTimeout(() => {

                navigate("/login");

            }, 1000);

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data ||
                "Registration Failed"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-md-5 col-lg-4">

                        <div className="card shadow-lg border-0 rounded-4">

                            <div className="card-header bg-success text-white text-center rounded-top-4 py-3">

                                <h2 className="mb-0">
                                    Register
                                </h2>

                            </div>

                            <div className="card-body p-5">

                                {/* NAME */}
                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter Name"
                                        className="form-control form-control-lg"
                                        value={user.name}
                                        onChange={handleChange}
                                    />

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
                                        value={user.email}
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
                                        value={user.password}
                                        onChange={handleChange}
                                    />

                                </div>

                                {/* REGISTER BUTTON */}
                                <button
                                    className="btn btn-success btn-lg w-100 mb-3"
                                    onClick={handleRegister}
                                    disabled={loading}
                                >

                                    {loading
                                        ? "Registering..."
                                        : "Register"}

                                </button>

                                {/* LOGIN LINK */}
                                <p className="text-center mb-0">

                                    Already have an account?

                                    {" "}

                                    <Link
                                        to="/login"
                                        className="fw-bold text-decoration-none"
                                    >
                                        Login
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

export default Register;