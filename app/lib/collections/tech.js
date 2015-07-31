Tech = new Mongo.Collection('tech');


if (Meteor.isServer) {
  Tech.allow({
    insert: function (userId, doc) {
      return true;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return true;
    },

    remove: function (userId, doc) {
      return true;
    }
  });

  Tech.deny({
    insert: function (userId, doc) {
      return false;
    },

    update: function (userId, doc, fieldNames, modifier) {
      if(Meteor.userId() == userId) return false;
      return true;
    },

    remove: function (userId, doc) {
      if(Meteor.userId() == userId) return false;
      return true;
    }
  });
}
