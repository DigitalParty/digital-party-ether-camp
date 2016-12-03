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
    setTimeout(function() { createFakeParySuccess(data); }, fakeDelay);
}

function createFakeParySuccess(data) {
    loadSection('createNationalPartySuccess');
    $('#newPartyNationalName').html(data.name);
    $('#newPartyCountryName').html(data.country);

    $('#nationalPartyDashboardBtn').click(function() {
        loadChapterDashboard(data, 'national');
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
    }

    $('#nationalPartyDashboardBtn').click(function() {
        loadChapterDashboard(chapterData, 'national');
    });
    
    $('#chapterName').html(chapterData.name);
    $('#chapterHeaderInfo').html(chapterHeaderInfo);
}
