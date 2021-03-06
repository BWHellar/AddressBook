//Business Logic for AddressBook-----
  function AddressBook() {
    this.contacts = [],
    this.currentId = 0
  }

  AddressBook.prototype.addContact = function(contact) {
    contact.id= this.assignId();
    this.contacts.push(contact);
    }
  AddressBook.prototype.assignId = function() {
    this.currentId += 1;
    return this.currentId;
  }
  AddressBook.prototype.findContact = function(id) {
    for (var i=0; i<this.contacts.length; i++){
      if (this.contacts[i]){
        if (this.contacts[i].id == id) {
          return this.contacts[i];
        }
      }
    };
    return false;
  }
  AddressBook.prototype.deleteContact = function(id) {
    for (var i=0; i<this.contacts.length; i++) {
      if (this.contacts[i]) {
        if (this.contacts[i].id == id) {
          delete this.contacts[i];
          return true;
        }
      }
    };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, address, picture) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.address = address,
  this.picture = picture
}

Contact.prototype.fullName = function() {
  return this.firstName + " "+this.lastName;
}
//User interface logic
var addressBook = new AddressBook();

function attachContactListeners() {
  $("ol#contacts").on("click", "li", function(){
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#showContact").hide();
    displayContactDetails(addressBook);
  });
  $("#findFunction").keyup(function() {
    showContact($("#findFunction").val());
    displayContactDetails(addressBook);
  });
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#showContact").show();
  $(".firstName").html(contact.firstName);
  $(".lastName").html(contact.lastName);
  $(".phoneNumber").html(contact.phoneNumber);
  $(".address").html(contact.address);
  $(".picture").html(contact.picture);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
}

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ol#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>" + "<hr>";
  });
  contactsList.html(htmlForContactInfo);

};
function readURL(input){
  if(input.files && input.files[0]){
    var reader = new FileReader();
    reader.onload = function(e){
      $("#newPicture").attr('src', e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }
}
$(document).ready(function(){
  attachContactListeners();
  $("form#new-Contact").submit(function(event){
    event.preventDefault();
    var inputtedFirstName = $("input#newFirst").val();
    var inputtedLastName = $("input#newLast").val();
    var inputtedPhoneNumber = $("input#newNumber").val();
    var inputtedAddress = $("input#newAddress").val();
    var inputtedPicture = '<img src="'+ $("#newPicture").attr("src")+'">';
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedAddress, inputtedPicture);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  })
})
