import axios from "axios";

const api = axios.create({

    baseURL:
        "http://localhost:4545/api",

    headers: {

        "Content-Type":
            "application/json"
    }
});

// =========================
// REQUEST INTERCEPTOR
// =========================
api.interceptors.request.use(

    (config) => {

        const token =
            localStorage.getItem("token");

        // ADD TOKEN IF EXISTS
        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },

    (error) => {

        return Promise.reject(error);
    }
);

export default api;