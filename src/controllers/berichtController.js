const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + token);
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Accept', 'application/json');

window.onload = getBerichten();

function getBerichten() {
    fetch('http://127.0.0.1:3000/api/bericht', {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    })
        .then(res => res.json())
        .then(berichtdata => {
            let ul = document.getElementById("slide_out");

            for (let i = 0; i < berichtdata.data.length; i++) {
                fetch('http://127.0.0.1:3000/api/gebruikers/' + berichtdata.data[i].gebruiker_id, {
                    method: 'GET',
                    headers: myHeaders,
                    mode: 'cors',
                    cache: 'default'
                })
                    .then(res => res.json())
                    .then(data => {
                        //create bericht element and append to list.
                        let li = document.createElement("li");
                        let rowdiv = document.createElement('div');
                        rowdiv.setAttribute('class', 'row');
                        let carddiv = document.createElement('div');
                        carddiv.setAttribute('class', 'card_width');
                        rowdiv.appendChild(carddiv);
                        let carddiv2 = document.createElement('div');
                        carddiv2.setAttribute('class', 'card teal darken-1 card_edge');
                        carddiv.appendChild(carddiv2);
                        let carddiv3 = document.createElement('div');
                        carddiv3.setAttribute('class', 'card-content white-text');
                        carddiv2.appendChild(carddiv3);
                        let span = document.createElement('span');
                        span.setAttribute('class', "card-title");
                        span.textContent = data.data.voornaam + " " + data.data.naam;
                        carddiv3.appendChild(span);
                        let p1 = document.createElement('p');
                        p1.textContent = berichtdata.data[i].bericht;
                        carddiv3.appendChild(p1);
                        let carddiv4 = document.createElement('div');
                        carddiv4.setAttribute('class', 'card-action');
                        carddiv2.appendChild(carddiv4);
                        let p2 = document.createElement('p');
                        p2.setAttribute('class', "white-text");
                        p2.textContent = Date(berichtdata.data[i].datum);
                        carddiv4.appendChild(p2);
                        let btn = document.createElement("button");
                        btn.setAttribute('class', 'btn-small red');
                        btn.textContent = "delete message";
                        if (berichtdata.data[i].gebruiker_id == localStorage.getItem('gebruiker_id')) {
                            carddiv4.appendChild(btn);
                        }
                        li.appendChild(rowdiv);
                        ul.appendChild(li);

                        btn.onclick = () => {
                            console.log(data.data.naam);

                            fetch('http://127.0.0.1:3000/api/bericht/' + berichtdata.data[i].bericht_id, {
                                method: 'DELETE',
                                headers: myHeaders,
                                mode: 'cors',
                                cache: 'default'
                            })
                                .then(res => res.json())
                                .then(data => {
                                    location.reload();
                                })
                                .catch((err) => console.log(err));
                        };
                    })
                    .catch((err) => console.log(err));
            }
        })
        .catch((err) => console.log(err));
}

function verstuurBericht() {
    let form = document.forms["berichtForm"];
    let fd = new FormData(form);
    let data = {};
    for (let [key, prop] of fd) {
        data[key] = prop;
    }
    data['gebruiker_id'] = localStorage.getItem('gebruiker_id');
    VALUE = JSON.stringify(data, null, 2);
    console.log(VALUE);

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
            location.reload();

        })
        .catch((err) => {
            console.error(err);
        })

    return false;
}

