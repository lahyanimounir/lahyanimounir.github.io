let map;
markers = [];
let htmlToAppend ="";
function initMap() {
map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    
        
    center: { lat: 24.348005 , lng: -11.994013 },
});
// NOTE: This uses cross-domain XHR, and may not work on older browsers.
map.data.loadGeoJson(
    "maroc.json"
);
map.data.setStyle({
fillColor: 'gray',
strokeColor: '#000',
strokeOpacity: 0.8,
strokeWeight: 0.5
});
var input = document.getElementById('searchMapInput');
console.log(input);

var autocomplete = new google.maps.places.Autocomplete(input);

autocomplete.setComponentRestrictions({'country': ['MA']});

autocomplete.addListener('place_changed', function() {
place = autocomplete.getPlace();
console.log(place);
addmarker(place.geometry.location.lat(),place.geometry.location.lng())

htmlToAppend = htmlToAppend + `
            <div class="pb-2" style="border-bottom: 1px solid #e1e1e1 ;">
                <input checked onclick="calc(this);" id="${markers.length}" type="checkbox" name="localisation${markers.length}">
                <label for=""> ${place.name}</label>
                <div class="px-3" style="font-size: 14px;opacity:0.8">
                    <div>
                        <span>lat: ${place.geometry.location.lat()} </span> 
                    </div>
                    <div>
                        <span>lng: ${place.geometry.location.lng()}</span>  
                    </div>
                </div>
            </div>
`


var element = document.getElementById("myList");
element.innerHTML = htmlToAppend
// var place = autocomplete.getPlace();
// document.getElementById('location-snap').innerHTML = place.formatted_address;
// document.getElementById('lat-span').innerHTML = place.geometry.location.lat();
// document.getElementById('lon-span').innerHTML = place.geometry.location.lng();
});
}



function addmarker(lat,lng){
    let myLatLng = { lat: lat, lng: lng };
    let marker = new google.maps.Marker({
        position: myLatLng,
        map,
    });
    markers.push(marker)
}


function calc(element)
{
    var index = element.id;
    console.log(element.id)
    if (element.checked) 
    {
        markers[index - 1].setMap(map);
    } else {
        markers[index - 1].setMap(null)
    }
}




window.initMap = initMap;
