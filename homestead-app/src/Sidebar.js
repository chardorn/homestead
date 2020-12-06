
import React, {Component} from 'react';
import solar from './images/solar.png';
import pencil from './images/pencil.png';
import Columns from 'react-columns';
import chicken_coop from './images/chicken_coop.png';
import goat_fence from './images/goat_fence.png';
import cow_horse_fence from './images/cow_horse_fence.png';


const Sidebar = ({data}) => {

        let options = [
            {   name: "solar",
                img: solar
            },
            {   name: "boundary",
                img: pencil
            },
            {   name: "chicken coop",
                img: chicken_coop
            },
            {   name: "goat fencing",
                img: goat_fence
            },
            {   name: "cow/horse fencing",
                img: cow_horse_fence
            },
            {   name: "power lines",
                img: undefined
            }
        ]

        let updateMode = (mode) => {
            console.log(mode)
            data.setState({mode: mode})
            console.log(data.state)
        }

        return( <div id = "sidebar">
            {options.map(option => (
              <div style = {{margin: "10px"}} key = {option.name} >
              <button style = {{ flexDirection: 'row', width: "175px", justifyContent: "left", alignItems: "left", borderRadius: "5px"}} onClick = {updateMode.bind(this, option.name)}>
              <Columns style = {{alignItems: "center", verticalAlign: "middle"}}>
              <img style = {{width: "50px"}} className = "iconImage" src = {option.img} />  
              <p style = {{marginLeft: "10px", textAlign: "center", alignItems: "center"}}> {option.name} </p> 
              </Columns>
              </button>  
              </div>
            ))}
        </div>
        )
    }


    export default Sidebar;