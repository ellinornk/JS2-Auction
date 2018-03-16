/*Bud
 - Bud Id
 - Summa
 - Auktions Id
*/


createBid();

       async function createBid(id)
       {  
          value = document.getElementById(id).value;
          console.log('id='+id+'Värde='+value);
            var bud = { "BudID": "0", "Summa": value, "AuktionID": id };
            let  url = 'http://nackowskis.azurewebsites.net/api/bud/';
            await postData(url, bud)
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
