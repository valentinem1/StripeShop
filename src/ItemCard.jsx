import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';

class ItemCard extends Component {

    render(){

        function onToken(token) {
            // save the token id to a variable to then use it in the body of the fetch.
            const charge = {
                token: token.id
            };

            // fetch to the charge controller which handles the Stripe API transaction.
            fetch('http://localhost:3001/charges', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    // Stripe API need at least a token and a price.
                    charge: charge,
                    price: price * 100
                })
            })
            .then(res => res.json())
            .then(data => console.log(data));
            
            fetch('http://localhost:3001/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    item_id: id
                })
            })
            .then(res => res.json())
            .then(data => console.log(data));
        };

        
        const { id, name, image, price } = this.props.item;

        return (
            <div className="item_container">
                <img className="item_image" src={ image } alt={ name } />
                <header>{ name }</header>
                <StripeCheckout
                    token={ onToken }
                    stripeKey={ process.env.REACT_APP_STRIPE_API_KEY }
                    // provide input for billing address and shipping address.
                    billingAddress
                    shippingAddress
                >
                    <button className="item_price_btn">Buy ${ price }</button>
                </StripeCheckout>
            </div>
        );
    }
};

export default ItemCard;