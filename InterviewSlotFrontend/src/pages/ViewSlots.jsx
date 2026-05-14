import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    getAllSlots,
    bookSlot,
    deleteSlot
} from "../services/slotService";

function ViewSlots() {

    const navigate = useNavigate();

    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(false);

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const isAdmin =
        user?.role === "ROLE_ADMIN";

    useEffect(() => {
        fetchSlots();
    }, []);

    const fetchSlots = async () => {
        try {
            setLoading(true);

            const response = await getAllSlots();

            setSlots(response);

        } catch (error) {
            console.log(error);
            alert("Error Fetching Slots");
        } finally {
            setLoading(false);
        }
    };

    const handleBookSlot = async (slotId) => {
        try {
            if (!user?.id) {
                alert("Please login again");
                return;
            }

            await bookSlot(slotId, user.id);

            alert("Slot Booked Successfully");

            fetchSlots();

        } catch (error) {
            console.log(error);

            alert(
                error.response?.data ||
                "Error Booking Slot"
            );
        }
    };

    const handleDeleteSlot = async (slotId) => {
        try {
            const confirmDelete =
                window.confirm(
                    "Are you sure you want to delete this slot?"
                );

            if (!confirmDelete) {
                return;
            }

            await deleteSlot(slotId);

            alert("Slot Deleted Successfully");

            fetchSlots();

        } catch (error) {
            console.log(error);

            alert(
                error.response?.data ||
                "Error Deleting Slot"
            );
        }
    };

    const goBack = () => {
        if (isAdmin) {
            navigate("/admin-dashboard");
        } else {
            navigate("/user-dashboard");
        }
    };

    return (
        <div className="min-vh-100 bg-light py-5">

            <div className="container">

                <div className="card shadow-lg border-0 rounded-4">

                    <div className="card-header bg-primary text-white text-center rounded-top-4 py-3">
                        <h2 className="mb-0">
                            Interview Slots
                        </h2>
                    </div>

                    <div className="card-body p-4">

                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-primary"></div>

                                <h5 className="mt-3">
                                    Loading slots...
                                </h5>
                            </div>
                        ) : slots.length === 0 ? (
                            <div className="alert alert-danger text-center">
                                No Slots Available
                            </div>
                        ) : (
                            <div className="table-responsive">

                                <table className="table table-bordered table-hover align-middle text-center">

                                    <thead className="table-dark">
                                        <tr>
                                            <th>ID</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {slots.map((slot) => (
                                            <tr key={slot.id}>

                                                <td className="fw-bold">
                                                    {slot.id}
                                                </td>

                                                <td>{slot.date}</td>

                                                <td>{slot.time}</td>

                                                <td>
                                                    <span
                                                        className={
                                                            slot.available
                                                                ? "badge bg-success px-3 py-2"
                                                                : "badge bg-danger px-3 py-2"
                                                        }
                                                    >
                                                        {slot.available
                                                            ? "Available"
                                                            : "Booked"}
                                                    </span>
                                                </td>

                                                <td>
                                                    {isAdmin ? (
                                                        <button
                                                            className="btn btn-danger px-4"
                                                            onClick={() =>
                                                                handleDeleteSlot(slot.id)
                                                            }
                                                        >
                                                            Delete
                                                        </button>
                                                    ) : slot.available ? (
                                                        <button
                                                            className="btn btn-success px-4"
                                                            onClick={() =>
                                                                handleBookSlot(slot.id)
                                                            }
                                                        >
                                                            Book
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="btn btn-secondary px-4"
                                                            disabled
                                                        >
                                                            Booked
                                                        </button>
                                                    )}
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>

                                </table>

                            </div>
                        )}

                        <div className="text-center mt-4">

                            <button
                                className="btn btn-outline-primary px-4"
                                onClick={goBack}
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

export default ViewSlots;