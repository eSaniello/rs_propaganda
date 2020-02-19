var globalId;
var ressortID;
const tokenRessort = localStorage.getItem("token");

function getRowId(td) {
    selectedRow = td.parentElement.parentElement;
    globalId = selectedRow.cells[0].innerHTML;
    return globalId;
}

function getToken() {
    var token = localStorage.getItem('token');
    console.log(token);
}

function getRessort() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + tokenRessort);

    fetch('http://127.0.0.1:3000/api/ressort', {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            console.log(data.data.length);
            if (data.data.length > 0) {
                var body = "";
                data.data.forEach(i => {
                    body += "<tr>";
                    body += "<td>" + i.ressort_id + "</td>";
                    body += "<td>" + i.ressortnaam + "</td>";
                    body += "<td>" + i.district + "</td>";
                    body += `<td>
                    <a class='modal-trigger' href='#modal_updateressort' title='Wijzigen' data-toggle='tooltip' style='cursor: pointer;' onclick='return getRessortByID(this)'><i class='small material-icons' style='color: #ffd600;'>edit</i></a>
                    <a title='Verwijderen' data-toggle='tooltip' style='cursor: pointer;' onclick='return deleteRessort(this)'><i class='small material-icons' style='color: #c62828;'>delete</i></a>
                </td>`;
                    body += "</tr>";
                })
                document.getElementById('rTableBody').innerHTML = body;
            }
        })
        .catch((err) => console.log(err))
}

function createRessort() {
    let form = document.forms["ressortForm"];
    let fd = new FormData(form);
    let data = {};
    for (let [key, prop] of fd) {
        data[key] = prop;
    }
    VALUE = JSON.stringify(data, null, 2);

    console.log(VALUE);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + tokenRessort);
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');

    fetch("http://127.0.0.1:3000/api/ressort", {
        method: "POST",
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

function deleteRessort(td) {
    id = getRowId(td);

    if (confirm('Bent u zeker?')) {

        const myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + tokenRessort);

        fetch('http://127.0.0.1:3000/api/ressort/' + id, {
            method: 'DELETE',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default'
        })
            .then(res => res.json())
            .then(res => {
                alert('Ressort succesvol verwijderd!');
                location.reload();
            })
            .catch((err) => console.error(err))

        return false;
    }
}

function getRessortByID(td) {
    id = getRowId(td);
    ressortID = id;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + tokenRessort);

    fetch('http://127.0.0.1:3000/api/ressort/' + id, {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            console.log(data.success);
            if (data.success == 1) {
                ressortnaam = data.data.ressortnaam;
                district = data.data.district;

                document.getElementById('updateRessortnaam').value = ressortnaam;
                document.getElementById('updateDistrict').value = district;
            }
        })
        .catch((err) => console.log(err))
    return ressortID;
}

function updateRessort() {
    let form = document.forms["updateRessortForm"];
    let fd = new FormData(form);
    let data = {};
    for (let [key, prop] of fd) {
        data[key] = prop;
    }
    VALUE = JSON.stringify(data, null, 2);

    console.log(VALUE);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + tokenRessort);
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');

    fetch("http://127.0.0.1:3000/api/ressort/" + ressortID, {
        method: "PUT",
        headers: myHeaders,
        mode: "cors",
        cache: "default",
        body: VALUE
    })
        .then(res => res.json())
        .then(res => {
            console.log('Success', res);
            alert('Ressort succesvol gewijzigd!');
            location.reload();
        })
        .catch((err) => {
            console.error(err);
        })

    return false;
}