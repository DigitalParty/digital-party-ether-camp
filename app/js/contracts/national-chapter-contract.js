
function NationalChapterContract(chapterAddress) {
  var contractInterface = [{ "constant": true, "inputs": [], "name": "president", "outputs": [{ "name": "signature", "type": "address" }, { "name": "name", "type": "string" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "childParties", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_president", "type": "address" }, { "name": "_presidentName", "type": "string" }], "name": "setPresident", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "secretary", "outputs": [{ "name": "signature", "type": "address" }, { "name": "name", "type": "string" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_chapter", "type": "address" }], "name": "addChapter", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_juristiction", "type": "string" }], "name": "setJuristiction", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "members", "outputs": [{ "name": "signature", "type": "address" }, { "name": "name", "type": "string" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "level", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "parentParty", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getLevel", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "headquarter", "outputs": [{ "name": "location", "type": "string" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_location", "type": "string" }], "name": "setHeadquarter", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_parentLevel", "type": "uint8" }], "name": "setLevel", "outputs": [], "payable": false, "type": "function" }, { "inputs": [], "payable": false, "type": "constructor" }];

  this.chapterContract = web3.eth.contract(contractInterface);
  this.chapter = this.chapterContract.at(chapterAddress);

  var presidentPromise = Promise.promisify(this.chapter.president.call);
  var secretaryPromise = Promise.promisify(this.chapter.secretary.call);

  this.getPresident = function () {
    return presidentPromise().then(mapRole);
  }

  this.getSecretary = function () {
    return secretaryPromise().then(mapRole);
  }

  function mapRole(result) {
    return {
      address: parseInt(result[0], 16),
      name: result[1]
    };
  }
}
