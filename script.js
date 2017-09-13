//getting data from the server 
//and placing it in the table

//
// Retrieve the object from storage
//var retrievedObject = localStorage.getItem('testObject');

//console.log('retrievedObject: ', JSON.parse(retrievedObject));

var contacts = null;

//localStorage.clear();


function loadLocalContacts(){
	var data = localStorage.getItem('contacts');
	return JSON.parse(data);
}
function updateLocalContacts(obj){
    //Saving contacts in loal storage
    localStorage.setItem('contacts', JSON.stringify(obj));

}

$(document).ready(function() {

    	contacts = loadLocalContacts();
    	if(contacts != null)
    	{
    		//contacts[0].name = "Olga Kozhevnikova";
    		showContactsInAccordion();
    	}
    	else{
    		loadContactsFromServer();
    	}
});


function loadContactsFromServer(){
	$.ajax({
        	type: "GET",
    		url: "http://demo.sibers.com/users", 
    		success: function (result){
            	contacts = result;
            	updateLocalContacts(contacts);
                showContactsInAccordion();
    		},
    	        error: function (xhr,status,error){
            	alert(JSON.stringify(xhr));
            }
    	});
}
//ВОТ В ЭТОТ
function showContactsInAccordion(){
	var txt = "";
	  	for (contactID in contacts) {
    	var contact = contacts[contactID];
		txt += '<button class="accordion"><b>' + contact.name + '</b></button>';
		txt += '<div class="panel">';
		txt += '<button value="'+contactID+'" onclick="handleSaveClick(event)">Save</button><br>';
		txt += '<div class="pic">'
		txt +=	'<img src="' + contact.avatar + '" alt="Profile Picture"></div>';
		txt += '<div class="table-main"><table class="main">';
		txt += '<tr><th>Username</th><td id="username' + contactID + '" contenteditable="true">' + contact.username + '</td></tr>' + 
		'<tr><th>Email</th><td contenteditable="true" id="email' + contactID + '">' + contact.email + '</td></tr>' + 
		'<tr><th>Address</th><td>' + '<span contenteditable="true" id="streetA' + contactID + '">' + contact.address.streetA + '</span>, ' + 
		'<span contenteditable="true" id="streetB' + contactID + '">' + contact.address.streetB + '</span>, ' + 
		'<span contenteditable="true" id="streetC' + contactID + '">' + contact.address.streetC + '</span>, ' + 
		'<span contenteditable="true" id="streetD' + contactID + '">' + contact.address.streetD + '</span>, ' + 
		'<span contenteditable="true" id="city' + contactID + '">' + contact.address.city + '</span>, ' + 
		'<span contenteditable="true" id="state' + contactID + '">' + contact.address.state + '</span>, ' + 
		'<span contenteditable="true" id="country' + contactID + '">' + contact.address.country + '</span>, ' + 
		'<span contenteditable="true" id="zipcode' + contactID + '">' + contact.address.zipcode + '</span></td></tr>' + 
		'<tr><th>Phone</th><td contenteditable="true" id="phone' + contactID + '">' + contact.phone + '</td></tr>' + 
		'<tr><th>Website</th><td>' + '<a href="https://' + contact.website + '" target="_blanc">' + contact.website + '</a>' + '</td></tr>' + 
		'<tr><th>Company</th><td>' + '<p><u>Name:</u> <span contenteditable="true" id="companyName' + contactID + '">' + contact.company.name + '</span></p>' + 
		'<p><u>Catch Phrase:</u> <span contenteditable="true" id="catchPhrase' + contactID + '">' + contact.company.catchPhrase + '</span></p>' + 
		'<p><u>BS:</u> <span contenteditable="true" id="bs' + contactID + '">' + contact.company.bs + '</span></p>' + '</td></tr></table></div>';

		txt += '<div class="posts"><h3>Posts</h3>';
		for(postsMsgID in contact.posts) {
				var postMsg = contact.posts[postsMsgID];	
				txt += '<p style="text-transform:uppercase;">' + postMsg.words[0] + ' ' + postMsg.words[1] + ' ' + postMsg.words[2] + 
				'</p>';
				txt += '<div><ul style="list-style-type: circle;"><li>' + postMsg.sentence + 
				'</li><li>' + postMsg.sentences + '</li><li>' + postMsg.paragraph + '</li><ul></div>';
			};
		txt += '</div>';
		txt += '<div class="accountHistory"><h3>Account History</h3>';
		txt += '<table class="account">';
		txt += '<tr><th>Amount</th><th>Date</th><th>Business</th><th>Name</th><th>Type</th><th>Account</th></tr>';
		for(historyItemID in contact.accountHistory){
			var historyItem = contact.accountHistory[historyItemID];	
			txt += '<tr><td contenteditable="true">' + historyItem.amount + '</td>' + 
			'<td contenteditable="true" id="accountDate' + contactID + '">' + historyItem.date + '</td>' + 
			'<td contenteditable="true">' + historyItem.business + '</td>' + 
			'<td contenteditable="true">' + historyItem.name + '</td>' + 
			'<td contenteditable="true">' + historyItem.type + '</td>' + 
			'<td contenteditable="true">' + historyItem.account + '</td></tr>';
			};
		txt += '</table>';
		txt += '</div>';
		txt += '</div>';      				
		};
		
		document.getElementById("demo").innerHTML = txt;
		activateAccordions();
		
}

