import {
    useEffect,
    useState
} from "react";

import {
    getAllBookings,
    acceptBooking,
    rejectBooking
} from "../services/slotService";

function AdminBookings() {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const response = await getAllBookings();
            setBookings(response);
        } catch (error) {
            console.log(error);
            alert("Error Fetching Bookings");
        } finally {
            setLoading(false);
        }
    };

    const handleAccept = async (bookingId) => {
        try {
            await acceptBooking(bookingId);
            alert("Booking Accepted");
            fetchBookings();
        } catch (error) {
            console.log(error);
            alert("Error Accepting Booking");
        }
    };

    const handleReject = async (bookingId) => {
        try {
            await rejectBooking(bookingId);
            alert("Booking Rejected");
            fetchBookings();
        } catch (error) {
            console.log(error);
            alert("Error Rejecting Booking");
        }
    };

    return (
        <div className="min-vh-100 bg-light py-5">

            <div className="container">

                <div className="card shadow-lg border-0 rounded-4">

                    <div className="card-header bg-dark text-white text-center rounded-top-4 py-3">
                        <h2 className="mb-0">
                            Manage Bookings
                        </h2>
                    </div>

                    <div className="card-body p-4">

                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-primary"></div>
                                <h5 className="mt-3">
                                    Loading bookings...
                                </h5>
                            </div>
                        ) : bookings.length === 0 ? (
                            <div className="alert alert-danger text-center">
                                No Bookings Found
                            </div>
                        ) : (
                            <div className="table-responsive">

                                <table className="table table-bordered table-hover align-middle text-center">

                                    <thead className="table-dark">
                                        <tr>
                                            <th>ID</th>
                                            <th>User</th>
                                            <th>Email</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {bookings.map((b) => (
                                            <tr key={b.id}>

                                                <td className="fw-bold">
                                                    {b.id}
                                                </td>

                                                <td>
                                                    {b.user?.name}
                                                </td>

                                                <td>
                                                    {b.user?.email}
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

                                                <td>
                                                    {b.status === "PENDING" ? (
                                                        <div className="d-flex justify-content-center gap-2">

                                                            <button
                                                                className="btn btn-success btn-sm px-3"
                                                                onClick={() =>
                                                                    handleAccept(b.id)
                                                                }
                                                            >
                                                                Accept
                                                            </button>

                                                            <button
                                                                className="btn btn-danger btn-sm px-3"
                                                                onClick={() =>
                                                                    handleReject(b.id)
                                                                }
                                                            >
                                                                Reject
                                                            </button>

                                                        </div>
                                                    ) : (
                                                        <span className="badge bg-secondary px-3 py-2">
                                                            Completed
                                                        </span>
                                                    )}
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>

                                </table>

                            </div>
                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AdminBookings;