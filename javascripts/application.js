$(document).ready(function(){
  $('.parallax').parallax();

  // on submit
  $("#dispatch-form").on("submit", function(e){
  	// prevent default action of submitting this form
  	e.preventDefault();

  	// get address and time 
  	var address = $("#address").val();
  	var time = $("#time").val();	

  	console.log(address);
  	console.log(time);
  });
});