import { useState, useEffect } from "react";
import API from "../api/api";
import { ChevronRight, MapPin, Gauge, ShieldCheck, Loader2 } from "lucide-react";

function Calculator() {
  const [state, setState] = useState("");
  const [violation, setViolation] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const [laws, setLaws] = useState([]);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    const fetchLaws = async () => {
      try {
        const res = await API.get("/api/laws");
        setLaws(res.data);
      } catch (err) {
        console.error("Failed to fetch laws", err);
      }
    };
    fetchLaws();
  }, []);

  const uniqueStates = [...new Set(laws.map((l) => l.state))].sort();
  const availableViolations = state 
    ? [...new Set(laws.filter(l => l.state === state).map(l => l.violation))].sort()
    : [];
  const availableVehicleTypes = state && violation
    ? [...new Set(laws.filter(l => l.state === state && l.violation === violation).map(l => l.vehicleType))].sort()
    : [];

  useEffect(() => {
    setViolation("");
    setVehicleType("");
    setResult(null);
  }, [state]);

  useEffect(() => {
    setVehicleType("");
    setResult(null);
  }, [violation]);

  const calculateFine = async () => {
    if (!state || !violation || !vehicleType) return;
    setIsLoading(true);
    try {
      const res = await API.post("/api/calculate", { state, violation, vehicleType });
      // Simulate calculation delay for dramatic effect
      setTimeout(() => {
        setResult(res.data);
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      setTimeout(() => {
        setResult({ fine: "Error" });
        setIsLoading(false);
      }, 1000);
    }
  };

  const detectLocation = () => {
    if (!navigator.geolocation) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          let detectedState = data.address?.state;
          if (detectedState) {
            const matchedState = uniqueStates.find(s => s.toLowerCase() === detectedState.toLowerCase());
            if (matchedState) setState(matchedState);
            else setState(uniqueStates[0] || detectedState);
          }
        } finally {
          setIsLocating(false);
        }
      },
      () => setIsLocating(false)
    );
  };

  useEffect(() => {
    if (state && violation && vehicleType) {
      calculateFine();
    }
  }, [state, violation, vehicleType]);

  return (
    <div className="grid-responsive" style={{ gap: '40px' }}>
      
      {/* Left Column: Form */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 className="title-sm" style={{ margin: 0 }}>Location & Vehicle</h3>
          <button onClick={detectLocation} style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', color: 'var(--accent-emerald)', padding: '6px 16px', borderRadius: '100px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            {isLocating ? <Loader2 size={14} className="animate-spin" /> : <MapPin size={14} />} 
            {isLocating ? "Detecting..." : "Auto Detect"}
          </button>
        </div>

        <div className="glass-card mb-6" style={{ padding: '12px 24px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <select value={state} onChange={e => setState(e.target.value)} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}>
            <option value="" disabled>Select State</option>
            {uniqueStates.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <span style={{ fontSize: '1.1rem', fontWeight: '500', color: state ? 'white' : 'var(--text-muted)' }}>{state || "Select State"}</span>
          <ChevronRight size={20} color="var(--text-muted)" />
        </div>

        <h3 className="title-sm" style={{ marginBottom: '16px' }}>Violation Detail</h3>
        <div className="glass-card mb-6" style={{ padding: '16px 24px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <select value={violation} onChange={e => setViolation(e.target.value)} disabled={!state} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: state ? 'pointer' : 'not-allowed' }}>
            <option value="" disabled>Select Violation</option>
            {availableViolations.length ? availableViolations.map(v => <option key={v} value={v}>{v}</option>) : <option disabled>Select State First</option>}
          </select>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '8px', borderRadius: '12px' }}>
              <Gauge size={24} color="var(--accent-emerald)" />
            </div>
            <span style={{ fontSize: '1.1rem', fontWeight: '500', color: violation ? 'white' : 'var(--text-muted)' }}>{violation || "Select Violation"}</span>
          </div>
          <ChevronRight size={20} color="var(--text-muted)" />
        </div>

        {/* Vehicle Selection - Image Card */}
        <div className="glass-card" style={{ position: 'relative', padding: 0, overflow: 'hidden', height: '140px', border: '1px solid rgba(0, 245, 212, 0.3)', background: 'linear-gradient(135deg, rgba(8, 33, 42, 0.8), rgba(2, 8, 10, 0.9))' }}>
          <select value={vehicleType} onChange={e => setVehicleType(e.target.value)} disabled={!violation} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: violation ? 'pointer' : 'not-allowed', zIndex: 10 }}>
            <option value="" disabled>Select Vehicle</option>
            {availableVehicleTypes.length ? availableVehicleTypes.map(v => <option key={v} value={v}>{v}</option>) : <option disabled>Select Violation First</option>}
          </select>
          <img src="/car_model_card.png" alt="Car Model" style={{ position: 'absolute', right: '-10px', bottom: '-10px', height: '130%', opacity: vehicleType ? 1 : 0.8, transition: '0.3s', zIndex: 0 }} />
          <div style={{ position: 'relative', zIndex: 1, padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'linear-gradient(to right, rgba(8, 33, 42, 0.9) 40%, transparent)' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--accent-neon)', letterSpacing: '1px', fontWeight: 600 }}>VEHICLE TYPE</span>
            <span style={{ fontSize: '1.5rem', fontWeight: '700', color: vehicleType ? 'white' : 'var(--text-muted)' }}>{vehicleType || "Select Vehicle"}</span>
          </div>
        </div>
      </div>

      {/* Right Column: Result */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {isLoading ? (
          <div className="glass-card-accent animate-fade-in-up flex-center" style={{ minHeight: '300px', flexDirection: 'column', gap: '20px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '4px solid rgba(16, 185, 129, 0.2)', borderTopColor: 'var(--accent-emerald)', animation: 'spin 1s linear infinite' }}></div>
            <p className="text-body" style={{ letterSpacing: '2px', color: 'var(--accent-neon)' }}>CALCULATING FINE...</p>
          </div>
        ) : result ? (
          <div className="glass-card-accent animate-fade-in-up" style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'var(--accent-gold)', filter: 'blur(100px)', opacity: 0.3 }}></div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <ShieldCheck size={32} color="var(--accent-gold)" />
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Estimated Liability</h3>
            </div>
            
            <h2 style={{ fontSize: '5rem', fontWeight: '800', color: 'white', margin: 0, textShadow: '0 0 40px rgba(251, 191, 36, 0.4)' }}>
              <span style={{ fontSize: '3rem', color: 'var(--accent-gold)' }}>₹</span>{result.fine}
            </h2>
            
            <div style={{ marginTop: '40px', background: 'rgba(255,255,255,0.05)', height: '4px', borderRadius: '2px', width: '100%', overflow: 'hidden' }}>
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to right, var(--accent-gold), var(--accent-emerald))', animation: 'slide-in-right 1s ease-out' }}></div>
            </div>
            <p style={{ marginTop: '16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>*Based on {state} traffic regulations.</p>
          </div>
        ) : (
          <div className="glass-card flex-center" style={{ minHeight: '300px', borderStyle: 'dashed' }}>
            <p className="text-body text-center">Select your State, Vehicle, and Violation<br/>to instantly calculate your fine.</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes slide-in-right { from { transform: translateX(-100%); } to { transform: translateX(0); } }
      `}</style>
    </div>
  );
}

export default Calculator;