
//VARIABLES
var allAuctions = [];
var activeAuctions = [];
var bids;

//START THE APPLICATION
function startApp(){
  getData();

}

//CREATE AUCTION OBJECT
function auctionObject(Title, Description, StartDate, EndDate, AuctionId, StartBid){
  this.title = Title;
  this.description = Description;
  this.startDate = StartDate;
  this.endDate = EndDate;
  this.auctionId = AuctionId;
  this.startBid = StartBid;
  this.bids = [0, 0];
  this.active = "";
}


//SHOWDETAILINFORMATION
function showInfo(className){
  var button = document.getElementsByClassName('show-hide'+className);
  var elementToHide = document.getElementsByClassName(className);
     if (elementToHide[0].style.display === "block") {
        button[0].innerHTML = 'Visa info';
        elementToHide[0].style.display = "none";
    } else {
        button[0].innerHTML = 'Dölj info';
        elementToHide[0].style.display = "block";
    }
}

//GET BIDS
async function getBids(id){
  let myResponse = await FetchDataBids("http://nackowskis.azurewebsites.net/api/Bud/500/"+id);
  var sorteredBids = myResponse.sort(function(a, b){return b.Summa-a.Summa});

  return sorteredBids;
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
    var auctionEndDate = new Date(data[i].SlutDatum);
    var auction = new auctionObject(data[i].Titel, data[i].Beskrivning, data[i].StartDatum, auctionEndDate, data[i].AuktionID, data[i].Utropspris);
    var currentDate = new Date();
    if(auctionEndDate > currentDate){
      auction.active = true;
      auction.bids = await getBids(data[i].AuktionID);
      activeAuctions.push(auction);
      allAuctions.push(auction);
    }
    else{
      auction.active = false;
      auction.bids = await getBids(data[i].AuktionID);
      allAuctions.push(auction); 
    }
}
//UPDATE VIEW
updateView(activeAuctions);
}



//UPDATE THE VIEW
function updateView(array){
    for(var i=0; i < array.length; i++){

        var card = document.createElement('div');
        card.className = 'card';
        var cardContainer = document.getElementById('cardContainer').appendChild(card);
       
      var labelActive = document.createElement('label');
      if(array[i].active){
        labelActive.innerHTML = "Aktiv";
        labelActive.className = "active"
      }
      else{
        labelActive.innerHTML = "Inaktiv";
        labelActive.className = "inactive"
      }
      card.appendChild(labelActive);

       var cardImage = document.createElement('img');
       cardImage.className = "card-img-top";
       cardImage.src = "http://static-cdn.citiboard.se/545/img/responsive/no-picture.png";
       card.appendChild(cardImage);

      var cardHeader = document.createElement('label');
      var startDate = new Date(array[i].startDate); 
      cardHeader.innerHTML = 'Startdatum: ' + startDate.getFullYear()+'-'+(startDate.getMonth()+1)+'-'+startDate.getDate();
      card.appendChild(cardHeader);

      var cardSecondHeader = document.createElement('label');
      var endDate = new Date(array[i].endDate);
      cardSecondHeader.innerHTML = 'Slutdatum: ' + endDate.getFullYear()+'-'+(endDate.getMonth()+1)+'-'+endDate.getDate();
      card.appendChild(cardSecondHeader);

      var cardBody = document.createElement('div');
      cardBody.className = "card-body";
      card.appendChild(cardBody);

      var cardTitle = document.createElement('h5');
      cardTitle.className = 'card-title';
      cardTitle.innerHTML = array[i].title;
      cardBody.appendChild(cardTitle);

      var description = document.createElement('p');
      description.className = 'card-text';
      description.innerHTML = array[i].description;
      cardBody.appendChild(description);
     
     if(array[i].active){
      var firstBid = document.createElement('p');
      firstBid.className = 'card-text firstBid';
      firstBid.innerHTML = 'Utropspris: '+array[i].startBid+':-';
      cardBody.appendChild(firstBid);
     }

      var btnShowInfo = document.createElement('a');
      btnShowInfo.className = 'btn btn-info show-hide'+array[i].auctionId;
      btnShowInfo.innerHTML = 'Visa info';
      btnShowInfo.style = 'color: white';
      btnShowInfo.setAttribute('onclick', 'showInfo('+array[i].auctionId+');')
      cardBody.appendChild(btnShowInfo);
//Hidden
      var hiddenDiv = document.createElement('div');
      hiddenDiv.className = 'hide';
      hiddenDiv.classList.add(array[i].auctionId);
      cardBody.appendChild(hiddenDiv);

      if(array[i].active){
        var text = document.createElement('p');
        text.className = 'older-bids';
        text.innerHTML = 'Tidigare bud';
        hiddenDiv.appendChild(text);

        var bidList = document.createElement('ul');
        bidList.className = "list-group";
        hiddenDiv.appendChild(bidList);
        
        for(var b=0; b < array[i].bids.length; b++){
          var node = document.createElement("li");
          var textnode = document.createTextNode(array[i].bids[b].Summa+":-");
          node.appendChild(textnode);
          node.className = "list-group-item"; 
          bidList.appendChild(node);
          }

        var currentBidinput = document.createElement('input');
        currentBidinput.className = 'class="form-control"';
        currentBidinput.placeholder = 'Ange bud';
        currentBidinput.id = array[i].auctionId;
        hiddenDiv.appendChild(currentBidinput);

        var btnBid = document.createElement('a');
        btnBid.className = 'btn btn-success';
        btnBid.innerHTML = 'Lägg bud';
        btnBid.style = 'color: white';
        btnBid.setAttribute('onclick', 'createBid('+array[i].auctionId+');')
        hiddenDiv.appendChild(btnBid);
      }
      else{
      var showResult = document.createElement('p');
      showResult.className = 'card-text showResult';
      showResult.innerHTML = 'Du kan inte längre lägga bud';
      hiddenDiv.appendChild(showResult);

        if (array[i].bids === undefined || array[i].bids.length == 0) {
          var winningBid = document.createElement("p");
          winningBid.innerHTML = "Objektet gick till utgångspriset: "+array[i].startBid+':-';
          hiddenDiv.appendChild(winningBid);
        }
        else{
        var winningBid = document.createElement("p");
        winningBid.innerHTML = "Det vinnande budet var: "+ array[i].bids[0].Summa+':-';
        hiddenDiv.appendChild(winningBid);
        }
      }


    }
}
