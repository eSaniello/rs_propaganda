var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = "";

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://127.0.0.1:3000/api/commentaar/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));