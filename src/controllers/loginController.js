
function inloggen() {
  let form = document.forms["loginForm"];
  let fd = new FormData(form);
  let data = {};
  for (let [key, prop] of fd) {
    data[key] = prop;
  }
  VALUE = JSON.stringify(data, null, 2);

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
// i'm attempting to create an array of key value pairs where the username is stored with the token.
      // tokenList.append(data.gebruikernaam, data.token);
      
      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.replace("./src/views/dashboard.html");

      }else{
        console.log("Cannot get token from API");
      }
      
    })
    .catch((err) => {
      console.error(err);
    })
}