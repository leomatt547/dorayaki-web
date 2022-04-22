function sendXMLHTTPRequest(method, url, data, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.responseType = "json";
  xhr.onload = () => {
    callback(xhr.response);
  };
  xhr.onerror = (e) => {
    reject("Error during transaction" + e);
  };
  xhr.send(data);

  return xhr;
}

var header_login = "../script/auth-script.php";
onpagehide = checkAuth();
onpageshow = checkAuth();

function checkAuth() {
  authReq = "request=auth";
  url = `../script/auth-script.php?${authReq}`;
  sendXMLHTTPRequest("POST", url, authReq, (response) => {
    if (!response["ok"]) {
      window.location.href = "dash-index.html";
    }
  });
}
function setErrorMessage(message) {
  var el = document.getElementById("error");
  el.textContent = message;
}

/* Request login session */
function login() {
  var username = document.getElementById("uname").value;
  var password = document.getElementById("pwd").value;
  if (username.length !== 0 && password.length !== 0) {
    var loginReq = `request=login&username=${username}&password=${password}`;
    var url = `../script/auth-script.php?${loginReq}`;
    sendXMLHTTPRequest("POST", url, loginReq, (response) => {
      if (response["ok"]) {
        window.location.href = "dash-index.html";
        setErrorMessage("");
      } else {
        setErrorMessage("Wrong username or password!");
      }
    });
  } else {
    setErrorMessage("Mohon melengkapi username dan password dengan benar!");
  }
}

function register() {
  var username = document.getElementById("uname").value;
  var password = document.getElementById("pwd").value;
  var name = document.getElementById("name").value;
  if (username.length !== 0 && password.length !== 0 && name.length !== 0) {
    var checkReq = `request=check&username=${username}`;
    var url = `../script/auth-script.php?${checkReq}`;
    sendXMLHTTPRequest("POST", url, checkReq, (response) => {
      if (response["ok"]) {
        setErrorMessage("");
        var registerReq = `request=register&username=${username}&password=${password}&nama=${name}`;
        url = `../script/auth-script.php?${registerReq}`;
        sendXMLHTTPRequest("POST", url, registerReq, (response2) => {
          if (response2["ok"]) {
            window.location.href = "login.html";
            setErrorMessage("Sukses register");
          } else {
            setErrorMessage("Registration failed");
          }
        });
      } else {
        setErrorMessage("Username already exist!");
      }
    });
  } else {
    setErrorMessage("Mohon melengkapi username dan password dengan benar!");
  }
}
