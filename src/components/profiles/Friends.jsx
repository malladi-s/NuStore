import React, { Component } from 'react'
import logo from "../../img/ad3.png";
import logo1 from "../../img/ad4.png";

class Friends extends Component {
    render() {
        return (

            <section id="skillheader" className="flex-friends-container">
                <div><img class="imgrounder" src={logo} width="100" height="100" alt="python" /></div>
                <div><img class="imgrounder" src={logo1} width="100" height="100" alt="js" /></div>
                <div><img class="imgrounder" src={logo} width="100" height="100" alt="html" /></div>
                <div><img class="imgrounder" src={logo1} width="100" height="100" alt="css" /></div>
            </section>
        )
    }
}

export default Friends