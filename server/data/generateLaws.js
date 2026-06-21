const fs = require('fs');
const path = require('path');

const regions = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const vehicles = ["Car", "Bike", "Scooty", "Truck", "3 Wheeler"];

// Baseline fines based on Motor Vehicles (Amendment) Act, 2019
const rules = [
  { violation: "No Helmet", appliesTo: ["Bike", "Scooty"], fine: 1000 },
  { violation: "No Seatbelt", appliesTo: ["Car", "Truck"], fine: 1000 },
  { violation: "Speeding", appliesTo: ["Car", "3 Wheeler"], fine: 2000 },
  { violation: "Speeding", appliesTo: ["Bike", "Scooty"], fine: 1000 },
  { violation: "Speeding", appliesTo: ["Truck"], fine: 4000 },
  { violation: "Drunk Driving", appliesTo: vehicles, fine: 10000 },
  { violation: "Jumping Red Light", appliesTo: vehicles, fine: 5000 },
  { violation: "Without License", appliesTo: vehicles, fine: 5000 },
  { violation: "Overloading", appliesTo: ["Car", "3 Wheeler", "Bike", "Scooty"], fine: 2000 },
  { violation: "Overloading", appliesTo: ["Truck"], fine: 20000 },
  { violation: "Pollution Violation (No PUC)", appliesTo: vehicles, fine: 10000 },
  { violation: "Using Mobile While Driving", appliesTo: vehicles, fine: 5000 },
  { violation: "Driving Without Insurance", appliesTo: vehicles, fine: 2000 },
  { violation: "Dangerous Driving", appliesTo: vehicles, fine: 5000 },
  { violation: "Blocking Emergency Vehicles", appliesTo: vehicles, fine: 10000 },
  { violation: "Driving by Minor", appliesTo: ["Bike", "Scooty", "Car"], fine: 25000 }
];

const laws = [];

regions.forEach(state => {
  vehicles.forEach(vehicleType => {
    rules.forEach(rule => {
      if (rule.appliesTo.includes(vehicleType)) {
        laws.push({
          state,
          violation: rule.violation,
          vehicleType,
          fine: rule.fine
        });
      }
    });
  });
});

const outputPath = path.join(__dirname, 'laws.json');
fs.writeFileSync(outputPath, JSON.stringify(laws, null, 2));

console.log(`Successfully generated ${laws.length} laws for 36 regions and 5 vehicle types.`);
