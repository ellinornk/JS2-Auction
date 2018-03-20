//Sortera på Utropspris

async function sortByPrice(){

	let sortedAllByPrice = allAuctions.sort((a,b) => a.startBid < b.startBid);
  var myNode = document.getElementById("cardContainer");
	while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
	}
	updateView(sortedAllByPrice);
}
//Sortera på Slutdatum
async function sortByDate(){
  let sortedAllByDate = allAuctions.sort((a,b) => a.endDate < b.endDate);
  var myNode = document.getElementById("cardContainer");
	while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
	}
	updateView(sortedAllByDate);
}

async function fetchingData(url){
  let promise = await fetch(url);
  let data = await promise.json();
  return data;
}


