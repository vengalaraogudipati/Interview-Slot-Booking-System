import { Link, useNavigate } from "react-router-dom";

function AdminDashboard() {

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
                                <h1 className="fw-bold text-primary mb-3">
                                    Admin Dashboard
                                </h1>

                                <h5 className="mb-2">
                                    Welcome Admin:{" "}
                                    <span className="text-success">
                                        {user?.name}
                                    </span>
                                </h5>

                                <p className="mb-1">
                                    <strong>Email:</strong>{" "}
                                    {user?.email}
                                </p>

                                <p className="mb-0">
                                    <strong>Role:</strong>{" "}
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

                    <div className="col-md-4">

                        <div className="card border-0 shadow-lg rounded-4 h-100 bg-primary text-white">

                            <div className="card-body text-center p-5">

                                <h2 className="fw-bold mb-3">
                                    Create Slot
                                </h2>

                                <p className="mb-4">
                                    Add interview schedules for candidates.
                                </p>

                                <Link
                                    to="/create-slot"
                                    className="btn btn-light btn-lg"
                                >
                                    Create Slot
                                </Link>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="card border-0 shadow-lg rounded-4 h-100 bg-warning text-dark">

                            <div className="card-body text-center p-5">

                                <h2 className="fw-bold mb-3">
                                    View Slots
                                </h2>

                                <p className="mb-4">
                                    Check all created interview slots.
                                </p>

                                <Link
                                    to="/view-slots"
                                    className="btn btn-dark btn-lg"
                                >
                                    View Slots
                                </Link>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="card border-0 shadow-lg rounded-4 h-100 bg-success text-white">

                            <div className="card-body text-center p-5">

                                <h2 className="fw-bold mb-3">
                                    Manage Bookings
                                </h2>

                                <p className="mb-4">
                                    Accept or reject interview bookings.
                                </p>

                                <Link
                                    to="/admin-bookings"
                                    className="btn btn-light btn-lg"
                                >
                                    View Bookings
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;