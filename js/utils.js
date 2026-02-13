function generateID() {
    return Date.now().toString();
}

function formatDate(dateString) {
    const date = new Date(dateString);

    if (isNaN(date)) return "Invalid Date";

    return date.toLocaleString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });
}
