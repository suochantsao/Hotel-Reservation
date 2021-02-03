// API
const roomDetailUrl  = 'https://challenge.thef2e.com/api/thef2e2019/stage6/room/';
const token          = 'FYB131amsK8xaJqG19oUZV0ZSezrgUYo6oaNU3dCGQLmkYeLZtPiY0wVj3Np';
const config         = { headers: { Authorization: `Bearer ${token}` } };

// DOM
const picturesArea = document.querySelector('.pictureBlock'); 
const infoBlock    = document.querySelector('.roomInfoBlock');
const checkInBlock = document.querySelector('.checkInBlock');
const amenityBlock = document.querySelector('.amenitiesBlock');
const priceBlock   = document.querySelector('.room_price');

// Object
let roomInfo;

// Check the url's id
let currentId = window.location.search.slice(4);

// ,.♫_____________________♪____________________♫,. //

// GET specific room information
axios
  .get(roomDetailUrl+currentId,config)
  .then(res => {
    roomInfo     = res.data.room[0];
    amenityItems = roomInfo.amenities;
    console.log(amenityItems);
    roomPicRender();
    infoRender();
    checkinRender();
    priceRender();
    test();

  })
  .catch(console.error());

// Picture block render
function roomPicRender(){
    let str = `<li class="detail_pic1 room_picture" style="background-image: url('${roomInfo.imageUrl[2]}');" ></li>
    <div class="s_pic">
        <li class="detail_pic2 room_picture" style="background-image: url('${roomInfo.imageUrl[1]}');"></li>
        <li class="detail_pic3 room_picture" style="background-image: url('${roomInfo.imageUrl[0]}');"></li>
    </div>`;

    picturesArea.innerHTML = str;
}

// Info block render
function infoRender(){
    let info = roomInfo.descriptionShort;
    let str = `<h2 class="room_title">${roomInfo.name}</h2>
    <li>房客人數限制： ${info.GuestMin}~${info.GuestMax} 人</li>
    <li>床型：${info.Bed}</li>
    <li>衛浴數量： ${info["Private-Bath"]} 間</li>    
    <li>房間大小： ${info.Footage} 平方公尺</li>
    <li class="en_roominfo">${roomInfo.description}</li>`;

    infoBlock.innerHTML = str;
}

// Checkin block render
function checkinRender(){
    let checkTime = roomInfo.checkInAndOut;
    let str = `                <li class="checkTitle">Check In</li>
    <li class="checkTitle">Check Out</li>
    <li class="checkInTime timeStyle">${checkTime.checkInEarly} － ${checkTime.checkInLate} </li>
    <li class="checkOutTime timeStyle">${checkTime.checkOut}</li>`;
    
    checkInBlock.innerHTML = str;
}

// Price block render
function priceRender(){
    let str = `            <li class="priceTitle">NT.${roomInfo.normalDayPrice}</li>
    <li class="dateString">平日(一~四)</li>
    <li class="priceString">NT.${roomInfo.holidayPrice}</li>
    <li class="dateString">假日(五~日)</li>`;

    priceBlock.innerHTML = str;
}

// Test Render
function test(){
    
}