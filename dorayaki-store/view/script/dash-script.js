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

function request(url, callback, error_callback) {
  try {
    return sendXMLHTTPRequest("GET", url, null, callback);
  } catch (e) {
    if (error_callback) error_callback();
  }
}

function post(id, url, callback, error_callback) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", callback);
  if (error_callback) xhr.addEventListener("error", error_callback);
  xhr.open("POST", url);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(id);
  return xhr;
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
      if (res["isadmin"] === "true") {
        button =
          '<a href="tambah-item-index.html" id="addButton" class="account"><img id="add" src="images/icon-add.png"></a>';
        button2 =
          '<a href="request-index.html" class="account"><img id="request" src="images/request.png"/></a>';
        el.insertAdjacentHTML("beforeBegin", button);
        el.insertAdjacentHTML("beforeBegin", button2);
      } /* else {
        document.getElementById("addButton").remove;
      }*/
    } else {
      document.write("Not authorized");
      window.location.href = "../html/login.html";
    }
  });
} else {
  document.write("Not authorized!");
  window.location.href = "../html/login.html";
}

const records_per_page = 3;

request("../../db/all-db.php", function () {});

var cookie_name = "total";
var val = retrieve_cookie(cookie_name);
if (val) {
  total = JSON.parse(val)[0].total;
} else {
  window.location.href = "../html/dash-index.html";
  document.write('Cookie with name "' + cookie_name + '" does not exist');
}

var numPages = Math.min(Math.ceil(total / records_per_page), 4);
var current_page = 1;

function prevPage() {
  if (current_page > 1) {
    current_page--;
    changePage(current_page);
  }
}

function nextPage() {
  if (current_page < numPages) {
    current_page++;
    changePage(current_page);
  }
}

function changePage(page) {
  var btn_next = document.getElementById("btn_next");
  var btn_prev = document.getElementById("btn_prev");
  var page_span = document.getElementById("page");

  // Validate page
  if (page < 1) page = 1;
  if (page > numPages) page = numPages;

  page_span.innerHTML = page;
  //listing_table.innerHTML = "";
  if (page <= 1) {
    btn_prev.style.visibility = "hidden";
  } else {
    btn_prev.style.visibility = "visible";
  }

  if (page == numPages) {
    btn_next.style.visibility = "hidden";
  } else {
    btn_next.style.visibility = "visible";
  }
  post(
    (page - 1) * records_per_page,
    `../../db/dash-db.php?page=${page - 1}`,
    function () {
      const element = document.querySelector(".featured-products");
      element.innerHTML = "";

      var json = JSON.parse(this.responseText);

      for (var i = 0; i < json.length; i++) {
        //add setiap item
        var div1 = document.createElement("div");
        div1.className = "featured-product-item";
        let id = json[i].id;
        div1.onclick = function () {
          location.href = `item-index.html?dorayaki=${id}`;
        };
        div1.style = "cursor:pointer;";

        //add image
        var div2 = document.createElement("div");
        div2.style = "background-image: url('".concat(json[i].gambar, "');");
        div2.className = "featured-product-item-image";

        //add title
        var title = document.createElement("p");
        title.className = "title";
        const namanya = document.createTextNode(json[i].nama);
        title.appendChild(namanya);

        //add harga
        var harga = document.createElement("p");
        harga.className = "price";
        const harganya = document.createTextNode("Rp. ".concat(json[i].harga));
        harga.appendChild(harganya);

        //add harga
        var jual = document.createElement("p");
        jual.className = "price";
        const jualnya = document.createTextNode(
          "Jumlah Terjual: ".concat(json[i].jumlahterjual)
        );
        jual.appendChild(jualnya);

        //render semuanya
        div1.appendChild(div2);
        div1.appendChild(title);
        div1.appendChild(harga);
        div1.appendChild(jual);

        //var a_div = document.createElement("a");
        //a_div.href = "./index2.html?item=".concat(i);
        //a_div.appendChild(div1);
        element.appendChild(div1);
        //listing_table.innerHTML += json[i].adName + "<br>";
      }

      const errorElement = document.getElementById("error");
      if (errorElement) errorElement.remove();
    },
    function () {
      const element = document.querySelector(".featured-products");
      element.innerHTML = "";

      var el = document.getElementById("error");
      if (el) return;

      el = document.createElement("div");
      el.id = "error";
      el.textContent = "Something went wrong :(";
      document.body.appendChild(el);
    }
  );
}

onload = function () {
  if (!window.location.hash) {
    window.location = window.location + "#ready";
    window.location.reload();
  } else {
    changePage(1);
  }
};

setInterval(function () {
  changePage(current_page);
}, 10000);
