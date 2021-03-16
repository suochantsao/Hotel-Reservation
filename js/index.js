// API
const allRoomsUrl    = 'https://challenge.thef2e.com/api/thef2e2019/stage6/rooms';
const token          = 'FYB131amsK8xaJqG19oUZV0ZSezrgUYo6oaNU3dCGQLmkYeLZtPiY0wVj3Np';
const config         = { headers: { Authorization: `Bearer ${token}` } };

// DOM
const roomItems = document.querySelector('.content');

// Object
let eachRoominfo = []; 

// ,.♫_____________________♪____________________♫,. //
// GET all Room information
axios
  .get(allRoomsUrl, config)
  .then(res => {
    eachRoominfo = res.data.items;
    console.log(eachRoominfo);
    roomItemsRender();
  })
  .catch(console.error());

// Content pictures render 
function roomItemsRender(){
  let str = '';
  eachRoominfo.forEach( item => {
    str += `<ul class="roomItem">
    <a href="#">
        <li class="roomPicture" id="${item.id}" style="background-image: url('${item.imageUrl}'); "></li>
        <li class="roomDescribe" id="${item.id}">${item.name}</li>
    </a>
    </ul>`
  });
  roomItems.innerHTML = str;
}

// Trans to the correct url
function transUrl(e){
  window.location.replace(`./html/information.html?id=${e.target.id}`);
}

// Add EventListener for the room pictures
roomItems.addEventListener('click',transUrl);