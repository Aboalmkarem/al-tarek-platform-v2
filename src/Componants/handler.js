import axios from "axios";

export function toLandingPage(navigate) {
    setTimeout(() => {
        navigate("/al-tarek-platform-v2");
        window.location.reload();
        return;
    }, 500);
}

export function signOut(navigate) {
    localStorage.removeItem("token");
    toLandingPage(navigate);
}

export async function getUser() {
    const reqOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
    return await axios
        .get(
            `${import.meta.env.VITE_BACKEND_URL}/api/users/me`,
            reqOptions
        )
}

export function formatDate(date) {
    date = new Date(date)
    const dateOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long"
    };
    return date.toLocaleDateString("ar-EG", dateOptions)
}