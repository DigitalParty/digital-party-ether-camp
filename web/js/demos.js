$(document).ready(initializeEvents);
var sections = [ 'home', 'createNationalParty' ];

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
    var mainPage = $('#mainPageDiv');
    var template = $('#' + sectionName + 'Tmpl');
    mainPage.html(template.html());
}
