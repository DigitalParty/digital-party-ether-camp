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
    $('#creatingGlobalPartyModal').modal();

    var fakeDelay = 1500 + Math.random(2500);
    setTimeout(function() { createFackeParySuccess(data); }, fakeDelay);
}

function createFackeParySuccess(data) {
    loadSection('createGlobalPartySuccess');
    $('#newPartyGlobalName').html(data.name);
    $('#newPartyCountryName').html(data.country);
    $('#newPartyNationalName').html(data.name + ', ' + data.country);
    $('#newPartyRegionalName').html(data.country + ', ZIP ' + data.zipCode);

    $('#creatingGlobalPartyModal').modal('hide');
}
