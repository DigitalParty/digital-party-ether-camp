var fakeProposalData = {
    chapterName: 'France National Chapter',
    committeeName: 'France National Economic Committee'
};

validateForm();
$('#saveProposalAsDraftBtn').click(function(){ alert('Not implemented'); });
$('#publishProposalBtn').click(publishProposal);
$('#cancelProposalEditiontBtn').click(gotToCommitteeDashboard);

$('#proposalForm input, #proposalForm select, #proposalForm textarea')
    .each(initializeFormField);

function initializeFormField(i, field) {
    $(field).keydown(validateForm);
    $(field).change(validateForm);
} 

function publishProposal() {
    contextData.proposalEditionData.proposals = contextData.proposalEditionData.proposals || [];
    contextData.proposalEditionData.proposals.push({
        name: $('#proposalName').val(),
        description: $('#proposalDescription').val()
    });
    gotToCommitteeDashboard();
}

function gotToCommitteeDashboard() {
    loadSection('committeeDashboard');
    setCommitteeDashboardData(contextData.proposalEditionData);
}

function setProposaldData(data) {
    data = data || fakeProposalData;
    contextData.proposalEditionData = data;
    
    $('#chapterName').html(data.chapterName);
    $('#headerInfo').html('New proposal for ' + data.committeeName);
}

function validateForm() {
    var isFormValid = true;
    
    var fields = $('#proposalForm input, #proposalForm select, #proposalForm textarea');
    for (var f = 0; f < fields.length; f++) {
        var field = $(fields[f]);
        if (field.prop('required') && !field.val()) {
            isFormValid = false;
            break;
        }
    }

    $('#publishProposalBtn').prop('disabled', !isFormValid);
}

setProposaldData();
