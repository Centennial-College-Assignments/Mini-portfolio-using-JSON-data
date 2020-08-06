// File Name: app.js
// Author: Devesh Kumar
// Pages: index.html (Bio Page), contact.html (Contact Page), project.html (Project Page)
// File Description: Custom Javascript File

"use strict";

(function() {
    function highlightActiveLink(id) {
        let navAnchors = document.querySelectorAll("li a");

        for (const anchor of navAnchors) {
            anchor.className = "nav-link";
        }

        for (const anchor of navAnchors) {
            let anchorString = anchor.getAttribute("id");

            if (id === anchorString) {
                anchor.className = "nav-link active";
            }
        }
    }

    //method below is used to validate the form using regex
    function validateForm() {
        let contact = new objects.Contact();

        let contactForm = document.forms[0];

        contactForm.noValidate = true;

        let errorMessage = document.getElementById("errorMessage");

        let firstName = document.getElementById("firstName");
        validateName(firstName, errorMessage, contact);

        let lastName = document.getElementById("lastName");
        validateName(lastName, errorMessage, contact);

        let contactNumber = document.getElementById("contactNumber");
        contactNumber.addEventListener("blur", (event) => {
            let contactNumberPattern = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/;
            if (!contactNumberPattern.test(contactNumber.value)) {
                contactNumber.focus();
                errorMessage.hidden = false;
                errorMessage.textContent = "Please enter a Valid Contact Number";
            } else {
                contact.contactNumber = contactNumber.value;
                errorMessage.hidden = true;
            }
        });

        let emailAddress = document.getElementById("emailAddress");
        emailAddress.addEventListener("blur", (event) => {
            let emailPattern = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            if (!emailPattern.test(emailAddress.value)) {
                emailAddress.focus();
                errorMessage.hidden = false;
                errorMessage.textContent = "Please enter a Valid email address";
            } else {
                contact.emailAddress = emailAddress.value;
                errorMessage.hidden = true;
            }
        });

        let shortMessage = document.getElementById("shortMessage");
        shortMessage.addEventListener("blur", (event) => {
            contact.shortMessage = shortMessage.value;
        });

        // creates a "hook" or reference to the button element with an id of "submitButton"
        let submitButton = document.getElementById("submitButton");

        submitButton.addEventListener("click", (event) => {
            event.preventDefault();
            console.log("Submit Button Clicked");
        });
    }

    //method used for both First Name and Last Name validation and showing error message

    function validateName(name, errorMessage, contact) {
        name.addEventListener("blur", (event) => {
            if (name.value.length < 2) {
                name.focus();
                errorMessage.hidden = false;
                errorMessage.textContent = "Please enter a Valid Name with a length of 2 or more characters";
            } else {
                contact.firstName = name.value;
                errorMessage.hidden = true;
            }
        });
    }

    function setPageContent(id) {
        document.title = id;

        //used to chnage the url as page switches and changes id to lowercase
        //window.history.pushState("", id, "/" + id.toLowerCase());

        //method used to highlight the link on nav bar
        highlightActiveLink(id);

        // Content switcher - Switches the page based on click on Nav Bar
        switch (id) {
            case "Home":
                HomeContent();
                break;
            case "Contact":
                ContactContent();
                break;
            case "About":
                AboutContent();
                break;
        }

        //Once main content is loaded method below loads the footer data from footer.html
        loadFooter();
    }

    function InitializeSite() {
        console.info("Header Loading...");

        // step 1 - creates the XHR object
        let XHR = new XMLHttpRequest();

        // step 2 - configures the message
        XHR.open("GET", "./Views/partials/header.html");

        // step 3 - Executes the request
        XHR.send();

        XHR.addEventListener("readystatechange", function() {
            if (XHR.readyState === 4 && XHR.status === 200) {
                let header = document.getElementsByTagName("header")[0];

                let headerData = XHR.responseText;

                header.innerHTML = headerData;

                setPageContent("Home");

                setNavLinksEventListener();
            }
        });
    }

    function setNavLinksEventListener() {
        let navLinks = document.getElementsByTagName("a");

        for (const link of navLinks) {
            link.addEventListener("click", (event) => {
                event.preventDefault();

                let id = link.getAttribute("id");

                setPageContent(id);
            });
        }
    }

    function loadFooter() {
        console.info("Footer Loading...");

        // step 1 - creates the XHR object
        let XHR = new XMLHttpRequest();

        // step 2 - configures the message
        XHR.open("GET", "./Views/partials/footer.html");

        // step 3 - Executes the request
        XHR.send();

        XHR.addEventListener("readystatechange", function() {
            if (XHR.readyState === 4 && XHR.status === 200) {
                let footer = document.getElementsByTagName("footer")[0];

                let footerData = XHR.responseText;

                footer.innerHTML = footerData;
            }
        });
    }

    function loadAboutPageData() {

        // step 1 - creates the XHR object
        let XHR = new XMLHttpRequest();

        // step 2 - configures the message
        XHR.open("GET", "./Data/content.json");

        // step 3 - Executes the request
        XHR.send();

        // step 4 - register the readystate event
        XHR.addEventListener("readystatechange", function() {
            if (XHR.readyState === 4 && XHR.status === 200) {
                let dataFile = JSON.parse(XHR.responseText);
                let aboutPageContent = dataFile.aboutPageContent;

                console.log(aboutPageContent);

                // Set header text
                let header = document.getElementById("aboutHeader");
                header.innerHTML = aboutPageContent.header;

                // Set info list
                let infoList = aboutPageContent.aboutPageContentList;
                let infoListElement = document.getElementById("aboutPageContentList");

                for (let info of infoList) {
                    let listItem = document.createElement("div");
                    listItem.innerHTML = `<h3 class="center">${info.header}</h3><hr><br>
                    <div class="center" "=""><img src="${info.image}" alt=" "></div><br>
                    <p>${info.text}</p><br><hr>`;

                    infoListElement.appendChild(listItem);
                }
            }
        });
    }

    function AboutContent() {

        // step 1 - creates the XHR object
        let XHR = new XMLHttpRequest();

        // step 2 - configures the message
        XHR.open("GET", "./Views/content/about.html");

        // step 3 - Executes the request
        XHR.send();

        XHR.addEventListener("readystatechange", function() {
            if (XHR.readyState === 4 && XHR.status === 200) {
                let main = document.getElementsByTagName("main")[0];

                let mainData = XHR.responseText;

                main.innerHTML = mainData;

                loadAboutPageData();
            }
        });
    }

    function loadContactPageData() {

        // step 1 - creates the XHR object
        let XHR = new XMLHttpRequest();

        // step 2 - configures the message
        XHR.open("GET", "./Data/content.json");

        // step 3 - Executes the request
        XHR.send();

        // step 4 - register the readystate event
        XHR.addEventListener("readystatechange", function() {
            if (XHR.readyState === 4 && XHR.status === 200) {
                let dataFile = JSON.parse(XHR.responseText);
                let contactPageContent = dataFile.contactPageContent;

                // Set header text
                let header = document.getElementById("contactHeader");
                header.innerHTML = contactPageContent.header;

                // Set all lables name
                let labels = contactPageContent.labels;
                let labelElements = document.getElementsByTagName("label");
                let labelElementCount = 0;
                for (let label of labels) {
                    labelElements[labelElementCount].innerHTML = label;
                    labelElementCount++;
                }

                // Set all placeholder text
                let placeholders = contactPageContent.placeholderText;
                let inputElements = document.getElementsByTagName("input");
                let inputElementCount = 0;
                for (let placeholder of placeholders) {

                    inputElements[inputElementCount].setAttribute("placeholder", placeholder);
                    inputElementCount++;
                }

                // Set button text
                document.getElementById("submitButton").innerHTML = contactPageContent.sumbitButtonText;
                document.getElementById("resetButton").innerHTML = contactPageContent.cancelButtonText;
            }
        });
    }

    function ContactContent() {

        // step 1 - creates the XHR object
        let XHR = new XMLHttpRequest();

        // step 2 - configures the message
        XHR.open("GET", "./Views/content/contact.html");

        // step 3 - Executes the request
        XHR.send();

        XHR.addEventListener("readystatechange", function() {
            if (XHR.readyState === 4 && XHR.status === 200) {
                let main = document.getElementsByTagName("main")[0];

                let mainData = XHR.responseText;

                main.innerHTML = mainData;

                loadContactPageData();
                validateForm();
            }
        });
    }

    function loadHomePageData() {

        // step 1 - creates the XHR object
        let XHR = new XMLHttpRequest();

        // step 2 - configures the message
        XHR.open("GET", "./Data/content.json");

        // step 3 - Executes the request
        XHR.send();

        // step 4 - register the readystate event
        XHR.addEventListener("readystatechange", function() {
            if (XHR.readyState === 4 && XHR.status === 200) {

                //using JSON.parse method to convert JSON string to Javascript Object 
                let dataFile = JSON.parse(XHR.responseText);

                //retrieving and saving Home Page Content from JSON data into a variable
                let homePageContent = dataFile.homePageContent;

                // Setting image from JSON data
                let imageElement = document.getElementById("myImage");

                imageElement.innerHTML = `
                  <img id="myImg" src="${homePageContent.image}" alt="myImage">
                `;

                // Setting header text from JSON Data
                let header = document.getElementById("homeHeader");
                header.innerHTML = homePageContent.header;

                // Set info list from JSON data
                let infoList = homePageContent.infoList;
                let infoListElement = document.getElementById("infoList");

                //Using for Loop to set content of infoList array
                for (let info of infoList) {
                    let listItem = document.createElement("li");
                    listItem.innerHTML = info;

                    infoListElement.appendChild(listItem);
                }
            }
        });
    }

    function HomeContent() {

        // step 1 - creates the XHR object
        let XHR = new XMLHttpRequest();

        // step 2 - configures the message
        XHR.open("GET", "./Views/content/home.html");

        // step 3 - Executes the request
        XHR.send();

        XHR.addEventListener("readystatechange", function() {
            if (XHR.readyState === 4 && XHR.status === 200) {
                let main = document.getElementsByTagName("main")[0];

                let mainData = XHR.responseText;

                main.innerHTML = mainData;

                loadHomePageData();
            }
        });
    }

    // Start function executes when window has loaded
    function Start() {
        InitializeSite();
    }

    window.addEventListener("load", Start);
})();