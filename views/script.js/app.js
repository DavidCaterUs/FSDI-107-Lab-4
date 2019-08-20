var catalog = [];

function getCatalog() {

  $.ajax({
    url: "http://127.0.0.1:8080/api/products",
    type : "GET",
    success : function(res){
      console.log("Respond from server: ", res);

        for(let i = 0; i < res.length; i++){
          var item = res[i];
          if(item.user == "Kleibert") {
          catalog.push(item); // append to Catalog

        }
      }
        displayCatalog();

    },
    error: function (error){
      console.error("Error on req", err);
    }

  });
  // anything here will be executed before the actual request.
}

function displayCatalog() {
  //get the reference to ul
console.log("Display Catalog");

  for (let i = 0; i < catalog.length; i++) {
    var item = catalog[i];


    displayItem(item);
  }
}

function displayItem(item){

  var ul = $("#catalog");

  var li =
  `<div class="card" style="width: 18rem;">
<img src="${item.image}" class="card-img-top" alt="...">
<hr>
<div class="card-body">
  <h5 class="card-title">${item.title}</h5>
  <p class="card-text">${item.description}</p>
  <a href="#" class="btn btn-primary">Add to cart</a>
  <hr>
  <h6>${item.price} ARS</h6>
</div>
</div>`;
  ul.append(li);
}

function search(){
  var text = $("#txtSearch").val().toLowerCase();

  console.log("User wants to search for: " + text);

//clear()
$("#catalog").html('');

for (let i=0; i < catalog.length; i++){
  var item = catalog[i];

  if(item.title.toLowerCase().indexOf(text) >= 0
    || item.description.toLowerCase().indexOf(text) >0 ) {
    displayItem(item);
  }
}

}


function init() {



  console.log("Init Catalog Page")

  getCatalog();


  $("#btnSearch").click(search);
  $("#txtSearch").keypress(function(args){
    if(args.keyCode == 13){
      search();
      args.preventDefault();

    }
  });

  $(".dropdown-item").click(function () {
    var category = $(this).attr('catName');
    console.log("filter by catergory : " + category);
  })
}

/*
http method
status code
*/



window.onload = init;
