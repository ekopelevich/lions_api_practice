$(document).ready(function(){
  addUpdateListener();
  addDeleteListener();
})

var addUpdateListener = function(){
  var data;
  $('.update').click(function(e){
    console.log('here');
    e.preventDefault();
    data = {
      name: $('.name').val(),
      id: $('.id').val(),
      age: $('.age').val(),
      pride: $('.pride').val(),
      gender: $('.gender').val()
    };
    $.ajax({
      url: 'http://localhost:3000/lions/' + data.id,
      method: 'PUT',
      data: data,
      success: function(){
        document.location.href = '/lions';
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
    data = {id: $('.id').val()}
    $.ajax({
      url: 'http://localhost:3000/lions/' + data.id,
      method: 'DELETE',
      data: data,
      success: function(){
        document.location.href = '/lions';
      },
      error: function(err){
        console.log(err);
      }
    });
  });
}
