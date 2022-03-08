import React from 'react';
import StripeCheckout from 'react-stripe-checkout';


const StripeCheckoutButton = ({price}) => {
    const PriceForStripe = price * 100;
    const publishableKey = 'pk_test_51Kb6HRA54GWv19IzgSch5aJlPVQy701eUffR6N8MeN0pM5a8PVTpxph9txpm48wrXzu7j9VtKoiZ500cmt1wqLCd00Y69AI0DT'

    const onToken = token => {
        console.log(token);
        alert ('Payment Successfull')
    }

    return (
        <StripeCheckout 
        label = 'Pay Now' 
        name = 'CRWN Clothing Ltd'
        billingAddress
        shippingAddress
        image='https://svgshare.com/i/Cux.svg'
        description = {`Your total is $${price}`}
        amount = {PriceForStripe}
        panelLabel = 'Pay Now'
        token = {onToken}
        stripeKey = {publishableKey}
        />
    )
}

export default StripeCheckoutButton;

