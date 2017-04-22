(function() {

var supportOutput = document.querySelector("#supportOutput"),
	positionOutput = document.querySelector("#positionOutput"),
	findPositionButton = document.querySelector("#findPosition"),
	goMapBing = document.querySelector("#goMapBing"),
	map = document.querySelector("#map");
	

//SPRAWDZENIE CZY PRZEGLADARKA WSPIERA GEOLOKALIZACJE
if(!navigator.geolocation) {

	supportOutput.innerHTML = "Twoja przeglądarka nie wspiera geolokalizacji";
	supportOutput.classList.add("alert-danger");

} else {

	supportOutput.innerHTML = "OK!   Twoja przeglądarka wspiera geolokalizacje";
	supportOutput.classList.add("alert-success");

}

//FUNKCJA SUCCESS DLA POBRANIA POZYCJI
function geoSuccess(position) {

	var lat = position.coords.latitude;
	var lon = position.coords.longitude;

	positionOutput.innerHTML = "Twoja pozycja to: " + "<br>" + lat + "<br>" + lon;
	
	goMapBing.setAttribute("href", "https://www.bing.com/maps?cp=" + lat + "~" + lon);
	goMapBing.classList.toggle("hidden");
	goMap.classList.toggle("hidden");

}

//funkcja wczytyjaca mape google ze wspolrzednych
goMap.onclick = function() {

	goMap.innerHTML = "Czekaj...";
	
	navigator.geolocation.getCurrentPosition(function(pos){
		var lat = pos.coords.latitude;
		var lon = pos.coords.longitude;

		//style mapy
		var styles = [
		  {
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#242f3e"
		      }
		    ]
		  },
		  {
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#746855"
		      }
		    ]
		  },
		  {
		    "elementType": "labels.text.stroke",
		    "stylers": [
		      {
		        "color": "#242f3e"
		      }
		    ]
		  },
		  {
		    "featureType": "administrative.locality",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#d59563"
		      }
		    ]
		  },
		  {
		    "featureType": "poi",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#d59563"
		      }
		    ]
		  },
		  {
		    "featureType": "poi.park",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#263c3f"
		      }
		    ]
		  },
		  {
		    "featureType": "poi.park",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#6b9a76"
		      }
		    ]
		  },
		  {
		    "featureType": "road",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#38414e"
		      }
		    ]
		  },
		  {
		    "featureType": "road",
		    "elementType": "geometry.stroke",
		    "stylers": [
		      {
		        "color": "#212a37"
		      }
		    ]
		  },
		  {
		    "featureType": "road",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#9ca5b3"
		      }
		    ]
		  },
		  {
		    "featureType": "road.highway",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#746855"
		      }
		    ]
		  },
		  {
		    "featureType": "road.highway",
		    "elementType": "geometry.stroke",
		    "stylers": [
		      {
		        "color": "#1f2835"
		      }
		    ]
		  },
		  {
		    "featureType": "road.highway",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#f3d19c"
		      }
		    ]
		  },
		  {
		    "featureType": "transit",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#2f3948"
		      }
		    ]
		  },
		  {
		    "featureType": "transit.station",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#d59563"
		      }
		    ]
		  },
		  {
		    "featureType": "water",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#17263c"
		      }
		    ]
		  },
		  {
		    "featureType": "water",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#515c6d"
		      }
		    ]
		  },
		  {
		    "featureType": "water",
		    "elementType": "labels.text.stroke",
		    "stylers": [
		      {
		        "color": "#17263c"
		      }
		    ]
		  }
		];


		var mapObj = new google.maps.Map(map, {
  			center: {
    			lat: lat,
    			lng: lon
  			},
  			zoom: 12,
  			styles: styles
		});

		var marker = new google.maps.Marker({
		    position: {
		        lat: lat,
		        lng: lon
		    },
		    map: mapObj
		});


		

		goMap.classList.toggle("hidden");

	});



         
}

//FUNKCJA ERROR DLA GETCURRENTPOSITIONS
function geoError(errorObj) {

	var errorMessage;

	switch(errorObj.code) {

		case errorObj.PERMISSION_DENIED :
			errorMessage = "Brak pozwolenia na znalezienie lokalizacji.";
			break;

		case errorObj.POSITION_UNAVAILABLE :
			errorMessage = "Brak dostępu do sieci";
			break;

		case errorObj.TIMEOUT :
			errorMessage = "Przekroczono czas oczekiwania";
			break;
	}

	positionOutput.innerHTML = "<strong>Wystąpił błąd: </strong>" + errorMessage;
}

//OPCJE JAKIE MOZNA USTAWIAC, CZAS GPS ITP
options = {
	enableHighAccuracy: true
}

//PONIZSZA FUNKCJA PRZYPISUJE NA KLIKNIECIE DO BUTTONA POBIERANIE POZYCJI ZA POMOCA GETCURRENTPOSITION
// Z OBIEKTU NAVIGATOR GEOLOCATION
findPositionButton.onclick = function() {

	positionOutput.innerHTML = "Czekaj...";
	navigator.geolocation.getCurrentPosition(geoSuccess, geoError, options);

}

})();


