$(document).ready(initializeEvents);

function initializeEvents() {

    $('#createPartyGiveUpBtn').click(function() {
        loadSection('home');
    });
    
    $('#createPartySubmitBtn').click(createFakeParty);

    validateForm();
    $('#createPartyForm input, #createPartyForm select')
        .each(initializeFormField);
}

function initializeFormField(i, field) {
    $(field).keydown(validateForm);
    $(field).change(validateForm);
} 

function validateForm() {
    var isFormValid = true;
    
    var fields = $('#createPartyForm input, #createPartyForm select');
    for (var f = 0; f < fields.length; f++) {
        var field = $(fields[f]);
        if (field.prop('required') && !field.val()) {
            isFormValid = false;
            break;
        }
    }

    $('#createPartySubmitBtn').prop('disabled', !isFormValid);
}

function createFakeParty() {
    var data = {
        name: $('#partyName').val(),
        country: $('#partyCountry').val(),
        zipCode: $('#partyZipCode').val()
    };
    $('#creatingNationalPartyModal').modal();

    var fakeDelay = 1500 + Math.random(2500);
    setTimeout(function() { createFackeParySuccess(data); }, fakeDelay);
}

function createFackeParySuccess(data) {
    loadSection('createNationalPartySuccess');
    $('#newPartyNationalName').html(data.name);
    $('#newPartyCountryName').html(data.country);
    $('#newPartyNationalName').html(data.name + ', ' + data.country);
    $('#newPartyRegionalName').html(data.country + ', ZIP ' + data.zipCode);

    $('#nationalPartyDashboardBtn').click(function() {
        loadChapterDashboard(data, 'national');
    });
    $('#regionalPartyDashboardBtn').click(function() {
        loadChapterDashboard(data, 'regional');
    });

    $('#creatingNationalPartyModal').modal('hide');
}

function loadChapterDashboard(chapterData, chapterType) {
    loadSection('chapterDashboard');

    var chapterHeaderInfo = '';
    switch(chapterType) {
        case 'national':
            chapterHeaderInfo =  chapterData.country + ' - National party';
            $('#nationalPartyDashboardBtn').hide();
            break;
        case 'regional':
            chapterHeaderInfo =  chapterData.country + ', ' 
                + chapterData.zipCode + ' - Regional party';
            break;
    }

    $('#nationalPartyDashboardBtn').click(function() {
        loadChapterDashboard(chapterData, 'national');
    });
    
    $('#chapterName').html(chapterData.name);
    $('#chapterHeaderInfo').html(chapterHeaderInfo);
}