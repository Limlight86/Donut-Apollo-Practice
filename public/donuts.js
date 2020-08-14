const main = document.querySelector('main');

let donuts = [];

function renderDonut(donut) {
  return `
    <div class="donut" data-donut="${donut.id}">
      <img src="${donut.image}" alt="${donut.name}"/>
      <h2 class="vote-count">0</h2>
      <button>${donut.name}</button>
    </div>`;
}

const fetchDonuts = async () => {
  const url = `https://donut-of-the-day.herokuapp.com/donuts`;
  const donutsResponse = await fetch(url);
  donuts = await donutsResponse.json();
  main.innerHTML = donuts.map(renderDonut).join('');
};

fetchDonuts();
