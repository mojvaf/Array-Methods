const main = document.getElementById("main");
const addUserBtn = document.getElementById("add_user");
const doubleBtn = document.getElementById("double");
const showMillionaires = document.getElementById("show_millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate_wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 10000)
  };

  addData(newUser);
}

// Total Wealth

function getTotal() {
  const total = data.reduce((acc, item) => (acc += item.money), 0);
  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    total
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

// Filter only millionaires
function getMillionaires() {
  data = data.filter(item => item.money > 1000000);
  updateDOM();
}

// sort the money

function getSort() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

// Double every ones money

function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

//Add new obj to data arr

function addData(obj) {
  data.push(obj);

  updateDOM();
}

function updateDOM(provideData = data) {
  //Clear main div
  main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";

  provideData.forEach(item => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//Event Listener
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", getSort);
showMillionaires.addEventListener("click", getMillionaires);
calculateWealthBtn.addEventListener("click", getTotal);
