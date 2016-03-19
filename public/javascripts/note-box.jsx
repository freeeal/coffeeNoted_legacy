// native HTML element names start w/ lowercase, while custom React class names start with uppercase letters
var NoteBox = React.createClass({displayName: 'NoteBox',
	// render returns a tree of React components that will eventually render to HTML
	render: function() {
		return (
			// <div> tags are not DOM nodes, but are instantiations of React 'div' components
			// HTML components are just regular React components, BUT
			// here, the JSX compiler will auto rewrite HTML tags to React.createElement(tagName) expressions and leave everything else alone
			// thus preventing global namespace pollution
			<div className="noteBox">
				<h1>Coffee Notes</h1>
				<NoteList />
				<NoteForm />
			</div>
		);
	}
});

var NoteList = React.createClass({
	render: function() {
		return (
			<div className="noteList">
				Hi, I am a coffee note list.
			</div>
		);
	}
});

var NoteForm = React.createClass({
	render: function() {
		return (
			<div className="noteForm">
				Hi, I am a coffee note form.
			</div>
		);
	}
});

// ReactDOM.render() instantiates the root component, starts the framework, and injects the markup into a raw DOM element, provided as the second argument.
// must remain at bottom of script -- after composite components have been defined
ReactDOM.render(
	React.createElement(NoteBox, null),
	document.getElementById('content')
);