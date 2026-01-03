import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./Payments.css";

type Payment = {
  id: number;
  name?: string;
  phone?: string;
  email?: string;
  amount_in_paise: number;
  amount_in_rupees: number;
  order_id?: string;
  created_at: string;
};

const apiBase = "https://blogspace-app-server.vercel.app";

const Payments: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [summary, setSummary] = useState({
    total_count: 0,
    total_amount_in_rupees: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [sumRsp, listRsp] = await Promise.all([
        fetch(`${apiBase}/payments/summary`),
        fetch(`${apiBase}/payments`),
      ]);
      if (!sumRsp.ok || !listRsp.ok) throw new Error("Failed to fetch");
      const sumJson = await sumRsp.json();
      const listJson = await listRsp.json();
      setSummary(
        sumJson.summary || { total_count: 0, total_amount_in_rupees: 0 }
      );
      setPayments(listJson.payments || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load payment data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="payments-page">
      <Toaster />
      <header className="payments-header">
        <h2>Supporters</h2>
        <p className="subtext">
          Thanks to everyone who contributed — your support keeps the project
          alive.
        </p>
      </header>

      <div className="payments-summary">
        <div className="card">
          <div className="card-title">Total Collected</div>
          <div className="card-value">
            ₹{" "}
            {summary.total_amount_in_rupees.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}
          </div>
        </div>
        <div className="card">
          <div className="card-title">Total Donors</div>
          <div className="card-value">{summary.total_count}</div>
        </div>
      </div>

      <section className="payments-list">
        <h3>Recent Contributions</h3>
        {loading ? (
          <div className="loading">Loading…</div>
        ) : payments.length === 0 ? (
          <p>No contributions yet.</p>
        ) : (
          <ul className="list">
            {payments.map((p) => (
              <li key={p.id} className="list-item">
                <div className="left">
                  <div className="name">{p.name || "Anonymous"}</div>
                  <div className="meta">{p.email || p.phone || ""}</div>
                </div>
                <div className="right">
                  <div className="amount">
                    ₹{" "}
                    {p.amount_in_rupees.toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  <div className="time">
                    {new Date(p.created_at).toLocaleString()}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Payments;
