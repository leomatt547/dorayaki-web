/**
 * Send XMLHTTP request
 * @param {String} method method seperti GET, POST, dll
 * @param {String} url url dari request
 * @param {String} data The data that's being sent
 * @param {function} callback
 */
function sendXMLHTTPRequest2(method, url, data, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  //xhr.setRequestHeader("Content-type", "multipart/form-data");
  //xhr.responseType = "json";
  xhr.onload = () => {
    callback(xhr.response);
  };
  xhr.onerror = (e) => {
    reject("Error during transaction" + e);
  };
  xhr.send(data);
}

function retrieve_cookie(w) {
  var c_value = "";
  var dUC = decodeURIComponent(document.cookie);
  cArray = new Array();
  cArray = dUC.split(";");
  for (i = 0; i < cArray.length; i++) {
    var cValues = new Array();
    cValues = cArray[i].split("=");
    //console.log(cValues)
    if (cValues[0] == " ".concat(w) || cValues[0] == w) {
      c_value = decodeURIComponent(cValues[1]);
    }
  }
  return c_value;
}

/*Header Navigation*/
const header_items = "../script/header-script.php";
const jwt = retrieve_cookie("WBD_SESSION");
if (jwt) {
  token = JSON.parse(jwt)["accessToken"];
  var req = `token=${token}`;
  sendXMLHTTPRequest("GET", `${header_items}?${req}`, req, (res) => {
    var el;
    if (res["ok"]) {
      el = document.getElementById("nama");
      el.innerText = res["username"];
      if (res["isadmin"]) {
        button =
          '<a href="tambah-item-index.html" class="account"><img id="add" src="images/icon-add.png"></a>';
        el.insertAdjacentHTML("beforeBegin", button);
      }
    } else {
      document.write("Not authorized");
      window.location.href = "../html/login.html";
    }
  });
} else {
  document.write("Not authorized!");
  window.location.href = "../html/login.html";
}

function previewFile() {
  var preview = document.getElementById("preview");
  preview.style.visibility = "visible";
  var file = document.querySelector("input[type=file]").files[0];
  var reader = new FileReader();

  reader.onloadend = () => {
    preview.src = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}

function addItem() {
  has_error = document.getElementsByClassName("has-error");
  if (has_error) {
    for (element of has_error) {
      element.classList.remove("has-error");
    }
  }
  document.querySelectorAll(".help-block").forEach((e) => e.remove());
  /*if(document.querySelector(".help-block")){
    document.querySelector(".help-block").remove();
  }*/
  // Initiate inputs
  var nama = document.getElementById("name").value;
  var desc = document.getElementById("description").value;
  var harga = document.getElementById("price").value;
  var stock = document.getElementById("stock").value;
  var img = document.querySelector("input[type=file]").files[0];

  var addReq = new FormData();
  addReq.append("nama", nama);
  addReq.append("desc", desc);
  addReq.append("harga", harga);
  addReq.append("stock", stock);
  addReq.append("img", img);

  var url = `../script/tambah-item-script.php`;
  sendXMLHTTPRequest2("POST", url, addReq, (res) => {
    data = JSON.parse(res);
    if (data.ok) {
      console.log("added to database successfully");
      window.location.href = "../html/dash-index.html";
    } else {
      console.log(data["errors"]["nama"]);
      if (data.errors.nama) {
        document.querySelector("#name-group").classList.add("has-error");
        document.querySelector("#name-group").innerHTML +=
          '<div class="help-block">' + data.errors.nama + "</div>";
      }

      if (data.errors.desc) {
        document.querySelector("#description-group").classList.add("has-error");
        document.querySelector("#description-group").innerHTML +=
          '<div class="help-block">' + data.errors.desc + "</div>";
      }

      if (data.errors.harga) {
        document.querySelector("#price-group").classList.add("has-error");
        document.querySelector("#price-group").innerHTML +=
          '<div class="help-block">' + data.errors.harga + "</div>";
      }

      if (data.errors.stock) {
        document.querySelector("#stock-group").classList.add("has-error");
        document.querySelector("#stock-group").innerHTML +=
          '<div class="help-block">' + data.errors.stock + "</div>";
      }

      if (data.errors.img) {
        document.querySelector("#image-group").classList.add("has-error");
        document.querySelector("#image-group").innerHTML +=
          '<div class="help-block">' + data.errors.img + "</div>";
      }
      console.log(res["errors"]);
    }
  });
}
