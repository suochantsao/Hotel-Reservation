// API
const allRoomsUrl    = 'https://challenge.thef2e.com/api/thef2e2019/stage6/rooms';
const token          = 'FYB131amsK8xaJqG19oUZV0ZSezrgUYo6oaNU3dCGQLmkYeLZtPiY0wVj3Np';
const config         = { headers: { Authorization: `Bearer ${token}` } };

// DOM
const bgimageBlock = document.querySelector('.bgImage');

// Object
let bgimage = {}; 

// ,.♫_____________________♪____________________♫,. //
// axios GET
axios
  .get( allRoomsUrl,config )
  .then(res =>
    // console.log(res.data.items[4].imageUrl)
    bgimage = res.data.items[4].imageUrl
    // render()
  )
  .catch(console.error);

// ,.♫_____________________♪____________________♫,. //

function render(){
  bgimageBlock.innerHTML = `<div><img src="${bgimage}" alt="bgimage"></div>`
}