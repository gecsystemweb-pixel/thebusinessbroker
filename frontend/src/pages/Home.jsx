import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { get } from "../api.js";
import { hero, vision } from "../content.js";
import Reveal from "./Reveal.jsx";
import "./Home.css";

const SUGGESTIONS = ["Land", "Cocoa", "Insurance", "Hotel", "Carbon"];

export default function Home() {
  const [q, setQ] = useState("");
  const [clusters, setClusters] = useState([]);
  const [loading, setLoading] = useState(true);
  const go = useNavigate();

  useEffect(() => {
    get("/clusters/")
      .then(setClusters)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const totalDesks = clusters.reduce((sum, c) => sum + (c.desk_count || 0), 0);

  const search = term =>
    go(`/what-we-broker?q=${encodeURIComponent(term)}`);

  return (
    <main className="home">
      {/* ---------------- HERO ---------------- */}
      <section className="h-hero">
        <div className="wrap h-hero-grid">
          <div className="h-copy">
            <span className="eyebrow">Top Business Brokers</span>
            <h1>{hero.h}</h1>
            <p className="h-sub">{hero.sub}</p>

            <form
              role="search"
              className="h-search"
              onSubmit={e => {
                e.preventDefault();
                search(q);
              }}
            >
              <label htmlFor="s" className="sr-only">
                Search the desks. Try land, cocoa, insurance, hotel, carbon.
              </label>
              <div className="h-search-row">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M15.5 14h-.8l-.3-.3A6.5 6.5 0 1014 15.5l.3.3v.8l5 5 1.5-1.5-5-5zm-6 0a4.5 4.5 0 110-9 4.5 4.5 0 010 9z" />
                </svg>
                <input
                  id="s"
                  value={q}
                  onChange={e => setQ(e.target.value)}
                  placeholder="What are you buying, selling or placing?"
                />
                <button className="btn-gold">Search</button>
              </div>
            </form>

            <div className="h-chips">
              <span>Popular:</span>
              {SUGGESTIONS.map(s => (
                <button key={s} type="button" onClick={() => search(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <aside className="h-panel" aria-label="Practice clusters">
            <h2>Five practice clusters</h2>
            <ul>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <li key={i} className="skeleton" />
                  ))
                : clusters.map((c, i) => (
                    <li key={c.slug} style={{ "--i": i }}>
                      <Link to={`/what-we-broker?cluster=${c.slug}`}>
                        <span className="h-num">0{i + 1}</span>
                        <span className="h-name">{c.name}</span>
                        <span className="h-count">{c.desk_count}</span>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 4l-1.4 1.4L16.2 11H4v2h12.2l-5.6 5.6L12 20l8-8z" />
                        </svg>
                      </Link>
                    </li>
                  ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* ---------------- STATS STRIP ---------------- */}
      {clusters.length > 0 && (
        <div className="wrap">
          <Reveal className="h-stats">
            <div>
              <strong>{clusters.length}</strong>
              <span>Practice clusters</span>
            </div>
            <div>
              <strong>{totalDesks}</strong>
              <span>Specialist desks</span>
            </div>
          </Reveal>
        </div>
      )}

      {/* ---------------- VISION ---------------- */}
      <section className="h-vision wrap">
        <Reveal>
          <span className="eyebrow dark">Our purpose</span>
          <h2>What we stand for</h2>
        </Reveal>
        <Reveal delay={150} className="h-vision-body">
          <p className="lede">{vision}</p>
          <Link className="btn-outline" to="/about">
            Read our values and standards
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 4l-1.4 1.4L16.2 11H4v2h12.2l-5.6 5.6L12 20l8-8z" />
            </svg>
          </Link>
        </Reveal>
      </section>

      {/* ---------------- CLOSING CTA ---------------- */}
      <section className="wrap">
        <Reveal className="h-cta">
          <div>
            <h2>Ready to buy, sell or place something?</h2>
            <p>Tell us what you're working on and we'll point you to the right desk.</p>
          </div>
          {/* adjust the route to wherever your contact page lives */}
          <Link className="btn-gold" to="/contact">Get in touch</Link>
        </Reveal>
      </section>
    </main>
  );
}