import { useState } from "react";

const C = {
  bg:      "#F0EEE8",
  surface: "#E8E5DC",
  card:    "#FAFAF8",
  border:  "#C8C4B8",
  text:    "#0A0806",
  muted:   "#3A3530",
  chrome:  "#2A2520",
  silver:  "#1A1510",
  dim:     "#6A6058",
  pink:    "#C07080",
  lav:     "#7868C0",
  mint:    "#488880",
  gold:    "#A88040",
  rose:    "#C06878",
  sky:     "#5878C0",
};

// ── GLITTER HEADING STYLE ────────────────────────────────
// Deep black base with gold/silver glitter shimmer
const glitterText = {
  background:"linear-gradient(90deg,#0A0806 0%,#0A0806 20%,#B8A878 35%,#E8DDB8 45%,#C8B888 50%,#D0C898 55%,#F0E8C8 62%,#0A0806 75%,#0A0806 100%)",
  backgroundSize:"300%",
  WebkitBackgroundClip:"text",
  WebkitTextFillColor:"transparent",
  animation:"glitterShift 4s linear infinite",
};

// ── LOGO WATERMARK ───────────────────────────────────────
function LogoWatermark() {
  return (
    <div style={{
      position:"fixed", inset:0, pointerEvents:"none", zIndex:0,
      display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden",
    }}>
      <img src="/logo.jpg" alt="" style={{ width:"min(780px,95vw)", height:"min(780px,95vw)", objectFit:"contain", opacity:.22, filter:"grayscale(20%) brightness(.85) contrast(1.1) sepia(10%)", animation:"slowPulse 8s ease-in-out infinite" }} />
      <img src="/logo.jpg" alt="" style={{ position:"absolute", top:"-8%", right:"-8%", width:"min(360px,50vw)", height:"min(360px,50vw)", objectFit:"contain", opacity:.1, filter:"grayscale(40%) brightness(.9)", transform:"rotate(12deg)" }} />
      <img src="/logo.jpg" alt="" style={{ position:"absolute", bottom:"-8%", left:"-8%", width:"min(300px,44vw)", height:"min(300px,44vw)", objectFit:"contain", opacity:.1, filter:"grayscale(40%) brightness(.9)", transform:"rotate(-12deg)" }} />
      <style>{`
        @keyframes slowPulse { 0%,100%{opacity:.18;transform:scale(1)} 50%{opacity:.26;transform:scale(1.02)} }
        @keyframes twinkle { 0%,100%{opacity:.15;transform:scale(1)} 50%{opacity:.5;transform:scale(1.5)} }
      `}</style>
    </div>
  );
}

// ── SHIMMER PARTICLE BG ──────────────────────────────────
function StarField() {
  const stars = Array.from({length:40},(_,i)=>({
    x: Math.random()*100,
    y: Math.random()*100,
    size: Math.random()*2+.5,
    delay: Math.random()*4,
    color: ["#C0A860","#A89050","#D0B870","#B8A060","#C8B068","#A08848"][i%6],
  }));
  return (
    <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
      {stars.map((s,i)=>(
        <div key={i} style={{
          position:"absolute", left:`${s.x}%`, top:`${s.y}%`,
          width:s.size, height:s.size, borderRadius:"50%",
          background:s.color, opacity:.4,
          animation:`twinkle ${2+s.delay}s ease-in-out infinite`,
          animationDelay:`${s.delay}s`,
          boxShadow:`0 0 ${s.size*4}px ${s.color}`,
        }} />
      ))}
    </div>
  );
}

// ── DATA ─────────────────────────────────────────────────
const services = [
  { id:1, name:"Short Full Set",       price:"From $60",  desc:"Acrylic full set — short length, any shape. Includes color & finish of your choice.", tag:"ACRYLIC SPECIALIST", accent:C.pink },
  { id:2, name:"Medium Full Set",      price:"From $70",  desc:"Acrylic full set — medium length, any shape. Bold, dramatic, statement-making.", tag:"ACRYLIC SPECIALIST", accent:C.lav  },
  { id:3, name:"Dry Pedicure",         price:"From $40",  desc:"Shape, buff, cuticle care & polish. No soak — quick, clean & precise.", tag:"PEDICURE", accent:C.mint },
  { id:4, name:"Basic Manicure",       price:"From $40",  desc:"Full soak, shape, cuticle care & your color of choice. Classic & clean.", tag:"MANICURE", accent:C.rose },
  { id:5, name:"Nail Art",             price:"Custom",    desc:"Custom designs, gems, chrome, hand-painted art & more. Your vision, her expertise.", tag:"ARTWORK", accent:C.gold },
  { id:6, name:"Pedicure",             price:"From $45",  desc:"Soak, scrub, shape, cuticle care & polish. Treat your feet right.", tag:"PEDICURE", accent:C.lav  },
  { id:7, name:"Fill-In",              price:"From $45",  desc:"Acrylic fill for grown-out sets. Maintain your look between full sets.", tag:"ACRYLIC", accent:C.pink },
];

const gallery = [
  { emoji:"💎", label:"Diamond Chrome",    sub:"Mirror finish acrylic",   accent:C.silver },
  { emoji:"🖤", label:"Midnight Matte",    sub:"Short almond acrylic",    accent:C.dim    },
  { emoji:"✨", label:"Holographic Tips",  sub:"Medium coffin set",       accent:C.lav    },
  { emoji:"🌸", label:"Blush & Gems",      sub:"SNS with nail art",       accent:C.rose   },
  { emoji:"💅", label:"Glazed Chrome",     sub:"Short square acrylic",    accent:C.chrome },
  { emoji:"🔮", label:"Smoky Purple",      sub:"Medium stiletto",         accent:C.lav    },
  { emoji:"⭐", label:"Gold Foil",         sub:"Custom nail art",         accent:C.gold   },
  { emoji:"🤍", label:"Clean French",      sub:"Short oval acrylic",      accent:C.silver },
  { emoji:"🌙", label:"Galaxy Ombré",      sub:"Medium coffin",           accent:C.sky    },
];

const times = ["9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","2:30 PM","3:00 PM","4:00 PM","4:30 PM","5:00 PM"];

