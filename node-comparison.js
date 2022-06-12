// Based on Apechef's benchmark 


const Web3 = require('web3');

const SECONDS = 15;

const providers = [];

providers.push({name: 'Goblinparty.wtf Node', url: 'https://node.goblinparty.wtf'});
providers.push({name: 'JustCubes Hypernode', url: 'http://hypernode.justcubes.io:8545/'});
providers.push({name: 'Whale Together', url: 'https://node.whaletogether.com/'});
// providers.push({name: 'FlipperGG Zapnode', url: 'https://flippergg.apechefzapnode.com/UNIQUECODE'}); // ENTER YOUR OWN GENERATED NODE LINK, NEED FLIPPERG SUBSCRIPTION TO TEST


const runTest = async (url) => {
  return new Promise((resolve) => {
    let counter = 0;
    const startTime = Date.now();
    const web3 = new Web3(new Web3.providers.HttpProvider(url));
    const checkBalance = async () => {
              await web3.eth.getBalance('0x2E78bab6D52992812363FF86bD3B2A8f83Dfa717');   
      counter += 1;
      if (Date.now() - startTime < SECONDS * 1000) checkBalance();
      else resolve(counter);
    };

    checkBalance();

  });
};

const topList = (providersList, heading) => {
  // Sort by fastest
  let sorted = providersList.sort((a, b) => b.calls - a.calls);
  // Compare all with the slowest
  console.log(`\n\n${heading}`);
  const slowest = sorted[sorted.length -1].calls;
  sorted.forEach((provider, index) => {
    console.log(`${index + 1}. ${provider.name}. Speed ${provider.calls / slowest}x`);
  });
};

(async () => {
  // Run test
  await providers.reduce(async (memo, provider) => {
    await memo;
    provider.calls = await runTest(provider.url);
    console.log(`Benchmarking ${provider.name}... ${provider.calls} calls within ${SECONDS} seconds.`);
  }, []);
  // Full comparison
  topList(providers, '--FULL COMPARISON--');
})();