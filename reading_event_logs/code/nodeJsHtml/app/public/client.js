console.log('Client-side code running');

window.addEventListener('load', function() {
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
    console.log("Connected to web3 - Success!")
} else {
    // set the provider you want from Web3.providers
    console.log("Was unable to connect to web3. Trying localhost ...")
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

var blockNumber = web3.eth.getBlockNumber(function(error, result) {
	if (!error)
	    console.log("Current block number is:" + result);
	else
	    console.log(error);
})

})

// A Button
const button = document.getElementById('btnLoader');
button.addEventListener('click', function(e) {
  console.log('btnLoader was clicked');
  fetch('/clicked', {method: 'POST'})
    .then(function(response) {
      if(response.ok) {
        console.log('Load request/response succeeded');
        return;
      }
      throw new Error('Load request/response failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
    

});

const button2 = document.getElementById('btnRefresh');
button2.addEventListener('click', function(e) {
  console.log('btnRefresh was clicked');
  fetch('/clicked2', {method: 'POST'})
    .then(function(response) {
      if(response.ok) {
        console.log('Load request/response succeeded');
        return;
      }
      throw new Error('Load request/response failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
    

});
