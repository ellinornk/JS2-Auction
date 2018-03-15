//sort by Utropspris
//sort by SlutDatum


sortingData();
async function sortingData(){

  let response = await fetchingData("http://nackowskis.azurewebsites.net/api/auktion/500");
  for (let arr of response){
    let sorted = arr.sort(response.Utropspris);
    console.log(sorted);
  }
  return sorted;
}


async function fetchingData(url){
  let promise = await fetch(url);
  let data = await promise.json();
  return data;
}
