import React from "react";
import { loadStripe } from "@stripe/stripe-js";

class PaymentForm extends React.Component {
  componentDidMount() {
    this.initializeStripe();
  }

  async initializeStripe() {
    const stripe = await loadStripe(
      "pk_test_51Np8zlAcpREcp7iGRbr7RK3Swv5I3uhvkeg1oDtYzhI9jI5qYNBnUyHIOhEYwXa4VFRxlRwui98wZtnLIy8BSVB200fmKh11uZ"
    );

    const checkoutButton = document.getElementById("checkout-button");

    checkoutButton?.addEventListener("click", async () => {
      try {
        await stripe?.redirectToCheckout({
          lineItems: [{ price: "price_1Np9PzAcpREcp7iGMtjLA1Pr", quantity: 1 }],
          mode: "payment",
          successUrl: "https://yourwebsite.com/success",
          cancelUrl: "https://yourwebsite.com/cancel",
        });
      } catch (error) {
        console.error(error);
      }
    });
  }

  render() {
    return (
      <div>
        {/* Your component's content */}
        <button id="checkout-button">Pay Now</button>
      </div>
    );
  }
}

export default PaymentForm;
