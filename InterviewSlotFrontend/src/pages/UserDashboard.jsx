import { Link, useNavigate } from "react-router-dom";

function UserDashboard() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="min-vh-100 bg-light py-5">

            <div className="container">

                <div className="card shadow-lg border-0 rounded-4 mb-4">

                    <div className="card-body p-5">

                        <div className="d-flex justify-content-between align-items-center flex-wrap">

                            <div>
                                <h1 className="fw-bold text-success mb-3">
                                    User Dashboard
                                </h1>

                                <h5 className="mb-2">
                                    Welcome:
                                    {" "}
                                    <span className="text-primary">
                                        {user?.name}
                                    </span>
                                </h5>

                                <p className="mb-1">
                                    <strong>Email:</strong>
                                    {" "}
                                    {user?.email}
                                </p>

                                <p className="mb-0">
                                    <strong>Role:</strong>
                                    {" "}
                                    {user?.role}
                                </p>
                            </div>

                            <div className="mt-3 mt-md-0">
                                <button
                                    className="btn btn-danger px-4"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>

                        </div>

                    </div>

                </div>

                <div className="row g-4">

                    <div className="col-md-6">

                        <div className="card border-0 shadow-lg rounded-4 h-100 bg-primary text-white">

                            <div className="card-body text-center p-5">

                                <h2 className="fw-bold mb-3">
                                    View Slots
                                </h2>

                                <p className="mb-4">
                                    Check available interview slots and book your preferred time.
                                </p>

                                <Link
                                    to="/view-slots"
                                    className="btn btn-light btn-lg"
                                >
                                    View Slots
                                </Link>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-6">

                        <div className="card border-0 shadow-lg rounded-4 h-100 bg-success text-white">

                            <div className="card-body text-center p-5">

                                <h2 className="fw-bold mb-3">
                                    My Bookings
                                </h2>

                                <p className="mb-4">
                                    View your interview booking status and details.
                                </p>

                                <Link
                                    to="/my-bookings"
                                    className="btn btn-light btn-lg"
                                >
                                    My Bookings
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default UserDashboard;