import {useEffect, useRef} from 'react';
import solar_png from './images/solar.png';
import chicken_coop_png from './images/chicken_coop.png';

const GoogleMap = ({data, placeName}) => {

  const googleMapRef = useRef();
  let googleMap;
  let points = data.state.points;

  let updateMarkers = (() => {

    //Add solar panels to map
    data.state.points.solar.forEach(solar_point => {
      let icon = {
        url: solar_png, // url
        scaledSize: new window.google.maps.Size(50, 50), // scaled size
        origin: new window.google.maps.Point(0,0), // origin
        anchor: new window.google.maps.Point(25, 25) // anchor
     };
      const solar_marker = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(solar_point.lat, solar_point.lng),
        icon: icon
      });
      solar_marker.setMap(googleMap)
    });

    //Add chicken coops to map
    data.state.points.chicken_coop.forEach(coop_point => {
      let icon = {
        url: chicken_coop_png, // url
        scaledSize: new window.google.maps.Size(50, 50), // scaled size
        origin: new window.google.maps.Point(0,0), // origin
        anchor: new window.google.maps.Point(25, 25) // anchor
     };
      const coop_marker = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(coop_point.lat, coop_point.lng),
        icon: icon
      });
      coop_marker.setMap(googleMap)
    });
    
    //Clear previous property boundary
    if(points.boundary != undefined){
      points.boundary.setMap(null);
    }
    
    //Add property boundary to map
    points.boundary =  new window.google.maps.Polygon({
      paths: points.boundary_points,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillOpacity: 0.0,
      clickable: false
    });
    points.boundary.setMap(googleMap);
    if(points.boundary_points.length > 2){
      console.log("HERE HERE")

    //Calculate area of boundary
    let area = window.google.maps.geometry.spherical.computeArea(points.boundary.getPath());
    let acres = area / 4046.86;
    data.setState({
      area: acres
    })
    }

    //Add goat fencing to map
    let goat_fence = new window.google.maps.Polyline({
      path: points.goat_points,
      geodesic: true,
      strokeColor: "#8e9490",
      strokeOpacity: 1.0,
      strokeWeight: 1
    });

    //Add cow/horse fencing to map
    let cow_horse_fence = new window.google.maps.Polyline({
      path: points.cow_horse_points,
      geodesic: true,
      strokeColor: "#57401d",
      strokeOpacity: 2.0,
      strokeWeight: 1
    });
    goat_fence.setMap(googleMap);
    cow_horse_fence.setMap(googleMap);
  })


  useEffect(() => {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyADZGtDRvzKYb93JfGrhSuGRGXnlbonNWU&libraries=places&libraries=geometry&maptype=satellite`;
    googleMapScript.async = true;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", () => {
      createGoogleMap(new window.google.maps.LatLng({lat: data.state.lat, lng: data.state.lng}))
      // getLatLng();
    });
  }, []);

  const createGoogleMap = (coordinates) => {
    googleMap = new window.google.maps.Map(googleMapRef.current, {
      zoom: 16,
      center: {
        lat: coordinates.lat(),
        lng: coordinates.lng(),
      },
      disableDefaultUI: true,
      mapTypeControl: true
    });
    let infoWindow = new window.google.maps.InfoWindow({
      content: "Click the map to get Lat/Lng!",
      position: {
        lat: coordinates.lat(),
        lng: coordinates.lng(),
      },
    });

    let zipcode = geocodeLatLng(coordinates.lat(), coordinates.lng(), googleMap, infoWindow);

    googleMap.addListener("click", (mapsMouseEvent) => {
      // console.log(data.state)
        if(data.state.mode == "boundary"){
          data.setState({
            boundary_points: points.boundary_points.push(mapsMouseEvent.latLng.toJSON())
          })
        };
        if(data.state.mode == "goat fencing"){
          console.log(points.goat_points)
          data.setState({
            goat_points: points.goat_points.push(mapsMouseEvent.latLng.toJSON())
          })
        };
        if(data.state.mode == "cow/horse fencing"){
          console.log(points.cow_horse_points)
          data.setState({
            cow_horse_points: points.cow_horse_points.push(mapsMouseEvent.latLng.toJSON())
          })
        };
        if(data.state.mode == "solar"){
          data.setState({
            solar: points.solar.push(mapsMouseEvent.latLng.toJSON())
          })
        };
        if(data.state.mode == "chicken coop"){
          data.setState({
            chicken_coop: points.chicken_coop.push(mapsMouseEvent.latLng.toJSON())
          })
          console.log(data.state.points.chicken_coop)
        };
        updateMarkers();
    });

    googleMap.addListener("center_changed", () => {
      geocodeLatLng(googleMap.getCenter().lat(), googleMap.getCenter().lng(), googleMap);
      data.setState({
        lat: googleMap.getCenter().lat().toString(),
        lng: googleMap.getCenter().lng().toString(),
        zoom: googleMap.getZoom()
      })
    });
  };

  const getLatLng = () => {
    let lat, lng, placeId;
    new window.google.maps.Geocoder().geocode(
      { address: `${placeName}` },
      function (results, status) {
        if (status === window.google.maps.GeocoderStatus.OK) {
          placeId = results[0].place_id;
          createGoogleMap(results[0].geometry.location);
        } else {
          alert(
            "Geocode was not successful for the following reason: " + status
          );
        }
      }
    );
  };

  const geocodeLatLng = (lat, lng, map) => {
    const geocoder = new window.google.maps.Geocoder();
    let latlng = {
      lat: lat,
      lng: lng,
    };
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK") {
      let postalCode = results[0].address_components.find(function (component) {
        return component.types[0] == "postal_code";
      });
      if(postalCode != undefined){
        console.log(postalCode.long_name);
        data.setState({
          zipcode: postalCode.long_name});
        }
    }
    })
};

  return (
    <div
      id="google-map"
      ref={googleMapRef}
      style={{ width: "600px", height: "600px"}}
    />
  );
};



export default GoogleMap;