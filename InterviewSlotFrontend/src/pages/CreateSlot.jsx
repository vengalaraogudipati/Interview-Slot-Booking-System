import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createSlot } from "../services/slotService";

function CreateSlot() {

    const navigate = useNavigate();

    const [slot, setSlot] = useState({
        date: "",
        time: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setSlot({
            ...slot,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {

        if (!slot.date || !slot.time) {
            alert("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            const slotData = {
                date: slot.date,
                time: slot.time + ":00"
            };

            await createSlot(slotData);

            alert("Slot Created Successfully");

            setSlot({
                date: "",
                time: ""
            });

            setTimeout(() => {
                navigate("/admin-dashboard");
            }, 1000);

        } catch (error) {
            console.log(error);

            alert(
                error.response?.data ||
                "Server Error"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-vh-100 bg-light py-5">

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-md-6 col-lg-5">

                        <div className="card shadow-lg border-0 rounded-4">

                            <div className="card-header bg-primary text-white text-center rounded-top-4 py-3">

                                <h2 className="mb-0">
                                    Create Interview Slot
                                </h2>

                            </div>

                            <div className="card-body p-5">

                                <div className="mb-4">

                                    <label className="form-label fw-semibold">
                                        Select Date
                                    </label>

                                    <input
                                        type="date"
                                        name="date"
                                        className="form-control form-control-lg"
                                        value={slot.date}
                                        onChange={handleChange}
                                        min={
                                            new Date()
                                                .toISOString()
                                                .split("T")[0]
                                        }
                                    />

                                </div>

                                <div className="mb-4">

                                    <label className="form-label fw-semibold">
                                        Select Time
                                    </label>

                                    <input
                                        type="time"
                                        name="time"
                                        className="form-control form-control-lg"
                                        value={slot.time}
                                        onChange={handleChange}
                                    />

                                </div>

                                <button
                                    className="btn btn-primary btn-lg w-100"
                                    onClick={handleSubmit}
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Creating..."
                                        : "Create Slot"}
                                </button>

                                <button
                                    className="btn btn-outline-secondary btn-lg w-100 mt-3"
                                    onClick={() =>
                                        navigate("/admin-dashboard")
                                    }
                                >
                                    Back to Dashboard
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default CreateSlot;