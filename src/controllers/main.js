token = localStorage.getItem("token");

function redirectIfNoToken() {
    if (token == null) {
        window.location.replace("../../index.html");
    }
}

function logout() {
    localStorage.removeItem("token");
    window.location.replace("../../index.html");
}