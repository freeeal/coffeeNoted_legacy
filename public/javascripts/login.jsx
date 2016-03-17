// var Register = React.createClass({
// 	render: function() {
// 		return (
// 				<div className="container">
// 					<div className="row">
// 								<div className="col-xs-6 col-md-4"></div>
// 								<div className="col-xs-6 col-md-4">
// 									<h3>Track the coffees you love.</h3>
// 									<form className="form-inline" role="form">
// 									  <div className="form-group">
// 									    <input type="text" className="form-control" name="firstName" placeholder="First Name" required="true"/>
// 								  		<input type="text" className="form-control" name="lastName" placeholder="Last Name" required="true"/>
// 								    	<input type="email" className="form-control" name="email" placeholder="Email Address", required="true"/>
// 									  </div>
									 

// 									  <button type="submit" class="btn btn-warning btn-lg">Get Started</button>
// 									<!-- </form> -->					
// 								</div>
// 								<div className="col-xs-6 col-md-4"></div>
// 							</div><!-- /row -->
// 						</div><!-- /container -->

// 			)
// 	}
// })


// React.render(
// <h1>Hello, world from React.js!</h1>,
// 	document.getElementById('example')
// );

	          <% if (!user) { %>
	            	<li><a href="/auth/login">Log in</a></li>
	            <% } %>
	          	<% } else { %>
	            	<li><a href="/auth/logout">Log out</a></li>
	         	<% } %>