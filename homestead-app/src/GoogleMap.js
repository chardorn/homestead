import {useEffect, useRef} from 'react';

const GoogleMap = ({data, placeName}) => {

  const googleMapRef = useRef();
  let googleMap;
  let points = data.state.points;

  let updateMarkers = (() => {
    if(points.boundary != undefined){
      points.boundary.setMap(null);
    }
    points.boundary =  new window.google.maps.Polygon({
      paths: points.boundary_points,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 3,
      // fillColor: "#FF0000",
      fillOpacity: 0.0,
    });
    points.boundary.setMap(googleMap);

    let fence = new window.google.maps.Polyline({
      path: points.goat_points,
      geodesic: true,
      strokeColor: "#776622",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    fence.setMap(googleMap);
  })


  useEffect(() => {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyADZGtDRvzKYb93JfGrhSuGRGXnlbonNWU&libraries=places&maptype=satellite`;
    googleMapScript.async = true;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", () => {
      getLatLng();
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
        updateMarkers();
    });

    googleMap.addListener("center_changed", () => {
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




  return (
    <div
      id="google-map"
      ref={googleMapRef}
      style={{ width: "600px", height: "600px"}}
    />
  );
};

export default GoogleMap;