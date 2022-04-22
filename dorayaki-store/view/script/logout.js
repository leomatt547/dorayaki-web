function sendXMLHTTPRequestLogout(method, url, data, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.responseType = "json";
  xhr.onload = () => {
    callback(xhr.response);
  };
  xhr.onerror = (e) => {
    console.log("Error during transaction" + e);
  };
  if (data === null) {
    xhr.send();
  } else {
    xhr.send(data);
  }
}

function logout() {
  sendXMLHTTPRequestLogout(
    "POST",
    "../script/auth-script.php?request=logout",
    "request=logout",
    (req) => {
      if (req["ok"]) {
        window.location.href = "login.html";
      }
    }
  );
}