function activateAccordions(){

	var acc = document.getElementsByClassName("accordion");
		var i;

		for (i = 0; i < acc.length; i++) {
		    acc[i].onclick = function(){
		        this.classList.toggle("active");
		        var panel = this.nextElementSibling;
		        if (panel.style.display === "block") {
		            panel.style.display = "none";
		        } else {
		            panel.style.display = "block";
		        }
		    }
		}

}

function handleSearch(event) {
    var searchText = event.currentTarget.value.toUpperCase();
    var content    = document.getElementById("demo");
    var buttons    = content.getElementsByTagName("button");
    var button;
    for (i = 0; i < buttons.length; i++) {
        button = buttons[i];
        if (button.innerHTML.toUpperCase().indexOf(searchText) > -1) {
            button.style.display = "";
        } else {
            button.style.display = "none";

        }
    }
}


function handleSaveClick(event){
	var contactID = Number(event.currentTarget.value);
	var contact   = contacts[contactID];
	var email     = document.getElementById("email" + contactID).innerHTML;
	contact.email = String(email);
	var username  = document.getElementById("username" + contactID).innerHTML;
	contact.username = String(username);
	var streetA   = document.getElementById("streetA" + contactID).innerHTML;
	contact.address.streetA = String(streetA);
	var streetB   = document.getElementById("streetB" + contactID).innerHTML;
	contact.address.streetB = String(streetB);
	var streetC   = document.getElementById("streetC" + contactID).innerHTML;
	contact.address.streetC = String(streetC);
	var streetD   = document.getElementById("streetD" + contactID).innerHTML;
	contact.address.streetD = String(streetD);
	var city      = document.getElementById("city" + contactID).innerHTML;
	contact.address.city = String(city);
	var state     = document.getElementById("state" + contactID).innerHTML;
	contact.address.state = String(state);
	var country   = document.getElementById("country" + contactID).innerHTML;
	contact.address.country = String(country);
	var zipcode   = document.getElementById("zipcode" + contactID).innerHTML;
	contact.address.zipcode = String(zipcode);
	var phone     = document.getElementById("phone" + contactID).innerHTML;
	contact.phone = String(phone);
	var companyName = document.getElementById("companyName" + contactID).innerHTML;
	contact.company.name = String(companyName);
	var catchPhrase = document.getElementById("catchPhrase" + contactID).innerHTML;
	contact.company.catchPhrase = String(catchPhrase);
	var bs        = document.getElementById("bs" + contactID).innerHTML;
	contact.company.bs = String(bs);
	

	updateLocalContacts(contacts);
	alert("Updated");
}





