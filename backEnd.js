window.addEventListener("DOMContentLoaded", () => {
  function fetchData(link) {
    request = new XMLHttpRequest();
    request.open("GET", link, true);

    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        // Success!

        // store all data from API to data variable (in JSON)
        try {
          var data = JSON.parse(request.responseText);

          var totalRecords = Object.keys(data).length;
          if (totalRecords == 0) {
            console.log("No Record Found ");
            alert("No Record Found");
            return;
          }

          console.log("Total Records found are  " + totalRecords);
          console.log(data);

          //displaying first record (data[0]) explicitly

          document.querySelector(".card-title").innerHTML = data[0].name;
          document.querySelector(".card-subtitle").innerHTML = data[0].country;

          var description = "<br>" + "Domain: " + data[0].domains;
          document.querySelector(".card-text").innerHTML = description;

          var a = document.getElementById("cardLink");
          a.setAttribute("href", data[0].web_pages);

          //Now displaying other records by function.
          for (var i = 1; i < totalRecords; i++) {
            if (i >= 20) {
              //Only displaying 20 records maximum
              break;
            } else {
              createCard(
                data[i].name,
                data[i].country,
                data[i].domains,
                data[i].web_pages
              );
            }
          }
        } catch (e) {
          console.log("Exception occured while processing data of API. " + e);
        }
      } else {
        alert("Connection Problem");
      }
    };

    request.onerror = function () {
      // There was a connection error of some sort
      alert("We are soory for the inconvenience due to an unknown error");
    };

    request.send();

    request.o;
  }

  //OnCLickListener for Search button
  document.querySelector(".col-md-2").onclick = () => {
    var name = document.querySelector("#form1").value;
    var location = document.querySelector("#form2").value;

    name.trim();
    location.trim();

    var url = "http://universities.hipolabs.com/search?name=";

    if (name != "" && location == "") {
      url = url + name;
      console.log("URL is (NO Location)  " + url);
    } else if (location != "" && name == "") {
      url = "http://universities.hipolabs.com/search?country=" + location;
      console.log("URL is  (NO Name for search)" + url);
    } else if (name != "" && location != "") {
      url = url + name + "&country=" + location;
      console.log("URL is  (Both name and location present) " + url);
    } else {
      alert("Please Enter Any thing");
      console.log("Empty search ");
      return;
    }

    console.log("Call made to Fetch data ");
    fetchData(url);
  };

  function createCard(name, country, domain, url) {
    var div2 = document.createElement("div");
    var div3 = document.createElement("div");
    var div4 = document.createElement("div");
    var h5 = document.createElement("h5");
    var h6 = document.createElement("h6");
    var p = document.createElement("p");
    var a = document.createElement("a");
    var a2 = document.createElement("a");

    div2.classList.add("col");
    div3.className = "card uni-card text-white mask-customس";
    div4.className = "card-body uni-card-body";
    h5.className = "card-title";
    h6.className = "card-subtitle mb-2 text-muted";
    p.className = "card-text";
    a.className = "card-link";
    a2.className = "card-link";

    h5.appendChild(document.createTextNode(name));
    
    h6.appendChild(document.createTextNode(country));

    var description = "Domain: " + domain;
    //p.appendChild(document.createElement("br"));
    p.appendChild(document.createTextNode(description));

    a.appendChild(document.createTextNode("Visit Official Site"));
    a.setAttribute("href", url);

    a2.appendChild(document.createTextNode("Goto Top"));
    a2.setAttribute("href", "#");

    div2.appendChild(div3);
    div3.appendChild(div4);
    div4.appendChild(h5);
    div4.appendChild(h6);
    div4.appendChild(p);
    div4.appendChild(a);
    div4.appendChild(a2);

    document.getElementById("nextCard").appendChild(div2);
  }
});
