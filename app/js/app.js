$.ajax({
  url : "/",
  type : "GET",
  complete : function(data){
    //yadayada
  }
});

$.ajax({
  url : "/gallery",
  type : "GET",
  complete : function(data){
    //yadayada
  }
});

$.ajax({
  url : "/gallery",
  type : "POST",
  data : {
    author : "SOMETHING",
    image : "SOMETHING",
    description : "SOMETHING",
    created_at : "SOMETHING"
    //yadayada
  }
});

$.ajax({
  url : "/gallery/" + id,
  type : "PUT",
  data : {
    author : "SOMETHING",
    image : "SOMETHING",
    description : "SOMETHING",
    created_at : "SOMETHING"
    //yadayada
  }
});

$.ajax({
  url : "/gallery" + id,
  type : "DELETE"
});

