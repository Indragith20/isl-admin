export const cards = [{
    title: 'Goal',
    id: 1,
    icon: '../../../assets/icons/goal.png',
    isTwoTeamsInvolved: false,
    questions: [{
        questionId: 1,
        question: 'Enter Player Nmber',
        currentTeam: true,
        type: 'icon'
    }]
}, {
    title: 'Red Card',
    id: 2,
    icon: '../../../assets/icons/red.png',
    isTwoTeamsInvolved: false,
    questions: [{
        questionId: 1,
        question: 'Enter Player Number',
        currentTeam: true,
        type: 'icon'
    }]
}, {
    title: 'Yellow Card',
    id: 3,
    isTwoTeamsInvolved: false,
    icon: '../../../assets/icons/yellow.png',
    questions: [{
        questionId: 1,
        question: 'Enter Player Number',
        type: 'icon',
        currentTeam: true,
    }]
}, {
    title: 'Penalty Kick',
    id: 4,
    isTwoTeamsInvolved: false,
    icon: '../../../assets/icons/penalty.png',
    questions: [{
        questionId: 1,
        question: 'Enter Player Number',
        currentTeam: true,
        type: 'icon'
    }]
}, {
    title: 'Corner Kick',
    id: 5,
    isTwoTeamsInvolved: true,
    icon: '../../../assets/icons/corner.png',
    questions: [{
        questionId: 1,
        question: 'Enter Player Number',
        currentTeam: true,
        type: 'icon'
    }]
}];
