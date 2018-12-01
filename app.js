const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);
var db = firebase.firestore();


function getURL(){
    var urlInfo = window.location.hash.substring(1);

   var url =urlInfo.split("#",1);

    return url;
}
//meal input to database
function addMeal(){

    var date = document.getElementById("mealInput")[0].value;
    var descriptionOfMeal = document.getElementById("mealInput")[1].value;
    var costOfMeal = document.getElementById("mealInput") [2].value;

    db.collection("Meal").doc(date).set({
        description: descriptionOfMeal,
        cost: costOfMeal,
        numberUsers: 0

    })
        .then(function() {
            console.log("Document successfully written!");
            // window.location.href='Summary.html' + '#' + name;
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });

}

//function to add volunteers to database
function addVolunteer(){

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
        .then(function() {
            console.log("Document successfully written!");
            // window.location.href='Summary.html' + '#' + name;
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });

}




// meal output from database
function getDescription(){
    var date = document.getElementById("searchMealDate")[0].value;

        var docRef = db.collection("Meal").doc(date);


    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            var test = String(doc.data().description);
            localStorage.setItem(("test"),test);
        } else {
// doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    var test2 = localStorage.getItem("test");
    document.write(test2);
    // return test2;
}


function transmitName(){
    var username = document.getElementById("searchVolunteerInfo")[0].value;
    window.location.href = 'AdminResults.html' + '#' + username;

}

//get volunteer info helper method
function getVolunteerInfo(){
var getURLName = String(getURL());
//.where(username ==
     db.collection("volunteers").where("username","==",getURLName).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            localStorage.setItem("hoursVolunteered",doc.data().hoursVolunteered);
            localStorage.setItem("milesDriven",doc.data().milesDriven);
            localStorage.setItem("name",doc.data().name);

            //localStorage.setItem("gender",gender);
        });
    });

     var hoursVolunteered = localStorage.getItem("hoursVolunteered");
     var milesDriven = localStorage.getItem("milesDriven");
     var name = localStorage.getItem("name");

     var array=[name, milesDriven, hoursVolunteered];
     console.log(array);
     console.log(getURLName);
     return array;


}
