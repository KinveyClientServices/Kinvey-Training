var BasePage = require("../../shared/BasePage");
var Kinvey = require('kinvey-nativescript-sdk').Kinvey;
var view = require("ui/core/view");
var topmost = require("ui/frame").topmost;
var LoginPage = function () { };
LoginPage.prototype = new BasePage();
LoginPage.prototype.constructor = LoginPage;
var frameModule = require("ui/frame");

var Page;
var email;
var activeUser;

LoginPage.prototype.navigateTo = function (args) {
    Page = args.object;
};

//SMI: Allows the user to sign up for the app
LoginPage.prototype.signUp = function () {
    console.log("In Signup");
    activeUser = Kinvey.User.getActiveUser();
    if (activeUser) {
        alert("User logged in. Log out first")
    }
    else {
        email = LoginPage.prototype.pageObject.getViewById("email").text;
        pw = LoginPage.prototype.pageObject.getViewById("pw").text;
        if (email != "") {
            //TASK 2.1: ADD CODE FOR SIGNUP.
            var promise = Kinvey.User.signup({
                username: email,
                password: pw
            })

                .then(function (user) {
                    //Register for live service
                    registerForLiveService(user);
                    console.log("Succesful signup!");
                    var dataStore = Kinvey.DataStore.collection('DemoBrandingData', Kinvey.DataStoreType.Network);
                    var subscription = dataStore.find()
                        .subscribe(function (entities) {
                            console.log(entities);
                        }, function (error) {
                            console.log(error);
                        }, function () {
                            console.log('finished pulling home data');
                        });
                    topmost().navigate("pages/home/home");
                })
                .catch(function (error) {
                    alert("Failure to signup!")
                    console.log("error");
                });
        }
        else {
            console.log("Email/Pass cannot be blank");
        }

    }
}
LoginPage.prototype.signIn = function (args) {
    var sender = args.object;
    var parent = sender.parent;
    email = view.getViewById(parent, "email").text;
    pw = view.getViewById(parent, "pw").text;
    //SMI: Check for active user
    var activeUser = Kinvey.User.getActiveUser();
    if (activeUser) {
        alert("User logged in. Log out first")
    } else {
        //TASK 2.2: LOG THE USER IN
        var promise = Kinvey.User.login({
            username: email,
            password: pw
        })
            .then(function (user) {
                console.log(user);
                registerForLiveService(user);

            })
            .catch(function (error) {
                console.log(error);
            });
    }
};
LoginPage.prototype.logout = function (args) {
    var activeUser = Kinvey.User.getActiveUser();
    if (activeUser) {
        console.log("There is an active user")
    }
    //TASK 2.3: LOG THE USER OUT
    var promise = Kinvey.User.logout()
        .then(function () {
            alert("User Logged out");
            unRegisterFromLiveService(activeUser);
        })
        .catch(function (error) {
            console.log(error.message);
        });
}

LoginPage.prototype.signInMIC = function (args) {
    console.log('signInMIC');
    //SMI: Check for active user
    var activeUser = Kinvey.User.getActiveUser();
    if (activeUser) {
        alert("User logged in. Log out first")
    }
    else {
        Kinvey.User.loginWithMIC('http://example.com/callback', Kinvey.AuthorizationGrant.AuthorizationCodeLoginPage, { version: 'v3' })
            .then(function (user) {
                console.log(user);
                registerForLiveService(user);
                topmost().navigate("pages/home/home");
            }).catch(function (error) {
                console.log(error);
            });
    }
}

function registerForLiveService(user) {
    //Task 5.2 : Register the active user for live service
    user.registerForLiveService()
        .then(() => {
            alert("Registered for live service");
            topmost().navigate("pages/home/home");
        })
        .catch(err => {
            alert("Error registering for live service");
        });
}

function unRegisterFromLiveService(user) {
    user.unregisterFromLiveService()
        .then(function () {
            console.log("Unregistered from Live Service")
        })
        .catch(function (err) {
            console.log("There was an error unregistering from live service")
        });
}

module.exports = new LoginPage();