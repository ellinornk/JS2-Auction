//Sortera på Utropspris
sortByPrice();
async function sortByPrice(){

  let response = await fetchingData("http://nackowskis.azurewebsites.net/api/auktion/500");
  let sorted = response.sort((a,b) => a.Utropspris > b.Utropspris);
  console.log(sorted);
}
//Sortera på Slutdatum
sortByDate();
async function sortByDate(){
  let response = await fetchingData("http://nackowskis.azurewebsites.net/api/auktion/500");
  let sorted = response.sort((a,b) => a.SlutDatum < b.SlutDatum);
  console.log(sorted);
}

async function fetchingData(url){
  let promise = await fetch(url);
  let data = await promise.json();
  return data;
}
