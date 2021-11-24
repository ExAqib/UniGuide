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
    div3.className = "card uni-card text-white";
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

  function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }
  
  /*An array containing all the country names in the world:*/
  var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
  
  /*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
  autocomplete(document.getElementById("form1"), countries);
});
