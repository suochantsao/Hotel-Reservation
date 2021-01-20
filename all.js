const token = 'FYB131amsK8xaJqG19oUZV0ZSezrgUYo6oaNU3dCGQLmkYeLZtPiY0wVj3Np';

const config = {
    headers: { Authorization: `Bearer ${token}` }
};

const bodyParameters = {
   key: "value"
};

axios.get( 
  'https://challenge.thef2e.com/api/thef2e2019/stage6/rooms',
  config
)
.then(res => console.log(res.data.items))
.catch(console.log);