import React, { useState } from "react";
import { useRazorpay } from "react-razorpay";

const PaymentComponent = () => {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState();
  const [mail, setMail] = useState("");
  const { error, isLoading, Razorpay } = useRazorpay();
  const handlePayment = () => {
    const amtInPaise = parseInt(amount) * 100;
    if (!amtInPaise || amtInPaise < 100) {
      alert("Please enter a valid amount (minimum ₹1)");
      return;
    }

    const getOrderId = async (amountInPaise) => {
      const key_id = "rzp_live_oMelMcHcV7UD5O";
      const key_secret = "liZdCNwhHzrgkn6rG2xzqzBz";

      const credentials = btoa(`${key_id}:${key_secret}`);

      const response = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Authorization": `Basic ${credentials}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: "INR",
          receipt: "receipt_" + Math.floor(Math.random() * 10000),
          payment_capture: 1
        })
      });

      const data = await response.json();
      return data.id;
    };

    const options = {
      key: "rzp_live_oMelMcHcV7UD5O",
      amount: amtInPaise,
      currency: "INR",
      name: "Kabilan K",
      image: "https://kabilankavi131.netlify.app/Images/About_image.png",
      description: "Payment to Kabilan",
      order_id: getOrderId(amtInPaise),
      handler: (response) => {
        console.log(response);
        alert("✅ Payment Successful!");
      },
      prefill: {
        name: name,
        email: mail,
        contact: number,
      },
      theme: {
        color: "#6366f1",
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  };

  return (
    <div className="payment-container">
      <div className="payment-box">
        <h2>Make a Payment</h2>
        <p className="subtext">
          Your payment will be securely transferred to <strong>Kabilan K’s</strong> bank account.
        </p>
        <label htmlFor="name">Enter Your Name:</label>
        <input
          type="text"
          id="name"
          placeholder="e.g Kabilan"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
         <label htmlFor="name">Enter Your Number:</label>
        <input
          type="text"
          id="name"
          placeholder="e.g 1234578990"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
         <label htmlFor="name">Enter Your Mail:</label>
        <input
          type="email"
          id="name"
          placeholder="e.g kabilan@gmail.com"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        <label htmlFor="amount">Enter Amount (INR):</label>
        <input
          type="number"
          id="amount"
          placeholder="e.g. 500"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {isLoading && <p className="info">Loading Razorpay...</p>}
        {error && <p className="error">Error: {error}</p>}
        <button onClick={handlePayment} disabled={isLoading}>
          Pay Now
        </button>
        <a class="libutton" href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=kabilankavi131" target="_blank">Follow on LinkedIn</a>
      </div>
    </div>
  );
};

export default PaymentComponent;