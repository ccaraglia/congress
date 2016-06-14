
var bodyNode=document.querySelector("#text")

//getting the legislators data
var congressionalAPI = $.getJSON("https://congress.api.sunlightfoundation.com/legislators?apikey=4772010bf45444b981e1cc54be6b2088")


//function that gets the legislators data (same type) filtered by ZIP code

var handleZIP = function(evt) {
    console.log(evt)
    if (evt.keyCode === 13) {
        // console.log('target>>', evt.target)
        //GRAB TEXT INPUT FROM USER
        var inputNode = evt.target


        var inputZip=inputNode.value
        //empty the add toolbar after each enter
        inputNode.value = ''


        var stringZip="https://congress.api.sunlightfoundation.com/legislators/locate?apikey=4772010bf45444b981e1cc54be6b2088&zip=" + inputZip
        //gets the data per ZIP
        var zipAPI=$.getJSON(stringZip)
        //console.log(zipAPI)
        zipAPI.then(handleData)
    }
}


var inputNode=document.querySelector('input')
//console.log(inputNode)
inputNode.addEventListener("keypress", handleZIP)




//the main constructor that generates the page (all legislators or the ones filtered by ZIP)

//test to get the right data

var handleData = function(data){
        console.log(data)

/*  console.log(data.results[1].last_name)
    console.log(data.results[1].first_name)
    console.log(data.results[1].title)
    console.log(data.results[1].party)
    console.log(data.results[1].state_name)
    console.log(data.results[1].oc_email)
    console.log(data.results[1].website)
    console.log(data.results[1].facebook_id)
    console.log(data.results[1].twitter_id)
    console.log(data.results[1].term_end)

*/


//CRUCIAL STEP: EMPTY THE INNERHTML TO MAKE DIFFERENT POPULATION POSSIBLE
    bodyNode.innerHTML=""
    for (var i=0; i<data.results.length; i++){
    var congresspersonElement = ""
    congresspersonElement += "<div class=senatorDiv>"
    congresspersonElement += "<h1>" + data.results[i].first_name +" "+data.results[i].last_name + "</h1>"
    congresspersonElement += "<li>" + "email: " +data.results[i].oc_email + "</li>"
    congresspersonElement += "<li>" + "website: " +data.results[i].website + "</li>"
    congresspersonElement += "<li>" + "facebook: "+data.results[i].facebook_id + "</li>"
    congresspersonElement += "<li>" + "twitter: "+data.results[i].twitter_id + "</li>"
    congresspersonElement += "<h3>" + "TermEnd"+data.results[i].term_end + "</h3>"
    congresspersonElement += "</div>"


    bodyNode.innerHTML += congresspersonElement

    }

}

congressionalAPI.then(handleData)
