import Container from "../../components/shared/Container";
import Title from "../../components/shared/Title";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Helmet } from "react-helmet-async";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHER);

const Payment = () => {
  return (
    <Container className={`py-10`}>
      <Helmet>
        <title>Pay Now</title>
      </Helmet>
      <Title
        heading={`Payment System`}
        subHeading={`Pay for your subscription`}
        big
        center
      />
      <div className="max-w-xl mx-auto p-5 shadow-md rounded-md mt-5">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </Container>
  );
};

export default Payment;
