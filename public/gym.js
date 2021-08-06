let map;
console.log("running")
const mapScript = document.querySelector(".map");
mapScript.src = `https://maps.googleapis.com/maps/api/js?key=${config.MY_KEY}&callback=initMap&libraries=&v=weekly`
function initMap() {
    var options = {
        zoom: 8,
        center: { lat: 42.3601, lng: -71.0589 }
    }

    var map = new google.maps.Map(document.getElementById('map'), options);


}


//      
src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBicBrq87p84gvkNjW7T3P13al60-TdRds&callback=initMap&libraries=&v=weekly"
