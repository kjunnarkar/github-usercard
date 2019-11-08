/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
axios.get('https://api.github.com/users/kjunnarkar')
  .then(response => {
    console.log(response.data);
    const createComp = createCard(response.data);
    const parentCards = document.querySelector('.cards');
    parentCards.appendChild(createComp); 
  })
  .catch(error => {
    console.log('KJ did not get data from API', error);
  })

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

const followersArray = ['tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell'];

followersArray.forEach(user => {
  axios.get(`https://api.github.com/users/${user}`)
    .then(response => {
      console.log("These are the followers array: ", response.data);
      const followArray = createCard(response.data)
      const appendCards = document.querySelector('.cards');
      appendCards.appendChild(followArray);
    })
    .catch(error => {
      console.log("Could not get follow array", error);
    })
})

axios.get(`https://api.github.com/users/kjunnarkar/followers`)
  .then(response => {
    console.log("These are the KJ's followers: ", response.data);
    response.data.forEach(follower => {
      const myFollowers = createCard(follower);
      const cardsAppend = document.querySelector('.cards');
      cardsAppend.appendChild(myFollowers);
    })
  })
  .catch(error => {
    console.log("Could not retrieve KJ's Followers", error)
  })


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
  
  //create elements
  const mainDiv = document.createElement('div');
  const userImg = document.createElement('img');
  const cardInfo = document.createElement('div');
  const nameH3 = document.createElement('h3');
  const userNamePara = document.createElement('p');
  const locationPara = document.createElement('p');
  const profilePara = document.createElement('p');
  const profAddress = document.createElement('a');
  const followersPara = document.createElement('p');
  const followingPara = document.createElement('p');
  const userBioPara = document.createElement('p');

  //create classes
  mainDiv.classList.add('card');
  cardInfo.classList.add('card-info');
  nameH3.classList.add('name');
  userNamePara.classList.add('username');

  //add text content
  userImg.src = data.avatar_url;
  nameH3.textContent = data.name;
  userNamePara.textContent = data.login;
  locationPara.textContent = (`Location: ${data.location}`);
  profilePara.textContent = 'Profile: ';
  profAddress.textContent = data.html_url;
  profAddress.href = data.html_url;
  followersPara.textContent = (`Followers: ${data.followers}`);
  followingPara.textContent = (`Following: ${data.following}`);
  userBioPara.textContent = (`Bio: ${data.bio}`);

  //append content
  mainDiv.appendChild(userImg);
  mainDiv.appendChild(cardInfo);
  cardInfo.appendChild(nameH3);
  cardInfo.appendChild(userNamePara);
  cardInfo.appendChild(locationPara);
  cardInfo.appendChild(profilePara);
  profilePara.appendChild(profAddress);
  cardInfo.appendChild(followersPara);
  cardInfo.appendChild(followingPara);
  cardInfo.appendChild(userBioPara);

  return mainDiv;
}
