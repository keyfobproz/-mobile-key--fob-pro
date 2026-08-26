
const SACRAMENTO_LAT = 38.5816;
const SACRAMENTO_LNG = -121.4944;

function calculateDistanceMiles(lat1, lon1, lat2, lon2) {
    const R = 3958.8;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function getBasePrice(make) {
    const luxuryMakes = ["Tesla", "BMW", "Mercedes-Benz"];
    return luxuryMakes.includes(make) ? 249.00 : 169.00;
}

// Test Cases
console.log("--- STARTING LOGIC TEST ---");

// 1. Check Standard Vehicle Pricing
const stdPrice = getBasePrice("Ford");
console.log(`Standard Vehicle (Ford) Base Price: $${stdPrice} (Expected: $169)`);

// 2. Check Luxury Vehicle Pricing
const luxPrice = getBasePrice("Tesla");
console.log(`Luxury Vehicle (Tesla) Base Price: $${luxPrice} (Expected: $249)`);

// 3. Distance Calculation Test: Roseville, CA (~18 miles from Sac)
const rosevilleLat = 38.7521, rosevilleLng = -121.2880;
const distRoseville = calculateDistanceMiles(SACRAMENTO_LAT, SACRAMENTO_LNG, rosevilleLat, rosevilleLng);
console.log(`Distance to Roseville: ${distRoseville.toFixed(2)} miles`);
console.log(`Surcharge applied? ${distRoseville > 25 ? "YES" : "NO"} (Expected: NO)`);

// 4. Distance Calculation Test: Stockton, CA (~48 miles from Sac)
const stocktonLat = 37.9577, stocktonLng = -121.2908;
const distStockton = calculateDistanceMiles(SACRAMENTO_LAT, SACRAMENTO_LNG, stocktonLat, stocktonLng);
console.log(`Distance to Stockton: ${distStockton.toFixed(2)} miles`);
console.log(`Surcharge applied? ${distStockton > 25 ? "YES" : "NO"} (Expected: YES)`);

// 5. Final Discounted Price Calculation (Tesla + Stockton)
const finalOriginal = luxPrice + (distStockton > 25 ? 50.00 : 0);
const finalDiscounted = finalOriginal * 0.5;
console.log(`Final Discounted Price (Tesla + Stockton): $${finalDiscounted.toFixed(2)} (Expected: $149.50)`);

console.log("--- LOGIC TEST COMPLETE ---");
