import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [summary, setSummary] = useState({ total_count: 0, total_amount_in_rupees: 0 });
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
      setSummary(sumJson.summary || { total_count: 0, total_amount_in_rupees: 0 });
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
    <main className="payments-page">
      <Toaster />
      <header className="payments-header">
        <div className="payments-intro">
          <button className="back-to-blog" onClick={() => navigate("/home")}>
            <span aria-hidden="true">←</span> Back to Blog Space
          </button>
          <p className="eyebrow">COMMUNITY WALL</p>
          <h1>Every contribution tells a story.</h1>
          <p className="subtext">
            A heartfelt thank-you to the people helping Blog Space grow, one thoughtful contribution at a time.
          </p>
        </div>
        <div className="payments-header-actions">
          <button className="contribute-btn" onClick={() => navigate("/pay-to-kabilan")}>
            <span aria-hidden="true">♥</span> Become a supporter
          </button>
        </div>
      </header>

      <div className="payments-summary">
        <div className="card collected-card">
          <div className="stat-icon" aria-hidden="true">₹</div>
          <div className="card-title">Community support</div>
          <div className="card-value">₹ {summary.total_amount_in_rupees.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</div>
          <div className="card-caption">Collected with gratitude</div>
        </div>
        <div className="card donors-card">
          <div className="stat-icon" aria-hidden="true">♡</div>
          <div className="card-title">Generous donors</div>
          <div className="card-value">{summary.total_count}</div>
          <div className="card-caption">People making an impact</div>
        </div>
      </div>

      <section className="payments-list">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE KINDNESS FEED</p>
            <h2>Recent contributions</h2>
          </div>
          {!loading && <span className="donor-count">{payments.length} recent</span>}
        </div>
        {loading ? (
          <div className="loading"><span className="loading-dot" /> Loading supporters…</div>
        ) : payments.length === 0 ? (
          <div className="empty-state">
            <span aria-hidden="true">✦</span>
            <h3>Be the first to leave a ripple.</h3>
            <p>The community wall is ready for its first supporter.</p>
            <button onClick={() => navigate("/pay-to-kabilan")}>Make a contribution</button>
          </div>
        ) : (
          <ul className="list">
            {payments.map((p) => (
              <li key={p.id} className="list-item">
                <div className="left">
                  <div className="donor-avatar" aria-hidden="true">{(p.name || "A").trim().charAt(0).toUpperCase()}</div>
                  <div>
                    <div className="name">{p.name || "Anonymous supporter"}</div>
                    <div className="meta">{p.email || p.phone || "Kindly supporting Blog Space"}</div>
                  </div>
                </div>
                <div className="right">
                  <div className="amount">₹ {p.amount_in_rupees.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</div>
                  <div className="time">{new Date(p.created_at).toLocaleString()}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default Payments;
