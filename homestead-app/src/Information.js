import {useEffect} from 'react';

const Information = ({data}) => {
    
    return(
        <div style = {{width: "200px"}}>
            <p> Latitude: {data.state.lat} </p>
            <p> Longitude: {data.state.lng} </p>
            <p> Zipcode: {getZipcode(data.state.lat, data.state.lng)}</p>
            <p> Area of plot: {calcPolygonArea(data.state.points.boundary_points)} mi sq </p>
            <p> Goat Fencing: {calcPerimeter(data.state.points.goat_points)} </p>
            Cost: 
        </div>
    )
}

function getZipcode(lat, lng){
    useEffect(() => {
        // const googleMapScript = document.createElement("script");
        let result = "https://maps.googleapis.com/maps/api/geocode/json?" +
        "latlng=" + lat + "," + lng +
        "&key=AIzaSyADZGtDRvzKYb93JfGrhSuGRGXnlbonNWU"
        console.log(result);
      }, []);
    
}

function calcPerimeter(points){
    if (points == undefined){
        return "0"
    }
    console.log(points)
    let total_distance = 0;
    for (let i = 0, l = points.length; i < l - 1; i++) {
        let lat1 = points[i].lat;
        let lat2 = points[i + 1].lat;
        let lng1 = points[i].lng;
        let lng2 = points[i + 1].lng;
        var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lng1-lng2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		dist = dist * 1.609344
		total_distance += dist;
    }

    return total_distance;
}


function calcPolygonArea(coordinates) {
    console.log(coordinates)

    if(coordinates == undefined || coordinates.length < 3){
        return "0"
    }
    let vertices = []
    coordinates.forEach(coordinate => {
        let vertex = {x: coordinate.lat, y: coordinate.lng};
        vertices.push(vertex);
    });
    console.log(vertices)
    var total = 0;
    for (var i = 0, l = vertices.length; i < l; i++) {
      var addX = vertices[i].x;
      var addY = vertices[i == vertices.length - 1 ? 0 : i + 1].y;
      var subX = vertices[i == vertices.length - 1 ? 0 : i + 1].x;
      var subY = vertices[i].y;

      total += (addX * addY * 0.5);
      total -= (subX * subY * 0.5);
    }

    return Math.abs(total) * 69;
}

export default Information;