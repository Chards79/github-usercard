/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
const entry = document.querySelector(".cards");

axios
	.get("https://api.github.com/users/chards79")
	.then(response => {
		console.log(response.data);
		const myCard = createCard(response.data);
		entry.appendChild(myCard);
	})
	.catch(error => {
		console.log("Not returned", error);
	});

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/
const followersArray = [];
axios
	.get("https://api.github.com/users/chards79/followers")
	.then(response => {
		// console.log(response.data);
		response.data.map(item => {
			followersArray.push(item.login);
		});
		// console.log(followersArray);
	})
	.catch(error => {
		console.log("Try again", error);
	});
console.log(followersArray[0]);

followersArray.map(item => {
	console.log(item);
	axios
		.get(`https://api.github.com/users/${item}`)
		.then(response => {
			console.log(response.data);
			const theirCards = createCard(response.data);
			entry.appendChild(theirCards);
		})
		.catch(error => {
			console.log("Not returned", error);
		});
});
/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
function createCard(data) {
	const card = document.createElement("div");
	const pic = document.createElement("img");
	const info = document.createElement("div");
	const name = document.createElement("h3");
	const userName = document.createElement("p");
	const userLocation = document.createElement("p");
	const userProfile = document.createElement("p");
	const profileLink = document.createElement("a");
	const userFollowers = document.createElement("p");
	const userFollowing = document.createElement("p");
	const userBio = document.createElement("p");

	pic.src = `${data.avatar_url}`;
	name.textContent = `${data.name}`;
	userName.textContent = `${data.login}`;
	userLocation.textContent = `Location: ${data.location}`;
	userProfile.textContent = `Profile: `;
	profileLink.textContent = `${data.html_url}`;
	userFollowers.textContent = `Followers: ${data.followers}`;
	userFollowing.textContent = `Following: ${data.following}`;
	userBio.textContent = `Bio: ${data.bio}`;

	card.appendChild(pic);
	card.appendChild(info);
	info.appendChild(name);
	info.appendChild(userName);
	info.appendChild(userLocation);
	info.appendChild(userProfile);
	userProfile.appendChild(profileLink);
	info.appendChild(userFollowers);
	info.appendChild(userFollowing);
	info.appendChild(userBio);

	card.classList.add("card");
	info.classList.add("card-info");
	name.classList.add("name");
	userName.classList.add("username");

	return card;
}
