
//VARIABLES
var allAuctions = [];
var activeAuctions = [];
var bids;

//START THE APPLICATION
function startApp(){
  getData();

}

//CREATE AUCTION OBJECT
function auctionObject(Title, Description, StartDate, EndDate, AuctionId){
  this.title = Title;
  this.description = Description;
  this.startDate = StartDate;
  this.endDate = EndDate;
  this.auctionId = AuctionId;
  this.bids = [0, 0];
}


//SHOWDETAILINFORMATION
function showInfo(className){
  var elementToHide = document.getElementsByClassName(className);
  elementToHide[0].classList.add("show");
}

//GET BIDS
async function getBids(id){
  let myResponse = await FetchDataBids("http://nackowskis.azurewebsites.net/api/Bud/500/"+id);
  return myResponse;
}

//FETCH BIDS
async function FetchDataBids(url){
  let promise = await fetch(url);
  let data = await promise.json();
  return data;
}


//FETCH AUCTIONS
async function FetchData(url){

  let promise = await fetch(url);
  let data = await promise.json();

  return data;

  }
//GET AUCTIONS
async function getData(){
  let data = await FetchData("http://nackowskis.azurewebsites.net/api/Auktion/500/");
    for (var i in data) {
    var auction = new auctionObject(data[i].Titel, data[i].Beskrivning, data[i].StartDatum, data[i].SlutDatum, data[i].AuktionID);
    allAuctions.push(auction);
    var auctionEndDate = new Date(data[i].SlutDatum);
    var currentDate = new Date();
    if(auctionEndDate > currentDate){
      auction.bids = await getBids(data[i].AuktionID);
      activeAuctions.push(auction);
      
    }
}
//UPDATE VIEW
updateView();

}



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


      var btnShowInfo = document.createElement('a');
      btnShowInfo.className = 'btn btn-info';
      btnShowInfo.innerHTML = 'Visa info';
      btnShowInfo.style = 'color: white';
      btnShowInfo.setAttribute('onclick', 'showInfo('+activeAuctions[i].auctionId+');')
      cardBody.appendChild(btnShowInfo);
//Hidden
      var hiddenDiv = document.createElement('div');
      hiddenDiv.className = 'hide';
      hiddenDiv.classList.add(activeAuctions[i].auctionId);
      cardBody.appendChild(hiddenDiv);

      var firstBid = document.createElement('p');
      firstBid.className = 'card-text';
      firstBid.innerHTML = 'Utropspris: 500:-';
      hiddenDiv.appendChild(firstBid);

      
      for(var b=0; b < activeAuctions[i].bids.length; b++){
        var node = document.createElement("li");
        var textnode = document.createTextNode(activeAuctions[i].bids[b].Summa);
        node.appendChild(textnode); 
        hiddenDiv.appendChild(node);

        // console.log(activeAuctions[i].bids[b].Summa);
        // var currentBid = document.createElement('p');
        // currentBid.className = 'card-text';
        // currentBid.innerHTML = activeAuctions[i].bids[b].Summa;
        // hiddenDiv.appendChild(currentBid);
      }

      var currentBidinput = document.createElement('input');
      currentBidinput.className = 'class="form-control"';
      currentBidinput.innerHTML = 'Ange bud';
      currentBidinput.id = activeAuctions[i].auctionId;
      hiddenDiv.appendChild(currentBidinput);

      var btnBid = document.createElement('a');
      btnBid.className = 'btn btn-success';
      btnBid.innerHTML = 'Lägg bud';
      btnBid.style = 'color: white';
      btnBid.setAttribute('onclick', 'createBid('+activeAuctions[i].auctionId+');')
      hiddenDiv.appendChild(btnBid);
//-----
      var endBid = document.createElement('div');
      endBid.className = 'card-footer';
      endBid.innerHTML = 'Slutdatum: ' + activeAuctions[i].endDate;
      card.appendChild(endBid);

    }
}
