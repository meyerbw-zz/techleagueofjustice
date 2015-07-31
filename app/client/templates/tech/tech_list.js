/*****************************************************************************/
/* Tech: Event Handlers */
/*****************************************************************************/
Template.TechList.events({
  'click .vote-control': function(e){
    var user = Meteor.user();
    if(user == null) return;
    
    //make sure the user has a profile object
    if(user.profile == null) user.profile = {};
    
    var tech = Tech.findOne({_id: e.target.attributes['data-tech-id'].value});
    var direction = e.target.attributes['data-vote-direction'].value;
    
    //set vote weight
    var weight = 0;
    if(direction == 'up')
      weight = 1
    else if(direction == 'down')
      weight = -1
    
    //check if the user has already registered a vote for this technology
    var previousVote = _.find(user.profile.votes, function(vote){
      return vote.techId == tech._id;
    });
    
    if(previousVote){
      tech.score -= previousVote.weight;
      user.profile.votes = _.reject(user.profile.votes, function(vote){
        return vote.techId == tech._id;
      });
      
      if(previousVote.weight != weight){
        tech.score += weight;
        user.profile.votes.push({techId: tech._id, weight: weight});
        previousVote.weight = weight;
      }
    }else{
      tech.score += weight;
      
      if(user.profile.votes == null) user.profile.votes = [];
      
      user.profile.votes.push({techId: tech._id, weight: weight});
    }
    
    Meteor.users.update( { _id: Meteor.userId() }, { $set: {'profile.votes': user.profile.votes}} );
    Tech.update({_id: tech._id}, {$set: {score: tech.score}});
    
    voteDep.changed();
    techDep.changed();
  }
});

/*****************************************************************************/
/* Tech: Helpers */
/*****************************************************************************/
Template.TechList.helpers({
  tech: function () {
    return Tech.find({},{sort: {score: -1, name: 1}});
  }
});

/*****************************************************************************/
/* Tech: Lifecycle Hooks */
/*****************************************************************************/
Template.TechList.created = function () {
};

Template.TechList.rendered = function () {
  var hooks = {
    insertElement: function(node, next){
      $(node).addClass('off').insertBefore(next);

      Tracker.afterFlush(function(){
        $(node).removeClass('off'); 
      });
    },
    removeElement:function(node){
      dfd = jQuery.Deferred();
      
      $(node).addClass('off');
      
      $(node).on('webkitTransitionEnd oTransitionEnd transitionEnd msTransitionEnd transitionend', function(){
        $(node).remove() 
        dfd.resolve();
      })
      
      return dfd.promise();
    },
    moveElement: function(node, next){
      hooks.removeElement(node).done(
        function(){
          hooks.insertElement(node, next);
        }
      );
    }
  }
  
  this.find('div.tech-list')._uihooks = hooks;
};

Template.TechList.destroyed = function () {
};
