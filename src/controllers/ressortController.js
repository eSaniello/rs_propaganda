function createRessort() {
    const token = localStorage.getItem("token");

    let form = document.forms["ressortForm"];
    let fd = new FormData(form);
    let data = {};
    for (let [key, prop] of fd) {
        data[key] = prop;
    }

    VALUE = JSON.stringify(data, null, 2);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer" + token);

    fetch("http://127.0.0.1:3000/api/ressort", {
        method: "POST",
        headers: myHeaders,
        mode: "cors",
        cache: "default",
        body: VALUE
    })
        .then(data => data.json())
        .catch((err) => {
            console.error(err);
        })
}