const main = document.querySelector('main');

let donuts = [];

/* 

The next thing we want to do is make it possible for a user 
to vote for a donut...  

To accomplish this we need some way to record who the user is.

This is something new but I think you'll be able to follow.

We can actually store some basic information on the user's browser.

This is kind of similar to a cookie, which you've probably heard of,
but a little simpler.

You can store information in the browser like this:

localStorage.setItem('nameOfKey', 'valueYouWantToStore')

and then get that information back out like this:

localStorage.getItem('nameOfKey')

So the idea in this case is that we want to store a unique, 
random string as the user's id, and then send that information to the
API to identify the user.

At the top of script.js, add the following code.

```
if (!localStorage.getItem("voterId")) {
  localStorage.setItem("voterId", String(Math.random()));
}

const voterId = localStorage.getItem("voterId");
```

if you console.log(voterId) a few times, you will see it's a random string but it's consistent across page loads.  

This is exactly what we need.

The next step is we need to turn the strings of HTML in renderDonut into fragments so we can add an event listener to the button.

Store the original string of html in a const called html, 
and then use document.createRange().createContextualFragment(html) to create a fragment and store it in a const called fragment.

Query the fragment for the button, and add an event listener to it 
so that a function called voteForDonut runs whenever the button is clicked. Return the fragment.

Replace the last line of fetchDonuts with the following: 

const fragments = donuts.map(renderDonut);
main.innerHTML = '';
main.prepend(...fragments);

This has the same practical effect, but plays nicely with the fact that renderDonut now returns a fragment instead of a string.

The async function voteForDonut should accept an event as its argument.
Inside the function, create a const called theButtonThatGotClicked and set it equal to the event's currentTarget property.
Then declare a const called theClosestDonut and set it equal to the closest thing with a class of .donut.
Finally, declare a const called donutId, and set it equal to theClosestDonut's dataset's donut attribute.

With this information, you are ready to use fetch to issue a POST request to the '/votes' endpoint (which you just made).
Pass the correct Content-Type and Accept headers, and a JSON body that has a donut key equal to donutId, as well as a voter key equal to voterId.

You won't be able to see the result of your vote in the website just yet, but you should be able to see that the vote was recorded, either by running a select statement in psql, or by issuing a GET request to localhost:3000/votes.

*/

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
