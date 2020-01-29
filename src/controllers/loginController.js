function inloggen() {
  let form = document.forms["loginForm"];
  let fd = new FormData(form);
  let data = {};
  for (let [key, prop] of fd) {
    data[key] = prop;
  }
  VALUE = JSON.stringify(data, null, 2);
  console.log(VALUE);

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  fetch('http://127.0.0.1:3000/api/gebruikers/login', {
      method: 'POST',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default',
      body: VALUE
    })
    .then(data => data.json())
    .then(data => {
      console.log(data)
    })
    .catch((err) => {
      console.error(err);
    })
}