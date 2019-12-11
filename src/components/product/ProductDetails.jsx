import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import phoneeimage from '/Users/lohit/OneDrive/Desktop/NuStore/src/'
import { Button, Card, CardImg, CardBody, CardText, CardTitle } from "reactstrap";
// import { Share, Text, TouchableOpacity } from 'react-native';

const shareOptions = {
    title: 'Title',
    message: 'Message to share', // Note that according to the documentation at least one of "message" or "url" fields is required
    url: 'www.example.com',
    subject: 'Subject'
};

export default class ProductDetails extends Component {
    _isMounted = false;
    state = {
        product: undefined,
        prodjson: undefined,
        prod_id: undefined,
        seller: undefined,
        description: undefined,
        price: undefined,
        isSold: undefined,
        category: undefined
    }
    componentDidMount() {
        this._isMounted = true;
        alert(this.params + " params");
        // alert(response + response);
        alert(this.props.match.params.id);

        axios.get('/api/products/' + this.props.match.params.id)
            .then(response => {
                alert(response.data + "response products");
                console.log("response" + response.data);
                // if (this._isMounted) {
                this.setState({
                    prodjson: response.data,
                    product: response.data.prodname,
                    price: response.data.price,
                    description: response.data.description,
                    seller: response.data.username,
                    isSold: response.data.isSold,
                    category: response.data.category
                });
                // }
                console.log(JSON.stringify(this.state.product));
                this.setState({
                    prodjson: JSON.stringify(this.state.product)
                })
                axios.get('/api/products/category/' + this.state.category)
                    .then(response => {
                        alert(response.data + "category response");
                        console.log("response" + response.data);
                        // if (this._isMounted) {
                        this.setState({
                            // prodjson: response.data,
                            // product: response.data.prodname,
                            // price: response.data.price,
                            // description: response.data.description,
                            // seller: response.data.username,
                            // isSold: response.data.isSold,
                            // category: response.data.category

                        });
                        // }
                        console.log(JSON.stringify(this.state.product));
                        this.setState({
                            prodjson: JSON.stringify(this.state.product)
                        })
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                console.log(error);
            })


    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    // onSharePress = () => Share.share(shareOptions);
    render() {
        // return (<div>product page</div>)
        // return (
        //     <TouchableOpacity onPress={this.onSharePress} >
        //         <Text>Share data</Text>
        //     </TouchableOpacity>
        // );
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className="single_card">
                    <Card style={{ width: "22rem" }}>
                        <CardImg
                            top
                            width="100%"
                            src="/assets/318x180.svg"
                            src="https://cdn.vox-cdn.com/thumbor/T49kxT-ZhzKjyWWWkVYiOIyAOv4=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/11249379/jbareham_171101_2099_A_0088_02.jpg"
                        />
                    </Card>
                    <div>
                        <p className="product_heading_style">Product Details</p>
                        <p className="product_details_style">Product name: {this.state.product}<br />
                            Price:{this.state.price}<br />

                            <Link to="/">Seller:{this.state.seller}<br /></Link>
                            description:{this.state.description}<br />
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}