import {useEffect} from 'react';


const Information = ({data})  => {


    
    return(
        
        <div style = {{width: "200px"}}>
            {/* <script> {getData()}
            </script> */}
            <p> Latitude: {data.state.lat} </p>
            <p> Longitude: {data.state.lng} </p>
            <p> Zipcode: {data.state.zipcode}</p>
            <p> Area of plot: {data.state.area} acres </p>
            <p> Goat Fencing: {calcPerimeter(data.state.points.goat_points).toFixed(1)} meters </p>
            <p> Cow/Horse Fencing: {calcPerimeter(data.state.points.cow_horse_points).toFixed(1)} meters</p>
            <p> Power lines:  {calcPerimeter(data.state.points.power_line_points).toFixed(1)} meters </p>
            <p> Energy Production: {getEnergyOutput(data.state.points)} </p>
            <div style = {{backgroundColor: "#2a7036", height: "50px", paddingTop: "1px"}}>
            <p style = {{margin: "10px"}}> <strong> Cost: ${getCost(data.state).toFixed(2)} </strong> </p>
            </div>
        </div>
    )
}

function getCost(state){
    let total_cost = 0;
    total_cost += state.points.solar.length * 200
    total_cost += state.points.chicken_coop.length * 600
    total_cost += calcPerimeter(state.points.goat_points) * 3.28084
    total_cost += calcPerimeter(state.points.cow_horse_points) * 3.28 * 15
    total_cost += calcPerimeter(state.points.power_line_points) /1609.34 * 20000
    total_cost += state.area * 10000

    return total_cost
}

function getEnergyOutput(points){
    let statement = "";
    if(points.power_line_points.length > 0){
        statement += "grid connect"
        if(points.solar.length != 0){
            statement += " + " + (points.solar.length * 350).toFixed(1) + " watts"
        }
    }
    else{
        statement += (points.solar.length * 350).toFixed(1) + " watts"
    }
    return statement
}


function calcPerimeter(points){
    if (points == undefined){
        return "0"
    }
    // console.log(points)
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

    return total_distance * 1609.34;
}


export default Information;