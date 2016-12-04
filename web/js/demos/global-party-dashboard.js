var globalPartyData = {
    level: 'global',
    name: 'My global party',
    country: 'France',
    president: {
        name: 'Our President',
        picture: 'img/user-1.png'
    },
    secretary: {
        name: 'Our Secretary',
        picture: 'img/user-2.png'
    },
    moderators: [],
    forumMembers: [
        {
            name: 'Our President',
            picture: 'img/user-1.png'
        },
        {
            name: 'Our Secretary',
            picture: 'img/user-2.png'
        },
        {
            name: 'Myself',
            picture: 'img/user.png'
        },
        {
            name: 'Other user',
            picture: 'img/user-3.png'
        }
    ]
};
loadSection('chapterDashboard');
setChapterDashboardData(globalPartyData);