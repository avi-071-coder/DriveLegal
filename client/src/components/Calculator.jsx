import { useState, useEffect } from "react";
import API from "../api/api";
import { Calculator as CalcIcon, MapPin } from "lucide-react";

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

  // 1. All unique states
  const uniqueStates = [...new Set(laws.map((l) => l.state))].sort();

  // 2. Filter violations based on selected state
  const availableViolations = state 
    ? [...new Set(laws.filter(l => l.state === state).map(l => l.violation))].sort()
    : [];

  // 3. Filter vehicle types based on selected state AND violation
  const availableVehicleTypes = state && violation
    ? [...new Set(laws.filter(l => l.state === state && l.violation === violation).map(l => l.vehicleType))].sort()
    : [];

  // Reset dependent fields when parent changes
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
      const res = await API.post("/api/calculate", {
        state,
        violation,
        vehicleType,
      });
      setResult(res.data);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setResult({ fine: err.response.data.error });
      } else {
        setResult({ fine: "Error calculating fine" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          // Use OpenStreetMap's Nominatim API for reverse geocoding (free, no auth)
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          
          let detectedState = data.address?.state;
          
          if (detectedState) {
            // Check if the detected state exists in our DB (case-insensitive)
            const matchedState = uniqueStates.find(s => s.toLowerCase() === detectedState.toLowerCase());
            
            if (matchedState) {
              setState(matchedState);
              alert(`Successfully detected your region: ${matchedState}`);
            } else {
              // Fallback to a default if not found in DB to demonstrate functionality
              alert(`Detected state '${detectedState}' is not in our database yet. Falling back to default.`);
              setState(uniqueStates[0]); 
            }
          } else {
             alert("Could not determine your state from coordinates.");
          }
        } catch (error) {
          console.error("Error fetching location details:", error);
          alert("Error resolving location. Please try again.");
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to retrieve your location. Please ensure location permissions are granted.");
        setIsLocating(false);
      }
    );
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ padding: '12px', background: 'rgba(0, 240, 255, 0.1)', borderRadius: '12px' }}>
            <CalcIcon color="var(--accent-cyan)" size={28} />
          </div>
          <h2 className="text-gradient" style={{ fontSize: '2rem', margin: 0 }}>Fine Calculator</h2>
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
             <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>State / Territory</label>
             <button 
                onClick={detectLocation}
                disabled={isLocating}
                className="btn-secondary"
                style={{ padding: '4px 12px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}
             >
                <MapPin size={14} />
                {isLocating ? "Locating..." : "Auto Detect"}
             </button>
          </div>
         
          <select
            value={state}
            className="input-glass"
            onChange={(e) => setState(e.target.value)}
            style={{ appearance: 'none', cursor: 'pointer' }}
          >
            <option value="" disabled style={{ color: '#000' }}>Search or select a State...</option>
            {uniqueStates.map((s) => (
              <option key={s} value={s} style={{ color: '#000' }}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Violation</label>
          <select
            value={violation}
            className="input-glass"
            onChange={(e) => setViolation(e.target.value)}
            disabled={!state}
            style={{ appearance: 'none', cursor: state ? 'pointer' : 'not-allowed', opacity: state ? 1 : 0.5 }}
          >
            <option value="" disabled style={{ color: '#000' }}>{state ? "Select a Violation..." : "Select a State first"}</option>
            {availableViolations.map((v) => (
              <option key={v} value={v} style={{ color: '#000' }}>{v}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Vehicle Type</label>
          <select
            value={vehicleType}
            className="input-glass"
            onChange={(e) => setVehicleType(e.target.value)}
            disabled={!violation}
            style={{ appearance: 'none', cursor: violation ? 'pointer' : 'not-allowed', opacity: violation ? 1 : 0.5 }}
          >
            <option value="" disabled style={{ color: '#000' }}>{violation ? "Select a Vehicle Type..." : "Select a Violation first"}</option>
            {availableVehicleTypes.map((v) => (
              <option key={v} value={v} style={{ color: '#000' }}>{v}</option>
            ))}
          </select>
        </div>

        <button
          onClick={calculateFine}
          disabled={!state || !violation || !vehicleType || isLoading}
          className="btn-primary"
          style={{ marginTop: '16px', opacity: (!state || !violation || !vehicleType) ? 0.5 : 1 }}
        >
          {isLoading ? 'Calculating...' : 'Calculate Fine'}
        </button>

        {result && (
          <div className="glass-panel animate-fade-in" style={{ padding: '24px', marginTop: '16px', textAlign: 'center', background: 'rgba(0, 240, 255, 0.05)' }}>
            {result.fine === "No Data Found" || isNaN(result.fine) ? (
              <span style={{ color: '#ef4444', fontSize: '1.25rem', fontWeight: '500' }}>{result.fine}</span>
            ) : (
              <div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.875rem' }}>Estimated Fine</p>
                <p className="text-gradient" style={{ fontSize: '3rem', fontWeight: 'bold', margin: 0 }}>₹{result.fine}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Calculator;