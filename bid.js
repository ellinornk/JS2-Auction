/*Bud
 - Bud Id
 - Summa
 - Auktions Id
*/


Test();

       async function Test()
       {
           var bud = { "BudID": "0", "Summa": "1500", "AuktionID": "12" };
            let  url = 'http://nackowskis.azurewebsites.net/api/bud/';
            await postData(url, bud)
         }


async function postData(url, values) {

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
