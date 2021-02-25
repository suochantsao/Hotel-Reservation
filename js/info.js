// API
const roomDetailUrl  = 'https://challenge.thef2e.com/api/thef2e2019/stage6/room/';
const token          = 'FYB131amsK8xaJqG19oUZV0ZSezrgUYo6oaNU3dCGQLmkYeLZtPiY0wVj3Np';
const config         = { headers: { Authorization: `Bearer ${token}` } };

// DOM
const picturesArea = document.querySelector('.pictureBlock'); 
const countBlock   = document.querySelector('.countArea');
const totalPrice   = document.querySelector('.priceArea');
const infoBlock    = document.querySelector('.roomInfoBlock');
const checkInBlock = document.querySelector('.checkInBlock');
const amenityBlock = document.querySelector('.amenitiesBlock');
const dialogBlock  = document.querySelector('.dialogBlock');
const priceBlock   = document.querySelector('.room_price');
const reserveBtn   = document.querySelector('.reserveBtn');
const confirmBtn   = document.querySelector('.confirmBtn');
const nameInput    = document.getElementById('nameInput'); 
const phoneInput   = document.getElementById('phoneNumInput');

// Object
let roomInfo;
let selectDates = [];

// Check the url's id
let currentId = window.location.search.slice(4);

// ,.♫_____________________♪____________________♫,. //

