async function getAuction(id){
	let myResponse = await FetchData("http://nackowskis.azurewebsites.net/api/auktion/500"+id);
}

async function FetchData(url){
  let promise = await fetch(url);
  let data = await promise.json();
  var auction = new auctionObject(data.Titel, data.Beskrivning, data.StartDatum, data.SlutDatum, data.AuktionID);

  updateSingleView(auction);
}

updateSingleView(auction){
	var card = document.createElement('div');
  card.className = 'card text-center';
  var cardContainer = document.getElementById('cardContainer').appendChild(card);

      var cardHeader = document.createElement('div');
      cardHeader.className = 'card-header';
      cardHeader.innerHTML = 'Startdatum: ' + auction.startDate;
      card.appendChild(cardHeader);
}

