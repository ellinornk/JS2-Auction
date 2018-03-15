
//VARIABLES
var allAuctions = [];
var activeAuctions = [];

//START THE APPLICATION
function startApp(){
  getData();
  updateView();
}

//CREATE AUCTION OBJECT
function auctionObject(Title, Description, StartDate, EndDate, AuctionId){
  this.title = Title;
  this.description = Description;
  this.startDate = StartDate;
  this.endDate = EndDate;
  this.auctionId = AuctionId;
}

//GET DATA FROM API
async function getData(){
  let myResponse = await FetchData("http://nackowskis.azurewebsites.net/api/auktion/500");
}
//ELLINORS KOMMANDE FUNKTION
function newBid(id){
 console.log(id);
}

function showInfo(id){
  getAuction(id);
}


//CLEAN THE DATA AND CREATE AUCTION OBJECTS FROM SOURCE
async function FetchData(url){
  let promise = await fetch(url);
  let data = await promise.json();
  for (var i in data) {
    var auction = new auctionObject(data[i].Titel, data[i].Beskrivning, data[i].StartDatum, data[i].SlutDatum, data[i].AuktionID);
    allAuctions.push(auction);
    var auctionEndDate = new Date(data[i].SlutDatum);
    var currentDate = new Date();
    if(auctionEndDate > currentDate){
      activeAuctions.push(auction);
    }
  }
  updateView();
}

//-----
async function getAuction(id){
  let myResponse = await FetchData2("http://nackowskis.azurewebsites.net/api/auktion/500/"+id);
}

async function FetchData2(url){
  let promise = await fetch(url);
  let data = await promise.json();
  var auction = new auctionObject(data.Titel, data.Beskrivning, data.StartDatum, data.SlutDatum, data.AuktionID);
  updateSingleView(auction);
}

function updateSingleView(auction){
    console.log(auction);
    var card = document.createElement('div');
    card.className = 'card text-center';
    var cardContainer = document.getElementById('cardContainer').appendChild(card);

    var cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';
    cardHeader.innerHTML = 'Startdatum: ' + auction.startDate;
    card.appendChild(cardHeader);



}
//-----

//UPDATE THE VIEW
function updateView(){
    for(var i=0; i < activeAuctions.length; i++){
      var card = document.createElement('div');
      card.className = 'card text-center';
      var cardContainer = document.getElementById('cardContainer').appendChild(card);

      var cardHeader = document.createElement('div');
      cardHeader.className = 'card-header';
      cardHeader.innerHTML = 'Startdatum: ' + activeAuctions[i].startDate;
      card.appendChild(cardHeader);

      var cardBody = document.createElement('div');
      cardBody.className = "card-body";
      card.appendChild(cardBody);

      var cardTitle = document.createElement('h5');
      cardTitle.className = 'card-title';
      cardTitle.innerHTML = activeAuctions[i].title;
      cardBody.appendChild(cardTitle);

      var description = document.createElement('p');
      description.className = 'card-text';
      description.innerHTML = activeAuctions[i].description;
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
      btnBid.innerHTML = 'Visa info';
      btnBid.style = 'color: white';
      btnBid.setAttribute('onclick', 'showInfo('+activeAuctions[i].auctionId+');')
      cardBody.appendChild(btnBid);

      var endBid = document.createElement('div');
      endBid.className = 'card-footer';
      endBid.innerHTML = 'Slutdatum: ' + activeAuctions[i].endDate;
      card.appendChild(endBid);

    }
}
