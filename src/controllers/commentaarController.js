const tokenCommentaar = localStorage.getItem("token");

function createCommentaar() {
    let form = document.forms["commentaarForm"];
    let fd = new FormData(form);
    let data = {};
    for (let [key, prop] of fd) {
        data[key] = prop;
    }

    VALUE = JSON.stringify(data, null, 2);

    console.log(VALUE);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + tokenCommentaar);
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');

    fetch("http://127.0.0.1:3000/api/commentaar/", {
        method: 'POST',
        headers: myHeaders,
        mode: "cors",
        cache: "default",
        body: VALUE
    })

        .then(res => res.json())
        .then(res => {
            console.log('Success', res);
            location.reload();

        })
        .catch((err) => {
            console.error(err);
        })

    return false;
}

function token() {
    var token = localStorage.getItem('token');
    console.log(token);
}

// function createCommentaar() {
//     let form = document.forms["commentaarForm"];
//     let fd = new FormData(form);
//     let data = {};
//     for (let [key, prop] of fd) {
//         data[key] = prop;
//     }

//     VALUE = JSON.stringify(data, null, 3);

//     console.log(VALUE);

//     return false;
// }