import React, { Component } from 'react';
import logo from "../../img/ad1.png";

class myProducts extends Component {
    render() {
        return (
            <section className="projects">
                <div>
                    <h1 id='Portfolio'>My Products</h1>
                </div>
                <div className="ProductRow">
                    <div className="productColumn">
                        <img className="col" src={logo} alt="nature" height="160" width="160" onClick={() => productzoomer(logo)} />
                        <img className="col" src={logo} alt="nature" height="160" width="160" onClick={() => productzoomer(logo)} />
                    </div>
                </div>
                <div className="productContainer">
                    <span onClick={() => this.parentElement.style.display = 'none'} className="closebtn" color="red">&times;</span>
                    <img id="expandedImg" />
                    <div id="imgtext"></div>
                </div>
            </section>
        )
    }
}

function productzoomer(imgs) {
    var expandImg = document.getElementById("expandedImg");
    var imgText = document.getElementById("imgtext");
    expandImg.src = logo;
    imgText.innerHTML = imgs.alt;
    expandImg.parentElement.style.display = "block";
}

export default myProducts
