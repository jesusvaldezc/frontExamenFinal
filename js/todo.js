var token = localStorage.getItem('token');

var datalength = '';

if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}
function refresh(){
  $('input[name="todo"]').change(function() {
      if(this.checked) {
          $(this).next().addClass("done")
      }
      else{
          $(this).next().removeClass("done")
          
      }
  });
  }

function loadTodos() {
  $.ajax({
    //url: 'http://localhost:3000/todos',
    url: 'https://backendexamenfinal.herokuapp.com/todos',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      console.log(data)

      datalength = data.length

      for (let i = 0; i < data.length; i++) {

        var txt = data[i].description;
        let newHtml = ''
        newHtml +=
          `
          <li><input type="checkbox" name="todo" value="${i}"><span>${txt}</span></li>
          ` 
        $('#todo-list').append(newHtml)
        console.log(data[i].description)
      }
      refresh()
    },
    error: function (error_msg) {
      alert((error_msg['responseText']));
    }
  });
}


loadTodos()


var input = document.querySelector("input[name=newitem]");

input.addEventListener('keypress', function (event) {
  if (event.charCode === 13) {
    json_to_send = {
      "description": input.value
    };
    json_to_send = JSON.stringify(json_to_send);
    $.ajax({
      //url: 'http://localhost:3000/todos',
      url: 'https://backendexamenfinal.herokuapp.com/todos',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function (data) {
      console.log(data)

        
        var txt = data.description;
        let newHtml = ''
        newHtml +=
          `
          <li><input type="checkbox" name="todo" value="${datalength}"><span>${txt}</span></li>
          ` 
        $('#todo-list').append(newHtml)
        datalength = datalength + 1
      },
      error: function (error_msg) {
        alert((error_msg['responseText']));
      }
    });
    input.value = '';
  }
})

