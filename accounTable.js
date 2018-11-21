
$( document ).ready(function() {
	console.log("hehehe");

	var accountability = "";
	accountability += "<table id='accountTable'><tr> <th>Student Name</th><th>Student Number</th><th>Item Name</th><th>Quantity</th><th>Request ID</th></tr>"
	var chemistryDataRef = firebase.database().ref("6/accountability");
	chemistryDataRef.once("value").then(function(snapshot) {
	snapshot.forEach(function(childSnapshot) {
	  var key = childSnapshot.key;
	  var childData = childSnapshot.val();      
	  var studentname = childSnapshot.val().studentName;
	  
	  var studentnumber = childSnapshot.val().studentNumber;
	  var itemName = childSnapshot.val().itemName;
	  var quantity = childSnapshot.val().quantity;
	  var requestID = childSnapshot.val().requestID;
	  accountability += "<tr> <td>" + studentname + " </td> <td>"+studentnumber+ "</td><td>" +itemName+ "</td><td>" +quantity+ "</td><td>"+requestID +"</td> </tr>";
	  });

	
	var container = document.getElementById("accountTablediv");
	container.innerHTML = accountability;
	console.log("vge");
	});
});

