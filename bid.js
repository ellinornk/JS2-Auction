/*Bud
 - Bud Id
 - Summa
 - Auktions Id
*/


createBid();

       async function createBid(id){ 
            var auction;
            value = document.getElementById(id).value;
            for(var i=0; i < activeAuctions.length; i++){
              if (activeAuctions[i].auctionId == id){
                if (activeAuctions[i].bids === undefined || activeAuctions[i].bids.length == 0) {
                  if (value <= activeAuctions[i].startBid){
                    alert('Budet måste vara högre än utropspriset!');
                  }
                  else{
                  var bud = { "BudID": "0", "Summa": value, "AuktionID": id };
                  let  url = 'http://nackowskis.azurewebsites.net/api/bud/';
                  await postData(url, bud)
                  alert('Du har lagt ett bud!');
                  location.reload();
                  }
                }
                else{
                  console.log('value= '+value);
                  console.log('Senast bud= '+activeAuctions[i].bids[0].Summa);
                  if (value <= activeAuctions[i].bids[0].Summa){
                    alert('Budet måste vara högre än senast lagda bud!');
                  }
                  else{
                  var bud = { "BudID": "0", "Summa": value, "AuktionID": id };
                  let  url = 'http://nackowskis.azurewebsites.net/api/bud/';
                  await postData(url, bud)
                  alert('Du har lagt ett bud!');
                  location.reload();

                  }
                }
              }
            }
         }


async function postData(url, bid) {

           fetch(url,{
               method: 'POST',
               body: JSON.stringify(bid),
               headers: {
                   'Accept': 'application/json, text/plain, */*',
                   'Content-Type': 'application/json'
               }

           }).then(function (data) {
               console.log('Request success: ', 'posten skapad');
           })

       }