export default function HazeEffect() {
  const [page, setPage]         = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [step, setStep]         = useState(1);
  const [selSvc, setSelSvc]     = useState(null);
  const [selDate, setSelDate]   = useState("");
  const [selTime, setSelTime]   = useState("");
  const [name, setName]         = useState("");
  const [phone, setPhone]       = useState("");
  const [email, setEmail]       = useState("");
  const [notes, setNotes]       = useState("");
  const [address, setAddress]   = useState("");
  const [agreed, setAgreed]     = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const today = new Date();
  const dates = Array.from({length:14},(_,i)=>{ const d=new Date(today); d.setDate(today.getDate()+i+1); return d; });
  const fmtDate = d => d.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"});
  const resetBooking = () => { setStep(1);setSelSvc(null);setSelDate("");setSelTime("");setName("");setPhone("");setEmail("");setNotes("");setAddress("");setAgreed(false);setConfirmed(false); };
  const nav = p => { setPage(p); setMenuOpen(false); if(p!=="book") resetBooking(); window.scrollTo(0,0); };

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:C.bg, minHeight:"100vh", color:C.text, overflowX:"hidden", position:"relative" }}>
      <LogoWatermark />
      <StarField />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        .cg { font-family:'Cormorant Garamond', serif; }
        .dm { font-family:'DM Sans', sans-serif; }

        @keyframes glitterShift { 0%{background-position:0%} 100%{background-position:300%} }
        
        
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes shimmer { 0%,100%{opacity:.4} 50%{opacity:1} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes popIn { from{opacity:0;transform:scale(.92)} to{opacity:1;transform:scale(1)} }

        .fu { animation:fadeUp .6s cubic-bezier(.22,1,.36,1) both; }
        .pop { animation:popIn .4s cubic-bezier(.22,1,.36,1) both; }

        /* NAV */
        .nl { cursor:pointer; font-family:'DM Sans',sans-serif; font-size:10px; font-weight:600; letter-spacing:3px; text-transform:uppercase; color:${C.muted}; padding:8px 14px; border-radius:4px; transition:all .2s; }
        .nl:hover { color:${C.text}; }
        .nl.act { color:${C.lav}; }

        /* BUTTONS */
        .btn-main { border:none; padding:14px 40px; font-family:'DM Sans',sans-serif; font-size:11px; font-weight:600; letter-spacing:2.5px; text-transform:uppercase; cursor:pointer; transition:all .24s; background:linear-gradient(135deg,${C.pink},${C.lav},${C.mint}); color:#fff; border-radius:4px; box-shadow:0 4px 24px rgba(120,104,192,.25); }
        .btn-main:hover { transform:translateY(-2px); box-shadow:0 8px 32px rgba(120,104,192,.35); filter:brightness(1.1); }
        .btn-main:disabled { opacity:.3; cursor:not-allowed; transform:none; box-shadow:none; filter:none; }

        .btn-ghost { border:1.5px solid ${C.text}; padding:13px 36px; font-family:'DM Sans',sans-serif; font-size:11px; font-weight:600; letter-spacing:2.5px; text-transform:uppercase; cursor:pointer; transition:all .24s; background:transparent; color:${C.text}; border-radius:4px; }
        .btn-ghost:hover { background:${C.text}; color:${C.bg}; }
        .btn-ghost:disabled { opacity:.3; cursor:not-allowed; }

        .btn-sm { border:1.5px solid currentColor; padding:8px 18px; font-family:'DM Sans',sans-serif; font-size:10px; font-weight:600; letter-spacing:2px; text-transform:uppercase; cursor:pointer; transition:all .2s; background:transparent; border-radius:4px; }
        .btn-sm:hover { opacity:.7; }

        /* CARDS */
        .svc-card { background:rgba(250,250,248,.85); border:1px solid ${C.border}; padding:28px; cursor:pointer; transition:all .24s; position:relative; overflow:hidden; border-radius:4px; backdrop-filter:blur(8px); }
        .svc-card:hover { border-color:var(--acc); transform:translateY(-3px); box-shadow:0 12px 40px rgba(0,0,0,.12); }
        .svc-card.sel { border-color:var(--acc); background:rgba(255,255,255,.95); }
        .svc-card.sel .chk { opacity:1; transform:scale(1); }
        .chk { opacity:0; transform:scale(.5); position:absolute; top:12px; right:12px; width:22px; height:22px; border-radius:50%; background:var(--acc); display:flex; align-items:center; justify-content:center; color:#fff; font-size:11px; font-weight:900; transition:all .2s; }

        /* DATE/TIME CHIPS */
        .dc { padding:10px 11px; border:1px solid ${C.border}; background:rgba(250,250,248,.85); cursor:pointer; font-family:'DM Sans',sans-serif; font-size:11px; font-weight:600; transition:all .18s; text-align:center; min-width:60px; color:${C.muted}; border-radius:4px; backdrop-filter:blur(8px); }
        .dc:hover { border-color:${C.lav}; color:${C.text}; }
        .dc.s { background:linear-gradient(135deg,${C.pink},${C.lav}); border-color:transparent; color:#fff; }

        .tc { padding:9px 14px; border:1px solid ${C.border}; background:rgba(250,250,248,.85); cursor:pointer; font-family:'DM Sans',sans-serif; font-size:11px; font-weight:600; transition:all .18s; color:${C.muted}; border-radius:4px; backdrop-filter:blur(8px); }
        .tc:hover { border-color:${C.mint}; color:${C.text}; }
        .tc.s { background:linear-gradient(135deg,${C.lav},${C.mint}); border-color:transparent; color:#fff; }

        /* INPUT */
        .fld { width:100%; border:1px solid ${C.border}; border-radius:4px; padding:13px 16px; font-family:'DM Sans',sans-serif; font-size:14px; color:${C.text}; outline:none; transition:border-color .2s; background:rgba(250,250,248,.9); }
        .fld:focus { border-color:${C.lav}; }
        .fld::placeholder { color:${C.dim}; }
        textarea.fld { resize:vertical; min-height:80px; }

        /* GALLERY */
        .gal { background:rgba(250,250,248,.8); border:1px solid ${C.border}; border-radius:4px; aspect-ratio:1; display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; transition:all .24s; position:relative; overflow:hidden; backdrop-filter:blur(8px); }
        .gal:hover { border-color:var(--acc); transform:scale(1.03); box-shadow:0 12px 40px rgba(0,0,0,.15); }

        /* TICKER */
        @keyframes tick { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .ticker { display:flex; animation:tick 26s linear infinite; white-space:nowrap; }

        /* PROGRESS */
        .prog { height:2px; background:${C.border}; border-radius:2px; overflow:hidden; }
        .prog-fill { height:100%; border-radius:2px; transition:width .4s ease; background:linear-gradient(90deg,${C.pink},${C.lav},${C.mint}); }

        /* LABEL */
        .lbl { font-family:'DM Sans',sans-serif; font-size:10px; font-weight:600; letter-spacing:2.5px; text-transform:uppercase; color:${C.muted}; margin-bottom:10px; display:block; }

        /* HAMBURGER */
        .hamburger { display:none; flex-direction:column; justify-content:center; gap:5px; cursor:pointer; padding:8px; border:none; background:transparent; }
        .hamburger span { display:block; width:20px; height:1.5px; background:${C.text}; border-radius:2px; transition:all .3s; }
        .hamburger.open span:nth-child(1) { transform:rotate(45deg) translate(5px,5px); }
        .hamburger.open span:nth-child(2) { opacity:0; }
        .hamburger.open span:nth-child(3) { transform:rotate(-45deg) translate(5px,-5px); }

        /* MOBILE MENU */
        .mob-menu { display:none; position:fixed; top:64px; left:0; right:0; background:rgba(240,238,232,.98); backdrop-filter:blur(24px); border-bottom:1px solid ${C.border}; flex-direction:column; padding:16px 20px 24px; gap:4px; z-index:199; }
        .mob-menu.open { display:flex; }
        .mob-menu .ml { font-family:'DM Sans',sans-serif; font-size:12px; font-weight:600; letter-spacing:2px; text-transform:uppercase; color:${C.muted}; padding:14px 16px; cursor:pointer; transition:all .2s; border:none; background:transparent; text-align:left; width:100%; border-radius:4px; }
        .mob-menu .ml:hover, .mob-menu .ml.act { color:${C.text}; background:rgba(255,255,255,.8); }
        .mob-menu .ml.book { background:linear-gradient(135deg,${C.pink},${C.lav}); color:#fff; margin-top:8px; text-align:center; }

        /* FAQ */
        .faq-row { border-bottom:1px solid ${C.border}; }
        .faq-q { cursor:pointer; padding:20px 0; display:flex; justify-content:space-between; align-items:center; font-family:'DM Sans',sans-serif; font-size:14px; font-weight:500; color:${C.text}; transition:color .2s; gap:16px; }
        .faq-q:hover { color:${C.lav}; }

        /* MOBILE */
        @media (max-width:768px) {
          .nav-links { display:none !important; }
          .hamburger { display:flex !important; }
          .hero-pad { padding:100px 20px 60px !important; }
          .sec-pad { padding-left:20px !important; padding-right:20px !important; }
          .stats-row { grid-template-columns:repeat(2,1fr) !important; }
          .two-col { grid-template-columns:1fr !important; }
          .three-col { grid-template-columns:repeat(2,1fr) !important; }
          .cta-inner { flex-direction:column !important; gap:20px !important; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, background:"rgba(240,238,232,.92)", backdropFilter:"blur(24px)", borderBottom:`1px solid ${C.border}`, padding:"0 40px", display:"flex", alignItems:"center", justifyContent:"space-between", height:64 }}>
        <div onClick={()=>nav("home")} style={{ cursor:"pointer" }}>
          <div className="cg" style={{ fontSize:22, fontWeight:300, fontStyle:"italic", letterSpacing:1, lineHeight:1, ...glitterText }}>The Haze Effect</div>
          <div className="dm" style={{ fontSize:8, letterSpacing:4, color:C.dim, textTransform:"uppercase", marginTop:3, fontWeight:600 }}>Mobile Nail Tech</div>
        </div>
        <div className="nav-links" style={{ display:"flex", gap:2, alignItems:"center" }}>
          {[["home","Home"],["services","Services"],["gallery","Gallery"],["about","About"],["contact","Contact"]].map(([p,l])=>(
            <span key={p} className={`nl ${page===p?"act":""}`} onClick={()=>nav(p)}>{l}</span>
          ))}
          <button className="btn-main" style={{ marginLeft:16, padding:"9px 22px", fontSize:10 }} onClick={()=>nav("book")}>Book Now ✦</button>
        </div>
        <button className={`hamburger ${menuOpen?"open":""}`} onClick={()=>setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`mob-menu ${menuOpen?"open":""}`}>
        {[["home","Home"],["services","Services"],["gallery","Gallery"],["about","About"],["contact","Contact"],["book","Book Now ✦"]].map(([p,l])=>(
          <button key={p} className={`ml ${p==="book"?"book":""} ${page===p?"act":""}`} onClick={()=>nav(p)}>{l}</button>
        ))}
      </div>

      {/* ── CONTENT ── */}
      <div style={{ position:"relative", zIndex:1, paddingTop:64 }}>

        {/* ══ HOME ══ */}
        {page==="home" && (
          <div>
            {/* HERO */}
            <div className="hero-pad" style={{ position:"relative", minHeight:"92vh", display:"flex", flexDirection:"column", justifyContent:"center", padding:"120px 64px 80px", overflow:"hidden" }}>
              {/* glow blobs */}
              <div style={{ position:"absolute", top:"20%", right:"10%", width:400, height:400, borderRadius:"50%", background:`radial-gradient(circle,${C.lav}18,transparent 70%)`, pointerEvents:"none" }} />
              <div style={{ position:"absolute", bottom:"15%", left:"5%", width:300, height:300, borderRadius:"50%", background:`radial-gradient(circle,${C.pink}14,transparent 70%)`, pointerEvents:"none" }} />
              <div style={{ position:"absolute", top:"50%", left:"50%", width:500, height:500, borderRadius:"50%", background:`radial-gradient(circle,${C.mint}08,transparent 70%)`, transform:"translate(-50%,-50%)", pointerEvents:"none" }} />

              <div style={{ maxWidth:700, position:"relative" }}>
                <div className="fu dm" style={{ fontSize:10, letterSpacing:5, color:C.dim, textTransform:"uppercase", marginBottom:24, display:"flex", alignItems:"center", gap:14, animationDelay:".05s" }}>
                  <div style={{ width:28, height:1, background:C.dim }} />
                  Columbus, OH · Mobile Nail Tech
                </div>

                <h1 className="cg fu" style={{ fontSize:"clamp(56px,8vw,110px)", lineHeight:.92, fontWeight:300, marginBottom:28, animationDelay:".1s" }}>
                  <span style={glitterText}>The Haze</span><br />
                  <em style={glitterText}>Effect</em>
                </h1>

                {/* QUOTE */}
                <div className="fu" style={{ borderLeft:`2px solid ${C.lav}`, paddingLeft:20, marginBottom:40, animationDelay:".18s" }}>
                  <p className="cg" style={{ fontSize:"clamp(18px,2.5vw,24px)", fontStyle:"italic", color:"#0A0806", lineHeight:1.6, fontWeight:400 }}>
                    "Bold. Glam. Unapologetically you.<br />
                    <span style={{ color:"#0A0806", fontStyle:"italic" }}>Haze brings the nail art that stops traffic</span> — wherever you are."
                  </p>
                </div>

                <div className="fu" style={{ marginBottom:48, animationDelay:".22s" }}>
                  <p className="dm" style={{ fontSize:15, color:C.muted, lineHeight:1.9, fontWeight:300, maxWidth:480 }}>
                    Natasha Garnes is Columbus's premier mobile acrylic specialist — bringing luxury nail art directly to you. Manicures, pedicures, acrylics & custom artwork at your doorstep.
                  </p>
                </div>

                <div className="fu" style={{ display:"flex", gap:14, flexWrap:"wrap", animationDelay:".28s" }}>
                  <button className="btn-main" onClick={()=>nav("book")}>Book Your Appointment ✦</button>
                  <button className="btn-ghost" onClick={()=>nav("services")}>View Services</button>
                </div>
              </div>

              {/* floating diamond */}
              <div style={{ position:"absolute", right:"8%", top:"45%", transform:"translateY(-50%)", fontSize:80, opacity:.08, animation:"float 4s ease-in-out infinite", userSelect:"none" }}>💎</div>
            </div>

            {/* TICKER */}
            <div style={{ overflow:"hidden", borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`, background:C.surface, padding:"11px 0" }}>
              <div className="ticker">
                {Array(2).fill(["ACRYLIC SPECIALIST ✦","MOBILE NAIL TECH ✦","CUSTOM NAIL ART ✦","PEDICURE ✦","FULL SETS ✦","FILL-INS ✦","COLUMBUS OH ✦","BOOK NOW ✦"]).flat().map((t,i)=>(
                  <span key={i} className="dm" style={{ fontSize:10, fontWeight:600, letterSpacing:4, marginRight:48, color:"#0A0806", textTransform:"uppercase" }}>{t}</span>
                ))}
              </div>
            </div>

            {/* STATS — just 2 now */}
            <div className="stats-row" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", borderBottom:`1px solid ${C.border}` }}>
              {[
                { num:"100%", label:"Mobile Service",   color:C.lav  },
                { num:"8",    label:"Services Offered", color:C.pink },
              ].map((s,i)=>(
                <div key={i} style={{ padding:"32px 20px", textAlign:"center", borderRight:i<1?`1px solid ${C.border}`:"none" }}>
                  <div className="cg" style={{ fontSize:52, fontWeight:300, ...glitterText, lineHeight:1 }}>{s.num}</div>
                  <div className="dm" style={{ fontSize:9, color:"#0A0806", fontWeight:700, letterSpacing:2, marginTop:8, textTransform:"uppercase" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* SERVICES PREVIEW */}
            <div className="sec-pad" style={{ padding:"80px 64px" }}>
              <div style={{ maxWidth:1100, margin:"0 auto" }}>
                <div style={{ marginBottom:48, display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
                  <div>
                    <div className="dm" style={{ fontSize:9, letterSpacing:4, color:C.dim, textTransform:"uppercase", marginBottom:14, display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:20, height:1, background:C.dim }} />Specialties
                    </div>
                    <h2 className="cg" style={{ fontSize:"clamp(36px,5vw,56px)", fontWeight:300, ...glitterText }}>
                      Services <em style={glitterText}>& Pricing</em>
                    </h2>
                  </div>
                  <button className="btn-ghost" onClick={()=>nav("services")}>View All →</button>
                </div>
                <div className="two-col" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:14 }}>
                  {services.slice(0,4).map((s,i)=>(
                    <div key={s.id} className="svc-card fu" style={{ "--acc":s.accent, animationDelay:`${i*.07}s` }}>
                      <div style={{ position:"absolute", top:0, left:0, bottom:0, width:2, background:s.accent, opacity:.6 }} />
                      <div className="dm" style={{ fontSize:8, letterSpacing:3, color:s.accent, textTransform:"uppercase", marginBottom:12, fontWeight:600 }}>{s.tag}</div>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                        <div className="cg" style={{ fontSize:22, fontWeight:300 }}>{s.name}</div>
                        <div className="dm" style={{ fontSize:14, fontWeight:600, color:s.accent }}>{s.price}</div>
                      </div>
                      <div className="dm" style={{ fontSize:12, color:"#0A0806", lineHeight:1.8, fontWeight:400 }}>{s.desc}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop:32 }}>
                  <button className="btn-ghost" onClick={()=>nav("services")}>See All 8 Services →</button>
                </div>
              </div>
            </div>

            {/* GALLERY TEASER — darkened */}
            <div className="sec-pad" style={{ background:"rgba(200,195,182,.75)", padding:"80px 64px", borderTop:`1px solid ${C.border}` }}>
              <div style={{ maxWidth:1100, margin:"0 auto" }}>
                <div style={{ marginBottom:44, display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
                  <div>
                    <div className="dm" style={{ fontSize:9, letterSpacing:4, color:C.muted, textTransform:"uppercase", marginBottom:14, display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:20, height:1, background:C.muted }} />The Work
                    </div>
                    <h2 className="cg" style={{ fontSize:"clamp(36px,5vw,56px)", fontWeight:300, ...glitterText }}>
                      <em style={glitterText}>Her</em> Gallery
                    </h2>
                  </div>
                  <button className="btn-ghost" onClick={()=>nav("gallery")}>Full Gallery →</button>
                </div>
                <div className="three-col" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
                  {gallery.slice(0,6).map((g,i)=>(
                    <div key={i} className="gal fu" style={{ "--acc":g.accent, animationDelay:`${i*.06}s`, background:"rgba(240,238,232,.9)" }}>
                      <div style={{ position:"absolute", inset:0, background:`radial-gradient(circle at 40% 35%,${g.accent}25,transparent 65%)` }} />
                      <div style={{ fontSize:44, marginBottom:8, position:"relative" }}>{g.emoji}</div>
                      <div className="cg" style={{ fontSize:14, fontWeight:400, color:g.accent, position:"relative" }}>{g.label}</div>
                      <div className="dm" style={{ fontSize:10, color:C.muted, marginTop:2, position:"relative", fontWeight:500 }}>{g.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ABOUT STRIP */}
            <div className="sec-pad" style={{ padding:"80px 64px", borderTop:`1px solid ${C.border}` }}>
              <div style={{ maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:72, alignItems:"center" }} className="two-col">
                <div>
                  <div className="dm" style={{ fontSize:9, letterSpacing:4, color:C.dim, textTransform:"uppercase", marginBottom:14, display:"flex", alignItems:"center", gap:10 }}>
                    <div style={{ width:20, height:1, background:C.dim }} />The Artist
                  </div>
                  <h2 className="cg" style={{ fontSize:"clamp(36px,4vw,52px)", fontWeight:300, marginBottom:24, ...glitterText }}>
                    Meet <em style={glitterText}>Natasha</em>
                  </h2>
                  <p className="dm" style={{ fontSize:14, color:"#0A0806", lineHeight:1.95, fontWeight:400, marginBottom:20 }}>
                    Natasha Garnes is Columbus, Ohio's go-to mobile acrylic specialist and the creative force behind The Haze Effect. With a passion for precision, she brings luxury nail art directly to your door.
                  </p>
                  <p className="dm" style={{ fontSize:14, color:"#0A0806", lineHeight:1.95, fontWeight:400, marginBottom:32 }}>
                    Specializing in acrylics and custom nail art — every set is crafted with intention. Bold, glam, and unapologetically you.
                  </p>
                  <button className="btn-ghost" onClick={()=>nav("about")}>My Full Story →</button>
                </div>

                {/* CHIC SKILL BOXES */}
                <div style={{ display:"flex", flexDirection:"column", gap:0, border:`1px solid ${C.border}` }}>
                  {[
                    { label:"Acrylic Specialist",    icon:"💎", color:C.pink },
                    { label:"Custom Nail Art",       icon:"🎨", color:C.mint },
                    { label:"Mobile — Comes to You", icon:"🚗", color:C.rose },
                    { label:"Columbus, OH Based",    icon:"📍", color:C.sky  },
                  ].map((s,i)=>(
                    <div key={i} style={{
                      display:"flex", alignItems:"center", justifyContent:"space-between",
                      padding:"18px 24px",
                      background: i%2===0 ? "rgba(250,250,248,.9)" : "rgba(240,236,228,.8)",
                      borderBottom: i<4 ? `1px solid ${C.border}` : "none",
                      transition:"all .2s",
                    }}>
                      <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                        <div style={{ width:32, height:32, borderRadius:"50%", background:`${s.color}22`, border:`1px solid ${s.color}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, flexShrink:0 }}>{s.icon}</div>
                        <span className="cg" style={{ fontSize:17, fontWeight:300, color:C.text, letterSpacing:.5 }}>{s.label}</span>
                      </div>
                      <span style={{ color:s.color, fontSize:12, fontStyle:"italic", fontFamily:"'Cormorant Garamond',serif" }}>✦</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div style={{ position:"relative", margin:"0 40px 60px", borderRadius:4, overflow:"hidden", background:C.surface, border:`1px solid ${C.border}`, padding:"72px 56px" }}>
              <div style={{ position:"absolute", top:-100, right:-100, width:400, height:400, borderRadius:"50%", background:`radial-gradient(circle,${C.lav}20,transparent 70%)`, pointerEvents:"none" }} />
              <div style={{ position:"absolute", bottom:-80, left:-80, width:300, height:300, borderRadius:"50%", background:`radial-gradient(circle,${C.pink}15,transparent 70%)`, pointerEvents:"none" }} />
              <div className="cta-inner" style={{ position:"relative", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:32 }}>
                <div>
                  <h2 className="cg" style={{ fontSize:"clamp(36px,5vw,60px)", fontWeight:300, lineHeight:.95, marginBottom:14, ...glitterText }}>
                    Ready for your<br /><em style={glitterText}>next set?</em>
                  </h2>
                  <p className="dm" style={{ color:"#0A0806", fontSize:14, fontWeight:400 }}>She comes to you. Book your appointment today.</p>
                </div>
                <button className="btn-main" style={{ fontSize:12, padding:"18px 48px" }} onClick={()=>nav("book")}>Book Now ✦</button>
              </div>
            </div>

            {/* FOOTER */}
            <div style={{ borderTop:`1px solid ${C.border}`, padding:"32px 40px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16 }}>
              <div className="cg" style={{ fontSize:18, fontWeight:300, fontStyle:"italic", ...glitterText }}>The Haze Effect</div>
              <div className="dm" style={{ fontSize:11, color:C.dim }}>Columbus, OH · Mobile Nail Tech · By Appointment Only</div>
              <div style={{ display:"flex", gap:8 }}>
                {[C.pink,C.lav,C.mint,C.rose,C.sky].map((c,i)=>(
                  <div key={i} style={{ width:8, height:8, borderRadius:"50%", background:c, boxShadow:`0 0 4px ${c}88` }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ SERVICES ══ */}
        {page==="services" && (
          <div className="sec-pad" style={{ maxWidth:1100, margin:"0 auto", padding:"60px 64px" }}>
            <div style={{ marginBottom:52 }}>
              <div className="dm" style={{ fontSize:9, letterSpacing:4, color:C.dim, textTransform:"uppercase", marginBottom:14, display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:20, height:1, background:C.dim }} />Pricing
              </div>
              <h1 className="cg" style={{ fontSize:"clamp(44px,6vw,72px)", fontWeight:300, ...glitterText }}>
                Services <em style={glitterText}>& Pricing</em>
              </h1>
              <p className="dm" style={{ fontSize:13, color:C.dim, marginTop:16, fontWeight:300 }}>★ All prices are starting rates. Final pricing depends on length, design & complexity.</p>
            </div>
            <div className="two-col" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:14, marginBottom:48 }}>
              {services.map((s,i)=>(
                <div key={s.id} className="svc-card fu" style={{ "--acc":s.accent, animationDelay:`${i*.06}s` }}>
                  <div style={{ position:"absolute", top:0, left:0, bottom:0, width:2, background:s.accent, opacity:.6 }} />
                  <div className="dm" style={{ fontSize:8, letterSpacing:3, color:s.accent, textTransform:"uppercase", marginBottom:12, fontWeight:600 }}>{s.tag}</div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                    <div className="cg" style={{ fontSize:22, fontWeight:300 }}>{s.name}</div>
                    <div className="dm" style={{ fontSize:15, fontWeight:600, color:s.accent }}>{s.price}</div>
                  </div>
                  <div className="dm" style={{ fontSize:12, color:"#0A0806", lineHeight:1.8, fontWeight:400, marginBottom:16 }}>{s.desc}</div>
                  <button className="btn-sm" style={{ color:s.accent, borderColor:s.accent }} onClick={()=>{ setSelSvc(s); nav("book"); }}>Book This ✦</button>
                </div>
              ))}
            </div>
            <div style={{ background:"rgba(250,250,248,.9)", border:`1px solid ${C.border}`, padding:"24px 28px", borderRadius:4 }}>
              <div className="dm" style={{ fontSize:10, letterSpacing:2, color:C.lav, textTransform:"uppercase", fontWeight:600, marginBottom:10 }}>✦ Note on Pricing</div>
              <p className="dm" style={{ fontSize:13, color:"#0A0806", lineHeight:1.8, fontWeight:400 }}>All listed prices are <strong style={{ color:C.chrome }}>starting rates</strong>. Final pricing may vary based on nail length, shape, design complexity, and add-ons. A non-refundable deposit is required to secure your appointment. Exact pricing will be confirmed at booking.</p>
            </div>
          </div>
        )}

        {/* ══ GALLERY ══ */}
        {page==="gallery" && (
          <div className="sec-pad" style={{ maxWidth:1000, margin:"0 auto", padding:"60px 64px" }}>
            <div style={{ marginBottom:48 }}>
              <div className="dm" style={{ fontSize:9, letterSpacing:4, color:C.dim, textTransform:"uppercase", marginBottom:14, display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:20, height:1, background:C.dim }} />Portfolio
              </div>
              <h1 className="cg" style={{ fontSize:"clamp(44px,6vw,72px)", fontWeight:300, ...glitterText }}>
                <em style={glitterText}>Her</em> Work
              </h1>
            </div>
            <div className="three-col" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
              {gallery.map((g,i)=>(
                <div key={i} className="gal fu" style={{ "--acc":g.accent, animationDelay:`${i*.06}s` }}>
                  <div style={{ position:"absolute", inset:0, background:`radial-gradient(circle at 40% 35%,${g.accent}18,transparent 65%)` }} />
                  <div style={{ fontSize:48, marginBottom:10, position:"relative" }}>{g.emoji}</div>
                  <div className="cg" style={{ fontSize:15, fontWeight:300, color:g.accent, position:"relative" }}>{g.label}</div>
                  <div className="dm" style={{ fontSize:10, color:C.dim, marginTop:3, position:"relative" }}>{g.sub}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop:48, textAlign:"center" }}>
              <p className="dm" style={{ color:"#0A0806", fontSize:14, fontWeight:400, marginBottom:24 }}>Love what you see? Let's create your perfect set.</p>
              <button className="btn-main" onClick={()=>nav("book")}>Book Now ✦</button>
            </div>
          </div>
        )}

        {/* ══ ABOUT ══ */}
        {page==="about" && (
          <div className="sec-pad" style={{ maxWidth:1000, margin:"0 auto", padding:"60px 64px" }}>
            <div style={{ marginBottom:52 }}>
              <div className="dm" style={{ fontSize:9, letterSpacing:4, color:C.dim, textTransform:"uppercase", marginBottom:14, display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:20, height:1, background:C.dim }} />The Artist
              </div>
              <h1 className="cg" style={{ fontSize:"clamp(44px,6vw,72px)", fontWeight:300, ...glitterText }}>
                Meet <em style={glitterText}>Natasha</em>
              </h1>
            </div>
            <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"start" }}>
              <div>
                {[
                  "Natasha Garnes is the creative force behind The Haze Effect — Columbus, Ohio's premier mobile nail tech and acrylic specialist.",
                  "With years of hands-on experience and an eye for detail, Natasha has built a reputation for bold, precise, and unforgettable nail art. Her specialty? Acrylics — crafted with intention, shaped with skill, and finished to perfection.",
                  "As a mobile tech, Natasha brings the salon experience directly to you — no travel stress, no waiting rooms, just luxury nail care in the comfort of your own space.",
                  "Whether you want clean and classic or bold and artistic, The Haze Effect delivers every single time.",
                ].map((p,i)=>(
                  <p key={i} className="dm" style={{ fontSize:14, color:"#0A0806", lineHeight:1.95, fontWeight:400, marginBottom:20 }}>{p}</p>
                ))}
                <button className="btn-main" style={{ marginTop:12 }} onClick={()=>nav("book")}>Book with Natasha ✦</button>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                <div style={{ background:"rgba(240,238,232,.9)", border:`1px solid ${C.border}`, borderRadius:4, height:260, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:8, position:"relative", overflow:"hidden" }}>
                  <div style={{ position:"absolute", inset:0, background:`radial-gradient(circle,${C.lav}18,transparent 70%)` }} />
                  <div style={{ textAlign:"center", position:"relative" }}>
                    <div style={{ fontSize:64, marginBottom:10 }}>💅</div>
                    <div className="cg" style={{ fontSize:18, fontWeight:300, fontStyle:"italic", color:C.chrome }}>Natasha Garnes</div>
                    <div className="dm" style={{ fontSize:9, letterSpacing:3, color:C.dim, marginTop:4 }}>MOBILE NAIL TECH · COLUMBUS OH</div>
                  </div>
                </div>
                <div style={{ border:`1px solid ${C.border}` }}>
                  {[
                    { label:"Acrylic Specialist",    icon:"💎", color:C.pink },
                    { label:"Custom Nail Art",       icon:"🎨", color:C.mint },
                    { label:"Mobile — Comes to You", icon:"🚗", color:C.rose },
                    { label:"Columbus, OH Based",    icon:"📍", color:C.sky  },
                  ].map((s,i)=>(
                    <div key={i} style={{
                      display:"flex", alignItems:"center", justifyContent:"space-between",
                      padding:"18px 24px",
                      background: i%2===0 ? "rgba(250,250,248,.9)" : "rgba(240,236,228,.8)",
                      borderBottom: i<4 ? `1px solid ${C.border}` : "none",
                    }}>
                      <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                        <div style={{ width:32, height:32, borderRadius:"50%", background:`${s.color}22`, border:`1px solid ${s.color}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, flexShrink:0 }}>{s.icon}</div>
                        <span className="cg" style={{ fontSize:17, fontWeight:300, color:C.text }}>{s.label}</span>
                      </div>
                      <span style={{ color:s.color, fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", fontSize:16 }}>✦</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ CONTACT ══ */}
        {page==="contact" && (
          <div className="sec-pad" style={{ maxWidth:900, margin:"0 auto", padding:"60px 64px" }}>
            <div style={{ marginBottom:52 }}>
              <div className="dm" style={{ fontSize:9, letterSpacing:4, color:C.dim, textTransform:"uppercase", marginBottom:14, display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:20, height:1, background:C.dim }} />Get In Touch
              </div>
              <h1 className="cg" style={{ fontSize:"clamp(44px,6vw,72px)", fontWeight:300, ...glitterText }}>
                <em style={glitterText}>Contact</em>
              </h1>
            </div>
            <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:52 }}>
              <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                {[
                  { icon:"📍", label:"Location", val:"Columbus, OH — Mobile Service" },
                  { icon:"📱", label:"Service Area", val:"Columbus & Surrounding Areas" },
                  { icon:"⏰", label:"Hours", val:"By Appointment Only" },
                  { icon:"✦",  label:"Booking", val:"Book online — deposits required" },
                ].map((c,i)=>(
                  <div key={i} style={{ display:"flex", gap:14, alignItems:"flex-start", padding:"18px", background:"rgba(250,250,248,.85)", border:`1px solid ${C.border}`, borderRadius:4 }}>
                    <div style={{ fontSize:18, flexShrink:0 }}>{c.icon}</div>
                    <div>
                      <div className="dm" style={{ fontSize:9, color:C.dim, fontWeight:600, letterSpacing:2, textTransform:"uppercase", marginBottom:4 }}>{c.label}</div>
                      <div className="dm" style={{ fontSize:13, fontWeight:500, color:C.chrome }}>{c.val}</div>
                    </div>
                  </div>
                ))}
                <button className="btn-main" style={{ marginTop:8 }} onClick={()=>nav("book")}>Book Now ✦</button>
              </div>
              <div style={{ background:"rgba(250,250,248,.9)", border:`1px solid ${C.border}`, borderRadius:4, padding:"32px", position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,${C.pink},${C.lav},${C.mint})` }} />
                <div className="dm" style={{ fontSize:10, letterSpacing:2, color:C.lav, textTransform:"uppercase", fontWeight:600, marginBottom:20 }}>Send a Message</div>
                <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                  {[["Name","Your name","text"],["Email","your@email.com","email"],["Phone","(614) 000-0000","tel"]].map(([l,ph,t])=>(
                    <div key={l}>
                      <label className="lbl">{l}</label>
                      <input className="fld" type={t} placeholder={ph} />
                    </div>
                  ))}
                  <div>
                    <label className="lbl">Message</label>
                    <textarea className="fld" placeholder="Tell me what you're looking for..." />
                  </div>
                  <button className="btn-main">Send Message ✦</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ BOOK ══ */}
        {page==="book" && (
          <div className="sec-pad" style={{ maxWidth:680, margin:"0 auto", padding:"60px 32px" }}>
            <div style={{ marginBottom:40 }}>
              <div className="dm" style={{ fontSize:9, letterSpacing:4, color:C.dim, textTransform:"uppercase", marginBottom:14, display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:20, height:1, background:C.dim }} />Reservations
              </div>
              <h1 className="cg" style={{ fontSize:"clamp(36px,5vw,56px)", fontWeight:300, ...glitterText }}>
                Book with <em style={glitterText}>Haze</em>
              </h1>
            </div>

            {!confirmed && (
              <div style={{ marginBottom:32 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                  {["1. Service","2. Date & Time","3. Your Info","4. Deposit"].map((s,i)=>(
                    <div key={i} className="dm" style={{ fontSize:9, fontWeight:600, letterSpacing:1.5, textTransform:"uppercase", color:step>i+1?C.mint:step===i+1?C.lav:C.border }}>
                      {step>i+1?"✓ ":""}{s}
                    </div>
                  ))}
                </div>
                <div className="prog"><div className="prog-fill" style={{ width:`${(step/4)*100}%` }} /></div>
              </div>
            )}

            {confirmed ? (
              <div className="pop" style={{ background:"rgba(250,250,248,.95)", border:`1px solid ${C.border}`, borderRadius:4, padding:"52px 40px", textAlign:"center", position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,${C.pink},${C.lav},${C.mint})` }} />
                <div style={{ fontSize:48, marginBottom:16 }}>✦</div>
                <h2 className="cg" style={{ fontSize:"clamp(28px,4vw,40px)", fontWeight:300, marginBottom:10 }}>
                  You're booked, <em style={glitterText}>{name.split(" ")[0]}!</em>
                </h2>
                <div style={{ width:40, height:1, background:C.lav, margin:"0 auto 24px" }} />
                <p className="dm" style={{ color:C.muted, fontSize:14, marginBottom:6, fontWeight:300 }}>{selSvc?.name} · {selSvc?.price}</p>
                <p className="dm" style={{ color:C.lav, fontSize:15, fontWeight:600, marginBottom:8 }}>
                  {selDate && fmtDate(new Date(selDate+"T12:00:00"))} · {selTime}
                </p>
                <div style={{ background:"rgba(232,229,220,.85)", border:`1px solid ${C.border}`, borderRadius:4, padding:"16px 20px", margin:"24px 0", textAlign:"left" }}>
                  <div className="dm" style={{ fontSize:10, color:C.lav, fontWeight:600, letterSpacing:2, textTransform:"uppercase", marginBottom:8 }}>✦ Deposit Reminder</div>
                  <p className="dm" style={{ fontSize:12, color:"#3A3530", lineHeight:1.7, fontWeight:400 }}>Your $25 deposit is non-refundable and secures your appointment. Natasha will reach out to confirm your booking and collect payment via Square.</p>
                </div>
                <p className="dm" style={{ fontSize:12, color:C.dim, marginBottom:28 }}>Natasha will text {phone} to confirm! 📱</p>
                <button className="btn-main" onClick={()=>{ resetBooking(); nav("home"); }}>Back to Home</button>
              </div>

            ) : step===1 ? (
              <div className="fu">
                <span className="lbl">Choose Your Service</span>
                <div className="two-col" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:10 }}>
                  {services.map(s=>(
                    <div key={s.id} className={`svc-card ${selSvc?.id===s.id?"sel":""}`} onClick={()=>setSelSvc(s)} style={{ "--acc":s.accent, padding:"18px" }}>
                      <div style={{ position:"absolute", top:0, left:0, bottom:0, width:2, background:s.accent, opacity:.6 }} />
                      <div className="chk">✓</div>
                      <div className="dm" style={{ fontSize:8, letterSpacing:2, color:s.accent, textTransform:"uppercase", marginBottom:8, fontWeight:600 }}>{s.tag}</div>
                      <div className="cg" style={{ fontSize:17, fontWeight:300, marginBottom:5 }}>{s.name}</div>
                      <div className="dm" style={{ fontSize:11, color:C.muted, lineHeight:1.6, marginBottom:10, fontWeight:300 }}>{s.desc}</div>
                      <div className="dm" style={{ fontWeight:600, color:s.accent, fontSize:13 }}>{s.price}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop:24, display:"flex", justifyContent:"flex-end" }}>
                  <button className="btn-main" disabled={!selSvc} onClick={()=>setStep(2)}>Next →</button>
                </div>
              </div>

            ) : step===2 ? (
              <div className="fu">
                <span className="lbl">Pick a Date</span>
                <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:10, marginBottom:28 }}>
                  {dates.map((d,i)=>{ const val=d.toISOString().split("T")[0]; return (
                    <div key={i} className={`dc ${selDate===val?"s":""}`} onClick={()=>setSelDate(val)}>
                      <div style={{ fontSize:9, marginBottom:2, opacity:.7 }}>{d.toLocaleDateString("en-US",{weekday:"short"})}</div>
                      <div style={{ fontSize:15, fontWeight:700 }}>{d.getDate()}</div>
                      <div style={{ fontSize:9, opacity:.7 }}>{d.toLocaleDateString("en-US",{month:"short"})}</div>
                    </div>
                  );})}
                </div>
                <span className="lbl">Pick a Time</span>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:32 }}>
                  {times.map(t=><div key={t} className={`tc ${selTime===t?"s":""}`} onClick={()=>setSelTime(t)}>{t}</div>)}
                </div>
                <div style={{ display:"flex", justifyContent:"space-between" }}>
                  <button className="btn-ghost" onClick={()=>setStep(1)}>← Back</button>
                  <button className="btn-main" disabled={!selDate||!selTime} onClick={()=>setStep(3)}>Next →</button>
                </div>
              </div>

            ) : step===3 ? (
              <div className="fu">
                <span className="lbl">Your Details</span>
                <div style={{ display:"flex", flexDirection:"column", gap:14, marginBottom:28 }}>
                  {[["Full Name","Your name","text",name,setName],["Phone Number","(614) 000-0000","tel",phone,setPhone],["Email","your@email.com","email",email,setEmail]].map(([l,ph,t,v,s])=>(
                    <div key={l}>
                      <label className="lbl">{l} *</label>
                      <input className="fld" type={t} placeholder={ph} value={v} onChange={e=>s(e.target.value)} />
                    </div>
                  ))}
                  <div>
                    <label className="lbl">Service Address * <span style={{ color:C.lav, fontSize:9, letterSpacing:1 }}>— Natasha comes to you!</span></label>
                    <input className="fld" type="text" placeholder="Street address, City, State, ZIP" value={address} onChange={e=>setAddress(e.target.value)} />
                  </div>
                  <div>
                    <label className="lbl">Special Requests / Inspo (optional)</label>
                    <textarea className="fld" placeholder="Describe your vision, share inspo or any notes for Natasha..." value={notes} onChange={e=>setNotes(e.target.value)} />
                  </div>
                </div>
                <div style={{ display:"flex", justifyContent:"space-between" }}>
                  <button className="btn-ghost" onClick={()=>setStep(2)}>← Back</button>
                  <button className="btn-main" disabled={!name||!phone||!email||!address} onClick={()=>setStep(4)}>Next →</button>
                </div>
              </div>

            ) : (
              <div className="fu">
                {/* DEPOSIT SCREEN */}
                <div style={{ background:"rgba(250,250,248,.9)", border:`1px solid ${C.lav}44`, borderRadius:4, padding:"28px", marginBottom:24, position:"relative", overflow:"hidden" }}>
                  <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,${C.pink},${C.lav},${C.mint})` }} />
                  <div className="dm" style={{ fontSize:10, letterSpacing:2, color:C.lav, textTransform:"uppercase", fontWeight:600, marginBottom:16 }}>✦ Booking Summary</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:20 }}>
                    {[["Service",selSvc?.name],["Price",selSvc?.price],["Date",selDate&&fmtDate(new Date(selDate+"T12:00:00"))],["Time",selTime],["Client",name],["Phone",phone],["Address",address]].map(([l,v])=>(
                      <div key={l}>
                        <div className="dm" style={{ fontSize:9, color:C.dim, fontWeight:600, letterSpacing:1.5, textTransform:"uppercase", marginBottom:3 }}>{l}</div>
                        <div className="dm" style={{ fontWeight:500, fontSize:13, color:C.chrome }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* DEPOSIT INFO */}
                <div style={{ background:"rgba(184,168,232,.08)", border:`1px solid ${C.lav}44`, borderRadius:4, padding:"24px", marginBottom:24 }}>
                  <div className="dm" style={{ fontSize:10, letterSpacing:2, color:C.lav, textTransform:"uppercase", fontWeight:600, marginBottom:14 }}>✦ Deposit Required — $25</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:18 }}>
                    {[
                      "A $25 non-refundable deposit is required to secure your appointment.",
                      "Deposits are collected via Square — Natasha will send you a payment link after confirmation.",
                      "Your appointment is NOT confirmed until the deposit is received.",
                      "Deposits are non-refundable. Cancellations made less than 24 hours before the appointment forfeit the deposit.",
                      "Rescheduling with 24+ hours notice is allowed and your deposit transfers.",
                    ].map((t,i)=>(
                      <div key={i} className="dm" style={{ fontSize:12, color:C.muted, display:"flex", gap:10, alignItems:"flex-start", lineHeight:1.7, fontWeight:300 }}>
                        <span style={{ color:C.lav, flexShrink:0, marginTop:2 }}>✦</span>{t}
                      </div>
                    ))}
                  </div>
                  <label style={{ display:"flex", alignItems:"flex-start", gap:12, cursor:"pointer" }}>
                    <input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)} style={{ marginTop:2, accentColor:C.lav, width:16, height:16, flexShrink:0 }} />
                    <span className="dm" style={{ fontSize:12, color:C.chrome, lineHeight:1.7, fontWeight:400 }}>
                      I understand and agree to the deposit policy. I acknowledge that my $25 deposit is <strong>non-refundable</strong> and required to confirm my appointment.
                    </span>
                  </label>
                </div>

                <div style={{ display:"flex", justifyContent:"space-between" }}>
                  <button className="btn-ghost" onClick={()=>setStep(3)}>← Back</button>
                  <button className="btn-main" disabled={!agreed} onClick={()=>setConfirmed(true)}>
                    Confirm Booking ✦
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
