const express = require('express');
const exphbars = require('express-handlebars'); // load the package
const posts = require('./data/blogPosts');
const app = express();
app.engine('handlebars', exphbars()); // initialise the handlebars engine
app.set('view engine', 'handlebars'); // specify engine for page rendering
app.use(express.static('public'));

app.get('/', (req, res) => {
	// res.sendFile(__dirname + "/views/index.html");
	// after we install express-handlebars we changed the extension fro html to handlebars and now we can use
	// template rendering
	//	res.render('index'); we can console.log here to make sure it is working
	res.render('index', {
		// hrer we create object and use it
		page: 'Home',
		Myname: 'Name',
		firstName: '<h1>Samira</h1>',
		secondName: 'Maaly',
		date: new Date().toLocaleString(),
		// date: Date(Date.now())
		// date: `${new Date().getMonth() + 1} / ${new Date().getFullYear()}`
		//date: new Date().toLocaleDateString("en-GB", options)
		posts: posts
	});
});

app.get('/my-cv', (req, res) => {
	//	res.sendFile(__dirname + '/views/my-cv.html');
	//	res.render('my-cv');
	res.render('my-cv', {
		page: 'CV'
	});
});

//open posts in new tab
app.get('/readpost/:id', (req, res) => {
	// res.sendFile(__dirname + "/views/my-cv.html");
	const id = req.params.id;
	res.render('post', {
		title: posts[parseInt(id)].title,
		summary: posts[parseInt(id)].summary,
		content: posts[parseInt(id)].content
	});
}); //http://localhost:3000/readpost/1 to check if it is working

const SERVER_PORT = process.env.PORT || 3000;
app.listen(SERVER_PORT, function() {
	console.log(`Server is listening on port ${SERVER_PORT}. Ready to accept requests!`);
});
