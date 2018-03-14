 function create(){
  fetch("http://nackowskis.azurewebsites.net/api/auktion/",{
    method: 'POST',
    body: JSON.stringify({
      "AuktionID": 2,
      "Titel": "Supercoola killen",
      "Beskrivning": "Asså den här grejen är supercool",
      "StartDatum":"2018-03-13T07:10:50.0063755+00:00",
      "SlutDatum":"2018-03-15T07:10:50.0063755+00:00",
      "Gruppkod":500,
      "Utropspris": 150}),
    headers: {'Accept': 'application/json, text/plain, */*','Content-Type': 'application/json'}
  })
}
