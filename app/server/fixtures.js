if (Tech.find().count() === 0) {
  Tech.insert({
    name: 'ReactJS',
    url: 'http://facebook.github.io/react/',
    description: 'A JavaScript library for building user interfaces',
    score: 0,
    tags: ['User Interface', 'JavaScript', 'Front End'],
    created_on: moment().utc()
  });

  Tech.insert({
    name: 'Meteor',
    url: 'http://meteor.com',
    description: 'Meteor is a JavaScript app platform, offering a complete full-stack framework for delivering web and mobile apps entirely in JavaScript. Meteor radically simplifies the development process for reactive app development.',
    score: 0,
    tags: ['JavaScript', 'Full Stack'],
    created_on: moment().utc()
  });

  Tech.insert({
    name: 'Materialize',
    url: 'http://materializecss.com/',
    description: 'A modern responsive front-end framework based on Material Design',
    score: 0,
    tags: ['User Interface', 'CSS', 'Front End'],
    created_on: moment().utc()
  });
}