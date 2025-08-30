
async function getMenu() {
  try {
    let res = await fetch("https://raw.githubusercontent.com/saksham-accio/2_contest_3/main/food.json");
    let data = await res.json();
    let menuDiv = document.getElementById("menu");
    menuDiv.innerHTML = ""; 

    data.forEach(item => {
      let div = document.createElement("div");
      div.classList.add("item");
      div.innerHTML = `
        <img src="${item.imgSrc}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
      `;
      menuDiv.appendChild(div);
    });

    return data;
  } catch (err) {
    console.error("Error loading menu:", err);
    showMessage("❌ Failed to load menu. Please try again.");
  }
}

// Simulate order steps
function takeOrder(menu) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let randomItems = [];
      for (let i = 0; i < 3; i++) {
        let rand = Math.floor(Math.random() * menu.length);
        randomItems.push(menu[rand]);
      }
      let order = { items: randomItems };
      showMessage("✅ Order taken: " + order.items.map(i => i.name).join(", "));
      resolve(order);
    }, 2500);
  });
}

function orderPrep(order) {
  return new Promise((resolve) => {
    setTimeout(() => {
      order.status = true;
      order.paid = false;
      showMessage("👨‍🍳 Order is prepared!");
      resolve(order);
    }, 1500);
  });
}

function payOrder(order) {
  return new Promise((resolve) => {
    setTimeout(() => {
      order.paid = true;
      showMessage("💳 Payment successful!");
      resolve(order);
    }, 1000);
  });
}

function thankyouFn() {
  showMessage("🙏 Thank you for eating with us today!");
}
async function startOrder() {
  document.getElementById("statusBox").innerHTML = ""; // clear previous
  let menu = await getMenu();
  let order = await takeOrder(menu);
  let prepared = await orderPrep(order);
  let paid = await payOrder(prepared);
  if (paid.paid) thankyouFn();
}
function showMessage(msg) {
  let div = document.createElement("p");
  div.textContent = msg;
  document.getElementById("statusBox").appendChild(div);
}

// Load menu on page load
window.onload = getMenu;
