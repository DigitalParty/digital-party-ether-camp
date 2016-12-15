(function () {
  $(document).ready(initDashboardChapter);

  var chapterAddress;
  var currentUserAddress;
  function initDashboardChapter() {

    chapterAddress = getUrlVars().id;
    if (!chapterAddress)
      return showError('Chapter Address not found!');

    initializeWeb3();

    getWeb3CurrentAddress()
      .then(setCurrentAddress)
      .then(loadChapterData)
      .then(showMainPage)
      
      .catch(function() {
        return showError('Cannot connect to Blockchain');
      });
  }

  function loadChapterData() {
    var nationalChapterContract = new NationalChapterContract(chapterAddress);
    return Promise.all([
      nationalChapterContract.getPresident().then(setPresident),
      nationalChapterContract.getSecretary().then(setSecretary)
    ]);
  }

  function setCurrentAddress(currentAddress) {
    currentUserAddress = currentAddress;
  }

  function setPresident(president) {
    setRoleData('president', president);
  }

  function setSecretary(secretary) {
    setRoleData('secretary', secretary);
  }

  function setRoleData(role, data) {
    if (data.address == 0) {
      setNonElectedRole(role);
    } else {
      setElectedRole(role, data);
    }
  }

  function setNonElectedRole(role) {
    $('.elected-' + role).hide();
    $('.non-elected-' + role).show();
  }

  function setElectedRole(role, data) {
    $('.elected-' + role +'-name').html(data.name);
    if (data.address == currentUserAddress) {
      // TODO set role as user
    }

    $('.non-elected-' + role).hide();
    $('.elected-' + role).show();
  }

})();
