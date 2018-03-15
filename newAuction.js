
//Get information from inputs
function getNewAuction() {

    let titelInput = document.getElementById("adminTitel").value;
    let startDatumInput = document.getElementById("adminStartDatum").value;
    let slutDatumInput = document.getElementById("adminSlutDatum").value;
    let prisInput = document.getElementById("adminUtropspris").value;
    let beskrivningInput = document.getElementById("adminBeskrivning").value;

    createNewAuction(titelInput,startDatumInput,slutDatumInput,prisInput,beskrivningInput);
}

//Creates a new auction from the input from getNewAuction
function createNewAuction(titel,startDate,endDate,pris,beskrivning) {
  fetch("https://nackowskis.azurewebsites.net/api/auktion/500/", {
    method: "POST",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      AuktionID: 1,
      Beskrivning: beskrivning,
      Gruppkod: 500,
      SlutDatum: endDate + "T00:00:00",
      StartDatum: startDate + "T00:00:00",
      Titel: titel,
      Utropspris: pris
    })
  }).then(function (data) {
     console.log('Request success: ', 'posten made');
        })
}



//Delete function
function deleteAuction(){
  let inputAuctionId = document.getElementById("adminAuctionId").value;
  deleteAnOldAuction(inputAuctionId);
}
function deleteAnOldAuction(id){
  fetch("https://nackowskis.azurewebsites.net/api/auktion/500/" + id, {
    method: "DELETE",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  }).then(function (data) {
     console.log('Request success: ', 'post deleted');
        })
}
