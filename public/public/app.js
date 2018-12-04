const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);
var db = firebase.firestore();


function getURL() {
    var urlInfo = window.location.hash.substring(1);

    var url = urlInfo.split("#", 1);

    return url;
}

//meal input to database
function addMeal() {

    var date = document.getElementById("mealInput")[0].value;
    var descriptionOfMeal = document.getElementById("mealInput")[1].value;
    var costOfMeal = document.getElementById("mealInput") [2].value;

    db.collection("Meal").doc(date).set({
        description: descriptionOfMeal,
        cost: costOfMeal,
        numberUsers: 0

    })
        .then(function () {
            console.log("Document successfully written!");
            // window.location.href='Summary.html' + '#' + name;
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });

}

//function to add volunteers to database
function addVolunteer() {

    var username = document.getElementById("volunteerInput")[0].value;
    var name = document.getElementById("volunteerInput")[1].value;
    var hoursVolunteered = document.getElementById("volunteerInput")[2].value;
    var milesDriven = document.getElementById("volunteerInput")[3].value;

    db.collection("volunteers").doc(username).set({
        username: username,
        name: name,
        hoursVolunteered: hoursVolunteered,
        milesDriven: milesDriven
    })
        .then(function () {
            console.log("Document successfully written!");
            // window.location.href='Summary.html' + '#' + name;
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });

        alert("Thank you for submitting your hours/mileage")
}


var arr = [];

//creates an array of all the activities on the page
var arr_activities = [
    "Ping-Pong",
    "Billiards",
    "Gym",
    "Dominoes",
    "Bridge",
    "Bingo",
    "Yoga",
    "Art Therapy",
    "Ceramics",
    "Movie",
    "Library",
    "Puzzles",
    "Computer",
    "Zumba",
    "Special Event"
]

//this function looks to see if each checkbox is checked or not, and then either adds or
// removes from array to pass to database. modified from code on stackoverflow
function addPrior(e) {
    {
        // if check
        if (e.target.checked) {
            addToArray(e.target);
        } else {
            removeToArray(e.target);

        }

        console.log(arr);
    }

//this function adds to the array to pass to the database, called by addPrior
    function addToArray(obj) {
        var object = obj.value;
        arr.push(object);
    }

}

//this function removes from the array, which is called by addPrior if the checkbox is not checked
function removeToArray(obj) {
    var index = arr.indexOf(obj.value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    console.log(arr);
}

//this function looks at the existing array of activities and instantiates a new array to hold
//the values of the activities on the page with their appropriate index location
function getAddActivity() {
    arr_activities;
    var array = arr;
    var newArr = [];
    for (var i = 0; i < array.length; i++) {
        newArr.push(arr_activities[array[i]])
    }
  addActivity(newArr);
    updateActivity(newArr);
}


function addActivity(newArr) {
    var date = currentDate();
    var username = String(getURL());
    var activity = newArr;

    console.log(activity);

    db.collection("Users").doc(username).collection("Activities").doc(date).set({
           Activity: activity
    })
        .then(function () {
            console.log("Document successfully written!");
            // window.location.href='Summary.html' + '#' + name;
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        }); console.log("here");
      alert("You successfully Submitted Your Activities for Today")
}

//function to update activities to main activities collection
function updateActivity(newArr){
     var date = currentDate();
     var newArr = newArr;
     var username = String (getURL());

     for(var i =0; i<newArr.length; i++){
         db.collection("Activities").doc(newArr[i]).collection(date).doc(username).set({

         })
             .then(function () {
                 console.log("Document successfully written!");
                 // window.location.href='Summary.html' + '#' + name;
             })
             .catch(function (error) {
                 console.error("Error writing document: ", error);
             });
     }
}

//get current date, sourced from stackoverflow
function currentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = mm + '-' + dd + '-' + yyyy;
    return (today);
}






//function to show the daily menu on current page of cafeteria menu

function getMenu() {
    var date = currentDate();

    var docRef = db.collection("Meal").doc(date);


    docRef.get().then(function (doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            // var test = String(doc.data().description);
            localStorage.setItem(("test"), doc.data().description);
        } else {
// doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
    var test2 = String(localStorage.getItem("test"));
    return (test2);
    // return test2;
}

function transmitName() {
    var username = document.getElementById("searchVolunteerInfo")[0].value;
    window.location.href = 'AdminResults.html' + '#' + username;

}

//get volunteer info helper method
function getVolunteerInfo() {
    var getURLName = String(getURL());

    db.collection("volunteers").where("username", "==", getURLName).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            localStorage.setItem("hoursVolunteered", doc.data().hoursVolunteered);
            localStorage.setItem("milesDriven", doc.data().milesDriven);
            localStorage.setItem("name", doc.data().name);


        });
    });

    var hoursVolunteered = localStorage.getItem("hoursVolunteered");
    var milesDriven = localStorage.getItem("milesDriven");
    var name = localStorage.getItem("name");

    var array = [name, milesDriven, hoursVolunteered];
    console.log(array);
    console.log(getURLName);
    return array;


}

//add user function for registration

function addUser() {

    var username = document.getElementById("registration")[0].value;
    var password = document.getElementById("registration")[1].value;
    var name = document.getElementById("registration")[2].value;
    var age = document.getElementById("registration")[3].value;


    db.collection("Users").doc(username).set({
        username: username,
        name: name,
        age: age,
        password: password
    })
        .then(function () {
            console.log("Document successfully written!");
            window.location.href= "Activities.html" + '#'+ username;
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });


}


//takes user name and password and sends the user to the Activities page with their
//username in the url
function loginPage(){
    var username = document.getElementById("signIn")[0].value;
    var password = document.getElementById("signIn")[1].value;
    window.location.href="Activities.html"+'#'+ username;

}


// Activity output from database; attempted to get the number of users who signed up for an activity on a specific
//date, into a comma delimited string and then printing the number of strings to see how many users were signed up.
//Unsuccessful.

// function getActivities() {
//     var size = [];
//     var userActivityDate = document.getElementById("searchUserActivities")[0].value;
//     var userActivityDescription = document.getElementById("searchUserActivities")[1].value;
//     db.collection("Activities").doc(userActivityDescription).collection(userActivityDate).get().then(function(querySnapshot)
//     {
//
//         querySnapshot.forEach(function (doc) {
//         console.log(doc.id);
//         localStorage.setItem("UsersSize", doc.id);
//             size.push(localStorage.getItem("usersSize"));
//                 localStorage.setItem("newUsersSize", String (size));
//
//         });
//
//
//     });
//
//     var userSize = localStorage.getItem("newUsersSize");
//
//     console.log(userSize);
// }


// function countUsers(userCount){
//     var str = userCount;
//     var counter = 1;
//     for (var i=0; i<str.length; i++){
//         if (str[i] === ','){
//             counter ++;
//         }
//
//     }
//     return str.length;
//}
//





