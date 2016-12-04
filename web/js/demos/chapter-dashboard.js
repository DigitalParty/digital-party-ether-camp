var fakeChapterData = {
    name: 'Test name',
    presidentCandidates: [
        { name: 'Candidate Name 1'},
        { name: 'Candidate Name 2'}
    ]
};

$('#globalPartyDashboardBtn').click(function() {
    // loadChapterDashboard(data, 'national');
    alert('Not implemented');
});

$('#nationalPartyDashboardBtn').click(function() {
    // loadChapterDashboard(data, 'national');
    alert('Not implemented');
});

$('.become-a-candidate > button').click(function() {
    alert('Not implemented');
});

function setChapterDashboardData(data) {
    data = data || fakeChapterData;

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
            function (candidate, candidateHtml) {
                candidateHtml.find('.candidate-name').html(candidate.name);
            }
        );
    }

    var isSecretaryElected = (data.secretary);
    if (isSecretaryElected) {
        $('.non-elected-secretary').hide();
        $('.elected-secretary').show();
        $('.elected-secretary-name').html(data.secretary.name);
        $('.elected-secretary-picture').attr('src', data.secretary.picture);
    } else {
        $('.elected-secretary').hide();
        $('.non-elected-secretary').show();
    }

    var userTemplate = $('#chapterDashboardUserTmpl');

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

    data.forumMembers = (data.forumMembers || []);
    $('.forum-member-counter').html(data.forumMembers || [].length);
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
    
    $('#chapterName').html(data.name);
    $('#chapterHeaderInfo').html(chapterHeaderInfo);
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