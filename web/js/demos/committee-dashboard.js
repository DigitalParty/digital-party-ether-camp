var fakeCommitteeData = {
    chapterName: 'France National Chapter',
    committeeName: 'France National Economic Committee',
    proposals: [
        {
            name: 'Universal Basic Income',
            description: 'A basic income is a form of social security' 
                + ' in which all citizens or residents of a country regularly' 
                + ' receive an unconditional sum of money, either from a government' 
                + ' or some other public institution, in addition to any income' 
                + ' received from elsewhere.'
        },
        {
            name: 'Tobin Tax',
            description: 'A Tobin tax, suggested by Nobel Memorial Prize in Economic' 
                + ' Sciences Laureate economist James Tobin, was originally defined as' 
                + ' a tax on all spot conversions of one currency into another. Tobin\'s' 
                + ' original tax was intended to put a penalty on short-term financial' 
                + ' round-trip excursions into another currency.'
        }
    ],
    committeeMembers: [
        {
            name: 'One user',
            picture: 'img/user-1.png'
        },
        {
            name: 'Other',
            picture: 'img/user-2.png'
        },
        {
            name: 'Myself',
            picture: 'img/user.png'
        },
        {
            name: 'Another user',
            picture: 'img/user-3.png'
        }
    ]
};

$('#createCommitteeProposalBtn').click(createProposal);

function createProposal() {
    loadSection('editProposal');
    setProposaldData(contextData.committeeData);
}

function setCommitteeDashboardData(data) {
    data = data || fakeCommitteeData;
    contextData.committeeData = data;

    $('#chapterName').html(data.chapterName);
    $('#headerInfo').html(data.committeeName);

    setProposalsData(data);
    setCommitteeMembersData(data);
}

function setProposalsData(data) {
    data.proposals = (data.proposals || []);
    $('.proposals-counter').html(data.proposals.length);
    var listContainer = $('.proposal-list');
    listContainer.html('');
    var templateHtml = $('#proposalListElementTmpl').html();
    $(data.proposals || []).each(function(i, proposal) {
        var elementHtml = $(templateHtml);
        elementHtml.find('.proposal-name').html(proposal.name);
        elementHtml.find('.proposal-description').html(proposal.description);
        elementHtml.find('.proposal-vote-in-favour-button')
            .click(function() { voteProposal(elementHtml, true); });
        elementHtml.find('.proposal-vote-against-button')
            .click(function() { voteProposal(elementHtml, false); });
        listContainer.append(elementHtml);
    });
}

function setCommitteeMembersData(data) {
    data.committeeMembers = (data.committeeMembers || []);
    $('.member-counter').html(data.committeeMembers.length);
    var listContainer = $('.member-list');
    listContainer.html('');
    var templateHtml = $('#chapterDashboardUserTmpl').html();
    $(data.committeeMembers || []).each(function(i, user) {
        var elementHtml = $(templateHtml);
        elementHtml.find('img').attr('src', user.picture);
        elementHtml.find('.user-name').html(user.name);
        listContainer.append(elementHtml);
    });
} 


function voteProposal(proposalHtml, vote) {
    var voteInFavourButton = proposalHtml.find('.proposal-vote-in-favour-button');
    var voteAgainstButton = proposalHtml.find('.proposal-vote-against-button');
    if (vote) {
        voteAgainstButton.removeClass('active');
        if (voteInFavourButton.hasClass('active')) {
            voteInFavourButton.removeClass('active');
        } else {
            voteInFavourButton.addClass('active');
        }
    } else {
        voteInFavourButton.removeClass('active');
        if (voteAgainstButton.hasClass('active')) {
            voteAgainstButton.removeClass('active');
        } else {
            voteAgainstButton.addClass('active');
        }
    }
}

setCommitteeDashboardData();
