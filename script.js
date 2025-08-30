async function getMenu() {
  try {
    let res = await fetch("https://raw.githubusercontent.com/saksham-accio/2_contest_3/main/food.json");
    let data = await res.json();
    let menuDiv = document.getElementById("menu");
    data.forEach(item => {
      let div = document.createElement("div");
      div.classList.add("item");
      div.innerHTML = <h3>${item.name}</h3><p>₹${item.price}</p>;
      menuDiv.appendChild(div);
    });
    return data;
  } catch (err) {
    console.error("Error loading menu:", err);
  }
}

function takeOrder(menu) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let order = {
        items: [menu[0], menu[1], menu[2]] 
      };
      console.log("Order taken:", order);
      resolve(order);
    }, 2500);
  });
}

function orderPrep(order) {
  return new Promise((resolve) => {
    setTimeout(() => {
      order.status = true;
      order.paid = false;
      console.log("Order prepared:", order);
      resolve(order);
    }, 1500);
  });
}

function payOrder(order) {
  return new Promise((resolve) => {
    setTimeout(() => {
      order.paid = true;
      console.log("Order paid:", order);
      resolve(order);
    }, 1000);
  });
}

function thankyouFn() {
  alert("Thank you for eating with us today!");
}

async function startOrder() {
  let menu = await getMenu();
  let order = await takeOrder(menu);
  let prepared = await orderPrep(order);
  let paid = await payOrder(prepared);
  if (paid.paid) thankyouFn();
}
window.onload = getMenu;
