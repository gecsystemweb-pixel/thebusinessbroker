const B = import.meta.env.VITE_API_URL || "/api";
export const get = (p) => fetch(`${B}${p}`).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); });
export const post = async (p, body) => { const r = await fetch(`${B}${p}`, { method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify(body) });
  const d = await r.json().catch(() => ({})); if (!r.ok) throw { status:r.status, data:d }; return d; };
