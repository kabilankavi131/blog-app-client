import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
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
  const navigate = useNavigate();

  const handlePayment = async () => {
    const amt = parseFloat(amount);
    if (!amt || amt < 1) {
      toast.error("Please enter a valid amount (minimum ₹1)");
      return;
    }

    const amtInPaise = Math.round(amt * 100);

    setLoading(true);
    const loaded = await loadRazorpay();
    if (!loaded) {
      toast.error("Could not load payment gateway. Please try again later.");
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
      key: process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_live_oMelMcHcV7UD5O",
      amount: amtInPaise,
      currency: "INR",
      name: "Kabilan K",
      description: "Payment to Kabilan",
      image: "https://kabilankavi131.netlify.app/Images/About_image.png",
      order_id: orderId,
      handler: function (response: any) {
        console.log(response);

        const payload = {
          name,
          phone,
          email,
          amount_in_paise: amtInPaise,
          order_id: response?.razorpay_order_id || orderId || null,
          payment_id: response?.razorpay_payment_id || null,
          razorpay_signature: response?.razorpay_signature || null,
        };

        (async () => {
          try {
            const apiBase = "https://blogspace-app-server.vercel.app";
            const resp = await fetch(`${apiBase}/payments`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
            if (!resp.ok) {
              console.error("Failed to record payment:", await resp.text());
              toast.error("Payment succeeded but failed to save record.");
            } else {
              toast.success("Your payment data has been saved. Thank you!");
            }
          } catch (err) {
            console.error("Save payment error", err);
            toast.error("Payment succeeded but failed to save record.");
          } finally {
            // Navigate to payments list after showing toast
            setTimeout(() => {
              navigate("/payments");
            }, 1200);
          }
        })();
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

        <div className="actions secondary">
          <button className="view-btn" onClick={() => navigate("/payments")}>
            View Contributions
          </button>
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default PayToKabilan;
