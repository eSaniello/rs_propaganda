const token = localStorage.getItem("token");

const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + token);
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Accept', 'application/json');

function verstuurBericht(){
    let form = document.forms["berichtForm"];
    let fd = new FormData(form);
    let data = {};
    for (let [key, prop] of fd) {
        data[key] = prop;
    }
    VALUE = JSON.stringify(data, null, 2);

    fetch("http://127.0.0.1:3000/api/bericht", {
        method: "POST",
        headers: myHeaders,
        mode: "cors",
        cache: "default",
        body: VALUE
    })
        .then(res => res.json())
        .then(res => {
            console.log('Success', res);
            // location.reload();

        })
        .catch((err) => {
            console.error(err);
        })
}