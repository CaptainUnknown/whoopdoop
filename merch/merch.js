//Service Provider
const serverUrl = "https://rzembgzcfjkd.usemoralis.com:2053/server";
const appId = "WeJBsnqY0axj8C5iz05q1QT1qY0p9oX0XvG1VhRZ";
Moralis.start({ serverUrl, appId });

//Authentication
async function login() {
    let user = Moralis.User.current();
    if (!user) {
      user = await Moralis.authenticate({
        signingMessage: "Log in using Moralis",
      })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  
  async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
  }
  
  
  //Get Current User Address
  async function getCurrentUser() {
      let currentUser = Moralis.User.current();
      currentUserAddress = currentUser.attributes.ethAddress;
      var currentUserAddress = 0;
  }
  
  console.log(currentUserAddress);
  
  
  
  document.getElementById("btn-login").onclick = login();
  document.getElementById("btn-logout").onclick = logOut();