PayToKabilan component

Usage:

- Add the route `/pay-to-kabilan` to your app (already added).
- Set the environment variables in your `.env` (root of project):

  REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
  REACT_APP_CREATE_ORDER_URL=https://your-backend.example.com/api/create-order

- For production use, implement a server endpoint to create Razorpay orders using your Razorpay secret key. Never put the secret key in the frontend.

Notes:

- This component dynamically loads Razorpay's checkout script and will try to create an order by calling `REACT_APP_CREATE_ORDER_URL` with { amount } (amount in paise).
- If the create-order call fails, the component will still open the Razorpay checkout without a server-generated order ID (works but less secure).
