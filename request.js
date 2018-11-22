function request(){
	//show request_div and breadcrumb at request tab
	document.getElementById("request_div").style.display="block";
	document.getElementById("request").classList.add("active");
	//other tabs: inactive
	document.getElementById("history").classList.remove("active");
	document.getElementById("accountability").classList.remove("active");
	document.getElementById("inventory").classList.remove("active");
	//hide other tab's divs
	document.getElementById("accountability_div").style.display="none";
	document.getElementById("history_div").style.display="none";
	document.getElementById("inventory-div").style.display="none";
	
}


function open_pending_tab(){
	//show request headers and pending div, set pending as active
	document.getElementById("request_header").style.display="block";
	document.getElementById("pending_div").style.display="block";
	document.getElementById("pending_tab").classList.add("active");

	//hide other tabs
	document.getElementById("completed_tab").classList.remove("active");
	document.getElementById("declined_tab").classList.remove("active");
	document.getElementById("processing_tab").classList.remove("active");

	//hide other divs
	document.getElementById("completed_div").style.display="none";
	document.getElementById("processing_div").style.display="none";
	document.getElementById("declined_div").style.display="none";
}

function open_processing_tab(){
	//set processing as active breadcrumb
	//show div for processing
	document.getElementById("processing_tab").classList.add("active");
	document.getElementById("processing_div").style.display="block";
	
	//hide evrything else
	document.getElementById("pending_tab").classList.remove("active");
	document.getElementById("completed_tab").classList.remove("active");
	document.getElementById("declined_tab").classList.remove("active");
	//hide other divs
	document.getElementById("pending_div").style.display="none";
	document.getElementById("completed_div").style.display="none";
	document.getElementById("declined_div").style.display="none";
}

function open_declined_tab(){
	document.getElementById("pending_tab").classList.remove("active");
	document.getElementById("completed_tab").classList.remove("active");
	document.getElementById("declined_tab").classList.add("active");
	document.getElementById("processing_tab").classList.remove("active");
	document.getElementById("pending_div").style.display="none";
	document.getElementById("completed_div").style.display="none";
	document.getElementById("processing_div").style.display="none";
	document.getElementById("declined_div").style.display="block";

}

function open_completed_tab(){
	document.getElementById("completed_tab").classList.add("active");
	document.getElementById("pending_tab").classList.remove("active");
	document.getElementById("declined_tab").classList.remove("active");
	document.getElementById("processing_tab").classList.remove("active");
	document.getElementById("completed_div").style.display="block";
	document.getElementById("pending_div").style.display="none";
	document.getElementById("processing_div").style.display="none";
	document.getElementById("declined_div").style.display="none";

}

//double clicking to see more of the request
$('.dbl').on('dblclick',function () {
	$('#more').modal('toggle');
})
//change dropdown value
$(".dropdown-menu a").click(function(){
  
  $("#status:first-child").html($(this).text()+' <span class="caret"></span>');
  
});

//status of modal
function update_status(){
	var statusUpdate = document.getElementById("statusUpdate");
	switch(statusUpdate.options[ statusUpdate.selectedIndex ].value){
	 	case "Released":
	 		document.getElementById("releasedContent").style.display="block";
	 		document.getElementById("declinedContent").style.display="none";
	 		document.getElementById("defectiveContent").style.display="none";
	 		break;
	 	case "Defective":
	 		document.getElementById("releasedContent").style.display="none";
	 		document.getElementById("declinedContent").style.display="none";
	 		document.getElementById("defectiveContent").style.display="block";
	 		break;
	 	case "Declined":
	 		document.getElementById("releasedContent").style.display="none";
	 		document.getElementById("declinedContent").style.display="block";
	 		document.getElementById("defectiveContent").style.display="none";
	 		break;
	 	default:
	 		document.getElementById("releasedContent").style.display="none";
	 		document.getElementById("declinedContent").style.display="none";
	 		document.getElementById("defectiveContent").style.display="none";
	}
}

//adding more items for defective list
function defectiveAddItem(){
    var table = document.getElementById("defectiveTable");
	//count number of rows
	var totalRowCount = 0;
    var rowCount = 0;
    var rows = table.getElementsByTagName("tr")
    for (var i = 0; i < rows.length; i++) {
        totalRowCount++;
        if (rows[i].getElementsByTagName("td").length > 0) {
            rowCount++;
        }
    }

    var row = table.insertRow(totalRowCount);
    var item = row.insertCell(0);
    var qty = row.insertCell(1);
    var status = row.insertCell(2);
    var del = row.insertCell(3);
    item.innerHTML = '<select class="form-control">  <option>Item 1</option>  <option>Item 2</option>  <option>Item 3</option>  <option>Item 4</option>  <option>Item 5</option></select>';
    qty.innerHTML = '<select class="form-control">  <option>1</option>  <option>2</option>  <option>3</option>  <option>4</option>  <option>5</option></select>';
    status.innerHTML = '<div class="form-check-inline">  <label class="form-check-label">    <input type="radio" class="form-check-input" name="optradio">Missing  </label></div><div class="form-check-inline">  <label class="form-check-label">    <input type="radio" class="form-check-input" name="optradio">Defective  </label></div></center>';
    del.innerHTML = '<button id="'+totalRowCount+'" onclick="defectiveDeleteItem(id)" class="btn-light btn">X</button>'
}
function defectiveDeleteItem(row){

	 document.getElementById("defectiveTable").deleteRow(row);
	 updateDefectiveTable();
}
function updateDefectiveTable(){
	var table = document.getElementById("defectiveTable");
    var rowCount = 0;
    var rows = table.getElementsByTagName("tr")
    for (var i = 0; i < rows.length; i++) {
        var btn = rows[i].getElementsByTagName("button")[0]
        btn.id = rowCount;
        rowCount++;
    }
}
//adding a request//
/*
var db = firebase.database();
var reqRef = db.ref("requests");

document.getElementById('reqAdd').addEventListener("click",addRequest);
function addRequest(){
	var req = "This is a request";
	
	var reqData = {
		status: "pending",
		request_sent: "10/24/18 4:00PM",
		request_needed: "10/26/18 1:00PM",
		requestor_name: "Name Isreal",
		items: "Item 1, Item 2, Item 3"};
	reqRef.push(reqData);
	console.log(req);
}*/

