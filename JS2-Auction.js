
//VARIABLES
var auctions = [];

//START THE APPLICATION
function startApp(){
  getData();
  updateView();
}

//CREATE AUCTION OBJECT
function auctionObject(Title, Description, StartDate, EndDate){
  this.title = Title;
  this.description = Description;
  this.startDate = StartDate;
  this.endDate = EndDate;
}


//GET DATA FROM API
async function getData(){
  let myResponse = await FetchData("http://nackowskis.azurewebsites.net/api/auktion/500");
}

//CLEAN THE DATA AND CREATE AUCTION OBJECTS FROM SOURCE
async function FetchData(url){
  let promise = await fetch(url);
  let data = await promise.json();

  for (var i in data) {
    var auction = new auctionObject(data[i].Titel, data[i].Beskrivning, data[i].StartDatum, data[i].SlutDatum);
    auctions.push(auction);
  }
  updateView();
}

//UPDATE THE VIEW
function updateView(){
  console.log(auctions);
    for(var i=0; i < auctions.length; i++){
      var card = document.createElement('div');
      card.className = 'card text-center';
      var cardContainer = document.getElementById('cardContainer').appendChild(card);

      var cardHeader = document.createElement('div');
      cardHeader.className = 'card-header';
      cardHeader.innerHTML = 'Startdatum: ' + auctions[i].startDate;
      card.appendChild(cardHeader);

      var cardBody = document.createElement('div');
      cardBody.className = "card-body";
      card.appendChild(cardBody);

      var cardTitle = document.createElement('h5');
      cardTitle.className = 'card-title';
      cardTitle.innerHTML = auctions[i].title;
      cardBody.appendChild(cardTitle);

      var description = document.createElement('p');
      description.className = 'card-text';
      description.innerHTML = auctions[i].description;
      cardBody.appendChild(description);

      var firstBid = document.createElement('p');
      firstBid.className = 'card-text';
      firstBid.innerHTML = 'Utropspris: 500:-';
      cardBody.appendChild(firstBid);

      var currentBid = document.createElement('p');
      currentBid.className = 'card-text';
      currentBid.innerHTML = 'Senaste bud: 2500:-';
      cardBody.appendChild(currentBid);

      var btnBid = document.createElement('a');
      btnBid.className = 'btn btn-info';
      btnBid.innerHTML = 'Lägg Bud';
      btnBid.style = 'color: white';
      cardBody.appendChild(btnBid);

      var endBid = document.createElement('div');
      endBid.className = 'card-footer';
      endBid.innerHTML = 'Slutdatum: ' + auctions[i].endDate;
      card.appendChild(endBid);

    }
}
