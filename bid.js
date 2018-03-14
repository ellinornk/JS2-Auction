/*Bud
 - Bud Id
 - Summa
 - Auktions Id
*/


function getJSONbid(){
  var bidID =
  var sum =
  var auctionID =
  JSONinput = "BudID"
}

function newBid2(id){
  console.log(id);
 fetch("http://nackowskis.azurewebsites.net/api/",{
   method: 'POST',
   body: JSON.stringify({
     "BudID": 2,
     "Summa":
     "AuktionID": 2,),
   headers: {'Accept': 'application/json, text/plain, */*','Content-Type': 'application/json'}
 })
}
/*
function newBid(id){
 console.log(id);
}
*/
