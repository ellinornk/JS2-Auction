
getAuctionData();

       async function getAuctionData()
       {
         let today = new Date();
         let beskrivning = document.getElementById("beskrivning").value;
         let titel = document.getElementById("titel").value;
         let slutdatum = document.getElementById("slutdatum").value;
         let utropspris = document.getElementById("utropspris").value;
            var auction = {"AuktionID": 1,
                "Titel": titel,
                "Beskrivning": beskrivning,
                "StartDatum": today,
                "SlutDatum":"2018-04-20T07:10:50.0063755+00:00",
                "Gruppkod":500,
                "Utropspris": utropspris};
            let  url = 'http://nackowskis.azurewebsites.net/api/bud/';
            await postAuctionData(url, auction)
         }


async function postAuctionData(url, values) {

           fetch(url,{
               method: 'POST',
               body: JSON.stringify(values),
               headers: {
                   'Accept': 'application/json, text/plain, */*',
                   'Content-Type': 'application/json'
               }

           }).then(function (data) {
               console.log('Request success: ', 'posten skapad');
           })

       }
/*
 function create(){
  fetch("http://nackowskis.azurewebsites.net/api/auktion/",{
    method: 'POST',
    body: JSON.stringify({
      "AuktionID": 1,
      "Titel": "That thing",
      "Beskrivning": "Jupp",
      "StartDatum":"2018-03-13T07:10:50.0063755+00:00",
      "SlutDatum":"2018-04-20T07:10:50.0063755+00:00",
      "Gruppkod":500,
      "Utropspris": 3000}),   */
//    headers: {'Accept': 'application/json, text/plain, */*','Content-Type': 'application/json'}
//  })
//}
