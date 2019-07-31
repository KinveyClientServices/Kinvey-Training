const Kinvey = require("kinvey-nativescript-sdk");

function handleErrors(error) {
    console.error(error.message);
}

exports.register = function (user) {
    return new Promise((resolve, reject) => {
        Kinvey.User.logout()
            .then(() => {
                Kinvey.User.signup({
                  username: user.email,
                  password: user.password })
                    .then(resolve)
                    .catch((error) => {
                      handleErrors(error);
                      reject();
                    });
            })
            .catch((error) => {
              handleErrors(error);
              reject();
            });
    });
};

exports.login = function (user) {
    return new Promise((resolve, reject) => {
        Kinvey.User.logout()
            .then(() => {
                Kinvey.User.login(user.email, user.password)
                    .then(resolve)
                    .catch((error) => {
                      handleErrors(error);
                      reject();
                    });
            })
            .catch((error) => {
              handleErrors(error);
              reject();
            });
    });
};

exports.loginwithMIC = function (user) {
  return new Promise((resolve, reject) => {
      Kinvey.User.logout()
          .then(() => {
              Kinvey.User.loginWithMIC(user.email, user.password)
                  .then(resolve)
                  .catch((error) => {
                    handleErrors(error);
                    reject();
                  });
          })
          .catch((error) => {
            handleErrors(error);
            reject();
          });
  });
};

exports.logout = function (user) {
  return new Promise((resolve, reject) => {
      Kinvey.User.logout()
          .then(() => {
              Kinvey.User.login(user.email, user.password)
                  .then(resolve)
                  .catch((error) => {
                    handleErrors(error);
                    reject();
                  });
          })
          .catch((error) => {
            handleErrors(error);
            reject();
          });
  });
};

exports.resetPassword = function (email) {
    return Kinvey.User.resetPassword(email)
        .catch(handleErrors);
};
