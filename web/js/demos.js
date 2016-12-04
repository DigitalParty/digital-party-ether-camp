$(document).ready(initializeEvents);
var sections = [ 'home', 'globalChapterDashboard', 'createNationalParty' ];
var contextData = {
    currentUser: {
        name: 'Myself',
        picture: 'img/user.png'
    }
};

function initializeEvents() {
    var isTemplatingSupported = ('content' in document.createElement('template')); 
    if (!isTemplatingSupported) {
        alert('Browser does not support templating :(');
        return;
    }

    $(sections).each(initializeSection);
        
    loadSection(sections[0]);
}

function initializeSection(i, sectionName) {
    $('#' + sectionName + 'AHref').click(function() {
        loadSection(sectionName);
    });
}

function loadSection(sectionName) {
    setMenuActiveOption(sectionName);
    var mainPage = $('#mainPageDiv');
    var template = $('#' + sectionName + 'Tmpl');
    mainPage.html(template.html());
}

function setMenuActiveOption(sectionName) {
    var isSectionAMenuOption = ($('#' + sectionName + 'AHref').length > 0);
    if (!isSectionAMenuOption)
        return;
    
    $('.menu-list > li').removeClass('is-active');
    $('#' + sectionName + 'AHref').parent().addClass('is-active');
}
