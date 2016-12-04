var fakeChapterData = {
    name: 'Test name',
    presidentCandidates: [
        { name: 'Candidate Name 1'},
        { name: 'Candidate Name 2'}
    ]
};

$('#globalPartyDashboardBtn').click(function() {
    loadSection('globalChapterDashboard');
});

$('#nationalPartyDashboardBtn').click(function() {
    // loadChapterDashboard(data, 'national');
    alert('Not implemented');
});

$('.become-a-candidate > button').click(becomeACandidate);

$('#profileSwitcher').change(setProfileViewerData);

function setChapterDashboardData(data) {
    data = data || fakeChapterData;

    $('#chapterName').html(data.name);

    setChapterLevelData(data);

    setPresidentData(data);
    setSecretaryData(data);

    var userTemplate = $('#chapterDashboardUserTmpl');
    setModeratorsData(data, userTemplate);
    setForumMembersData(data, userTemplate);
    
    setProfileViewerData();
}

function setProfileViewerData() {
    var profile = $('#profileSwitcher').val();

    switch (profile) {
        case 'currentChapterForumMember':
            $('.secretary-designation-form').hide();
            $('.secretary-designation-not-available').show();
            break;
        case 'globalPartyPresident':
            $('.secretary-designation-form').show();
            $('.secretary-designation-not-available').hide();
            $('#designationForSecretaryByPresidentAbove').removeAttr('disabled');
            $('#designationForSecretaryBySecretaryAbove').attr('disabled', 'disabled');
            $('.designation-for-secretary-by-president-above').removeClass('not-allowed');
            $('.designation-for-secretary-by-secretary-above').addClass('not-allowed');
            break;
        case 'globalPartyScretary':
            $('.secretary-designation-form').show();
            $('.secretary-designation-not-available').hide();
            $('#designationForSecretaryByPresidentAbove').attr('disabled', 'disabled');
            $('#designationForSecretaryBySecretaryAbove').removeAttr('disabled');
            $('.designation-for-secretary-by-president-above').addClass('not-allowed');
            $('.designation-for-secretary-by-secretary-above').removeClass('not-allowed');
            break;
    }
}

function setChapterLevelData(data) {
    var chapterHeaderInfo = '';
    switch(data.level) {
        case 'global':
            chapterHeaderInfo = 'Global chapter';
            $('#globalPartyDashboardBtn').hide();
            $('#nationalPartyDashboardBtn').hide();
            break;
        case 'national':
            chapterHeaderInfo =  data.country + ' - National chapter';
            $('#nationalPartyDashboardBtn').hide();
            break;
    }
    $('#chapterHeaderInfo').html(chapterHeaderInfo);
}

function setPresidentData(data) {
    var isPresidentElected = (data.president);
    if (isPresidentElected) {
        $('.non-elected-president').hide();
        $('.elected-president').show();
        $('.elected-president-name').html(data.president.name);
        $('.elected-president-picture').attr('src', data.president.picture);
    } else {
        $('.elected-president').hide();
        $('.non-elected-president').show();
        var candidateList = $('.candidate-list');
        var candidateTemplate = $('#chapterDashboardCandidateTmpl');

        renderTemplateList(
            candidateList,
            candidateTemplate,
            data.presidentCandidates,
            renderPresidentCandidate
        );
    }
}

function renderPresidentCandidate(candidate, candidateHtml) {
    candidateHtml.find('.candidate-name').html(candidate.name);
    candidateHtml.find('img').attr('src', candidate.picture);
}

function becomeACandidate() {
    $('.become-a-candidate > button').hide();
    var candidateList = $('.candidate-list');
    var candidateTemplate = $('#chapterDashboardCandidateTmpl');
    var candidateHtml = $(candidateTemplate.html());
    renderPresidentCandidate(contextData.currentUser, candidateHtml)
    candidateList.append(candidateHtml);
}

function setSecretaryData(data) {
    var isSecretaryElected = (data.secretary);
    if (isSecretaryElected) {
        $('.non-elected-secretary').hide();
        $('.elected-secretary').show();
        $('.elected-secretary-name').html(data.secretary.name);
        $('.elected-secretary-picture').attr('src', data.secretary.picture);
    } else {
        $('.elected-secretary').hide();
        $('.non-elected-secretary').show();
        
        $('.secretary-designation-form select')
            .each(function(i, select) {
                addForumMembersToSecretaryDesignationList($(select), data);
            });
    }
}

function addForumMembersToSecretaryDesignationList(select, data) {
    select.html('');
    var selectOptionsHtml = '<option>( Select user from Global Party forum )</option>';
    $(data.forumMembers || []).each(function(i, forumMember) {
        selectOptionsHtml += '<option>' + forumMember.name + '</option>';
    });

    select.html(selectOptionsHtml);
}

function setModeratorsData(data, userTemplate) {
    data.moderators = (data.moderators || []);
    $('.moderator-counter').html(data.moderators.length);
    var moderatorList = $('.moderator-list');
    renderTemplateList(
        moderatorList,
        userTemplate,
        data.moderators,
        function (moderator, moderatorHtml) {
            moderatorHtml.find('img').attr('src', moderator.picture);
            moderatorHtml.find('.user-name').html(moderator.name);
        }
    );
}

function setForumMembersData(data, userTemplate) {
    data.forumMembers = (data.forumMembers || []);
    $('.forum-member-counter').html(data.forumMembers.length);
    var forumMemberList = $('.forum-member-list');
    renderTemplateList(
        forumMemberList,
        userTemplate,
        data.forumMembers,
        function (user, userHtml) {
            userHtml.find('img').attr('src', user.picture);
            userHtml.find('.user-name').html(user.name);
        }
    );
}

function renderTemplateList(listContainer, template, elementArray, elementInitFn) {
    listContainer.html('');
    var templateHtml = template.html();
    $(elementArray || []).each(function(i, element) {
        var elementHtml = $(templateHtml);
        elementInitFn(element, elementHtml);
        listContainer.append(elementHtml);
    });
} 

setChapterDashboardData();