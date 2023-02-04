import Script from "next/script";
import axios from "axios";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Home() {
  const getDataFromServer = async () => {
    const { data } = await axios.post("/api/payment");
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
      <div className="items-center lg:p-20 p-5 justify-center">
        <div className="border h-full flex lg:flex-row flex-col">
          <picture className="h-full w-full lg:w-1/2 flex items-center justify-between p-20">
            <img
              src="/product_image.jpg"
              className="h-full object-fill object-center"
              alt=""
            />
          </picture>
          <div className="p-10 prose prose-sm max-w-none w-full lg:w-1/2 h-full flex flex-col">
            <h1>American Tourister Casual Backpack</h1>
            <h2>₹ 1,499.00</h2>

            <button
              className="bg-blue-500 mt-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handlePayment}
            >
              Buy Now
            </button>

            <h3>Product description</h3>
            <ul>
              <li>Laptop Compatibility: No, Strap Type: Adjustable</li>
              <li>Outer Material: Polyester, Color: Blue</li>
              <li>
                Water Resistance: Water resistant, Capacity: 29 liters;
                Dimensions: 33 x 51 x 22 cms (LxHxW)
              </li>
              <li>Number of Wheels: 0, Number of compartments: 3</li>
              <li>
                Mesh Padding on back & shoulder strap to provide comfort &
                better back support
              </li>
            </ul>
            <h3>Special offers and product promotions</h3>
            <ul>
              <li>
                5% Instant Discount up to INR 250 on HSBC Cashback Card Credit
                Card Transactions.
              </li>
              <li>
                Minimum purchase value INR 1000 Here's how No cost EMI available
                on select cards.
              </li>
              <li>
                Please check 'EMI options' above for more details. Here's how
                Get GST invoice and save up to 28% on business purchases.
              </li>
              <li>
                Sign up for free Here's how Upto ₹100 cashback & ₹500 welcome
                rewards on
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
