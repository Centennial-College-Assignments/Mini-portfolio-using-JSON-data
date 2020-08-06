// IIFE module
"use strict";
let objects;
(function(objects) {
    class Contact {
        constructor(firstName = "", lastName = "", emailAddress = "", contactNumber = "", shortMessage = "") {
            this.firstName = firstName;
            this.lastName = lastName;
            this.emailAddress = emailAddress;
            this.contactNumber = contactNumber;
            this.shortMessage = shortMessage;
        }
    }
    objects.Contact = Contact;

}(objects || (objects = {})));