/**
 * Meteor.publish('items', function (param1, param2) {
 *  this.ready();
 * });
 */

Meteor.publish('tech', function (/* args */) {
  return Tech.find();
});

Meteor.publish('users', function (/* args */) {
  return Users.find();
});