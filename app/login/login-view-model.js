/* eslint-disable no-undef */
/* eslint-disable no-alert */
const observableModule = require("tns-core-modules/data/observable");
const dialogsModule = require("tns-core-modules/ui/dialogs");
const Kinvey = require("kinvey-nativescript-sdk").Kinvey;
const topmost = require("tns-core-modules/ui/frame").topmost;

function LoginViewModel() {
  const viewModel = observableModule.fromObject({
    email: "",
    password: "",
    confirmPassword: "",
    isLoggingIn: true,
    toggleForm() {
      this.isLoggingIn = !this.isLoggingIn;
    },
    submit() {
      if (this.email.trim() === "" || this.password.trim() === "") {
        alert("Please provide both an email address and password.");

        return;
      }

      if (this.isLoggingIn) {
        this.login();
      } else {
        this.signUp();
      }
    },
    // TASK 2.2: LOG THE USER IN
    login: function() {
      const that = this;
      let activeUser = Kinvey.User.getActiveUser();
      if (activeUser === null) {
        Kinvey.User.login({
          username: this.email,
          password: this.password
        })
          .then(user => {
            activeUser = user;
            that._navigateHome(activeUser);
            console.log(`user: ${JSON.stringify(user)}`);
          })
          .catch(error => {
            alert(`An error occurred. ${error}`);
            console.log(`error: ${error}`);
          });
      } else {
        this._navigateHome(activeUser);
      }
    },
    // TASK 2.3: ACTIVE USER & LOGOUT
    logout: function() {
      const that = this;
      const activeUser = Kinvey.User.getActiveUser();
      if (activeUser !== null) {
        Kinvey.User.logout()
          .then(() => {
            that._navigateLogin();
            console.log(`user logged out: ${JSON.stringify(activeUser)}`);
          })
          .catch(error => {
            alert("An error occurred. Check your Kinvey settings.");
            console.log(`error: ${error}`);
          });
      } else {
        this._navigateLogin();
      }
    },
    // TASK 2.1: SIGNUP
    signUp: function() {
      const that = this;
      if (this.password !== this.confirmPassword) {
        alert("Your passwords do not match.");

        return;
      }
      let activeUser = Kinvey.User.getActiveUser();
      if (activeUser === null) {
        Kinvey.User.signup({
          username: this.email,
          password: this.password
        })
          .then(user => {
            activeUser = user;
            that._navigateHome(activeUser);
            console.log(`user: ${JSON.stringify(user)}`);
          })
          .catch(error => {
            alert(`An error occurred. ${error}`);
            console.log(`error: ${error}`);
          });
      } else {
        alert(`User logged in, need to Logout. ${activeUser.data.username}`);
        console.log(
          `User logged in, need to logout. ${activeUser.data.username}`
        );
        this._navigateHome(activeUser);
      }
    },
    // TASK 2.4 : SIGN IN WITH MOBILE IDENTITY CONNECT
    loginWithMic: function() {
      const that = this;
      let activeUser = Kinvey.User.getActiveUser();
      if (activeUser === null) {
        // eslint-disable-next-line quotes
        Kinvey.User.loginWithMIC(
          "nsplayresume://",
          Kinvey.AuthorizationGrant.AuthorizationCodeLoginPage,
          { micId: "c3150059244644c4920a5819694561b1" }
        )
          .then(user => {
            activeUser = user;
            that._navigateHome(activeUser);
            console.log(`user: ${JSON.stringify(user)}`);
          })
          .catch(error => {
            alert("An error occurred. Check your Kinvey settings.");
            console.log(`error: ${error}`);
          });
      } else {
        this._navigateHome(activeUser);
      }
    },
    forgotPassword() {
      dialogsModule
        .prompt({
          title: "Forgot Password",
          message:
            "Enter the email address you used to register for APP NAME to reset your password.",
          inputType: "email",
          defaultText: "",
          okButtonText: "Ok",
          cancelButtonText: "Cancel"
        })
        .then(data => {
          if (data.result) {
            Kinvey.User.resetPassword(data.text.trim())
              .then(() => {
                alert(
                  "Your password was successfully reset. Please check your email for instructions on choosing a new password."
                );
              })
              .catch(() => {
                alert(
                  "Unfortunately, an error occurred resetting your password."
                );
              });
          }
        });
    },
    _navigateHome: function(user) {
      topmost().navigate({
        moduleName: "home/home-page",
        context: user.username,
        animated: true,
        transition: {
          name: "slideTop",
          duration: 350,
          curve: "ease"
        }
      });
    },
    _navigateLogin: function(user) {
      topmost().navigate({
        moduleName: "login/login-page",
        animated: true,
        transition: {
          name: "slideTop",
          duration: 350,
          curve: "ease"
        }
      });
    }
  });

  return viewModel;
}

module.exports = LoginViewModel;
