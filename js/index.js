// API
const allRoomsUrl    = 'https://challenge.thef2e.com/api/thef2e2019/stage6/rooms';
const token          = 'FYB131amsK8xaJqG19oUZV0ZSezrgUYo6oaNU3dCGQLmkYeLZtPiY0wVj3Np';
const config         = { headers: { Authorization: `Bearer ${token}` } };

// index DOM
const roomItems = document.querySelector('.content');

// Object
let eachRoominfo = []; 

// ,.♫_____________________♪____________________♫,. //
// All Room information
axios
  .get(allRoomsUrl, config)
  .then(res => {
    eachRoominfo = res.data.items;
    console.log(eachRoominfo);
    roomItemsRender();

  })
  .catch(console.error());

// ,.♫_____________________♪____________________♫,. //
// index rooms pictures render 
function roomItemsRender(){
  let str = '';
  eachRoominfo.forEach( item => {
    str += `<ul class="roomItem">
    <a href="#">
        <li class="roomPicture" id="${item.id}" style="background-image: url('${item.imageUrl}'); "></li>
        <li class="roomDescribe" id="${item.id}">${item.name}</li>
    </a></ul>`
  });
  roomItems.innerHTML = str;
}

roomItems.addEventListener('click',transUrl);

function transUrl(e){
  // console.log(e.target.id);
  window.location.replace("./information.html?id=e.taget.id");
  
}