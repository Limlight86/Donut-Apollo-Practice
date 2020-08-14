const main = document.querySelector('main');

let donuts = [];

if (!localStorage.getItem('voterId')) {
  localStorage.setItem('voterId', String(Math.random()));
}

const voterId = localStorage.getItem('voterId');

async function tallyVotes() {
  const response = await fetch('/votes');
  const votes = await response.json();
  donuts.forEach(donut => (donut.votes = 0));
  votes.forEach(vote => {
    const theDonutTheVoteWasFor = donuts.find(donut => donut.id === vote.donut);
    theDonutTheVoteWasFor.votes += 1;
  });
  const fragments = donuts.map(renderDonut);
  main.innerHTML = '';
  main.prepend(...fragments);
}

async function voteForDonut(event) {
  const theButtonThatGotClicked = event.currentTarget;
  const theClosestDonut = theButtonThatGotClicked.closest('.donut');
  const donutId = theClosestDonut.dataset.donut;
  const url = '/votes';
  await fetch(url, {
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
  await tallyVotes();
}

function renderDonut(donut) {
  const html = `
    <div class="donut" data-donut="${donut.id}">
      <img src="${donut.image}" alt="${donut.name}"/>
      <h2 class="vote-count">${donut.votes}</h2>
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
  await tallyVotes();
};

fetchDonuts();
