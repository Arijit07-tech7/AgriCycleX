// --- Product data (Crops, Vegetables, Fruits, Tea, Coffee) ---
const productPrices = {
  "Apple": 150, "Avocado": 300, "Banana (per dozen)": 40,
  "Barley": 21.5, "Bitter Gourd": 40, "Bhindi (Ladies Finger)": 30,
  "Bottle Gourd": 20, "Brinjal": 30, "Capsicum": 50, "Carrot": 40,
  "Cauliflower": 20, "Cucumber": 30, "Dragon Fruit": 70,
  "French Beans": 60, "Garlic": 100, "Ginger": 60, "Green Chilli": 50,
  "Kiwi (Pack of 3)": 100, "Mango": 100, "Masur (Lentil)": 70,
  "Muskmelon": 30, "Orange / Mosambi": 80, "Papaya": 40,
  "Pomegranate": 150, "Paddy (Rice)": 23.69, "Maize": 24,
  "Bajra": 27.75, "Wheat": 25.85, "Onion": 25, "Potato": 30,
  "Tomato": 30, "Spinach / Palak": 20, "Watermelon": 20,
  "Tea": 500, "Coffee": 1000, "Others": 0
};

// --- Populate product dropdown ---
const productSelect = document.getElementById("product");
Object.keys(productPrices).sort().forEach(prod => {
  const option = document.createElement("option");
  option.value = prod;
  option.text = prod;
  productSelect.add(option);
});

// --- States + districts (28 states + 5 main districts each + "Others") ---
const stateCity = {
  "Andhra Pradesh": ["Guntur","Kurnool","Tirupati","Vijayawada","Visakhapatnam","Others"],
  "Arunachal Pradesh": ["Itanagar","Pasighat","Roing","Tawang","Ziro","Others"],
  "Assam": ["Dibrugarh","Guwahati","Jorhat","Silchar","Tezpur","Others"],
  "Bihar": ["Bhagalpur","Darbhanga","Gaya","Muzaffarpur","Patna","Others"],
  "Chhattisgarh": ["Bilaspur","Durg","Korba","Raipur","Rajnandgaon","Others"],
  "Goa": ["Mapusa","Margao","Panaji","Ponda","Vasco da Gama","Others"],
  "Gujarat": ["Ahmedabad","Bhavnagar","Rajkot","Surat","Vadodara","Others"],
  "Haryana": ["Faridabad","Gurgaon","Hisar","Karnal","Panipat","Others"],
  "Himachal Pradesh": ["Dharamshala","Kangra","Mandi","Shimla","Solan","Others"],
  "Jharkhand": ["Bokaro","Dhanbad","Hazaribagh","Jamshedpur","Ranchi","Others"],
  "Karnataka": ["Bengaluru","Belgaum","Dharwad","Mangaluru","Mysuru","Others"],
  "Kerala": ["Kannur","Kochi","Kozhikode","Thiruvananthapuram","Thrissur","Others"],
  "Madhya Pradesh": ["Bhopal","Gwalior","Indore","Jabalpur","Ujjain","Others"],
  "Maharashtra": ["Aurangabad","Mumbai","Nagpur","Nashik","Pune","Others"],
  "Manipur": ["Bishnupur","Churachandpur","Imphal","Senapati","Thoubal","Others"],
  "Meghalaya": ["Jowai","Nongpoh","Shillong","Tura","Williamnagar","Others"],
  "Mizoram": ["Aizawl","Champhai","Kolasib","Lunglei","Serchhip","Others"],
  "Nagaland": ["Dimapur","Kohima","Mokokchung","Tuensang","Wokha","Others"],
  "Odisha": ["Bhubaneswar","Cuttack","Puri","Rourkela","Sambalpur","Others"],
  "Punjab": ["Amritsar","Bathinda","Jalandhar","Ludhiana","Patiala","Others"],
  "Rajasthan": ["Ajmer","Bikaner","Jaipur","Jodhpur","Udaipur","Others"],
  "Sikkim": ["Gangtok","Gyalshing","Mangan","Namchi","Pakyong","Others"],
  "Tamil Nadu": ["Chennai","Coimbatore","Madurai","Salem","Tiruchirapalli","Others"],
  "Telangana": ["Hyderabad","Karimnagar","Khammam","Nizamabad","Warangal","Others"],
  "Tripura": ["Agartala","Belonia","Dharmanagar","Kailashahar","Udaipur","Others"],
  "Uttarakhand": ["Dehradun","Haldwani","Haridwar","Nainital","Rishikesh","Others"],
  "Uttar Pradesh": ["Agra","Ghaziabad","Kanpur","Lucknow","Varanasi","Others"],
  "West Bengal": ["Burdwan","Hoogly","Howrah","Kolkata","Purba Medinipur","Others"],
  "Others": ["Enter Manually"]
};

// --- Populate states ---
const stateSelect = document.getElementById("state");
Object.keys(stateCity).sort().forEach(st => {
  const option = document.createElement("option");
  option.value = st;
  option.text = st;
  stateSelect.add(option);
});

// --- Update districts when state changes ---
stateSelect.addEventListener("change", function() {
  const citySelect = document.getElementById("city");
  citySelect.innerHTML = "<option value=''>--Choose District / City--</option>";
  (stateCity[this.value] || []).sort().forEach(d => {
    const opt = document.createElement("option");
    opt.value = d;
    opt.text = d;
    citySelect.add(opt);
  });

  // --- Add listener for "Others" district ---
  citySelect.addEventListener("change", function() {
    if(this.value === "Others") {
      const manualDistrict = prompt("Enter your district/city name:");
      if(manualDistrict){
        const newOpt = document.createElement("option");
        newOpt.value = manualDistrict;
        newOpt.text = manualDistrict;
        newOpt.selected = true;
        this.add(newOpt);
      }
    }
  });
});

// --- Form submit ---
document.getElementById("sellForm").addEventListener("submit", function(e){
  e.preventDefault();
  const name = document.getElementById("farmerName").value;
  const email = document.getElementById("email").value || "N/A";
  const phone = document.getElementById("phone").value;
  let state = document.getElementById("state").value;
  let city = document.getElementById("city").value;
  let product = document.getElementById("product").value;
  const quantity = parseFloat(document.getElementById("quantity").value);

  // Handle "Others" product
  if(product === "Others"){
    const otherType = prompt("Enter type of product (Crop/Fruit/Vegetable/Other):");
    product = otherType ? otherType : "Others";
  }
  if(city === "Others") city = prompt("Enter your district/city name:");
  if(state === "Others") state = prompt("Enter your state/UT name:");

  const price = productPrices[product] !== undefined ? productPrices[product] : 0;

  let message = `
    ✅ Farmer Name: ${name}<br>
    📧 Email: ${email}<br>
    📞 Phone: ${phone}<br>
    🏷 State/UT: ${state}<br>
    📍 District/City: ${city}<br>
    🌾 Product: ${product}<br>
    ⚖ Quantity: ${quantity} kg/unit<br>
  `;

  if(price === 0){
    message += `<p>💰 Estimated Market Value: Remind you later by email / message</p>`;
  } else {
    const totalValue = price * quantity;
    message += `💰 Estimated Market Value: ₹${totalValue.toFixed(2)}<br>`;
  }

  // Add Helpline
  message += `<p>📞 Helpline: 7980395573</p>`;

  document.getElementById("result").innerHTML = message;
});