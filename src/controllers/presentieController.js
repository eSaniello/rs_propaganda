var globalId;
var presentieID;
const tokenPresentie = localStorage.getItem("token");

function getRowId(td) {
    selectedRow = td.parentElement.parentElement;
    globalId = selectedRow.cells[0].innerHTML;
    return globalId;
}

function token() {
    var token = localStorage.getItem('token');
    console.log(token);
}

function getVergadering() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + tokenPresentie);

    fetch('http://127.0.0.1:3000/api/presentie', {
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
                data.data.forEach(i => {
                    let dropdown = document.getElementById('vergadering');

                    let option = document.createElement('option');
                    option.setAttribute('value', `${i.vergader_id}`);
                    option.textContent = i.ressortnaam + ' / ' + i.datum;

                    dropdown.appendChild(option);
                })
            }
        })
        .catch((err) => console.log(err))

    // return false;
}

function getUpdateVergadering() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + tokenPresentie);

    fetch('http://127.0.0.1:3000/api/presentie', {
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
                data.data.forEach(i => {
                    let updateDropdown = document.getElementById('updateVergadering');

                    let option = document.createElement('option');
                    option.setAttribute('value', `${i.vergader_id}`);
                    option.textContent = i.ressortnaam + ' / ' + i.datum;

                    updateDropdown.appendChild(option);
                })
            }
        })
        .catch((err) => console.log(err))

    // return false;
}


function getPresentie() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + tokenPresentie);

    fetch('http://127.0.0.1:3000/api/presentie', {
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
                    body += "<td>" + i.presentie_id + "</td>";
                    body += "<td>" + i.naam + "</td>";
                    body += "<td>" + i.voornaam + "</td>";
                    body += "<td>" + i.ressortnaam + " / " + Date(i.datum) + "</td>";
                    body += `<td>
                    <a class='modal-trigger' href='#modal_updatepresentie' title='Wijzigen' data-toggle='tooltip' style='cursor: pointer;' onclick='return getPresentieByID(this)'><i class='small material-icons' style='color: #ffd600;'>edit</i></a>
                    <a title='Verwijderen' data-toggle='tooltip' style='cursor: pointer;' onclick='return deletePresentie(this)'><i class='small material-icons' style='color: #c62828;'>delete</i></a>
                </td>`;
                    body += "</tr>";
                })
                document.getElementById('pTableBody').innerHTML = body;
            }
        })
        .catch((err) => console.log(err))
}

function createPresentie() {
    let form = document.forms["presentieForm"];
    let fd = new FormData(form);
    let data = {};
    for (let [key, prop] of fd) {
        data[key] = prop;
    }
    VALUE = JSON.stringify(data, null, 4);

    console.log(VALUE);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + tokenPresentie);
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');

    fetch("http://127.0.0.1:3000/api/presentie", {
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

function deletePresentie(td) {
    id = getRowId(td);

    if (confirm('Bent u zeker?')) {

        const myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + tokenPresentie);

        fetch('http://127.0.0.1:3000/api/presentie/' + id, {
            method: 'DELETE',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default'
        })
            .then(res => res.json())
            .then(res => {
                alert('Presentie succesvol verwijderd!');
                location.reload();
            })
            .catch((err) => console.error(err))

        return false;
    }
}

function getPresentieByID(td) {
    id = getRowId(td);
    presentieID = id;

    getUpdateVergadering();

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + tokenPresentie);

    fetch('http://127.0.0.1:3000/api/presentie/' + id, {
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
                naam = data.data.naam;
                voornaam = data.data.voornaam;
                email = data.data.email;
                vergadering = data.data.vergader_id;

                document.getElementById('updateNaam').value = naam;
                document.getElementById('updateVoornaam').value = voornaam;
                document.getElementById('updateEmail').value = email;
                document.getElementById('updateVergadering').value = vergadering;
            }
        })
        .catch((err) => console.log(err))
    return presentieID;
}

function updatePresentie() {
    let form = document.forms["updatePresentieForm"];
    let fd = new FormData(form);
    let data = {};
    for (let [key, prop] of fd) {
        data[key] = prop;
    }
    VALUE = JSON.stringify(data, null, 4);

    console.log(VALUE);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + tokenPresentie);
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');

    fetch("http://127.0.0.1:3000/api/presentie/" + presentieID, {
        method: "PUT",
        headers: myHeaders,
        mode: "cors",
        cache: "default",
        body: VALUE
    })
        .then(res => res.json())
        .then(res => {
            console.log('Success', res);
            alert('Presentie succesvol gewijzigd!');
            location.reload();
        })
        .catch((err) => {
            console.error(err);
        })

    return false;
}