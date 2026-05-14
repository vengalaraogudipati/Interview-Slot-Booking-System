import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    getMyBookings
} from "../services/slotService";

function MyBookings() {

    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {

        if (!user?.id) {
            alert("User not found. Please login again.");
            return;
        }

        try {
            setLoading(true);

            const response = await getMyBookings(user.id);

            setBookings(response);

        } catch (error) {
            console.log(error);
            alert("Error Fetching Bookings");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-vh-100 bg-light py-5">

            <div className="container">

                <div className="card shadow-lg border-0 rounded-4">

                    <div className="card-header bg-success text-white text-center rounded-top-4 py-3">

                        <h2 className="mb-0">
                            My Bookings
                        </h2>

                    </div>

                    <div className="card-body p-4">

                        {loading ? (
                            <div className="text-center py-5">

                                <div className="spinner-border text-success"></div>

                                <h5 className="mt-3">
                                    Loading your bookings...
                                </h5>

                            </div>
                        ) : bookings.length === 0 ? (
                            <div className="alert alert-danger text-center">
                                No bookings found
                            </div>
                        ) : (
                            <div className="table-responsive">

                                <table className="table table-bordered table-hover align-middle text-center">

                                    <thead className="table-dark">
                                        <tr>
                                            <th>Booking ID</th>
                                            <th>Slot ID</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {bookings.map((b) => (
                                            <tr key={b.id}>

                                                <td className="fw-bold">
                                                    {b.id}
                                                </td>

                                                <td>
                                                    {b.slot?.id}
                                                </td>

                                                <td>
                                                    {b.slot?.date}
                                                </td>

                                                <td>
                                                    {b.slot?.time}
                                                </td>

                                                <td>
                                                    <span
                                                        className={
                                                            b.status === "APPROVED"
                                                                ? "badge bg-success px-3 py-2"
                                                                : b.status === "REJECTED"
                                                                ? "badge bg-danger px-3 py-2"
                                                                : "badge bg-warning text-dark px-3 py-2"
                                                        }
                                                    >
                                                        {b.status}
                                                    </span>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>

                                </table>

                            </div>
                        )}

                        <div className="text-center mt-4">

                            <button
                                className="btn btn-outline-success px-4"
                                onClick={() =>
                                    navigate("/user-dashboard")
                                }
                            >
                                Back to Dashboard
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default MyBookings;