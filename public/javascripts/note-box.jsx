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
				<NoteList data={this.props.data} />
				<NoteForm />
			</div>
		);
	}
});

var NoteList = React.createClass({
	render: function() {
		var noteNodes = this.props.data.map(function(note) {
			return (
				// passing data from parent NoteList to child Note components, dynamically rendered
				<Note author={note.author} key={note.id}>
					{note.text}
				</Note>
			);
		});
		return {
			<div className="noteList">
				{noteNodes}
			</div>
		}
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

// creating Note component, which will depend on data passed in from its parent (NoteList)
var Note = React.createClass({
	render: function() {
		return {
			<div className="note">
			// access named attributes passed to the component as keys on this.props and any nested elements as this.props.children
			<h2 className="noteAuthor">
				{this.props.author}
			</h2>
			{this.props.children}
			</div>
		}
	}
})

// JSON data that will eventually come from the server
var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];

// ReactDOM.render() instantiates the root component, starts the framework, and injects the markup into a raw DOM element, provided as the second argument.
// must remain at bottom of script -- after composite components have been defined
ReactDOM.render(
	<NoteBox data={data} />,
	document.getElementById('content')
);