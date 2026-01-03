import React, { useState } from "react";
import "./PayToKabilan.css";

// Note: This component expects two environment variables:
// - REACT_APP_RAZORPAY_KEY_ID (your Razorpay key id)
// - REACT_APP_CREATE_ORDER_URL (optional backend endpoint to create an order, e.g. /api/create-order)
// For security, never put your Razorpay secret key in the frontend.

const loadRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const PayToKabilan: React.FC = () => {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    const amt = parseFloat(amount);
    if (!amt || amt < 1) {
      alert("Please enter a valid amount (minimum ₹1)");
      return;
    }

    const amtInPaise = Math.round(amt * 100);

    setLoading(true);
    const loaded = await loadRazorpay();
    if (!loaded) {
      alert("Could not load payment gateway. Please try again later.");
      setLoading(false);
      return;
    }

    // Try to create an order on your backend if configured
    let orderId: string | undefined;
    const createOrderUrl =
      process.env.REACT_APP_CREATE_ORDER_URL || "/api/create-order";
    try {
      const resp = await fetch(createOrderUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amtInPaise }),
      });
      if (resp.ok) {
        const data = await resp.json();
        orderId = data.id || data.orderId;
      } else {
        // Proceed without order id (Razorpay supports opening checkout without server-created orders)
        console.warn("Create order request failed: ", resp.status);
      }
    } catch (err) {
      console.warn("Create order error, continuing without order id: ", err);
    }

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID || "",
      amount: amtInPaise,
      currency: "INR",
      name: "Kabilan K",
      description: "Payment to Kabilan",
      image: "https://kabilankavi131.netlify.app/Images/About_image.png",
      order_id: orderId,
      handler: function (response: any) {
        console.log(response);
        alert("✅ Payment Successful!");
      },
      prefill: {
        name: name,
        email: email,
        contact: phone,
      },
      theme: {
        color: "#6366f1",
      },
    } as any;

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
    setLoading(false);
  };

  return (
    <div className="pay-container">
      <div className="pay-box">
        <h2>Support Kabilan</h2>
        <p className="subtext">
          Your secure contribution helps keep the work going.
        </p>

        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />

        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="e.g. 9876543210"
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        <label htmlFor="amount">Amount (INR)</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g. 500"
        />

        <div className="actions">
          <button
            onClick={handlePayment}
            disabled={loading}
            className="pay-btn"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>

        <p className="note">
          Note: This component expects a server endpoint to create orders
          (recommended). Set <code>REACT_APP_CREATE_ORDER_URL</code> and{" "}
          <code>REACT_APP_RAZORPAY_KEY_ID</code> in your environment.
        </p>
      </div>
    </div>
  );
};

export default PayToKabilan;
