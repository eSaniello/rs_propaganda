const token2 = localStorage.getItem("token");

const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + token2);

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
                    <a title='Verwijderen' data-toggle='tooltip' style='cursor: pointer;' onclick='return deleteCheck(this)'><i class='small material-icons' style='color: #c62828;'>delete</i></a>
                </td>`;
                body += "</tr>";
            })

            document.getElementById('rTableBody').innerHTML = body;
        }
    })
    .catch((err) => console.log(err))
    
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
      myHeaders.append("Authorization", "Bearer " + token2);
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
  
  function token() {
      var token = localStorage.getItem('token');
      console.log(token);
  } 