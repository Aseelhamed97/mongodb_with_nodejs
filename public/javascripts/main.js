const menu_medeuim = document.querySelector("#menu_medeuim");
menu_medeuim.addEventListener("click", () => {
    showMenuBlock();
});
const menu_small = document.querySelector("#menu_small");
menu_small.addEventListener("click", () => {
    showMenuBlock();
});
const showMenu = document.querySelector(".showmenu");
const contentOfHeader = document.querySelector(".contentOfHeader");

function closeMenuBlock() {
    contentOfHeader.style.display = "block";
    showMenu.style.height = "0%";
}

function showMenuBlock() {
    contentOfHeader.style.display = "none";
    showMenu.style.height = "100%";
}

const selectEmployees = document.getElementById("employees");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const phone_number = document.getElementById("phone_number");
const company_name = document.getElementById("company_name");
const company_website = document.getElementById("company_website");
const jop_title = document.getElementById("jop_title");

const user = [
    fname,
    lname,
    company_name,
    company_website,
    jop_title,
    email,
    phone_number
];

//To send request or data

$(document).ready(function() {


    $('#btn').click(function(e) {
        e.preventDefault();

        for (let userIndex = 0; userIndex < user.length; userIndex++) {
            if (user[userIndex].className == "usernotvaild") {
                user[userIndex].className = "user";
            }
        }
        selectEmployees.style.border = "1px solid black";

        let url = "http://localhost:5000/formData";
        let data = {
                fname: fname.value,
                lname: lname.value,
                email: email.value,
                phone_number: phone_number.value,
                company_name: company_name.value,
                company_website: company_website.value,
                jop_title: jop_title.value,
                employees: selectEmployees.value
            }
            //send data to server for validation
        $.post(url, // url
            data, // data to be submit
            function(res, status, jqXHR) { // success callback
                console.log("success validation and data insert");

            }, 'json').fail(function(jqxhr, settings, status) {

            let response = JSON.parse(jqxhr.responseText);
            if (status == "Unprocessable Entity") {
                response.errors.forEach((err) => {
                    if (err.param == "employees") {
                        selectEmployees.style.border = "1px solid red";
                    } else {
                        const Error_Input_Value = document.getElementById(`${err.param}`);
                        Error_Input_Value.className += "notvaild";
                    }
                });
            } else {
                console.log(response.error);
            }
        });
    });
});

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePhoneNumber(input_str) {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(input_str);
}

function changeInput(inputIndex) {
    user[inputIndex].className = "user";
    if (user[inputIndex].value == "") {
        user[inputIndex].className += "notvaild";
    } else if (user[inputIndex].id == "email") {
        let emailuser = user[inputIndex].value;
        let matchEmail = validateEmail(emailuser);
        if (matchEmail == false) {
            user[inputIndex].className += "notvaild";
        }
    } else if (user[inputIndex].id == "phone_number") {
        let phoneuser = user[inputIndex].value;
        let matchPhone = validatePhoneNumber(phoneuser);
        if (matchPhone == false) {
            user[inputIndex].className += "notvaild";
        }
    }
}

function checkError() {
    if (selectEmployees.value == "Please select") {
        selectEmployees.style.border = "1px solid red";
    } else {
        selectEmployees.style.border = "1px solid black";
    }
}