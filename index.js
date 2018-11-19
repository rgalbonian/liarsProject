
$( document ).ready(function() {

});


$(document).on("change", "input[type=radio][name='itemCat']", function(event){
	console.log("wtf");
    console.log(this.value);
    if (this.value == 'apparatus') {
        $(".appa-quan").css("visibility", "visible");
        $(".appa-quan").css("display", "block");
          $(".chem-quan").css("display", "none");
          $(".chem-quan").css("visibility", "hidden");
    }
    else if ((this.value == 'metal') || (this.value == 'nonmetal')  ){
        $(".chem-quan").css("visibility", "visible");
         $(".chem-quan").css("display", "block");
          $(".appa-quan").css("display", "none");
          	$(".appa-quan").css("visibility", "hidden");
    }
});

$( "#view-in-list").click(function() {
	window.open('storage/inventory-list.html', '_blank')
});

$( "#choose-btn-item-img" ).click(function(){
	alert(work);
		$("#submit-btn-item-img").attr("hidden","false");
});
$( "#add-item-btn").click(function(){
	console.log("what")
	loadAddItem();
});

$(document).on("click", "#modal-confirm-summary-btn", function(event){

	$('#item-summary-modal').modal('hide')
	$('#add-item-modal').modal('hide')
	$('#alertModal').modal('show')
});
$(document).on("click", "#modal-edit-summary-btn", function(event){
	console.log("wasss")
	$("#sum-amount").html("");
    $("#sum-unit").html("");
    $("#sum-quan").html("");
});
$(document).on("click", "#modal-add-btn", function(event){
  	var name = $("#item-name").val()
	var image = $('#item-image').get(0).files[0];
    var category = $("input[name='itemCat']:checked").val();
    $("#sum-name").html("Item Name: "+ name);
    $("#sum-cat").html("Category: " + category);
    if (category == "apparatus"){
	  	var quantity = $("#item-quantity").val()
	  	if (name.length == 0 ) {
	  		$(".item-name").css("border-color", "red");
	  		console.log("name is");

	  	}else{
	  	$("#sum-quan").html("Quantity: " + quantity + "<br>");
    	console.log(name + quantity + category);
    	 previewFile('#item-image', '#sum-image');
    		$('#item-summary-modal').modal('show');
    	}
    }else {
    	var amount = $("#item-amount").val()
      	var unit = $("#item-unit").val()
      	$("#sum-amount").html("Amount: " + amount +  "<br>");
    	$("#sum-unit").html("Unit: " +unit);
      	console.log(name + amount + unit + category);
    }
   
   
    
});



firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var user = firebase.auth().currentUser;
	//var name, email, photoUrl, uid, emailVerified;
	  	document.getElementById("login-div").style.display = "none";
	  	document.getElementById("inventory-div").style.display = "block";
	if (user != null) {
		var email = user.email;
		var uid = user.uid
		console.log(uid)
		
		var usersRef = firebase.database().ref("0/users/" + uid);
		var userId = firebase.auth().currentUser.uid;
		firebase.database().ref('0/users/' + userId).once('value').then(function(snapshot) {
		  	var lab = (snapshot.val() && snapshot.val().laboratory) || 'Anonymous';
  			console.log(lab)
  			filterTab()
  			loadItems(lab)
			});
	}
  } else {
  	document.getElementById("login-div").style.display = "block";
    document.getElementById("note").innerHTML = "Logged out";

  }
});

function login(){
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;

	firebase.auth().signInWithEmailAndPassword(username, password).catch(function(error) {
  // Handle Errors here.
  	var errorCode = error.code;
  	var errorMessage = error.message;
  // ...
  window.alert("Error: " + errorMessage);
});	
//	var firebaseRef = firebase.database().ref();
//	firebaseRef.child("Text").set("Some value");
}

function logout(){
	firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});
}


function filterTab() {
	console.log("loading filters")
	var filterHTML = ""
	if (lab = "chemistry") {
				console.log("you here?")
			filterHTML += " <input type='radio' name='categories' class='cat' value='metal' checked >Metal </input> <br> <input type='radio' name='categories' class='cat' value='nonmetal'>Non-metal</input> <br> <input type='radio' name='categories' class='cat' value='metal'>Apparatus </input> "
			var container = document.getElementById("categories-div");
			container.innerHTML = filterHTML;
	}
}
function loadAddItem(){
	console.log("adding loading filters")
	var cat = ""
	var units = ""
	if (lab = "chemistry") {
			console.log("you here?")
			cat += " <input type='radio' name='itemCat' class='cat' value='metal' >Metal  &emsp; </input> <input type='radio' name='itemCat' class='cat' value='nonmetal'>Non-metal  &emsp;</input><input type='radio' name='itemCat' class='cat' value='apparatus'>Apparatus </input> "
			var container = document.getElementById("add-item-categories-div");
			container.innerHTML = cat;
			
			units += "<select class='input-unit' id='item-unit'><option value='mL'>mL</option> <option value='L'>L</option>    </select>"
			var container2 = document.getElementById("add-item-unit-div");
			container2.innerHTML = units;
	}
	
}
function filtering(){
	var currentCat = firebase.database().ref('filterChanges');
currentCat.child("category").on('value', function(snapshot) {
});
}

function loadItems(lab){
	var itemsCard = "";
	
	var chemistryDataRef = firebase.database().ref("2/" + lab);
	chemistryDataRef.child("chemicals").child("metals").once("value").then(function(snapshot) {
	snapshot.forEach(function(childSnapshot) {
	  var key = childSnapshot.key;
	  var childData = childSnapshot.val();      
	  var name_val = childSnapshot.val().name;
	  var cat_val = childSnapshot.val().category;
	  var quan_val = childSnapshot.val().quantity;
	  var unit_val = childSnapshot.val().unit;
	  itemsCard += '<div class="card-div"> <span class="card item">Item Name : '+ name_val+'</span> <span class="card unit">Quantity'+quan_val+ ' Unit '+ unit_val+'</span> <span class="card cat">Category '+cat_val+'</span> <button class="card-btn"> View history </button> <button class="card-btn"> Update </button> </div>';

	  });
	var container = document.getElementById("items-div");
	container.innerHTML = itemsCard;
	console.log("vge");
	});
}

function previewFile(sourceID, destID){
	console.log(sourceID, destID);
       var preview = document.querySelector(destID); //selects the query named img
       var file = $(sourceID).get(0).files[0];
       console.log(file)
       console.log(preview)
       var reader  = new FileReader();

       reader.onloadend = function () {
           preview.src = reader.result;
       		
       }

       if (file) {
           reader.readAsDataURL(file); //reads the data as a URL
           
       } else {
           preview.src = "";
       }
  }

//firebase upload file
function tryUpload() {
	// body...

const ref = firebase.storage().ref();
const file = $('#photo').get(0).files[0];
const name = file.name;
console.log(name);
const metadata = {
  contentType: file.type
};
const task = ref.child(name).put(file, metadata);
task
  .then(snapshot => snapshot.ref.getDownloadURL())
  .then((url) => {
    console.log(url);
    document.querySelector('#photo').src = url;
  })
  .catch(console.error);
}

