import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/shared/Loader";
import toast from "react-hot-toast";
import usePremium from "../../hooks/usePremium";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { refetch } = usePremium();
  const navigate = useNavigate();

  const { data: paymentInfo = {}, isPending } = useQuery({
    queryKey: ["paymentInfo"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      if (res.data.price > 0) {
        const intentRes = await axiosSecure.post("/create-payment-intent", {
          price: res.data.price,
        });
        setClientSecret(intentRes.data.clientSecret);
      }
      return res.data;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Payment is processing...");

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
    }

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "Anonymous",
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
    } else {
      setError("");
      if (paymentIntent.status === "succeeded") {
        const payment = {
          isPremium: true,
          startTime: Date.now(),
          duration: paymentInfo.duration,
          email: user?.email,
        };

        const res = await axiosSecure.put("/payments", payment);

        if (res.data?.modifiedCount > 0) {
          toast.dismiss();
          refetch();
          toast.success("Premium subscription successful");
          navigate("/");
        } else {
          toast.dismiss();
          toast.error("Something went wrong!");
        }
      }
    }
  };

  if (error) {
    toast.dismiss();
    toast.error(error);
    return;
  }

  return (
    <form onSubmit={handleSubmit}>
      {isPending && <Loader />}
      <p className="divider font-semibold mb-10">Pay with Your Credit Card</p>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="text-center mt-5">
        <button
          className="btn btn-primary rounded"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay Now
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
