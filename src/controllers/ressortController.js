var globalId;
const tokenRessort = localStorage.getItem("token");

function getRowId(td) {
    selectedRow = td.parentElement.parentElement;
    globalId = selectedRow.cells[0].innerHTML;
    return globalId;
}

function token() {
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
                    <a class='modal-trigger' href='#modal_updateressort' title='Wijzigen' data-toggle='tooltip' style='cursor: pointer;' onclick='return getData(this)'><i class='small material-icons' style='color: #ffd600;'>edit</i></a>
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
    selectedRow = td.parentElement.parentElement;
    document.getElementById('updateRessortnaam').value = selectedRow.cells[1].innerHTML;
    document.getElementById('updateDistrict').selected = selectedRow.cells[2].innerHTML;

    id = getRowId(td);
    alert(id);
    return id;
}

function updateRessort(td) {
    id = getRowId(td);
    alert(id);
}