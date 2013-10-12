//document.addEventListener("resume", onResume, false); 
//document.addEventListener("deviceready", onDeviceReady, false);
/*
$(function(){ // start of dom ready
	$("#content").on("click", "#linkDropbox", linkDropbox);
	$("#content").on("click", "#unlinkDropbox", unlinkDropbox);
	$("#content").on("click", "#upload", uploadDropbox(canvas_image_path));
}); // end of dom ready
*/
function onDeviceReadyDropbox(){
	if (window.localStorage.getItem("authDropbox") == "true"){ // if app previously linked with Dropbox
		cordova.exec(checkAuthCB, checkAuthFail, "PhoneGapDropBox", "checkAuth", [""]); // start Dropbox session
	}
}

function appendLinkedContent(){
	$("#append_here").append("<button onclick=\"unlinkDropbox()\">Unlink from Dropbox</button><br /><button onclick=\"uploadDropbox(canvas_image_path)\">Upload Sample File to Dropbox</button>");
}

function removeLinkedContent(){
	$("#unlinkDropbox, #upload").remove();
}

//start the Dropbox authentication process, "link" this app to your Dropbox account
/*function linkDropbox(){
        alert("Inside linkDropbox");
	cordova.exec(linkDropboxCB, linkDropboxFail, "PhoneGapDropBox", "link", [""]);
*/	//exec(<successFunction>, <failFunction>, <service>, <action>, [<args>]);
	//This will marshall a request from the WebView to the Android native side, more or less boiling down to 
	//calling the action method on the service class, with the arguments passed in the args Array.
/*}*/

var dropBoxAuthAttempt = false; // set this global var so authDropbox() is only called once
function linkDropboxCB(){ // this callback is only ran if the native Java call in linkDropbox() was successful
        alert("linkDropbox success");
	console.log("linkDropBoxCB() callback successful after cordova.exec to native Java");
	dropBoxAuthAttempt = true; // user succesfully linked dropbox, need to set this to true to fire authDropbox in onResume from exiting dropbox linking authentication
        console.log("linkDropBoxCB() callback successful after cordova.exec to native Java 2");
}

function linkDropboxFail(err){
        alert("linkDropbox failed");
	console.log("linkDropboxFail callback is firing and error message is below");
	console.log(err);
}

function onResume() { 
        console.log("entered the on resume function");
	// this onResume event fires always when resuming to the app, but won't run the code to 
	// finish dropbox auth unless dropBoxAuthAttempt is set to true after successfully linking dropbox
	if (dropBoxAuthAttempt){ // if the app was paused to start the link process with dropbox
		console.log("resume event just triggered after returning from Dropbox authentication");
		dropBoxAuthAttempt = false; // set this var to false so the code in this onResume runs only once
                alert("inside onResume function..");
		authDropbox(); // this will only run once if the user resumes from successfully linking dropbox
	}
}

// finish the authentication, this is executed only once after the onresume event happens when successfully resuming from entering Dropbox credentials and linking.
function authDropbox(){
        alert('inside authDropbox()');
	cordova.exec(authDropboxCB, authDropboxFail, "PhoneGapDropBox", "finishAuth", [""]);
}

function authDropboxCB(){
        alert('authDropboxCB 1');
	console.log("authDropboxCB callback successful after cordova.exec to native Java");
	window.localStorage.setItem("authDropbox", "true"); // setting local storage variable noting this App has linked with Dropbox
        alert('authDropboxCB 2');
	appendLinkedContent();
        alert('authDropboxCB 3');
	$("#linkDropbox").hide();
	alert('Successfully Linked with Dropbox');
}

function authDropboxFail(err){
	console.log("authDropboxFail callback is firing, user may have canceled out of link process");
	console.log(err);
	alert('Canceled link process');
}

function unlinkDropbox(){
	cordova.exec(unlinkDropboxCB, unlinkDropboxFail, "PhoneGapDropBox", "unlink", [""]);
}

function unlinkDropboxCB(){
	console.log("unlinkDropboxCB callback successful after cordova.exec to native Java");
	window.localStorage.setItem("authDropbox", "false");
	$("#linkDropbox").show();
	removeLinkedContent();
	alert('Successfully Unlinked from Dropbox');
}

function unlinkDropboxFail(err){
	console.log("unlinkDropboxFail callback is firing and error message is below");
	console.log(err);
}

// this is executed if window.localStorage.getItem("authDropbox", "true") is true when the app has initialized
function checkAuthCB(){
	console.log("checkAuthCB callback successful after cordova.exec to native Java");
	// user is authenticated now, at this point you can start making Dropbox API calls
	$("#linkDropbox").hide();
	appendLinkedContent();
}

function checkAuthFail(err){
    console.log("checkAuthFail callback is firing and error message is below");
    console.log(err);
}

function uploadDropbox(image_path){
        alert(image_path);
	console.log("insde upload function 1");
	//window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, writeFail);
	cordova.exec(uploadDropboxCB, uploadDropboxFail, "PhoneGapDropBox", "upload", [image_path]);
}

function uploadDropboxCB(){
	console.log("uploadDropboxCB callback successful after cordova.exec to native Java");
}

function uploadDropboxFail(err){
	console.log("uploadDropboxFail callback is firing and error message is below");
	console.log(err);
}
/*
function gotFS(fileSystem) {
    fileSystem.root.getFile(canvas_image_path, {create: true, exclusive: false}, gotFileEntry, writeFail);
}

function gotFileEntry(fileEntry) {
    fileEntry.createWriter(gotFileWriter, writeFail);
}

function gotFileWriter(writer) {
    writer.onwriteend = function(evt) {
        console.log("contents of file now 'some sample text'");
    };
    writer.write("some sample text");
}

function writeFail(error) {
    console.log(error.code);
}*/
