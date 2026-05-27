import axios from "axios";
import Swal from "sweetalert2";

let isRedirecting = false;

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status === 401) {
            const wasLoggedIn = !!localStorage.getItem("memberData");
            localStorage.removeItem("memberData");

            if (
                wasLoggedIn &&
                !isRedirecting &&
                window.location.pathname !== "/login"
            ) {
                isRedirecting = true;

                Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 1800,
                    timerProgressBar: true,
                }).fire({
                    icon: "warning",
                    title: "Session expired. Please log in again.",
                });

                setTimeout(() => {
                    window.location.href = "/login";
                }, 1800);
            }
        }
        return Promise.reject(error);
    }
);

export {};
