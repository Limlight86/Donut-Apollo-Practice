const main = document.querySelector('main');

let donuts = [];

if (!localStorage.getItem('voterId')) {
  localStorage.setItem('voterId', String(Math.random()));
}

const voterId = localStorage.getItem('voterId');

async function voteForDonut(event) {
  const theButtonThatGotClicked = event.currentTarget;
  const theClosestDonut = theButtonThatGotClicked.closest('.donut');
  const donutId = theClosestDonut.dataset.donut;
  const url = '/votes';
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      voter: voterId,
      donut: donutId,
    }),
  });
}

function renderDonut(donut) {
  const html = `
    <div class="donut" data-donut="${donut.id}">
      <img src="${donut.image}" alt="${donut.name}"/>
      <h2 class="vote-count">0</h2>
      <button>${donut.name}</button>
    </div>
    `;
  const fragment = document.createRange().createContextualFragment(html);
  const button = fragment.querySelector('button');
  button.addEventListener('click', voteForDonut);
  return fragment;
}

const fetchDonuts = async () => {
  const url = `https://donut-of-the-day.herokuapp.com/donuts`;
  const donutsResponse = await fetch(url);
  donuts = await donutsResponse.json();
  const fragments = donuts.map(renderDonut);
  main.innerHTML = '';
  main.prepend(...fragments);
};

fetchDonuts();
