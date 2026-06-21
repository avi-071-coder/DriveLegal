import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, 
  ScanLine, 
  Bot, 
  BookOpen, 
  Search, 
  ShieldCheck, 
  Globe, 
  ArrowRight, 
  CheckCircle, 
  ChevronRight,
  Triangle,
  Lightbulb,
  AlertTriangle,
  HelpCircle,
  MapPin,
  Scale,
  Info
} from "lucide-react";

// Google Font import in style tag
const poppinsFontImport = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
`;

function CodexPage() {
  const [activeCategory, setActiveCategory] = useState("Basic Rules");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeItemId, setActiveItemId] = useState("A1");

  // Expanded Data List (at least 6 detailed items per category)
  const itemsList = [
    // --- BASIC RULES ---
    {
      id: "A1",
      code: "[A1]",
      title: "Right of Way",
      shortDesc: "The legal rules governing roundabout entries and intersections.",
      category: "Basic Rules",
      details: {
        subtitle: "Intersection & Roundabout Protocols",
        description: "The legal rule determining which vehicle proceeds first at intersections, crosswalks, or when turning. Vehicles entering a roundabout must yield to traffic already inside the circle.",
        subtext: "ROUNDABOUT PRIORITY RULES",
        rulesList: [
          "Always yield to vehicles already inside the roundabout.",
          "Signal left before your intended exit to warn vehicles behind you.",
          "Give way to emergency vehicles with active sirens at all times."
        ],
        fineRef: "Section 112: ₹1,000 fine for failing to yield right-of-way."
      }
    },
    {
      id: "A2",
      code: "[A2]",
      title: "Lane Discipline",
      shortDesc: "Proper highway division, lane keep, and passing rules.",
      category: "Basic Rules",
      details: {
        subtitle: "Keep Left & Safe Passing Lanes",
        description: "Always drive within designated lane markings. In left-hand drive countries, slower vehicles stay in the leftmost lane. Only change lanes after checking mirrors and signaling.",
        subtext: "OVERTAKING PROTOCOLS",
        rulesList: [
          "Do not weave between lanes or drive on the shoulder.",
          "Overtake only from the right side of the vehicle in front.",
          "Maintain a 3-second safe following distance in your lane."
        ],
        fineRef: "Section 184: ₹5,000 fine for dangerous driving and lane-jumping."
      }
    },
    {
      id: "A3",
      code: "[A3]",
      title: "Signaling",
      shortDesc: "Correct blinker usage and signaling protocols.",
      category: "Basic Rules",
      details: {
        subtitle: "Indicating Intention on Public Roads",
        description: "Signaling is the primary method of communication between drivers. You must activate your indicators at least 30 meters before executing a turn, lane change, or deceleration.",
        subtext: "DECELERATION WARNINGS",
        rulesList: [
          "Use left/right indicators for turns and lane changes.",
          "Activate hazard lights only when stationary or in an emergency.",
          "Use hand signals if indicator lights fail unexpectedly."
        ],
        fineRef: "Section 177: ₹500 fine for turning without signaling."
      }
    },
    {
      id: "A4",
      code: "[A4]",
      title: "Speed Limits",
      shortDesc: "Velocity regulations across highway and residential zones.",
      category: "Basic Rules",
      details: {
        subtitle: "Speed Limits and Variable Controls",
        description: "Designated speed thresholds are set based on zone safety characteristics. Speed limits are maximums in ideal conditions; reduce speed during rain, fog, or heavy pedestrian presence.",
        subtext: "VARIABLE SPEED CONTROL",
        rulesList: [
          "Speed limit in residential/school zones is 30 km/h.",
          "Expressway limits are usually capped at 120 km/h.",
          "Comply with digital speed signs in smart corridors."
        ],
        fineRef: "Section 183: ₹1,000 - ₹2,000 fine for light vehicles speeding."
      }
    },
    {
      id: "A5",
      code: "[A5]",
      title: "Pedestrian Yield",
      shortDesc: "Yielding rules at crosswalks and zebra crossings.",
      category: "Basic Rules",
      details: {
        subtitle: "Vulnerable Road User Protection",
        description: "Pedestrians have absolute right-of-way at uncontrolled crosswalks (Zebra crossings). Drivers must slow down when approaching crossings and be prepared to come to a complete stop.",
        subtext: "CROSSWALK SAFETY",
        rulesList: [
          "Stop completely if a pedestrian has stepped onto the crosswalk.",
          "Do not overtake another vehicle stopped at a zebra crossing.",
          "Exercise extra caution in school and senior-citizen zones."
        ],
        fineRef: "Section 177: ₹1,000 fine for violating pedestrian safety."
      }
    },
    {
      id: "A6",
      code: "[A6]",
      title: "Mobile Devices",
      shortDesc: "Restrictions on mobile device usage while driving.",
      category: "Basic Rules",
      details: {
        subtitle: "Distracted Driving Regulations",
        description: "Driving while holding or using a mobile device is strictly prohibited. Handheld mobile usage impairs motor skills and visual attention.",
        subtext: "DISTRACTED DRIVING",
        rulesList: [
          "No texting, calling, or browsing while operating a vehicle.",
          "Hands-free systems may be used only for navigational assistance.",
          "Pull over safely to a designated stop to handle urgent calls."
        ],
        fineRef: "Section 184(c): ₹1,000 - ₹5,000 fine for handheld device usage."
      }
    },
    {
      id: "A7",
      code: "[A7]",
      title: "Emergency Vehicles",
      shortDesc: "Giving priority to emergency ambulances and fire engines.",
      category: "Basic Rules",
      details: {
        subtitle: "Emergency Vehicle Priority Lane Rules",
        description: "Drivers must immediately pull to the side to yield to emergency vehicles with sirens or flashing lights.",
        subtext: "EMERGENCY LANE SAFETY",
        rulesList: [
          "Move to the left edge of the road to clear the path.",
          "Do not tailgate or follow emergency vehicles.",
          "Proceed through red lights only if directed by traffic officers."
        ],
        fineRef: "Section 194E: ₹10,000 fine or imprisonment for blocking emergency vehicles."
      }
    },

    // --- CONSTITUTIONAL LAWS ---
    {
      id: "C1",
      code: "[C1]",
      title: "Article 19(1)(d)",
      shortDesc: "Fundamental Right: Freedom of Movement.",
      category: "Constitutional Laws",
      details: {
        subtitle: "Freedom of Movement on Public Pathways",
        description: "Article 19(1)(d) of the Constitution of India guarantees to all its citizens the right to move freely throughout the territory of India.",
        subtext: "FUNDAMENTAL RIGHTS LIMITS",
        rulesList: [
          "Secures travel on public roads and interstate highways without arbitrary restrictions.",
          "Reasonable restrictions can only be imposed in the interest of general public safety or health.",
          "Protects against arbitrary police blockades that lack legal sanction."
        ],
        fineRef: "Precedent: Overrides sub-constitutional state rules that block highway access without clear cause."
      }
    },
    {
      id: "C2",
      code: "[C2]",
      title: "Article 21",
      shortDesc: "Right to Life & Personal Liberty: Safe Roads.",
      category: "Constitutional Laws",
      details: {
        subtitle: "The Right to Safe Highways and Medical Care",
        description: "The Supreme Court of India has expanded Article 21's Right to Life to encompass the right to safe, obstacle-free roads and immediate emergency medical care.",
        subtext: "STATE DUTY OF CARE",
        rulesList: [
          "State authorities have a positive duty to maintain roads in motorable conditions.",
          "Negligence in fixing known hazards (e.g. deep potholes) violates the right to life.",
          "Accident victims are entitled to immediate trauma care at any public or private hospital."
        ],
        fineRef: "Precedent: State liability arises for damages or loss of life caused by negligent road design."
      }
    },
    {
      id: "C3",
      code: "[C3]",
      title: "Entry 29 & 35",
      shortDesc: "Federal Jurisdiction: Motor Vehicles & Highways.",
      category: "Constitutional Laws",
      details: {
        subtitle: "Federal Structure of Road Lawmaking",
        description: "Entry 29 of List I (Union List) and Entry 35 of List III (Concurrent List) split lawmaking powers over highways and motor vehicle regulations.",
        subtext: "LEGISLATIVE DIVISION",
        rulesList: [
          "Union Parliament has exclusive power to regulate National Highways (List I).",
          "Both Center and States share legislative power over motor vehicles and road transport (List III).",
          "The Motor Vehicles Act of 2019 is a Central Act implemented and adapted by state boards."
        ],
        fineRef: "Act Ref: Centralized framework with state-level administrative adjustments."
      }
    },
    {
      id: "C4",
      code: "[C4]",
      title: "Article 38",
      shortDesc: "Directive Principle: Public Welfare Infrastructure.",
      category: "Constitutional Laws",
      details: {
        subtitle: "Directive Principle of State Infrastructure",
        description: "Directive Principle directing the State to secure a social order for the promotion of welfare of the people, including infrastructure safety and connectivity.",
        subtext: "WELFARE DEVELOMENT",
        rulesList: [
          "State must build roads connecting remote communities to improve welfare.",
          "Infrastructure planning must prioritize public safety and health.",
          "Aims to minimize socio-economic disruption through safe, reliable mobility."
        ],
        fineRef: "Principle: Directs infrastructure spending towards safety and accessibility."
      }
    },
    {
      id: "C5",
      code: "[C5]",
      title: "Article 301",
      shortDesc: "Freedom of Trade & Commerce across highways.",
      category: "Constitutional Laws",
      details: {
        subtitle: "Freedom of Interstate Goods Transit",
        description: "Trade, commerce, and intercourse throughout the territory of India shall be free under Article 301.",
        subtext: "COMMERCE PROTECTION",
        rulesList: [
          "No arbitrary state border transit fees or taxes on transport.",
          "Interstate movement of goods and trucks must be unhindered.",
          "Subject to reasonable restrictions for traffic security and regulations."
        ],
        fineRef: "Precedent: Toll taxes must be reasonable and linked to infrastructure maintenance."
      }
    },
    {
      id: "C6",
      code: "[C6]",
      title: "List II Entry 13",
      shortDesc: "State & Municipal Authority over local roads.",
      category: "Constitutional Laws",
      details: {
        subtitle: "Local Municipal Road Jurisdiction",
        description: "Seventh Schedule List II Entry 13 dictates state legislative jurisdiction over local communications, municipal roads, and bridges.",
        subtext: "LOCAL TRANSIT",
        rulesList: [
          "Municipal bodies govern local urban streets and lanes.",
          "States set localized city speed limits and bypass tolls.",
          "Allows municipal corporations to regulate street vendors and park spaces."
        ],
        fineRef: "Jurisdiction: Empowers local municipalities to manage urban road safety."
      }
    },

    // --- INTERNATIONAL STANDARDS ---
    {
      id: "I1",
      code: "[I1]",
      title: "Vienna Convention",
      shortDesc: "1968 Global treaty standardizing road traffic safety.",
      category: "International Standards",
      details: {
        subtitle: "Vienna Convention on Road Traffic",
        description: "A multilateral treaty designed to standardize traffic regulations and facilitate international road safety by standardizing road traffic rules, sign shapes, and driver licensing.",
        subtext: "GLOBAL HARMONIZATION",
        rulesList: [
          "Standardizes traffic light sequences (Red, Yellow, Green) globally.",
          "Harmonizes basic rules of the road (e.g. overtaking protocols, right of way).",
          "Facilitates recognition of standard vehicle registration plates."
        ],
        fineRef: "Treaty Status: India is a signatory, respecting standard global sign shapes."
      }
    },
    {
      id: "I2",
      code: "[I2]",
      title: "Geneva Convention",
      shortDesc: "1949 driver licenses and traffic standardization treaty.",
      category: "International Standards",
      details: {
        subtitle: "1949 Geneva Road Traffic Treaty",
        description: "The predecessor treaty regulating basic road traffic principles and establishing rules for international drivers before the 1968 Vienna standards.",
        subtext: "TREATY FOUNDATION",
        rulesList: [
          "Established initial rules for cross-border vehicle registration.",
          "Standardized basic international driver license translations.",
          "Set standard requirements for commercial vehicles crossing state lines."
        ],
        fineRef: "Treaty Status: Valid in signatory states that did not ratify the Vienna Convention."
      }
    },
    {
      id: "I3",
      code: "[I3]",
      title: "International Permit",
      shortDesc: "Rules governing International Driving Permit validation.",
      category: "International Standards",
      details: {
        subtitle: "International Driving Permit (IDP) Protocols",
        description: "An IDP is a legal translation of a person's domestic driver license, allowing them to operate motor vehicles in any signatory state when accompanied by their original license.",
        subtext: "UN LICENSE TRANSLATION",
        rulesList: [
          "Valid only when accompanied by the original, valid domestic driver license.",
          "Valid for 1 year from the date of issue under standard UN rules.",
          "Must be issued by authorized domestic motoring bodies (e.g., local RTO)."
        ],
        fineRef: "UN Regulation: Accepted across 150+ signatory countries."
      }
    },
    {
      id: "I4",
      code: "[I4]",
      title: "UNECE WP.29",
      shortDesc: "World Forum for vehicle safety standards.",
      category: "International Standards",
      details: {
        subtitle: "UN Vehicle Regulations Safety Forum",
        description: "World Forum for Harmonization of Vehicle Regulations, establishing global safety standards for automobiles.",
        subtext: "VEHICLE INTEGRITY",
        rulesList: [
          "Standardizes vehicle crash test parameters and airbag layouts.",
          "Mandates anti-lock braking systems (ABS) on all motor vehicles.",
          "Ensures vehicle structural integrity across international borders."
        ],
        fineRef: "UN Agreement: Vehicles must comply with global safety standards for import/export."
      }
    },
    {
      id: "I5",
      code: "[I5]",
      title: "ISO 39001",
      shortDesc: "ISO standard for Road Traffic Safety Management.",
      category: "International Standards",
      details: {
        subtitle: "ISO Safety Management Standard",
        description: "Global ISO standard defining requirements for road traffic safety (RTS) management systems.",
        subtext: "RTS AUDIT",
        rulesList: [
          "Helps organizations reduce deaths and serious injuries in road crashes.",
          "Mandates fleet management and driver safety audits.",
          "Standardizes speed monitoring and collision investigations."
        ],
        fineRef: "ISO Standard: Voluntarily adopted by transit networks and logistics firms."
      }
    },
    {
      id: "I6",
      code: "[I6]",
      title: "Decade of Action",
      shortDesc: "UN Decade of Action aiming for 50% crash reduction.",
      category: "International Standards",
      details: {
        subtitle: "UN Decade of Action for Road Safety",
        description: "A global initiative targeting a 50% reduction in road traffic deaths and injuries by 2030.",
        subtext: "GLOBAL GOALS",
        rulesList: [
          "Promotes safe road infrastructure design.",
          "Encourages vehicle safety technology adoption.",
          "Enhances post-crash emergency response times."
        ],
        fineRef: "UN Resolution: Inspires domestic safety policies and legislative reforms."
      }
    },

    // --- ROAD SIGNS ---
    {
      id: "S1",
      code: "[S1]",
      title: "Stop Sign",
      shortDesc: "Regulatory: Mandates a complete vehicular stop.",
      category: "Road Signs",
      details: {
        subtitle: "Stop Sign Regulatory Guidelines",
        description: "An octagonal red sign with white text. It indicates that the driver must bring the vehicle to a complete stop before the stop line, zebra crossing, or intersection entrance.",
        subtext: "REGULATORY COMPLIANCE",
        rulesList: [
          "Stop completely; rolling or crawling stops are illegal.",
          "Yield right-of-way to pedestrians and vehicles already in the intersection.",
          "Proceed only when it is completely safe and clear."
        ],
        fineRef: "Section 119: ₹500 - ₹1,000 fine for running a stop sign."
      }
    },
    {
      id: "S2",
      code: "[S2]",
      title: "Yield Sign",
      shortDesc: "Regulatory: Give way to cross traffic or roundabout traffic.",
      category: "Road Signs",
      details: {
        subtitle: "Yield / Give Way Sign Rules",
        description: "An inverted triangle, white with a red border. Indicates that the driver must slow down and prepare to stop to give way to vehicles, pedestrians, or roundabout traffic.",
        subtext: "MERGING PRIORITY",
        rulesList: [
          "Slow down and check for oncoming vehicles before merging.",
          "Bring the vehicle to a complete stop if safety requires.",
          "Proceed only when safe without causing cross-traffic to slow down."
        ],
        fineRef: "Section 112: ₹1,000 fine for failing to yield right-of-way."
      }
    },
    {
      id: "S3",
      code: "[S3]",
      title: "Speed Limit 50",
      shortDesc: "Regulatory: Restricts maximum speed to 50 km/h.",
      category: "Road Signs",
      details: {
        subtitle: "Speed Limit 50 km/h Sign",
        description: "A circular white sign with a thick red border and black numbers. Dictates that vehicles must not exceed 50 km/h in this corridor under ideal conditions.",
        subtext: "SPEED CEILING",
        rulesList: [
          "Speed limit is a maximum, not a target speed.",
          "Reduce speed further in rain, fog, or heavy pedestrian traffic.",
          "Watch for digital variable speed limits on highway corridors."
        ],
        fineRef: "Section 183: ₹1,000 - ₹2,000 fine for exceeding speed limit."
      }
    },
    {
      id: "S4",
      code: "[S4]",
      title: "Zebra Crossing",
      shortDesc: "Warning: Designated pedestrian crossing zone ahead.",
      category: "Road Signs",
      details: {
        subtitle: "Pedestrian Crosswalk Warning Sign",
        description: "A blue square sign with a white triangle and pedestrian graphic. Warns drivers that they are approaching a designated pedestrian crossing zone.",
        subtext: "PEDESTRIAN PRIORITY",
        rulesList: [
          "Yield absolute right-of-way to pedestrians on the crosswalk.",
          "Do not overtake or park vehicles near the crosswalk boundary.",
          "Slow down and prepare to stop at all times."
        ],
        fineRef: "Section 177: ₹1,000 fine for blocking crosswalk."
      }
    },
    {
      id: "S5",
      code: "[S5]",
      title: "No Parking",
      shortDesc: "Regulatory: Prohibits vehicle parking in zone.",
      category: "Road Signs",
      details: {
        subtitle: "No Parking Zone Sign",
        description: "A circular blue sign with a red border and a single diagonal red slash. Prohibits drivers from parking their vehicles in the marked zone.",
        subtext: "TOWING ZONE",
        rulesList: [
          "Do not leave the vehicle unattended in this zone.",
          "Passenger drop-off/pick-up is permitted for a maximum of 2 minutes.",
          "Vehicles parked in violation are subject to towing and storage fines."
        ],
        fineRef: "Section 177: ₹500 - ₹1,000 fine + towing charges."
      }
    },
    {
      id: "S6",
      code: "[S6]",
      title: "One Way",
      shortDesc: "Regulatory: Directs single-direction traffic flow.",
      category: "Road Signs",
      details: {
        subtitle: "One-Way Street Regulation",
        description: "A rectangular blue sign with a large white arrow. Directs all vehicular traffic to flow in the direction of the arrow.",
        subtext: "FLOW COMPLIANCE",
        rulesList: [
          "Only travel in the direction indicated by the arrow.",
          "No U-turns or reverse driving against the designated direction.",
          "Look out for regulatory signs at intersections before turning."
        ],
        fineRef: "Section 184: ₹1,000 - ₹5,000 fine for driving against flow."
      }
    }
  ];

  // Filter items based on active category and search query
  const filteredItems = itemsList.filter(item => {
    if (item.category !== activeCategory) return false;
    return item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           item.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Automatically select the first item of the category if current selected is not in it
  const currentCategoryItems = itemsList.filter(item => item.category === activeCategory);
  const selectedItem = currentCategoryItems.find(item => item.id === activeItemId) || currentCategoryItems[0] || itemsList[0];

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setSearchQuery("");
    // Pick the first item in the new category
    const categoryItems = itemsList.filter(item => item.category === category);
    if (categoryItems.length > 0) {
      setActiveItemId(categoryItems[0].id);
    }
  };

  const getImageUrl = (id) => {
    switch (id) {
      case "A2": return "/codex_lane_discipline.png";
      case "A3": return "/codex_signaling.png";
      case "A4": return "/codex_speed_limit.png";
      case "A5": return "/codex_pedestrian.png";
      case "A6": return "/codex_distracted.png";
      case "A7": return "/codex_emergency.png";
      case "C1":
      case "C2":
      case "C3":
      case "C4":
      case "C5":
      case "C6": return "/codex_constitution.png";
      case "I2":
      case "I3":
      case "I4":
      case "I5":
      case "I6": return "/codex_international.png";
      default: return "/codex_constitution.png";
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="app-container" style={{ paddingBottom: '120px', paddingTop: '40px', position: 'relative', minHeight: '100vh' }}>
      { poppinsFontImport && <style>{poppinsFontImport}</style> }
      
      {/* Blended Background Watermark */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("/codex_bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.15,
        pointerEvents: 'none',
        zIndex: -1,
        maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)',
        WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)'
      }}></div>

      <style>{`
        /* Deep Dark Mode Styles */
        .codex-tabs-bar { display: flex; justify-content: flex-start; gap: 12px; background: rgba(18, 18, 18, 0.6); border: 1px solid rgba(255, 255, 255, 0.05); padding: 8px; border-radius: 100px; width: fit-content; max-width: 100%; margin: 0 auto 30px; backdrop-filter: blur(24px); overflow-x: auto; -ms-overflow-style: none; scrollbar-width: none; }
        .codex-tabs-bar::-webkit-scrollbar { display: none; }
        .codex-tab-btn { flex: 0 0 auto; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.85rem; font-weight: 600; color: #A1A1AA; background: transparent; border: none; padding: 10px 20px; border-radius: 100px; cursor: pointer; transition: all 0.3s; white-space: nowrap; text-align: center; }
        .codex-tab-btn.active { color: #0A0A0A; background: linear-gradient(135deg, #10B981, #00FF66); border: 1px solid #10B981; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3); }
        .dashboard-glass-panel { background: rgba(18, 18, 18, 0.8); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 24px; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05); backdrop-filter: blur(24px); display: grid; grid-template-columns: 320px 1fr; min-height: 580px; overflow: hidden; }
        .dashboard-sidebar { border-right: 1px solid rgba(255, 255, 255, 0.05); display: flex; flex-direction: column; background: rgba(10, 10, 10, 0.4); }
        .sidebar-search-box { padding: 20px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
        .sidebar-search-pill { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 12px; display: flex; align-items: center; padding: 10px 14px; gap: 10px; transition: 0.3s; }
        .sidebar-search-pill:focus-within { border-color: #10B981; box-shadow: 0 0 15px rgba(16, 185, 129, 0.1); }
        .sidebar-search-input { background: transparent; border: none; outline: none; color: #F8FAFC; font-size: 0.85rem; width: 100%; font-family: inherit; }
        .sidebar-search-input::placeholder { color: #52525B; }
        .sidebar-items-list { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px; max-height: 480px; }
        .sidebar-items-list::-webkit-scrollbar { width: 4px; }
        .sidebar-items-list::-webkit-scrollbar-thumb { background: rgba(16, 185, 129, 0.3); border-radius: 4px; }
        .item-row-card { background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.03); border-radius: 12px; padding: 12px; cursor: pointer; transition: all 0.3s; display: flex; flex-direction: column; gap: 6px; }
        .item-row-card:hover { background: rgba(16, 185, 129, 0.05); border-color: rgba(16, 185, 129, 0.2); }
        .item-row-card.active { background: rgba(16, 185, 129, 0.1); border-color: #10B981; box-shadow: 0 0 15px rgba(16, 185, 129, 0.1); }
        .item-row-header { display: flex; align-items: center; gap: 8px; }
        .item-row-tag { font-size: 0.62rem; font-weight: 700; color: #0A0A0A; background: #10B981; padding: 2px 6px; border-radius: 4px; }
        .item-row-title { font-size: 0.85rem; font-weight: 600; color: #F8FAFC; }
        .item-row-desc { font-size: 0.75rem; color: #A1A1AA; line-height: 1.4; }
        .dashboard-detail-view { padding: 24px; overflow-y: auto; display: flex; flex-direction: column; gap: 24px; }
        .dashboard-detail-view::-webkit-scrollbar { width: 4px; }
        .dashboard-detail-view::-webkit-scrollbar-thumb { background: rgba(16, 185, 129, 0.3); border-radius: 4px; }
        .details-hero-card { background: rgba(10, 10, 10, 0.6); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 20px; padding: 24px; display: grid; grid-template-columns: 1fr; gap: 24px; }
        @media (min-width: 768px) { .details-hero-card { grid-template-columns: 1.2fr 1fr; } }
        .details-info-left { display: flex; flex-direction: column; gap: 16px; }
        .details-badge-row { display: flex; align-items: center; gap: 10px; }
        .details-badge-tag { font-size: 0.7rem; font-weight: 700; color: #0A0A0A; background: #00FF66; padding: 3px 10px; border-radius: 100px; letter-spacing: 0.5px; }
        .details-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; font-weight: 700; color: #F8FAFC; }
        .details-desc { font-size: 0.9rem; color: #A1A1AA; line-height: 1.6; }
        .details-list-sec { display: flex; flex-direction: column; gap: 10px; }
        .details-sec-title { font-size: 0.85rem; font-weight: 700; color: #F8FAFC; border-bottom: 1px solid rgba(255, 255, 255, 0.05); padding-bottom: 6px; margin-bottom: 4px; }
        .details-list-item { font-size: 0.85rem; color: #A1A1AA; display: flex; align-items: flex-start; gap: 10px; line-height: 1.5; }
        .details-bullet-dot { min-width: 6px; height: 6px; background: #10B981; border-radius: 50%; margin-top: 6px; box-shadow: 0 0 8px #10B981; }
        .details-fine-banner { margin-top: auto; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 12px; padding: 12px 16px; display: flex; align-items: center; gap: 12px; }
        .details-fine-info { font-size: 0.85rem; font-weight: 600; color: #fca5a5; line-height: 1.4; }
        .visual-display-sec { background: rgba(255, 255, 255, 0.02); border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.03); display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative; }
        .roundabout-svg, .holo-globe-svg { width: 100%; max-width: 250px; height: auto; }
        .road-sign-visual-box { display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height: 100%; min-height: 200px; }
        @media (max-width: 768px) { .dashboard-glass-panel { grid-template-columns: 1fr; min-height: auto; } .dashboard-sidebar { border-right: none; border-bottom: 1px solid rgba(255, 255, 255, 0.05); } .sidebar-items-list { max-height: 300px; } .details-hero-card { padding: 16px; } }
      `}</style>

      {/* Matching Global Header structure */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: '#F8FAFC' }}>
          Driver's <span style={{ color: '#10B981' }}>Codex</span>
        </h2>
        <p style={{ color: '#A1A1AA', marginTop: '8px' }}>Explore comprehensive traffic laws, regulations, and guidelines.</p>
      </div>

      {/* Categories Bar */}
      <div className="codex-tabs-bar">
        {["Basic Rules", "Constitutional Laws", "International Standards", "Road Signs"].map((category) => (
          <button
            key={category}
            className={`codex-tab-btn ${activeCategory === category ? "active" : ""}`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Dashboard Grid Panel */}
      <div className="dashboard-glass-panel">
        
        {/* Sidebar Left Column */}
        <div className="dashboard-sidebar">
          <div className="sidebar-search-box">
            <div className="sidebar-search-pill">
              <Search size={14} color="#a855f7" />
              <input 
                type="text" 
                className="sidebar-search-input" 
                placeholder={`Search ${activeCategory}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Items scroll list */}
          <div className="sidebar-items-list" data-lenis-prevent="true">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`item-row-card ${activeItemId === item.id ? "active" : ""}`}
                  onClick={() => setActiveItemId(item.id)}
                >
                  <div className="item-row-header">
                    <span className="item-row-tag">{item.code}</span>
                    <span className="item-row-title">{item.title}</span>
                  </div>
                  <span className="item-row-desc">{item.shortDesc}</span>
                </div>
              ))
            ) : (
              <div style={{ fontSize: '0.75rem', color: '#475569', textAlign: 'center', marginTop: '20px', width: '100%' }}>
                No matches found.
              </div>
            )}
          </div>
        </div>

        {/* Right Main Details Column */}
        <div className="dashboard-detail-view" data-lenis-prevent="true">
          
          {selectedItem ? (
            <div className="details-hero-card">
              
              {/* Text description section */}
              <div className="details-info-left">
                <div className="details-badge-row">
                  <span className="details-badge-tag">{selectedItem.code}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8' }}>{activeCategory}</span>
                </div>
                
                <h3 className="details-title">{selectedItem.title}</h3>
                <p className="details-desc">{selectedItem.details.description}</p>

                <div className="details-list-sec">
                  <h4 className="details-sec-title">Key Provisions & Guidelines</h4>
                  {selectedItem.details.rulesList.map((rule, idx) => (
                    <div key={idx} className="details-list-item">
                      <span className="details-bullet-dot" />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>

                <div className="details-fine-banner">
                  <Info size={16} color="#f87171" />
                  <span className="details-fine-info">{selectedItem.details.fineRef}</span>
                </div>
              </div>

              {/* Animated graphic section */}
              <div className="visual-display-sec" style={{ 
                padding: (activeCategory === "Basic Rules" && selectedItem.id === "A1") || (activeCategory === "International Standards" && selectedItem.id === "I1") || activeCategory === "Road Signs" ? '16px' : '0px'
              }}>
                
                {activeCategory === "Basic Rules" && selectedItem.id === "A1" && (
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <svg className="roundabout-svg" viewBox="0 0 200 200" fill="none">
                      <defs>
                        <radialGradient id="island-grad" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#0c1220" />
                          <stop offset="100%" stopColor="#1e1b4b" />
                        </radialGradient>
                        <filter id="cyan-glow" x="-20%" y="-20%" width="140%" height="140%">
                          <feGaussianBlur stdDeviation="3" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                        <filter id="pink-glow" x="-20%" y="-20%" width="140%" height="140%">
                          <feGaussianBlur stdDeviation="3" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                      </defs>

                      {/* Roads Outline */}
                      <path d="M 85 0 L 85 60 A 40 40 0 0 1 115 60 L 115 0 Z" fill="#0b0e17" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1.5" />
                      <path d="M 85 200 L 85 140 A 40 40 0 0 0 115 140 L 115 200 Z" fill="#0b0e17" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1.5" />
                      <path d="M 0 85 L 60 85 A 40 40 0 0 0 60 115 L 0 115 Z" fill="#0b0e17" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1.5" />
                      <path d="M 200 85 L 140 85 A 40 40 0 0 1 140 115 L 200 115 Z" fill="#0b0e17" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1.5" />

                      {/* Roundabout Outer Road Circle */}
                      <circle cx="100" cy="100" r="55" fill="#070a12" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="2" />
                      
                      {/* Inner Roundabout Island */}
                      <circle cx="100" cy="100" r="32" fill="url(#island-grad)" stroke="#a855f7" strokeWidth="2.5" style={{ filter: 'drop-shadow(0 0 6px rgba(168, 85, 247, 0.4))' }} />

                      {/* Dashed Lane Markings */}
                      <circle cx="100" cy="100" r="44" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4, 4" fill="none" />
                      
                      {/* Directional Arrows (Clockwise) */}
                      <path d="M 100 48 L 105 48 M 105 48 L 103 45 M 105 48 L 103 51" stroke="rgba(6, 182, 212, 0.6)" strokeWidth="1" fill="none" />
                      <path d="M 152 100 L 152 105 M 152 105 L 149 103 M 152 105 L 155 103" stroke="rgba(6, 182, 212, 0.6)" strokeWidth="1" fill="none" />
                      <path d="M 100 152 L 95 152 M 95 152 L 97 149 M 95 152 L 97 155" stroke="rgba(6, 182, 212, 0.6)" strokeWidth="1" fill="none" />
                      
                      {/* Roundabout Paths for Car Animations */}
                      <path id="path-car-1" d="M 92 200 L 92 144 A 44 44 0 0 1 144 100 A 44 44 0 0 1 100 56 A 44 44 0 0 1 56 100 L 0 100" fill="none" stroke="none" />
                      <path id="path-car-2" d="M 200 92 L 144 92 A 44 44 0 0 1 100 56 L 100 0" fill="none" stroke="none" />

                      {/* Animated Car 1 (Cyan) */}
                      <g>
                        <rect width="14" height="7" rx="2" fill="#06b6d4" x="-7" y="-3.5" style={{ filter: 'url(#cyan-glow)' }} />
                        <circle cx="4" cy="-3.5" r="1.5" fill="#fff" />
                        <circle cx="4" cy="3.5" r="1.5" fill="#fff" />
                        <rect width="1.5" height="4" x="-7" y="-2" fill="#ef4444" />
                        <animateMotion dur="8s" repeatCount="indefinite" rotate="auto" path="M 92 210 L 92 144 A 44 44 0 0 1 136 122 A 44 44 0 0 1 100 56 A 44 44 0 0 1 56 108 L -20 108" />
                      </g>

                      {/* Animated Car 2 (Pink) */}
                      <g>
                        <rect width="14" height="7" rx="2" fill="#ec4899" x="-7" y="-3.5" style={{ filter: 'url(#pink-glow)' }} />
                        <circle cx="4" cy="-3.5" r="1.5" fill="#fff" />
                        <circle cx="4" cy="3.5" r="1.5" fill="#fff" />
                        <rect width="1.5" height="4" x="-7" y="-2" fill="#ef4444" />
                        <animateMotion dur="6s" begin="2s" repeatCount="indefinite" rotate="auto" path="M 210 92 L 144 92 A 44 44 0 0 1 108 56 L 108 -20" />
                      </g>
                    </svg>
                    <div style={{ fontSize: '0.62rem', color: '#64748b', textAlign: 'center', marginTop: '10px' }}>
                      Clockwise Roundabout simulator demonstrating right-of-way.
                    </div>
                  </div>
                )}

                {activeCategory === "International Standards" && selectedItem.id === "I1" && (
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <svg className="holo-globe-svg" viewBox="0 0 100 100" fill="none">
                      <defs>
                        <radialGradient id="globe-glow" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#082f49" stopOpacity="0.8" />
                          <stop offset="80%" stopColor="#0284c7" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#0c0a0f" stopOpacity="0" />
                        </radialGradient>
                      </defs>
                      <circle cx="50" cy="50" r="45" fill="url(#globe-glow)" />
                      <circle cx="50" cy="50" r="44" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="1" />
                      <circle cx="50" cy="50" r="45" stroke="rgba(6, 182, 212, 0.1)" strokeWidth="3" />
                      <ellipse cx="50" cy="50" rx="44" ry="12" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="0.8" fill="none" />
                      <ellipse cx="50" cy="50" rx="44" ry="24" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="0.8" fill="none" />
                      <ellipse cx="50" cy="50" rx="12" ry="44" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="0.8" fill="none" />
                      <ellipse cx="50" cy="50" rx="26" ry="44" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="0.8" fill="none" />
                      <line x1="50" y1="6" x2="50" y2="94" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="0.8" />
                      <line x1="6" y1="50" x2="94" y2="50" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="0.8" />
                      <path d="M 15 28 Q 22 26 28 35 T 22 45 Z" fill="rgba(6, 182, 212, 0.25)" stroke="rgba(6, 182, 212, 0.5)" strokeWidth="0.5" />
                      <path d="M 45 20 Q 65 18 80 25 T 75 42 T 55 35 Z" fill="rgba(6, 182, 212, 0.25)" stroke="rgba(6, 182, 212, 0.5)" strokeWidth="0.5" />
                      <path d="M 48 44 Q 58 48 55 68 T 46 64 T 48 44 Z" fill="rgba(6, 182, 212, 0.25)" stroke="rgba(6, 182, 212, 0.5)" strokeWidth="0.5" />
                    </svg>
                    <div style={{ fontSize: '0.62rem', color: '#64748b', textAlign: 'center', marginTop: '10px' }}>
                      Vienna treaty standards harmonizing global roads.
                    </div>
                  </div>
                )}

                {/* Road Signs SVG Visuals */}
                {activeCategory === "Road Signs" && (
                  <div className="road-sign-visual-box">
                    {selectedItem.id === "S1" && (
                      <svg width="120" height="120" viewBox="0 0 100 100">
                        <filter id="stop-glow">
                          <feGaussianBlur stdDeviation="3" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                        <polygon points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30" fill="#ef4444" stroke="#ffffff" strokeWidth="3" style={{ filter: 'url(#stop-glow)' }} />
                        <polygon points="32,8 68,8 92,32 92,68 68,92 32,92 8,68 8,32" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
                        <text x="50" y="58" fill="#ffffff" fontSize="20" fontWeight="900" textAnchor="middle" fontFamily="Poppins">STOP</text>
                      </svg>
                    )}
                    {selectedItem.id === "S2" && (
                      <svg width="120" height="120" viewBox="0 0 100 100">
                        <filter id="yield-glow">
                          <feGaussianBlur stdDeviation="3" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                        <polygon points="50,95 5,10 95,10" fill="#ffffff" stroke="#ef4444" strokeWidth="8" style={{ filter: 'url(#yield-glow)' }} />
                        <polygon points="50,85 12,15 88,15" fill="#ffffff" stroke="#ef4444" strokeWidth="1" />
                      </svg>
                    )}
                    {selectedItem.id === "S3" && (
                      <svg width="120" height="120" viewBox="0 0 100 100">
                        <filter id="speed-glow">
                          <feGaussianBlur stdDeviation="3" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                        <circle cx="50" cy="50" r="42" fill="#ffffff" stroke="#ef4444" strokeWidth="8" style={{ filter: 'url(#speed-glow)' }} />
                        <text x="50" y="59" fill="#000000" fontSize="28" fontWeight="800" textAnchor="middle" fontFamily="Poppins">50</text>
                      </svg>
                    )}
                    {selectedItem.id === "S4" && (
                      <svg width="120" height="120" viewBox="0 0 100 100">
                        <filter id="blue-glow">
                          <feGaussianBlur stdDeviation="3" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                        <rect x="10" y="10" width="80" height="80" rx="8" fill="#2563eb" stroke="#ffffff" strokeWidth="3" style={{ filter: 'url(#blue-glow)' }} />
                        <polygon points="50,20 18,78 82,78" fill="#ffffff" />
                        <line x1="28" y1="78" x2="38" y2="58" stroke="#000000" strokeWidth="2.5" />
                        <line x1="38" y1="78" x2="48" y2="58" stroke="#000000" strokeWidth="2.5" />
                        <line x1="48" y1="78" x2="58" y2="58" stroke="#000000" strokeWidth="2.5" />
                        <line x1="58" y1="78" x2="68" y2="58" stroke="#000000" strokeWidth="2.5" />
                      </svg>
                    )}
                    {selectedItem.id === "S5" && (
                      <svg width="120" height="120" viewBox="0 0 100 100">
                        <filter id="red-slash-glow">
                          <feGaussianBlur stdDeviation="3" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                        <circle cx="50" cy="50" r="42" fill="#2563eb" stroke="#ef4444" strokeWidth="8" style={{ filter: 'url(#red-slash-glow)' }} />
                        <line x1="20" y1="20" x2="80" y2="80" stroke="#ef4444" strokeWidth="8" />
                      </svg>
                    )}
                    {selectedItem.id === "S6" && (
                      <svg width="120" height="120" viewBox="0 0 100 100">
                        <filter id="arrow-glow">
                          <feGaussianBlur stdDeviation="3" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                        <rect x="25" y="10" width="50" height="80" rx="4" fill="#2563eb" stroke="#ffffff" strokeWidth="3" style={{ filter: 'url(#arrow-glow)' }} />
                        <path d="M 50 20 L 35 45 L 45 45 L 45 75 L 55 75 L 55 45 L 65 45 Z" fill="#ffffff" />
                      </svg>
                    )}
                    <div style={{ fontSize: '0.62rem', color: '#64748b', textAlign: 'center', marginTop: '6px' }}>
                      Vector compliance graphic: {selectedItem.title}.
                    </div>
                  </div>
                )}

                {/* Fallback image views covering the entire box for non-animated standard cards */}
                {((activeCategory === "Basic Rules" && selectedItem.id !== "A1") || 
                  (activeCategory === "International Standards" && selectedItem.id !== "I1") ||
                  activeCategory === "Constitutional Laws") && (
                  <div style={{ 
                    width: '100%', 
                    height: '100%', 
                    minHeight: '230px', 
                    backgroundImage: `url(${getImageUrl(selectedItem.id)})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    display: 'flex', 
                    alignItems: 'flex-end', 
                    justifyContent: 'center', 
                    position: 'relative'
                  }}>
                    {/* Dark gradient overlay for text readability */}
                    <div style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0, bottom: 0,
                      background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.3) 60%, rgba(15, 23, 42, 0) 100%)',
                      zIndex: 1
                    }}></div>
                    
                    <span style={{ 
                      fontSize: '0.68rem', 
                      fontWeight: 600, 
                      color: '#f8fafc', 
                      background: 'rgba(15, 23, 42, 0.75)', 
                      padding: '6px 14px', 
                      borderRadius: '8px', 
                      backdropFilter: 'blur(4px)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      marginBottom: '16px',
                      zIndex: 2
                    }}>
                      {selectedItem.title} Illustration
                    </span>
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px' }}>
              <AlertTriangle size={36} color="#ef4444" style={{ margin: '0 auto 16px' }} />
              <h4>No Item Selected</h4>
              <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '8px' }}>Please select an item from the left sidebar to view legal provisions.</p>
            </div>
          )}

        </div>

      </div>

    </motion.div>
  );
}

export default CodexPage;
