$(document).ready(function(){
  console.log('sanity check');
  populateLionNames()
  populateLionId();
  addUpdateListener();
  addDeleteListener();
})

var populateLionNames = function(){
  var name;
  $.get('http://localhost:3000/lions', function(data){
    for (var i = 0; i < data.length; i++) {
      name = data[i].name;
      $('.lion-names').append('<option>' + name + '</option>');
    }
  });
}

var populateLionId = function(){
  $('.lion-names').change(function(){
    $.get('http://localhost:3000/lions', function(data){
      // console.log('here');
      for (var i = 0; i < data.length; i++) {
        if ($('.lion-names').val() == data[i].name) {
          $('.lion-id').val(data[i].id);
          console.log('id', $('.lion-id').val());
        }
      }
    });
  });
}

var addUpdateListener = function(){
  var data;
  $('.update').click(function(){
    data = {
      name: $('.name').val(),
      id: $('.lion-id').val(),
      age: $('.age').val(),
      pride: $('.pride').val(),
      gender: $('.gender').val()
    };
    $.ajax({
      url: 'http://localhost:3000/lions',
      method: 'PUT',
      data: data,
      success: function(data){
        console.log(data);
      },
      error: function(err){
        console.log(err);
      }
    });
  });
}

var addDeleteListener = function(){
  var data;
  $('.delete').click(function(){
    data = {name: $('.name').val()}
    $.ajax({
      url: 'http://localhost:3000/lions',
      method: 'DELETE',
      data: data,
      success: function(data){
        console.log(data);
      },
      error: function(err){
        console.log(err);
      }
    });
  });
}
