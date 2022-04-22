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
  if (data === null) {
    xhr.send();
  } else {
    xhr.send(data);
  }

  return xhr;
}

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
      el.innerHTML = res["username"];
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
  var preview = document.getElementById("temp_gambar");
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

const get_items = "../script/ubah-item-script.php";
function fetchData() {
  var url_string = window.location.href; //window.location.href
  var id = new URL(url_string).searchParams.get("dorayaki");
  sendXMLHTTPRequest(
    "POST",
    get_items,
    `request=getitem&dorayaki=${id}`,
    (res) => {
      if (res["ok"]) {
        data = res.message[0];
        document.querySelector("#name").setAttribute("value", data.nama);
        document
          .querySelector("#description")
          .setAttribute("value", data.deskripsi);
        document.querySelector("#price").setAttribute("value", data.harga);
        document.querySelector("#stock").setAttribute("value", data.stok);
        document.querySelector("#temp_gambar").setAttribute("src", data.gambar);
      } else {
        console.log(res["message"]);
      }
    }
  );
}

function postData() {
  has_error = document.getElementsByClassName("has-error");
  if (has_error) {
    for (element of has_error) {
      element.classList.remove("has-error");
    }
  }
  document.querySelectorAll(".help-block").forEach((e) => e.remove());
  // Get form data
  var url_string = window.location.href; //window.location.href
  id = new URL(url_string).searchParams.get("dorayaki");
  nama = document.getElementById("name").value;
  desc = document.getElementById("description").value;
  harga = document.getElementById("price").value;
  stock = document.getElementById("stock").value;
  file = document.querySelector("input[type=file]").files[0];
  // TODO: Konversi jadi non-jquery
  // $(".form-group").removeClass("has-error");
  // $(".help-block").remove();
  formData = new FormData();
  formData.append("request", "ubahitem");
  formData.append("dorayaki", id);
  formData.append("name", nama);
  formData.append("desc", desc);
  formData.append("harga", harga);
  formData.append("stock", stock);
  if (file != undefined) {
    if (!!file.type.match(/image.*/)) {
      formData.append("image", file);
    }
  }

  // Request to server
  sendXMLHTTPRequest2("POST", get_items, formData, (res) => {
    res = JSON.parse(res);
    if (res["ok"]) {
      success = true;
      console.log("change succeeded");
      window.location.href = "item-index.html?dorayaki=" + id;
    } else {
      errors = res["message"];
      if (errors["name"]) {
        document.querySelector("#name-group").classList.add("has-error");
        document.querySelector("#name-group").innerHTML +=
          '<div class="help-block">' + errors["name"] + "</div>";
      }
      if (errors["desc"]) {
        document.querySelector("#description-group").classList.add("has-error");
        document.querySelector("#description-group").innerHTML +=
          '<div class="help-block">' + errors["desc"] + "</div>";
      }
      if (errors["harga"]) {
        document.querySelector("#price-group").classList.add("has-error");
        document.querySelector("#price-group").innerHTML +=
          '<div class="help-block">' + errors["harga"] + "</div>";
      }
      if (errors["stock"]) {
        document.querySelector("#stock-group").classList.add("has-error");
        document.querySelector("#stock-group").innerHTML +=
          '<div class="help-block">' + errors["stock"] + "</div>";
      }
      if (errors["image"]) {
        document.querySelector("#image-group").classList.add("has-error");
        document.querySelector("#image-group").innerHTML +=
          '<div class="help-block">' + errors["image"] + "</div>";
      }
    }
  });
}

fetchData();
