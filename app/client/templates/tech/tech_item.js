Template.TechItem.helpers({
  domain: function () {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  voteClass: function (techId, direction){
    var user = Meteor.user();
    if(user == null) return;
    if(user.profile == null) return;
    
    var previousVote = _.find(user.profile.votes, function(vote){
      return vote.techId == techId;
    });
    
    if(!previousVote) return;
    
    if(previousVote.weight == 1 && direction == 'up') return 'upvote';
    if(previousVote.weight == -1 && direction == 'down') return 'downvote';
    
    return;
  }
})