// *GET specific room information
axios
  .get(roomDetailUrl+currentId,config)
  .then(res => {
    roomInfo     = res.data.room[0];
    amenityItems = roomInfo.amenities;
    console.log('axios GET succeed');
    roomPicRender();
    infoRender();
    checkinRender();
    priceRender();
    amenityRender();

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

// Amenities block render
function amenityRender(){
    let str = `<ul class="iconBlock ${!amenityItems['Wi-Fi'] ? 'grey' : ''}">
    <li><img src="/img/wifi.svg" alt="wifi"></li>
    <li class="iconString">Wi-Fi</li>
</ul>
<ul class="iconBlock ${!amenityItems['Television'] ? 'grey' : ''}">
    <li><img src="/img/phone.svg" alt="phone"></li>
    <li class="iconString">電話</li>
</ul>
<ul class="iconBlock ${!amenityItems['Great-View'] ? 'grey' : ''}">
    <li><img src="/img/mountain-range.svg" alt="moutainIcon"></li>
    <li class="iconString">漂亮的視野</li>
</ul>
<ul class="iconBlock ${!amenityItems['Breakfast'] ? 'grey' : ''}">
    <li><img src="/img/breakfast.svg" alt="breakfast"></li>
    <li class="iconString">早餐</li>
</ul>
<ul class="iconBlock ${!amenityItems['Air-Conditioner'] ? 'grey' : ''}">
    <li><img src="/img/breeze.svg" alt="aircon"></li>
    <li class="iconString">空調</li>
</ul>
<ul class="iconBlock ${!amenityItems['Smoke-Free'] ? 'grey' : ''}">
    <li><img src="/img/no-smoke-symbol.svg" alt="noSmoke"></li>
    <li class="iconString">禁止吸煙</li>
</ul>
<ul class="iconBlock ${!amenityItems['Mini-Bar'] ? 'grey' : ''}">
    <li><img src="/img/bar.svg" alt="bar"></li>
    <li class="iconString">Mini Bar</li>
</ul>
<ul class="iconBlock ${!amenityItems['Refrigerator'] ? 'grey' : ''}">
    <li><img src="/img/fridge.svg" alt="fridge"></li>
    <li class="iconString">冰箱</li>
</ul>
<ul class="iconBlock ${!amenityItems['Child-Friendly'] ? 'grey' : ''}">
    <li><img src="/img/crawling-baby-silhouette.svg" alt="baby"></li>
    <li class="iconString">適合兒童</li>
</ul>
<ul class="iconBlock ${!amenityItems['Room-Service'] ? 'grey' : ''}">
    <li><img src="/img/room_service.svg" alt="room-service"></li>
    <li class="iconString">Room Service</li>
</ul>
<ul class="iconBlock ${!amenityItems['Sofa'] ? 'grey' : ''}">
    <li><img src="/img/sofa.svg" alt="sofa"></li>
    <li class="iconString">沙發</li>
</ul>
<ul class="iconBlock ${!amenityItems['Pet-Friendly'] ? 'grey' : ''}">
    <li><img src="/img/dog.svg" alt="pets"></li>
    <li class="iconString">寵物攜帶</li>
</ul>`
    amenityBlock.innerHTML = str;
}

// Loader
function loaderRender(){
    const loader = document.querySelector('.loader');
    loader.className += ' hidden';
}

window.addEventListener('load',loaderRender);

// ,.♫_____________________♪____________________♫,. //
// *Calendar Block
flatpickr('#calendar-zhtw', {
    "locale": "zh_tw",
    "dateFormat": "Y/m/d",
    "inline": true,
    "minDate": "today"
});

// ,.♫_____________________♪____________________♫,. //
// *Dialog Block
function dialogRender(){
    dialogBlock.className += ' dialogStyle';
    dialogBlock.classList.remove('dialogNone');
}

reserveBtn.addEventListener('click',dialogRender);

// Cancle Button in the Dialog
function cancleReserve(e){
    let pressName = e.target.className;

    if( pressName === "cancleSpan" || pressName === "dialogBlock dialogStyle"){
        dialogBlock.classList.add('dialogNone');
        dialogBlock.classList.remove('dialogStyle');
    }
    else if(e.target.className === "cancleBtn btnStyle"){
        dialogBlock.classList.add('dialogNone');
        dialogBlock.classList.remove('dialogStyle');
    }
}

dialogBlock.addEventListener('click',cancleReserve);

// Calendar in Dialog 
const calendar = flatpickr('#startDate', {
    "minDate": new Date().fp_incr(1),
    "dateFormat": "Y/m/d",
    "plugins": [new rangePlugin({ input: "#endDate"})]
});

// Get the dates and render price of the room
function dateCalculate(){
    let selectAry   = calendar.selectedDates;
    selectDates = DateList(selectAry[0],selectAry[1]);
    priceRender();
}

// Get the date list
function DateList(start,end){
    if(start > end) {
        [start, end] = [end, start]
        // 如果是選擇月底跨到隔月初的話，選擇的startdate會大於enddate，因此要交換這兩個陣列的值
    }
    let startDate  = new Date(start);
    let endDate    = new Date(end);
    // 將傳進來的Object再次轉換成日期的資料格式，因此使用new關鍵字去建立該值

    let totalDates = (endDate - startDate) / (1000 * 60 * 60 * 24); 
    // 1毫秒=1/1000秒，所以先將相減後的日期毫秒差再轉換成天數
    totalDates     = Math.ceil(totalDates);
    // 使用math的無條件進位，讓計算天數的結果直接進位
        
    let list =[];
    for(let index = 0; index <= totalDates; index++){
        let day = new Date(start);
        // 這邊一定要使用new關鍵字來建立新的日期然後讓陣列來操作
        day.setDate(day.getDate()+ index);
        // 設定日期(開始日期+index)
        // setDate() -> 設定Date是幾日？設定1的話，日期則為X年X月1日
        // getDate() -> 取得Date是幾日？取得start的dates，取得開始日之後就依照上面的for迴圈去+1

        list.push(day.toString());
        // 因為要使用字串的資料，所以使用toString()之後再push
    }
    return list;
     
}

// Render room price in the countArea
function priceRender(){
    let dayNum       = 0;
    let weekendNum   = 0;
    let totalFee     = 0;
    let dayPrice     = roomInfo.normalDayPrice;
    let weekendPrice = roomInfo.holidayPrice;

    // 抓取星期然後再去判定是否為假日？
    selectDates.forEach((item) => {
        // 取得每一個日期為星期幾？
        let weekName   = item.slice(0,3);

        // 判斷選擇的該日期是否為假日？
        if(weekName === 'Fri' || weekName === 'Sat'){
            weekendNum+=1;
            totalFee+=weekendPrice;
        }else{
            dayNum+=1;
            totalFee+=dayPrice;
        }
        
    });

    let str = `<li class="normalDays">平日時段</li>
                <li class="normalDays daysCount">${dayNum}夜</li>
                <li class="holidays">假日時段</li>
                <li class="holidays daysCount">${weekendNum}夜</li>`;
    countBlock.innerHTML = str;

    let priceStr = `= <span>NT.${totalFee}</span>`;
    totalPrice.innerHTML = priceStr;
}

dialogBlock.addEventListener('mouseout',dateCalculate);

// Confirm to order the rooms
const fp = document.querySelector("#startDate")._flatpickr;

confirmBtn.addEventListener('click',confirmInfo);

function confirmInfo(){
    let nameInfo  = nameInput.value;
    let phoneInfo = phoneInput.value;
    let currentYear;
    let currentMonth;
    let currentDate;

    selectDates.forEach((item)=>{
        console.log(item);
        currentYear  = item.slice(11,15);   
        // currentMonth = item.slice(11,15);
        // currentDate  = item.slice(11,15);
        
        // console.log(`${currentYear}-${currentMonth}-${currentDate}`);
    });

    // console.log(currentYear);

    // console.log(nameInfo);
    // console.log(phoneInfo);
    // console.log(selectDates);
}