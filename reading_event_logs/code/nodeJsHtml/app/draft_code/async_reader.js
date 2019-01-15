//Attribution @olekon on GitHub < https://github.com/olekon/p1_eth_caching/blob/master/src/index.js >


uniswapExchangeAbi = [{"name":"TokenPurchase","inputs":[{"type":"address","name":"buyer","indexed":true},{"type":"uint256","name":"eth_sold","indexed":true},{"type":"uint256","name":"tokens_bought","indexed":true}],"anonymous":false,"type":"event"},{"name":"EthPurchase","inputs":[{"type":"address","name":"buyer","indexed":true},{"type":"uint256","name":"tokens_sold","indexed":true},{"type":"uint256","name":"eth_bought","indexed":true}],"anonymous":false,"type":"event"},{"name":"AddLiquidity","inputs":[{"type":"address","name":"provider","indexed":true},{"type":"uint256","name":"eth_amount","indexed":true},{"type":"uint256","name":"token_amount","indexed":true}],"anonymous":false,"type":"event"},{"name":"RemoveLiquidity","inputs":[{"type":"address","name":"provider","indexed":true},{"type":"uint256","name":"eth_amount","indexed":true},{"type":"uint256","name":"token_amount","indexed":true}],"anonymous":false,"type":"event"},{"name":"Transfer","inputs":[{"type":"address","name":"_from","indexed":true},{"type":"address","name":"_to","indexed":true},{"type":"uint256","name":"_value","indexed":false}],"anonymous":false,"type":"event"},{"name":"Approval","inputs":[{"type":"address","name":"_owner","indexed":true},{"type":"address","name":"_spender","indexed":true},{"type":"uint256","name":"_value","indexed":false}],"anonymous":false,"type":"event"},{"name":"setup","outputs":[],"inputs":[{"type":"address","name":"token_addr"}],"constant":false,"payable":false,"type":"function","gas":175875},{"name":"addLiquidity","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"min_liquidity"},{"type":"uint256","name":"max_tokens"},{"type":"uint256","name":"deadline"}],"constant":false,"payable":true,"type":"function","gas":82616},{"name":"removeLiquidity","outputs":[{"type":"uint256","name":"out"},{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"amount"},{"type":"uint256","name":"min_eth"},{"type":"uint256","name":"min_tokens"},{"type":"uint256","name":"deadline"}],"constant":false,"payable":false,"type":"function","gas":116814},{"name":"__default__","outputs":[],"inputs":[],"constant":false,"payable":true,"type":"function"},{"name":"ethToTokenSwapInput","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"min_tokens"},{"type":"uint256","name":"deadline"}],"constant":false,"payable":true,"type":"function","gas":12757},{"name":"ethToTokenTransferInput","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"min_tokens"},{"type":"uint256","name":"deadline"},{"type":"address","name":"recipient"}],"constant":false,"payable":true,"type":"function","gas":12965},{"name":"ethToTokenSwapOutput","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"tokens_bought"},{"type":"uint256","name":"deadline"}],"constant":false,"payable":true,"type":"function","gas":50463},{"name":"ethToTokenTransferOutput","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"tokens_bought"},{"type":"uint256","name":"deadline"},{"type":"address","name":"recipient"}],"constant":false,"payable":true,"type":"function","gas":50671},{"name":"tokenToEthSwapInput","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"tokens_sold"},{"type":"uint256","name":"min_eth"},{"type":"uint256","name":"deadline"}],"constant":false,"payable":false,"type":"function","gas":47503},{"name":"tokenToEthTransferInput","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"tokens_sold"},{"type":"uint256","name":"min_eth"},{"type":"uint256","name":"deadline"},{"type":"address","name":"recipient"}],"constant":false,"payable":false,"type":"function","gas":47712},{"name":"tokenToEthSwapOutput","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"eth_bought"},{"type":"uint256","name":"max_tokens"},{"type":"uint256","name":"deadline"}],"constant":false,"payable":false,"type":"function","gas":50175},{"name":"tokenToEthTransferOutput","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"eth_bought"},{"type":"uint256","name":"max_tokens"},{"type":"uint256","name":"deadline"},{"type":"address","name":"recipient"}],"constant":false,"payable":false,"type":"function","gas":50384},{"name":"tokenToTokenSwapInput","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"tokens_sold"},{"type":"uint256","name":"min_tokens_bought"},{"type":"uint256","name":"min_eth_bought"},{"type":"uint256","name":"deadline"},{"type":"address","name":"token_addr"}],"constant":false,"payable":false,"type":"function","gas":51007},{"name":"tokenToTokenTransferInput","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"tokens_sold"},{"type":"uint256","name":"min_tokens_bought"},{"type":"uint256","name":"min_eth_bought"},{"type":"uint256","name":"deadline"},{"type":"address","name":"recipient"},{"type":"address","name":"token_addr"}],"constant":false,"payable":false,"type":"function","gas":51098},{"name":"tokenToTokenSwapOutput","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"tokens_bought"},{"type":"uint256","name":"max_tokens_sold"},{"type":"uint256","name":"max_eth_sold"},{"type":"uint256","name":"deadline"},{"type":"address","name":"token_addr"}],"constant":false,"payable":false,"type":"function","gas":54928},{"name":"tokenToTokenTransferOutput","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"tokens_bought"},{"type":"uint256","name":"max_tokens_sold"},{"type":"uint256","name":"max_eth_sold"},{"type":"uint256","name":"deadline"},{"type":"address","name":"recipient"},{"type":"address","name":"token_addr"}],"constant":false,"payable":false,"type":"function","gas":55019},{"name":"tokenToExchangeSwapInput","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"tokens_sold"},{"type":"uint256","name":"min_tokens_bought"},{"type":"uint256","name":"min_eth_bought"},{"type":"uint256","name":"deadline"},{"type":"address","name":"exchange_addr"}],"constant":false,"payable":false,"type":"function","gas":49342},{"name":"tokenToExchangeTransferInput","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"tokens_sold"},{"type":"uint256","name":"min_tokens_bought"},{"type":"uint256","name":"min_eth_bought"},{"type":"uint256","name":"deadline"},{"type":"address","name":"recipient"},{"type":"address","name":"exchange_addr"}],"constant":false,"payable":false,"type":"function","gas":49532},{"name":"tokenToExchangeSwapOutput","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"tokens_bought"},{"type":"uint256","name":"max_tokens_sold"},{"type":"uint256","name":"max_eth_sold"},{"type":"uint256","name":"deadline"},{"type":"address","name":"exchange_addr"}],"constant":false,"payable":false,"type":"function","gas":53233},{"name":"tokenToExchangeTransferOutput","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"tokens_bought"},{"type":"uint256","name":"max_tokens_sold"},{"type":"uint256","name":"max_eth_sold"},{"type":"uint256","name":"deadline"},{"type":"address","name":"recipient"},{"type":"address","name":"exchange_addr"}],"constant":false,"payable":false,"type":"function","gas":53423},{"name":"getEthToTokenInputPrice","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"eth_sold"}],"constant":true,"payable":false,"type":"function","gas":5542},{"name":"getEthToTokenOutputPrice","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"tokens_bought"}],"constant":true,"payable":false,"type":"function","gas":6872},{"name":"getTokenToEthInputPrice","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"tokens_sold"}],"constant":true,"payable":false,"type":"function","gas":5637},{"name":"getTokenToEthOutputPrice","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"eth_bought"}],"constant":true,"payable":false,"type":"function","gas":6897},{"name":"tokenAddress","outputs":[{"type":"address","name":"out"}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":1413},{"name":"factoryAddress","outputs":[{"type":"address","name":"out"}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":1443},{"name":"balanceOf","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"address","name":"_owner"}],"constant":true,"payable":false,"type":"function","gas":1645},{"name":"transfer","outputs":[{"type":"bool","name":"out"}],"inputs":[{"type":"address","name":"_to"},{"type":"uint256","name":"_value"}],"constant":false,"payable":false,"type":"function","gas":75034},{"name":"transferFrom","outputs":[{"type":"bool","name":"out"}],"inputs":[{"type":"address","name":"_from"},{"type":"address","name":"_to"},{"type":"uint256","name":"_value"}],"constant":false,"payable":false,"type":"function","gas":110907},{"name":"approve","outputs":[{"type":"bool","name":"out"}],"inputs":[{"type":"address","name":"_spender"},{"type":"uint256","name":"_value"}],"constant":false,"payable":false,"type":"function","gas":38769},{"name":"allowance","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"address","name":"_owner"},{"type":"address","name":"_spender"}],"constant":true,"payable":false,"type":"function","gas":1925},{"name":"name","outputs":[{"type":"bytes32","name":"out"}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":1623},{"name":"symbol","outputs":[{"type":"bytes32","name":"out"}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":1653},{"name":"decimals","outputs":[{"type":"uint256","name":"out"}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":1683},{"name":"totalSupply","outputs":[{"type":"uint256","name":"out"}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":1713}]

//ETH see also //ETH latestCachedBlock below
node = 'https://mainnet.infura.io/v3/46d1afae8b55464585222887f55eab6a';
const web3 = new Web3(new Web3.providers.HttpProvider(node));
spankTokenExchangeAddress = "0x4e395304655F0796bc3bc63709DB72173b9DdF98";
var aContract = new web3.eth.Contract(uniswapExchangeAbi, spankTokenExchangeAddress)

//Or CMT see also //Or CMT latestCachedBlock below
//timTokensExchangeAddress = "0x33eDA5a874732eE81A0364611D81fd34fAF6ECcf";
//var aContract = new web3.eth.Contract(uniswapExchangeAbi, timTokensExchangeAddress)

const timeout = 3;  
function  sleep(milliseconds) {
    return  new  Promise(resolve => 
        setTimeout(resolve, milliseconds)
    );  
}  
  
async  function  poll (fn) {  
    await fn();  
    await sleep(timeout*1000);  
    await poll(fn);  
}

async  function  cacheEvents(fromBlock, toBlock) {
    let events = await aContract.getPastEvents(  
    "TokenPurchase",  
    { filter: {}, fromBlock: fromBlock, toBlock: toBlock }  
    );  
    console.log(JSON.stringify(events));
    //for(let event in events) {  
    //  await console.log(JSON.stringify(event));  
    //}  
}

async  function  scan() {  
    const MaxBlockRange = 5000;
    var startingBlock = await web3.eth.getBlockNumber();  

    //ETH
    let latestCachedBlock = 6627917;

    //Or CMT
    //let latestCachedBlock = 443729; // latest block written to database
    
    let latestEthBlock = 0; // latest block in blockchain  
      
    await poll(async () => {  
    try {  
          //get latest block written to the blockchain  
      latestEthBlock = await web3.eth.getBlockNumber();  

    
          //divide huge block ranges to smaller chunks, 
          // of say 500000 blocks max  
      latestEthBlock = Math.min(
            latestEthBlock, 
            latestCachedBlock + MaxBlockRange
          );  
       //console.log("Latest Eth Block: " + latestEthBlock);        
      //if it is greater than cached block, search for events 
      console.log("Latest Cached Block: " + latestCachedBlock); 
      console.log("Latest Eth Block: " + latestEthBlock);
      var difference = latestEthBlock - latestEthBlock;
      //console.log("Difference is " + difference) ;
      if(latestEthBlock > latestCachedBlock) { 
        console.log("Running the cacheEvents function"); 
        await cacheEvents(latestCachedBlock, latestEthBlock);  
              
        //if everything is OK, update cached block value  
        latestCachedBlock = latestEthBlock + 1; 
        //console.log("Latest Cached Block: " + latestCachedBlock); 
        //console.log("Latest Eth Block: " + latestEthBlock); 
      }  
    } catch (e) {  
      //we might want to add some simple logging here  
      console.log(e.toString());  
    }  
  });  
}

scan();

