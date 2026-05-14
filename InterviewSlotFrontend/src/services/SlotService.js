import api from "./api";


// CREATE SLOT (ADMIN)

export const createSlot = async (
    slotData
) => {

    try {

        const response =
            await api.post(
                "/slots",
                slotData
            );

        return response.data;

    } catch (error) {

        console.error(
            "Create Slot Error:",
            error.response?.data ||
            error.message
        );

        throw error;
    }
};


// GET ALL SLOTS (USER)

export const getAllSlots = async () => {

    try {

        const response =
            await api.get("/slots");

        return response.data;

    } catch (error) {

        console.error(
            "Get Slots Error:",
            error.response?.data ||
            error.message
        );

        throw error;
    }
};


// BOOK SLOT (USER)

export const bookSlot = async (
    slotId,
    userId
) => {

    try {

        const response =
            await api.post(
                `/bookings/${slotId}/${userId}`
            );

        return response.data;

    } catch (error) {

        console.error(
            "Booking Error:",
            error.response?.data ||
            error.message
        );

        throw error;
    }
};


// GET MY BOOKINGS
export const getMyBookings = async (
    userId
) => {

    try {

        const response =
            await api.get(
                `/bookings/user/${userId}`
            );

        return response.data;

    } catch (error) {

        console.error(
            "My Bookings Error:",
            error.response?.data ||
            error.message
        );

        throw error;
    }
};


// GET ALL BOOKINGS (ADMIN)

export const getAllBookings = async () => {

    try {

        const response =
            await api.get(
                "/bookings"
            );

        return response.data;

    } catch (error) {

        console.error(
            "Get Bookings Error:",
            error.response?.data ||
            error.message
        );

        throw error;
    }
};


// APPROVE BOOKING

export const acceptBooking = async (
    bookingId
) => {

    try {

        const response =
            await api.put(
                `/bookings/${bookingId}/approve`
            );

        return response.data;

    } catch (error) {

        console.error(
            "Approve Booking Error:",
            error.response?.data ||
            error.message
        );

        throw error;
    }
};


// REJECT BOOKING

export const rejectBooking = async (
    bookingId
) => {

    try {

        const response =
            await api.put(
                `/bookings/${bookingId}/reject`
            );

        return response.data;

    } catch (error) {

        console.error(
            "Reject Booking Error:",
            error.response?.data ||
            error.message
        );

        throw error;
    }
};

export const deleteSlot = async (slotId) => {
    const response = await api.delete(
        `/slots/${slotId}`
    );

    return response.data;
};