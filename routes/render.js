// Get all of our friend data
const data = require('../data.json');
const $ = require('jquery');
const param = require('jquery-param');
const axios = require('axios');
const spotify = require('../api_handler/spotify')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'));

exports.viewLogin = function(request, response){
	console.log("hi im working uwu");
	response.render('login-page');
};

exports.viewWelcome = function(request, response){
	console.log("hi im working uwu");
	response.render('welcome-to-pomelody');
};

exports.viewAboutPomodoro = function(request, response){
	console.log("hi im working uwu");
	response.render('about-pomodoro', data);
};

exports.viewInstructions = function(request, response){
	console.log("hi im working uwu");
	response.render('instructions', data);
};

exports.viewPrevSettings = function(request, response){
	console.log("hi im working uwu");
	response.render('prev-settings', data);
};

exports.viewSelectProd = function(request, response){
	console.log("hi im working uwu");
	response.render('select-productivity');
};
exports.viewSelectProd_B = function(request, response){
	console.log("hi im working uwu");
	response.render('select-productivity_B');
};

exports.viewSelectIntervalProd = function(request, response){
	console.log("hi im working uwu");
	response.render('select-interval-of-time-prod');
};

exports.viewSelectRelax = function(request, response){
	console.log("hi im working uwu");
	response.render('select-relaxation');
};

exports.viewSelectIntervalRelax = function(request, response){
	console.log("hi im working uwu");
	response.render('select-interval-of-time-relax');
};

exports.viewSelectInterval = function(request, response){
	console.log("hi im working uwu");
	response.render('select-interval-of-time');
};

exports.viewYouCan = function(request, response){
	console.log("hi im working uwu");
	response.render('you-can-do-it', data);
};

exports.viewTreatYourself = function(request, response){
	console.log("hi im working uwu");
	response.render('treat-yourself', data);
};
exports.viewHelpScreen = function(request, response){
	console.log("hi im working uwu");
	response.render('help-screen');
};

exports.viewEnd = function(request, response){
	console.log("hi im working uwu");
	response.render('end-page');
};

exports.getSpotifyToken = async function(request, response) {
	console.log("Correctly inside viewSpotify call");
	var client_id = "b4c291c0effb4b64bd6b961dc52fab74"; // Your client id
	var client_secret = await fs.readFileAsync('not-secret-key.txt');
	console.log("client secret is", client_secret);

	// The code we get back from Spotify
	var code = request.query.code;
	// Body object to be parametized for details
	var body = {
		grant_type: "authorization_code",
		code: code,
		redirect_uri: "https://pomelody.herokuapp.com/spotifyLogin"
		//redirect_uri: "http://localhost:3000/spotifyLogin"

	}
	paramed_body = param(body);
	// The configuration for the post request
	var details = 	{
		url: 'https://accounts.spotify.com/api/token',
		method: 'POST',
		data: paramed_body,
		headers: {
			'Content-Type' : 'application/x-www-form-urlencoded',
			'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
		}
	}
	// Get the tokens
	var access_token, refresh_token;
	axios.request(details).then(function(res) {
		access_token = res.data.access_token
    refresh_token = res.data.refresh_token

		// Send tokens into spotify js handler
		spotify.setAccessInfo(access_token, refresh_token)

		response.redirect('welcome')
	}).catch( function (error) {
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			console.log("data", error.response.data);
			console.log("status", error.response.status);
			console.log("headers", error.response.headers);
		} else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
			// http.ClientRequest in node.js
			console.log(error.request);
		} else {
			// Something happened in setting up the request that triggered an Error
			console.log('Error', error.message);
		}
		console.log(error.config);
	});



}
