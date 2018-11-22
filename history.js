function history() {
	//show and active history
	document.getElementById("history").classList.add("active");
	document.getElementById("history_div").style.display="block";
	//inactive other tabs
	document.getElementById("accountability").classList.remove("active");
	document.getElementById("request").classList.remove("active");
	document.getElementById("inventory").classList.remove("active");
	//hide away other divs
	document.getElementById("inventory-div").style.display="none";
	document.getElementById("request_div").style.display="none";
	document.getElementById("accountability_div").style.display="none";
}


$( document ).ready(function() {
	console.log("hehehe");

	var history = "";
	history += "<table id='historytable'><tr> <th>User</th><th>Type</th><th>Content</th><th>Date</th><th>Time</th></tr>"
	var systemlogRef = firebase.database().ref("7/systemlog");
	systemlogRef.once("value").then(function(snapshot) {
	snapshot.forEach(function(childSnapshot) {
	  var key = childSnapshot.key;
	  var childData = childSnapshot.val();      
	  var user = childSnapshot.val().user;
	  
	  var type = childSnapshot.val().type;
	  var content = childSnapshot.val().content;
	  var date = childSnapshot.val().date;
	  var time = childSnapshot.val().time;
	  history += "<tr> <td>" + user + " </td> <td>"+type+ "</td><td>" +content+ "</td><td>" +date+ "</td><td>"+time +"</td> </tr>";
	  });

	
	var container = document.getElementById("historytablediv");
	container.innerHTML = history;
	console.log("vge");
	});
});

