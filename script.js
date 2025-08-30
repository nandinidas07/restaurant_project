async function getMenu() {
  try {
    const res = await fetch("https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json");
    const data = await res.json();

    let menuDiv = document.getElementById("menu");
    menuDiv.innerHTML = "";

    data.forEach(item => {
      let card = document.createElement("div");
      card.classList.add("food-item");
      card.innerHTML = `
        <img src="${item.imgSrc}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>$${item.price}</p>
      `;
      menuDiv.appendChild(card);
    });
  } catch (err) {
    console.error("Error fetching menu:", err);
  }
}

function TakeOrder() {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const res = await fetch("https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json");
      const data = await res.json();

      const burgers = data.filter(item => item.name.toLowerCase().includes("burger"));
      let order = [];
      for (let i = 0; i < 3; i++) {
        order.push(burgers[Math.floor(Math.random() * burgers.length)]);
      }

      console.log("Order taken:", order);
      resolve(order);
    }, 2500);
  });
}
function orderPrep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Order is being prepared...");
      resolve({ order_status: true, paid: false });
    }, 1500);
  });
}
function payOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Payment done.");
      resolve({ order_status: true, paid: true });
    }, 1000);
  });
}
function thankyouFnc() {
  alert("Thank you for eating with us today!");
}
async function startProcess() {
  await getMenu();
  const order = await TakeOrder();
  const prep = await orderPrep();
  const payment = await payOrder();

  if (payment.paid) {
    thankyouFnc();
  }
}
