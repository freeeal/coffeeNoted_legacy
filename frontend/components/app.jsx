var React = require('react');
var PropTypes = React.PropTypes;

var App = React.createClass({

  render: function () {
    var message = 'I am in react';

    return (
      <div>
        <p>{message}</p>
      </div>
    );
  },

});

module.exports = App;
