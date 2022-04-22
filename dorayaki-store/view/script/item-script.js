var url_string = window.location.href;
var urlnya = new URL(url_string);
var id = urlnya.searchParams.get("dorayaki");

const USER = { is_admin: false, username: "" };
const VARIAN = { nama: "" };

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

function sendXMLHTTPRequest(method, url, data, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.responseType = "json";
  xhr.onload = () => {
    console.log(xhr.response);
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

function changeStock(stok, url, callback, error_callback) {
  try {
    console.log(
      "Waktu: " + new Date().toISOString().slice(0, 19).replace("T", " ")
    );
    return sendXMLHTTPRequest(
      "POST",
      url,
      `stok=${stok}&username=${USER.username}&isAdmin=${
        USER.is_admin
      }&waktu=${new Date().toISOString().slice(0, 19).replace("T", " ")}`,
      callback
    );
  } catch (e) {
    if (error_callback) error_callback();
  }
}

function buyItem(items, id, callback, error_callback) {
  try {
    return sendXMLHTTPRequest(
      "POST",
      "../../db/buy-item-db.php",
      `dorayaki=${id}&items=${items}`,
      callback
    );
  } catch (e) {
    if (error_callback) error_callback();
  }
}

function request(url, callback, error_callback) {
  try {
    return sendXMLHTTPRequest("GET", url, null, callback);
  } catch (e) {
    if (error_callback) error_callback();
  }
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
      USER.username = res["username"];
      if (res["isadmin"] === "true") {
        USER.is_admin = true;
      } else if (res["isadmin"] === "false") {
        USER.is_admin = false;
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

const errorHandler = function () {
  const element = document.querySelector(".featured-products");
  element.innerHTML = "";

  var el = document.getElementById("error");
  if (el) return;

  el = document.createElement("div");
  el.id = "error";
  el.textContent = "Something went wrong :(";
  document.body.appendChild(el);
};

const url_items = `../../db/item-db.php`;
const get_detail = () => {
  request(
    `${url_items}?dorayaki=${id}`,
    function (json) {
      //add item
      const div1 = document.createElement("div");
      div1.className = "featured-product-item";

      const info = document.createElement("div");
      info.className = "info";

      const img = document.createElement("img");
      img.src = json.gambar;
      img.className = "featured-product-item-image";

      //add nama
      const title = document.createElement("p");
      title.className = "title";
      const judulnya = document.createTextNode(json.nama);
      VARIAN.nama = json.nama;
      title.appendChild(judulnya);

      //add harga
      const harga = document.createElement("p");
      harga.className = "price";
      harga.innerText = `Rp. ${json.harga}`;

      // add jumlah terjual
      const jumlahterjual = document.createElement("p");
      jumlahterjual.className = "price";
      jumlahterjual.innerText = `Jumlah terjual: ${json.jumlahterjual}`;

      //add deskripsi
      const desc = document.createElement("div");
      desc.className = "deskripsi";
      const desc1 = document.createElement("p");
      desc1.className = "description";
      desc1.innerText = json.deskripsi;
      desc.appendChild(desc1);

      const jumlahStok = document.createElement("div");
      jumlahStok.className = "deskripsi";
      jumlahStok.id = "jumlah-stok";
      jumlahStok.innerText = `Stok: ${json.stok}`;

      // add change stock button
      const stocks = document.createElement("div");
      stocks.className = "stocks";

      const price = document.createElement("div");
      const input = document.createElement("input");
      input.type = "number";
      input.name = "stok";
      input.min = 0;
      input.max = 1000;
      input.value = 0;
      input.className = "item-count-number";
      input.id = "item-count-number";
      input.onchange = function (evt) {
        if (evt.target.value > 1000) input.value = 1000;
        else if (evt.target.value < 0) input.value = 0;
        else input.value = evt.target.value;

        price.innerText = `Subtotal: Rp.${evt.target.value * json.harga}`;
      };

      const decrease = document.createElement("button");
      decrease.className = "item-count-button";
      decrease.innerText = "-";
      decrease.onclick = function (evt) {
        evt.stopPropagation();
        evt.preventDefault();

        if (input.value > 0) input.value--;
        price.innerText = `Subtotal: Rp.${input.value * json.harga}`;
      };

      const increase = document.createElement("button");
      increase.className = "item-count-button";
      increase.innerText = "+";
      increase.onclick = function (evt) {
        evt.stopPropagation();
        evt.preventDefault();

        if (input.value < 1000) input.value++;
        price.innerText = `Subtotal: Rp.${input.value * json.harga}`;
      };

      price.className = "deskripsi";
      price.innerText = `Subtotal: Rp.${input.value * json.harga}`;

      const submit = document.createElement("button");
      submit.innerText = USER.is_admin ? "Request Stock" : "Buy";
      submit.id = "submit-button";
      submit.className = "submit-button";
      submit.onclick = function (evt) {
        evt.stopPropagation();
        evt.preventDefault();

        if (input.value < 0 || input.value > json.stok) errorHandler();
        else {
          if (!USER.is_admin) {
            buyItem(input.value, id, function (param) {}, errorHandler);
          }
          changeStock(
            USER.is_admin ? input.value : json.stok - input.value,
            `../../db/change-stock.php?dorayaki=${id}&nama_varian=${VARIAN.nama}`,
            function (param) {
              document.location.href = "../html/dash-index.html";
            },
            errorHandler
          );
        }
      };

      const changeDetail = document.createElement("button");
      changeDetail.innerText = "Change Detail";
      changeDetail.className = "submit-button";
      changeDetail.onclick = function (evt) {
        evt.stopPropagation();
        evt.preventDefault();

        window.location.href = "/view/html/ubah-item-index.html?dorayaki=" + id;
      };

      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete Dorayaki";
      deleteButton.className = "submit-button";
      deleteButton.onclick = function (evt) {
        evt.stopPropagation();
        evt.preventDefault();

        const decision = prompt(
          "Are you sure you want to delete this dorayaki?\n\nType 'yes' to delete."
        );

        if (decision === "yes") {
          sendXMLHTTPRequest(
            "POST",
            "../../db/delete-item.php",
            `dorayaki=${id}`,
            function () {
              alert("Delete successful. Redirecting...");
              window.location.href = "/view/html/dash-index.html";
            }
          );
        } else {
          alert("Failed. Cancelling...");
        }
      };

      stocks.appendChild(decrease);
      stocks.appendChild(input);
      stocks.appendChild(increase);
      if (!USER.is_admin) stocks.appendChild(price);
      stocks.appendChild(submit);
      if (USER.is_admin) stocks.appendChild(changeDetail);
      if (USER.is_admin) stocks.appendChild(deleteButton);

      //render semuanya
      info.appendChild(title);
      info.appendChild(harga);
      info.appendChild(jumlahterjual);
      info.appendChild(img);
      info.appendChild(desc);
      info.appendChild(jumlahStok);
      info.appendChild(stocks);

      div1.appendChild(info);

      const element = document.querySelector(".featured-products");
      element.innerHTML = "";
      element.appendChild(div1);

      const errorElement = document.getElementById("error");
      if (errorElement) errorElement.remove();
    },
    errorHandler
  );
};

onload = get_detail;

const get_stock = () => {
  request(
    `${url_items}?dorayaki=${id}`,
    function (json) {
      // add change stock button
      if (!USER.is_admin) {
        const jumlahStok = document.getElementById("jumlah-stok");
        jumlahStok.innerText = `Stok: ${json.stok}`;
      }

      const input = document.getElementById("item-count-number");

      const submit = document.getElementById("submit-button");
      submit.onclick = function (evt) {
        evt.stopPropagation();
        evt.preventDefault();

        if (
          input.value < 0 ||
          (USER.is_admin ? input.value > 1000 : input.value > json.stok)
        )
          errorHandler();
        else {
          if (!USER.is_admin) {
            buyItem(input.value, id, function (param) {}, errorHandler);
          }
          changeStock(
            USER.is_admin ? input.value : json.stok - input.value,
            `../../db/change-stock.php?dorayaki=${id}&nama_varian=${VARIAN.nama}`,
            function (param) {
              document.location.href = "../html/dash-index.html";
            },
            errorHandler
          );
        }
      };

      const errorElement = document.getElementById("error");
      if (errorElement) errorElement.remove();

      const element = document.querySelector(".featured-products");
      element.style = "display:initial;";
    },
    errorHandler
  );
};

setInterval(get_stock, 1000);
