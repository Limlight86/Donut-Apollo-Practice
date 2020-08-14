/* 

Check out the look and feel of the site at https://donut-of-the-day.herokuapp.com/

Your next task is to replicate it, without adding any of the functionality just yet.

You will need to get data about each donut by fetching from 
https://donut-of-the-day.herokuapp.com/donuts

You will need to: 

1. Query the main element from the DOM and store it in a const.
2. Declare a let variable called donuts and initialize it to an empty array.
3. Write a renderDonut function that takes a donut as its only argument, and returns
(for now) a string of HTML (not a fragment).

Each donut should be represented by a div with a class of donut,
and a data-donut property that equals the donut's id property.
Inside the div, you will need an img tag whose src attribute equals 
the donut's image property, and an alt attrubute that equals the donut's name property.
Below that, add an h2 element with a class of "vote-count" with a 0 Inside
Below that, add a button with the donut's name inside.

4. Write an async fetchDonuts function that fetches from https://donut-of-the-day.herokuapp.com/donuts.
Await the reponse, await calling .json() on it, and use the result to overwrite the 
let donuts variable defined outside of the function.
Then map over donuts, passing in the renderDonuts function as a callback,
join the result on an empty string, and set all of that as the main element's innerHTML.

5. The HTML and CSS is up to you!  Use the provided "sofia_pro" font face and
the color picker extension to match the demo site.

*/
