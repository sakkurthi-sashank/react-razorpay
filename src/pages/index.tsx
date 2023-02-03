import Script from "next/script";
import axios from "axios";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Home() {
  const getDataFromServer = async () => {
    const { data } = await axios.post(
      "https://us-central1-react-razorpay.cloudfunctions.net/createOrder",
      {
        amount: 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  };

  const handlePayment = () => {
    getDataFromServer().then((data) => {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        currency: data.currency,
        amount: data.amount,
        order_id: data.id,
        name: "Sample Transaction",
        description: "Test Transaction",
        prefill: {
          name: "sakkurthisashank",
          email: "sakkurthisashank@gmail.com",
          contact: "9999999999",
        },
        notes: {
          address: "",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    });
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <div>
        <button onClick={handlePayment}>Pay</button>
      </div>
    </>
  );
}
