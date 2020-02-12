function createRessort() {
    const token = localStorage.getItem("token");

    // let form = document.forms["ressortForm"];
    // let fd = new FormData(form);
    // let data = {};
    // for (let [key, prop] of fd) {
    //     data[key] = prop;
    // }

    // VALUE = JSON.stringify(data, null, 2);

    var fd = new FormData(document.getElementById('ressortForm'));
    fd.append();

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append('Content-Type: application/json');

    fetch("http://127.0.0.1:3000/api/ressort", {
        method: "POST",
        headers: myHeaders,
        mode: "cors",
        cache: "default",
        body: fd
    })
        .then(data => data.json())
        .catch((err) => {
            console.error(err);
        })
}

function createRessort() {
    const token = localStorage.getItem('token');

    var req = new XMLHttpRequest();
    req.open('POST', 'localhost:3000/api/ressort/', true);

    var formdata = new FormData(document.getElementById('ressortForm'));
    formdata.append();

    req.send(formdata);
    console.log(req.response);
}