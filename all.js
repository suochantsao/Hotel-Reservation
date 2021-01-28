// API
const allRoomsUrl    = 'https://challenge.thef2e.com/api/thef2e2019/stage6/rooms';
const roomDetailUrl  = 'https://challenge.thef2e.com/api/thef2e2019/stage6/room/';
const token          = 'FYB131amsK8xaJqG19oUZV0ZSezrgUYo6oaNU3dCGQLmkYeLZtPiY0wVj3Np';
const config         = { headers: { Authorization: `Bearer ${token}` } };

// index DOM
const roomItems = document.querySelector('.content');

// information DOM
const picturesArea = document.querySelector('.pictureBlock'); 

// Object
let eachRoominfo   = []; 
let roomDetailsPic = [];

// ,.♫_____________________♪____________________♫,. //
// All Room information
axios
  .get( allRoomsUrl,config )
  .then(res => {
    eachRoominfo = res.data.items;
    console.log(eachRoominfo);
    roomItemsRender();
    // getDetails();
    // roomPictureRender();
  })
  .catch(console.error());

// Room Details information
function getDetails(){
  axios
    .get(`${roomDetailUrl}${eachRoominfo[0].id}`,config)
    .then(res => {
      roomDetailsPic = res.data.room[0].imageUrl;
      console.log(res.data.room[0].imageUrl);
    })
    .catch(console.error());

}

// ,.♫_____________________♪____________________♫,. //
// index rooms pictures render 
function roomItemsRender(){
  let str = '';
  eachRoominfo.forEach( item => {
    str += `<ul class="roomItem">
    <a href="./html/information.html">
        <li class="roomPicture"  style="background-image: url('${item.imageUrl}');"></li>
        <li class="roomDescribe">${item.name}</li>
    </a></ul>`
  });
  roomItems.innerHTML = str;
}

// information rooms pictures render
function roomPictureRender(){
  let str = '';
  roomDetailsPic.forEach( item => {
    str += `<li class="singleR-pic1 room_picture" style="background-image: url('${item[0]}');"></li>
    <div class="s_pic">
        <li class="singleR-pic2 room_picture" style="background-image: url('${item[1]}');"></li>
        <li class="singleR-pic3 room_picture" style="background-image: url('${item[2]}');"></li>
    </div>`
  });
  picturesArea.innerHTML = str;

}