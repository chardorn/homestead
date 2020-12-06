
import React, {Component} from 'react';
import solar from './images/solar.png';
import pencil from './images/pencil.png';
import Columns from 'react-columns';

const Sidebar = ({data}) => {

        let options = [
            {   name: "solar",
                img: solar
            },
            {   name: "boundary",
                img: pencil
            },
            {   name: "chicken coop",
                img: undefined
            },
            {   name: "goat fencing",
                img: undefined
            },
            {   name: "cow fencing",
                img: undefined
            },
            {   name: "wiring",
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
              <div style = {{margin: "10px"}} >
              <button style = {{ flexDirection: 'row', width: "150px", justifyContent: "left", alignItems: "left"}} onClick = {updateMode.bind(this, option.name)}>
              <Columns>
              <img style = {{width: "50px"}} className = "iconImage" src = {option.img} />  
              <p> {option.name} </p> 
              </Columns>
              </button>  
              </div>
            ))}
        </div>
        )
    }


    export default Sidebar;