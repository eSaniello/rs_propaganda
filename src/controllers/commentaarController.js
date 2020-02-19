var globalId;
var commentaarID;
const tokenCommentaar = localStorage.getItem("token");

function getRowId(td) {
    selectedRow = td.parentElement.parentElement;
    globalId = selectedRow.cells[0].innerHTML;
    return globalId;
}

function token() {
    var token = localStorage.getItem('token');
    console.log(token);
}


function getCommentaar() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + tokenCommentaar);

    fetch('http://127.0.0.1:3000/api/commentaar', {
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
                    body += "<td>" + i.commentaar_id + "</td>";
                    body += "<td>" + i.commentaar + "</td>";
                    body += "<td>" + i.naam + "</td>";
                    // body += "<td>" + i.type + "</td>";
                    if(i.type == 0 ) {
                        body += "<td>Negatief</td>";
            
                    }
                    else {
                        body += "<td>Positief</td>";
                    }
                    body += `<td>
                    <a class='modal-trigger' href='#modal_updatecommentaar' title='Wijzigen' data-toggle='tooltip' style='cursor: pointer;' onclick='return getCommentaarByID(this)'><i class='small material-icons' style='color: #ffd600;'>edit</i></a>
                    <a title='Verwijderen' data-toggle='tooltip' style='cursor: pointer;' onclick='return deleteCommentaar(this)'><i class='small material-icons' style='color: #c62828;'>delete</i></a>
                </td>`;
                    body += "</tr>";
                })
                document.getElementById('rTableBody').innerHTML = body;
            }
        })
        .catch((err) => console.log(err))
}

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

function deleteCommentaar(td) {
    id = getRowId(td);

    if (confirm('Bent u zeker?')) {

        const myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + tokenCommentaar);

        fetch('http://127.0.0.1:3000/api/commentaar/' + id, {
            method: 'DELETE',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default'
        })
            .then(res => res.json())
            .then(res => {
                alert('Commentaar succesvol verwijderd!');
                location.reload();
            })
            .catch((err) => console.error(err))

        return false;
    }
}

function getCommentaarByID(td) {
    id = getRowId(td);
    commentaarID = id;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + tokenCommentaar);

    fetch('http://127.0.0.1:3000/api/commentaar/' + id, {
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
                presentie_id = data.data.presentie_id;
                commentaar = data.data.commentaar;
                type = data.data.type;

                document.getElementById('updatePresentie').value = presentie_id;
                document.getElementById('updateCommentaar').value = commentaar;
                document.getElementById('updateType').value = type;
            }
        })
        .catch((err) => console.log(err))
    return commentaarID;
}

function updateCommentaar() {
    let form = document.forms["updateCommentaarForm"];
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

    fetch("http://127.0.0.1:3000/api/commentaar/" + commentaarID, {
        method: "PUT",
        headers: myHeaders,
        mode: "cors",
        cache: "default",
        body: VALUE
    })
        .then(res => res.json())
        .then(res => {
            console.log('Success', res);
            alert('Commentaar succesvol gewijzigd!');
            location.reload();
        })
        .catch((err) => {
            console.error(err);
        })

    return false;
}