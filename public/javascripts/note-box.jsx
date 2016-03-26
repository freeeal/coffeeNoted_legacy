// native HTML element names start w/ lowercase, while custom React class names start with uppercase letters
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

var NoteBox = React.createClass({
	loadNotesFromServer: function() {
		// AJAX call when the component is first loaded and every 2 seconds after that. 
    	$.ajax({
	      url: this.props.url,
	      dataType: 'json',
	      cache: false,
	      success: function(data) {
	        this.setState({data: data}); // this.state is private to the component and can be changed by calling this.setState(), which re-renders itself once the state updates
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	      }.bind(this)
	    });
  	},
  	handleNoteSubmit: function(note) {
  		var notes = this.state.data;
  		var newNotes = notes.concat([note]);
  		this.setState({data: newComments});
    	// submit to the server and refresh the list
    	$.ajax({
	      url: this.props.url,
	      dataType: 'json',
	      type: 'POST',
	      data: note,
	      success: function(data) {
	        this.setState({data: data});
	      }.bind(this),
	      error: function(xhr, status, err) {
	      	this.setState({data: notes});
	        console.error(this.props.url, status, err.toString());
	      }.bind(this)
	    });
  	},
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {
    	this.loadCommentsFromServer();
    	setInterval(this.loadNotesFromServer, this.props.pollInterval);
  	},
	// render returns a tree of React components that will eventually render to HTML
	render: function() {
		return (
			// <div> tags are not DOM nodes, but are instantiations of React 'div' components
			// HTML components are just regular React components, BUT
			// here, the JSX compiler will auto rewrite HTML tags to React.createElement(tagName) expressions and leave everything else alone
			// thus preventing global namespace pollution
			<div className="noteBox">
				<h1>Coffee Notes</h1>
				<NoteList data={this.state.data} />
				<NoteForm onNoteSubmit={this.handleNoteSubmit} /> 
				// NoteBox makes callback available to NoteForm via the onNoteSubmit prop and so the NoteForm can call the callback when the user submits the form
			</div>
		);
	}
});

// props are immutable: for reactive state, need to introduce mutable state of the component
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
		return ()
			<div className="noteList">
				{noteNodes}
			</div>
		);
	}
});

var NoteForm = React.createClass({
	getInitialState: function() {
		return {author: '', text: ''};
	},
	handleAuthorChange: function(e) {
		this.setState({author: e.target.value});
	},
	handleTextChange: function(e) {
    	this.setState({text: e.target.value});
  	},
  	handleSubmit: function(e) {
	    e.preventDefault(); // prevent browser's default action on submitting the form
	    var author = this.state.author.trim();
	    var text = this.state.text.trim();
	    if (!text || !author) {
	      return;
	    }
	    // send request to the server
	    this.props.onNoteSubmit({author: author, text: text});
	    this.setState({author: '', text: ''});
  	},
	render: function() {
		return (
	      <form className="noteForm" onSubmit={this.handleSubmit}>
	        <input
	          type="text"
	          placeholder="Your name"
	          value={this.state.author}
	          onChange={this.handleAuthorChange}
        	/>
       		<input
	          type="text"
	          placeholder="Say something..."
	          value={this.state.text}
	          onChange={this.handleTextChange}
        	/>
	        <input type="submit" value="POST" />
	      </form>
   	 	);
	}
});

// ReactDOM.render() instantiates the root component, starts the framework, and injects the markup into a raw DOM element, provided as the second argument.
// must remain at bottom of script -- after composite components have been defined
ReactDOM.render(
	<NoteBox data="/users/:username" pollInterval={2000} />,
	document.getElementById('content')
);