import axios from "axios";

const API_URL =
"http://localhost:4545/api/auth";

// =========================
// REGISTER
// =========================
export const registerUser =
async (userData) => {

    const response =
        await axios.post(

            `${API_URL}/register`,
            userData
        );

    return response.data;
};

// =========================
// LOGIN
// =========================
export const loginUser =
async (loginData) => {

    const response =
        await axios.post(

            `${API_URL}/login`,
            loginData
        );

    return response.data;
};