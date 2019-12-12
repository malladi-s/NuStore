import React, { Component } from 'react';
import logo from "../../img/ad2.png";
import logo2 from "../../img/WhatsApp.svg";
import logo3 from "../../img/fb.png";
import logo4 from "../../img/insta.svg";
import { connect } from "react-redux";

class Banner extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { isLoggedIn, firstName, lastName, username } = this.props.authentication;
        if (!isLoggedIn) {
            return <p>Not Authorised!</p>
        }
        return (
            <section className="container-banner">
                <div className="sec1">
                    <a href="#profilePage"><img id="profilepic" src={logo} width="160" height="160" alt="profilepic" /></a>
                </div>
                <div className="sec2">
                    <div className="profileRow1">
                        <h1 id="row1f1">{username}</h1>
                        <button id="row1f2">Edit Profile</button>
                    </div>
                    <div className="profileRow2">
                        <h5 id="row2f1">10 Ads</h5>
                        <h5 id="row2f2">200 followers</h5>
                        <h5 id="row2f3">100 following</h5>
                    </div>
                    <div className="profileRow3">
                        <h4>{firstName} {lastName}</h4>
                        <h6>Boston, Massachusetts</h6>
                    </div>
                    <div className="profileRow4">
                        <a className="profile-gaps" href="#"><img src={logo2} height="20" width="20" /></a>
                        <a className="profile-gaps" href="#"><img src={logo3} height="20" width="20" /></a>
                        <a className="profile-gaps" href="#"><img src={logo4} height="20" width="20" /></a>
                    </div>
                </div>
            </section>
        )
    }
}
const mapStateToProps = state => ({ authentication: state.authentication });
export default connect(mapStateToProps)(Banner);