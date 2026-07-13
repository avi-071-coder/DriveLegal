import { useState, useEffect } from "react";
import API from "../api/api";
import { ChevronRight, MapPin, Gauge, Loader2, Receipt, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Calculator() {
  const [state, setState] = useState("");
  const [violation, setViolation] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const [laws, setLaws] = useState([]);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState(false);

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
      setTimeout(() => {
        setResult(res.data);
        setIsLoading(false);
      }, 1000);
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
    setLocationError(false);
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
      (error) => {
        setIsLocating(false);
        setLocationError(true);
        setTimeout(() => setLocationError(false), 5000);
      }
    );
  };

  useEffect(() => {
    if (state && violation && vehicleType) {
      calculateFine();
    }
  }, [state, violation, vehicleType]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
      
      {/* Left Column: Form */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#F8FAFC', fontWeight: 600 }}>Location & Vehicle</h3>
          <button 
            onClick={detectLocation} 
            style={{ 
              background: 'rgba(16, 185, 129, 0.1)', 
              border: '1px solid rgba(16, 185, 129, 0.3)', 
              color: '#10B981', 
              padding: '6px 16px', 
              borderRadius: '100px', 
              fontSize: '0.85rem', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            {isLocating ? <Loader2 size={14} className="animate-spin" /> : <MapPin size={14} />} 
            {isLocating ? "Detecting..." : "Auto Detect"}
          </button>
        </div>
        <AnimatePresence>
          {locationError && (
            <motion.div 
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ padding: '10px 16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', color: '#f87171', fontSize: '0.85rem' }}>
                Location access denied. Please select your state manually below.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="glass-card mb-6" style={{ marginBottom: '24px', padding: '16px 24px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: state ? '1px solid #10B981' : '1px solid rgba(255, 255, 255, 0.05)' }}>
          <select value={state} onChange={e => setState(e.target.value)} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}>
            <option value="" disabled>Select State</option>
            {uniqueStates.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <span style={{ fontSize: '1.1rem', fontWeight: '500', color: state ? '#FFFFFF' : '#52525B' }}>{state || "Select State"}</span>
          <ChevronRight size={20} color={state ? '#10B981' : '#52525B'} />
        </div>

        <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#F8FAFC', fontWeight: 600, marginBottom: '16px' }}>Violation Detail</h3>
        <div className="glass-card mb-6" style={{ marginBottom: '24px', padding: '16px 24px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: violation ? '1px solid #10B981' : '1px solid rgba(255, 255, 255, 0.05)' }}>
          <select value={violation} onChange={e => setViolation(e.target.value)} disabled={!state} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: state ? 'pointer' : 'not-allowed' }}>
            <option value="" disabled>Select Violation</option>
            {availableViolations.length ? availableViolations.map(v => <option key={v} value={v}>{v}</option>) : <option disabled>Select State First</option>}
          </select>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: violation ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.05)', padding: '8px', borderRadius: '12px' }}>
              <Gauge size={24} color={violation ? '#10B981' : '#52525B'} />
            </div>
            <span style={{ fontSize: '1.1rem', fontWeight: '500', color: violation ? '#FFFFFF' : '#52525B' }}>{violation || "Select Violation"}</span>
          </div>
          <ChevronRight size={20} color={violation ? '#10B981' : '#52525B'} />
        </div>

        <div className="glass-card" style={{ position: 'relative', padding: 0, overflow: 'hidden', height: '120px', border: vehicleType ? '1px solid #10B981' : '1px solid rgba(255, 255, 255, 0.05)' }}>
          <select value={vehicleType} onChange={e => setVehicleType(e.target.value)} disabled={!violation} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: violation ? 'pointer' : 'not-allowed', zIndex: 10 }}>
            <option value="" disabled>Select Vehicle</option>
            {availableVehicleTypes.length ? availableVehicleTypes.map(v => <option key={v} value={v}>{v}</option>) : <option disabled>Select Violation First</option>}
          </select>
          <div style={{ position: 'relative', zIndex: 1, padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: vehicleType ? '#00FF66' : '#52525B', letterSpacing: '1px', fontWeight: 600, marginBottom: '8px' }}>VEHICLE TYPE</span>
            <span style={{ fontSize: '1.3rem', fontWeight: '600', color: vehicleType ? '#FFFFFF' : '#A1A1AA' }}>{vehicleType || "Select Vehicle"}</span>
          </div>
        </div>
      </div>

      {/* Right Column: Result */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {isLoading ? (
          <div className="glass-card flex-center" style={{ minHeight: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
            <Loader2 size={48} className="animate-spin" color="#10B981" />
            <p style={{ letterSpacing: '2px', color: '#00FF66', fontSize: '0.9rem', fontWeight: 600 }}>CALCULATING FINE...</p>
          </div>
        ) : result ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            style={{ 
              background: '#0A0A0A',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '8px',
              padding: '32px',
              minHeight: '350px',
              position: 'relative',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 0 40px rgba(16, 185, 129, 0.05)',
              fontFamily: 'monospace'
            }}
          >
            {/* Elegant Digital Receipt Design */}
            <div style={{ borderBottom: '2px dashed rgba(255,255,255,0.1)', paddingBottom: '24px', marginBottom: '24px', textAlign: 'center' }}>
              <Receipt size={32} color="#10B981" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ margin: 0, fontSize: '1rem', color: '#A1A1AA', letterSpacing: '2px' }}>DRIVELEGAL AI</h3>
              <p style={{ margin: '8px 0 0', fontSize: '0.8rem', color: '#52525B' }}>ESTIMATED LIABILITY RECEIPT</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: '#A1A1AA', fontSize: '0.9rem' }}>
              <span>STATE:</span>
              <span style={{ color: '#FFFFFF', fontWeight: 600 }}>{state.toUpperCase()}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: '#A1A1AA', fontSize: '0.9rem' }}>
              <span>VEHICLE:</span>
              <span style={{ color: '#FFFFFF', fontWeight: 600 }}>{vehicleType.toUpperCase()}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', color: '#A1A1AA', fontSize: '0.9rem' }}>
              <span>VIOLATION:</span>
              <span style={{ color: '#FFFFFF', fontWeight: 600, textAlign: 'right', maxWidth: '60%' }}>{violation.toUpperCase()}</span>
            </div>

            <div style={{ borderTop: '2px dashed rgba(255,255,255,0.1)', paddingTop: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: String(result.fine).includes(' (or ') ? '16px' : '0' }}>
                <span style={{ color: '#10B981', fontSize: '1.2rem', fontWeight: 600 }}>ESTIMATED FINE:</span>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#00FF66', margin: 0 }}>
                  ₹{String(result.fine).split(' (or ')[0].replace('₹', '')}
                </h2>
              </div>
              
              {String(result.fine).includes(' (or ') && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#ef4444', fontSize: '1.1rem', fontWeight: 600 }}>OTHER PENALTIES:</span>
                  <p style={{ margin: 0, fontSize: '1.2rem', color: '#ef4444', fontWeight: 600, textAlign: 'right' }}>
                    {String(result.fine).split(' (or ')[1].replace(')', '')}
                  </p>
                </div>
              )}
            </div>
            
          </motion.div>
        ) : (
          <div className="glass-card" style={{ minHeight: '350px', borderStyle: 'dashed', borderColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <p style={{ color: '#52525B', fontSize: '1rem' }}>Select your State, Vehicle, and Violation<br/>to generate your digital receipt.</p>
          </div>
        )}
      </div>

      <style>{`
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default Calculator;