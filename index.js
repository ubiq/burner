// Deployed addresses
burnerAddress = '0x3605d4B5ed61236A516ae3B988d39B65a57Af157'

abi = JSON.parse('[{"constant":false,"inputs":[],"name":"Burn","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"totalBurned","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"Purge","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]')

let provider;
window.ethereum.enable().then(provider = new ethers.providers.Web3Provider(window.ethereum));
const signer = provider.getSigner();
contract = new ethers.Contract(burnerAddress, abi, signer)

// Purge
async function purge(){
    contract.Purge({ gasLimit: 100000, value: 0 })
        .then((f) => console.log(f));
}

// Balance
async function getBalance() {
    balance = await provider.getBalance(burnerAddress)
    const purgerPercentage = ethers.BigNumber.from(10000);
    purgerReward = ethers.BigNumber.from(balance).div(purgerPercentage)
    $("#balance").text(ethers.utils.formatEther(balance))
    $("#currentPurgerReward").text(ethers.utils.formatEther(purgerReward))
}

async function getTotalBurned() {
    totalBurned = await contract.totalBurned()
    console.log("Raw totalBurned: " + ethers.utils.formatEther(totalBurned.toString()));
    const purgerPercentage = ethers.BigNumber.from(10000);
    purgerReward = ethers.BigNumber.from(totalBurned).div(purgerPercentage)
    totalBurnedMinusReward = ethers.BigNumber.from(totalBurned).sub(purgerReward)
    $("#totalBurned").text(ethers.utils.formatEther(totalBurnedMinusReward.toString()))
}

function getMisc() {
    ubiqscanPrefix = "https://ubiqscan.io/address/"
    $("a#burnerAddress").text(burnerAddress)
    $("a#burnerAddress").attr("href", ubiqscanPrefix + burnerAddress)
}
    

// Reload
function onPageLoad() {
    getBalance()
    getTotalBurned()
    getMisc()
}

$(document).ready(function () {
    onPageLoad()
});
