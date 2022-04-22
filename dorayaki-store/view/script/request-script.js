const USER = { is_admin: false, username: "" };
const VARIAN = { nama: "" };

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

function reqListener() {
  console.log(this.responseText);
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

const records_per_page = 10;

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

function delete_cookie(name, path, domain) {
  if (retrieve_cookie(name)) {
    document.cookie =
      name +
      "=" +
      (path ? ";path=" + path : "") +
      (domain ? ";domain=" + domain : "") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}

request("../../db/request-all-db.php", function () {
  console.log(this.responseText);
});

var cookie_name = "reqtotal";
var val = retrieve_cookie(cookie_name);
if (val) {
  total = JSON.parse(val)[0].reqtotal;
  delete_cookie("reqtotal", "/");
} else {
  window.location.reload(true);
  document.write('Cookie with name "' + cookie_name + '" does not exist');
}

var numPages = Math.ceil(total / records_per_page);
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
  if (page == 1 || numPages <= 1) {
    btn_prev.style.visibility = "hidden";
  } else {
    btn_prev.style.visibility = "visible";
  }

  if (page == numPages) {
    btn_next.style.visibility = "hidden";
  } else {
    btn_next.style.visibility = "visible";
  }
  request(
    `../../db/request-db.php?page=${page - 1}`,
    function (json) {
      const element = document.querySelector(".featured-products");
      element.innerHTML = "";

      if (json.length > 0) {
        var table = document.createElement("table");
        table.className = "tbl-cart";
        var tbody = document.createElement("tbody");
        var tr1 = document.createElement("tr");
        /*Headernya*/
        var th1 = document.createElement("th");
        const th1_isi = document.createTextNode("ID Dorayaki");
        th1.appendChild(th1_isi);

        var th2 = document.createElement("th");
        const th2_isi = document.createTextNode("Nama Varian");
        th2.appendChild(th2_isi);

        var th3 = document.createElement("th");
        const th3_isi = document.createTextNode("Jumlah Request");
        th3.appendChild(th3_isi);

        var th4 = document.createElement("th");
        const th4_isi = document.createTextNode("Waktu Request");
        th4.appendChild(th4_isi);

        var th5 = document.createElement("th");
        const th5_isi = document.createTextNode("Status");
        th5.appendChild(th5_isi);

        tr1.appendChild(th1);
        tr1.appendChild(th2);
        tr1.appendChild(th3);
        tr1.appendChild(th4);
        tr1.appendChild(th5);
        tbody.appendChild(tr1);

        for (var i = 0; i < json.length; i++) {
          var tr = document.createElement("tr");
          var td1 = document.createElement("td");
          const td1_isi = document.createTextNode(json[i].id_dorayaki);
          td1.appendChild(td1_isi);

          var td2 = document.createElement("td");
          const td2_isi = document.createTextNode(json[i].nama_varian);
          td2.appendChild(td2_isi);

          var td3 = document.createElement("td");
          const td3_isi = document.createTextNode(json[i].jumlah_request);
          td3.appendChild(td3_isi);

          var td4 = document.createElement("td");
          const td4_isi = document.createTextNode(json[i].waktu_request);
          td4.appendChild(td4_isi);

          var td5 = document.createElement("td");
          const td5_isi = document.createTextNode(json[i].status);
          td5.appendChild(td5_isi);

          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          tr.appendChild(td4);
          tr.appendChild(td5);
          tbody.appendChild(tr);
        }

        table.appendChild(tbody);
        element.appendChild(table);
      } else {
        const element = document.querySelector(".featured-products");
        element.innerHTML = "";

        var el = document.getElementById("error");
        if (el) return;

        el = document.createElement("div");
        el.id = "error";
        el.textContent = "Something went wrong :(";
        document.body.appendChild(el);
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

onload = function () {
  changePage(1);
};

setInterval(function () {
  changePage(current_page);
}, 10000);
