import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
import * as Razorpay from "razorpay";
import * as shortid from "shortid";

const app = express();

app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: "rzp_test_5f29cRh7TZWMnP",
  key_secret: "ELgCE8rCZoDcJ4x9Ch3TWx4G",
});

app.post("/payment", async (_, res: express.Response) => {
  const paymentCapture = 1;
  const amount = 300;
  const currency = "INR";

  const options = {
    amount: amount,
    currency,
    receipt: shortid.generate(),
    payment_capture: paymentCapture,
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

export const api = functions.https.onRequest(app);
