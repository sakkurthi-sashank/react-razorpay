import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const SECRET = process.env.SECRET!;
  const payload = req.body;

  const shasum = crypto.createHmac("sha256", SECRET);
  shasum.update(JSON.stringify(payload));
  const digest = shasum.digest("hex");

  if (digest === req.headers["x-razorpay-signature"]) {
  } else {
  }

  res.status(200).send("OK");
}
