
let API_KEY = "AIzaSyADZGtDRvzKYb93JfGrhSuGRGXnlbonNWU"

const MapImage = ({data}) => {
    let lat = data.state.lat;
    let lng = data.state.lng;
    let zoom = data.state.zoom;

    let url = "https://maps.googleapis.com/maps/api/staticmap?" +
    "center=" + lat + "," + lng +
    "&zoom=" + zoom + 
    "&size=600x300" + 
    "&maptype=satellite" +
    // "&markers=color:blue%7Clabel:S%7C40.702147,-74.015794" + 
    // "&markers=color:green%7Clabel:G%7C40.711614,-74.012318" +
    // "&markers=color:red%7Clabel:C%7C40.718217,-73.998284" + 
    "&key=" + API_KEY 
    return <div style={{ width: "400px", height: "300px" }}>
        <img 
      src= {url}
      alt="new"
      />
        </div>
}

export default MapImage;