function getUrlVars() {
  // http://jquery-howto.blogspot.com.es/2009/09/get-url-parameters-values-with-jquery.html

  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}

function initializeWeb3() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/tshqQpEj2GwMCcwZFSAS'));
  }
}

function getWeb3CurrentAddress() {
  var getWeb3AccountPromise = Promise.promisify(web3.eth.getAccounts);

  return getWeb3AccountPromise()
    .then(function (result) {
      return result.length > 0 ? result[0] : undefined;
    });
}

function showMainPage() {
  $('.loading-panel').hide();
  $('.main-content').fadeIn();
}

function showError(error) {
  $('.loading-panel').html('ERROR<br/>' + error);
}
