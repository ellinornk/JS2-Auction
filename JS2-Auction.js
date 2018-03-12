GetData();
async function GetData(){

  let myResponse = await FetchData("http://nackowskis.azurewebsites.net/api/auktion/500");

  for (var parameter of myResponse){
    let myTextTag = document.createElement("p");
    let text = parameter.Titel;
    let textNode = document.createTextNode(JSON.stringify(text));
    myTextTag.appendChild(textNode);
    document.body.appendChild(myTextTag);
  }
}

async function FetchData(url){
  let promise = await fetch(url);
  let data = await promise.json();
  return data;
}
