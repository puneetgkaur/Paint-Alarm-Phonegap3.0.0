/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var alarmTime="00:00";
var alarmSet=0,hours,minutes,h,m,s;
var curimg=1,setimg=1;
var flag=1,flag1=1;
var my_media = null;
var mediaTimer = null;
var hours1,minutes1;
var curring=1;
var purch;
var myalarm1 = new Array;
var myalarm2 = new Array;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function startTime()
{
var today=new Date();
 h=today.getHours();
 m=today.getMinutes();
 s=today.getSeconds();
// add a zero in front of numbers<10
h=checkTime(h);
m=checkTime(m);
s=checkTime(s);
h=String(h);
m=String(m);
s=String(s);
displaymult();
displaydate();

if(!window.localStorage.getItem("back"))
{
save();
}
if(!window.localStorage.getItem("ring"))
{
setring();
}
if(!window.localStorage.getItem("number"))
{
var value=6;
var key="number";
window.localStorage.setItem(key, value);
}
image(h,m,s);
disp();
showbg();
//$('#main').css('background-repeat','no-repeat');

//$('#headr-alarm1').children().first().hide();
if(myalarm1.length>0)
{
	tcmp=h+m;
	if(tcmp==myalarm1[0])
	{
		if(flag)
			{
				//showAlert();
				stopAudio();
				$.mobile.changePage('#fifth','pop',true,true);
                                $('#headr-alarm').children().first().hide();
				var data = window.localStorage.getItem("ring");
				var val=decodeURIComponent(data);
				playAudio(val);	
				flag=0;
			}
		//playBeep();
	var cpos,dur;
	dur=my_media.getDuration();

	   my_media.getCurrentPosition(
                        // success callback
                        function(position) {
                            if (position > -1) {
                                cpos=position;
                            }
                        }
                    );
                    //alert(cpos+" "+dur);
                    
                 if(cpos>=(dur-2))
                 	my_media.seekTo(0);
				
	}
	
}
t=setTimeout(function(){startTime()},500);
}
function dismiss()
{
	stopAudio();
	for(var g=1;g<myalarm1.length;g++)
		myalarm2.push(myalarm1[g]);
	for(var g=0;g<myalarm2.length;g++)
		myalarm1[g]=myalarm2[g];
	myalarm1.pop();
	while(myalarm2.length)
		myalarm2.pop();
	flag=1;
	    
}
function del(idx)
{
for(var k=0;k<myalarm1.length;k++)
	if(k!=idx)
		myalarm2.push(myalarm1[k]);
for(var k=0;k<myalarm2.length;k++)
	myalarm1[k]=myalarm2[k];
myalarm1.pop();
while(myalarm2.length)
	myalarm2.pop();
}
function upd(idx)
{
del(idx);
var d = new Date();
var temp='hrs'+idx;
var temp1='min'+idx;
        hours=document.getElementById(temp).selectedIndex;
          minutes=document.getElementById(temp1).selectedIndex;
        hours1=hours;
        minutes1=minutes;
        hours=checkTime(hours);
        minutes=checkTime(minutes);
        hours=String(hours);
        minutes=String(minutes);
        alarmTime=hours+minutes;
        var tnow=h+m;
        if(tnow<=alarmTime)
        {
                var str="";
		var d = new Date();
		var weekday=new Array(7);
		weekday[0]="Sunday";
		weekday[1]="Monday";
		weekday[2]="Tuesday";
		weekday[3]="Wednesday";
		weekday[4]="Thursday";
		weekday[5]="Friday";
		weekday[6]="Saturday";
		str+=weekday[d.getDay()];
                alert("Alarm is set at "+ hours+":"+minutes+" on "+str);
              //  alert("alarTime "+alarmTime);
            //    alert("currentTime "+tnow);
        }
        else
        {
                var str="";
		var d = new Date();
		var weekday=new Array(7);
		weekday[0]="Sunday";
		weekday[1]="Monday";
		weekday[2]="Tuesday";
		weekday[3]="Wednesday";
		weekday[4]="Thursday";
		weekday[5]="Friday";
		weekday[6]="Saturday";
		str+=weekday[(d.getDay()+1)%7];
		
                alert("Alarm is set at "+ hours+":"+minutes+" on "+str );
          //      alert("alarTime "+alarmTime);
        //        alert("currentTime "+tnow);

        }
        myalarm1.push(alarmTime);
        myalarm1.sort();
      	var f=0;
      	while(myalarm1[f]<tnow&&f<myalarm1.length)
      		f++;
      	for(var j=f;j<myalarm1.length;j++)
      		myalarm2.push(myalarm1[j]);
      	for(var j=0;j<f;j++)
      		myalarm2.push(myalarm1[j]);
      	for(var j=0;j<myalarm2.length;j++)
      		myalarm1[j]=myalarm2[j];
      	while(myalarm2.length)
      		myalarm2.pop();
      //	alert(myalarm1[0]);
      	
        flag=1; 

}
function snooze()
{
	
  var minu1=(myalarm1[0].charAt(2)-'0')*10+(myalarm1[0].charAt(3)-'0')*1;
  var hou1=(myalarm1[0].charAt(0)-'0')*10+(myalarm1[0].charAt(1)-'0')*1;
 
  dismiss();
  alarmSet=1;
  flag=1;
  var hu=(minu1+5)/60;
  var tnow=String(checkTime(hou1))+String(checkTime(minu1));
  var hupdate=Math.floor(hu);
	minu1=(minu1+5)%60;
	hou1=(hou1+hupdate)%24;
  alarmTime=String(checkTime(hou1))+String(checkTime(minu1));
  hours=checkTime(hou1);
  minutes=checkTime(minu1);
  myalarm1.push(alarmTime);
        myalarm1.sort();
      	var f=0;
      	while(myalarm1[f]<tnow&&f<myalarm1.length)
      		f++;
      	for(var j=f;j<myalarm1.length;j++)
      		myalarm2.push(myalarm1[j]);
      	for(var j=0;j<f;j++)
      		myalarm2.push(myalarm1[j]);
      	for(var j=0;j<myalarm2.length;j++)
      		myalarm1[j]=myalarm2[j];
      	while(myalarm2.length)
      		myalarm2.pop();
alert("Alarm snoozed for 5 minutes");
}
function showbg()
{
var data = window.localStorage.getItem("back");
var val=decodeURIComponent(data);
var a='url('+val+')';
	$('#main').css('background-image',a);
}
function disp()
{
	var dv=document.getElementById('cont');
	
	while(dv.hasChildNodes())
	{
		dv.removeChild(dv.lastChild);
	}
	var img = document.createElement("IMG");
	img.src = "images/wallpapers/Space"+curimg+".jpg";	
		dv.appendChild(img);
}

function next()
{
var data = window.localStorage.getItem("number");
	if(curimg==data)
		curimg=1;
	else 
		curimg++;		
}

function prev()
{
var data = window.localStorage.getItem("number");
	if(curimg==1)
		curimg=data;
	else 
		curimg--;		
}
function save()
{
	setimg=curimg;
	var val="images/wallpapers/Space"+curimg+".jpg";
	var key = "back";
	console.log(val.length);
    	var val1 = encodeURIComponent(val);
    	console.log(val1.length);
     	window.localStorage.setItem(key, val1);
	curimg=1;
}
function cancel()
{
	curimg=1;
}
function checkTime(i)
{
if (i<10)
  {
  i="0" + i;
  }
return i;
}
function image(h,m,s) {
	var dv=document.getElementById('image');
	
	while(dv.hasChildNodes())
	{
		dv.removeChild(dv.lastChild);
	}
	var img = document.createElement("IMG");
	if(s.charAt(1)=="0")
	img.src = "images/c0.png";
	if(s.charAt(1)=="1")
	img.src = "images/c1.png";
	if(s.charAt(1)=="2")
	img.src = "images/c2.png";
	if(s.charAt(1)=="3")
	img.src = "images/c3.png";
	if(s.charAt(1)=="4")
	img.src = "images/c4.png";
	if(s.charAt(1)=="5")
	img.src = "images/c5.png";
	if(s.charAt(1)=="6")
	img.src = "images/c6.png";
	if(s.charAt(1)=="7")
	img.src = "images/c7.png";
	if(s.charAt(1)=="8")
	img.src = "images/c8.png";
	if(s.charAt(1)=="9")
	img.src = "images/c9.png";
	
	
	dv.appendChild(img);

	var dv=document.getElementById('image1');
	
	while(dv.hasChildNodes())
	{
		dv.removeChild(dv.lastChild);
	}
	var img = document.createElement("IMG");
	if(s.charAt(0)=="0")
	img.src = "images/c0.png";
	if(s.charAt(0)=="1")
	img.src = "images/c1.png";
	if(s.charAt(0)=="2")
	img.src = "images/c2.png";
	if(s.charAt(0)=="3")
	img.src = "images/c3.png";
	if(s.charAt(0)=="4")
	img.src = "images/c4.png";
	if(s.charAt(0)=="5")
	img.src = "images/c5.png";
	if(s.charAt(0)=="6")
	img.src = "images/c6.png";
	if(s.charAt(0)=="7")
	img.src = "images/c7.png";
	if(s.charAt(0)=="8")
	img.src = "images/c8.png";
	if(s.charAt(0)=="9")
	img.src = "images/c9.png";
	
	
	dv.appendChild(img);
	var dv=document.getElementById('image2');
	
	while(dv.hasChildNodes())
	{
		dv.removeChild(dv.lastChild);
	}
	var img = document.createElement("IMG");
	if(h.charAt(0)=="0")
	img.src = "images/c0.png";
	if(h.charAt(0)=="1")
	img.src = "images/c1.png";
	if(h.charAt(0)=="2")
	img.src = "images/c2.png";
	if(h.charAt(0)=="3")
	img.src = "images/c3.png";
	if(h.charAt(0)=="4")
	img.src = "images/c4.png";
	if(h.charAt(0)=="5")
	img.src = "images/c5.png";
	if(h.charAt(0)=="6")
	img.src = "images/c6.png";
	if(h.charAt(0)=="7")
	img.src = "images/c7.png";
	if(h.charAt(0)=="8")
	img.src = "images/c8.png";
	if(h.charAt(0)=="9")
	img.src = "images/c9.png";
	
	
	dv.appendChild(img);

	var dv=document.getElementById('image3');
	
	while(dv.hasChildNodes())
	{
		dv.removeChild(dv.lastChild);
	}
	var img = document.createElement("IMG");
	if(h.charAt(1)=="0")
	img.src = "images/c0.png";
	if(h.charAt(1)=="1")
	img.src = "images/c1.png";
	if(h.charAt(1)=="2")
	img.src = "images/c2.png";
	if(h.charAt(1)=="3")
	img.src = "images/c3.png";
	if(h.charAt(1)=="4")
	img.src = "images/c4.png";
	if(h.charAt(1)=="5")
	img.src = "images/c5.png";
	if(h.charAt(1)=="6")
	img.src = "images/c6.png";
	if(h.charAt(1)=="7")
	img.src = "images/c7.png";
	if(h.charAt(1)=="8")
	img.src = "images/c8.png";
	if(h.charAt(1)=="9")
	img.src = "images/c9.png";
	
	
	dv.appendChild(img);
	var dv=document.getElementById('image4');
	
	while(dv.hasChildNodes())
	{
		dv.removeChild(dv.lastChild);
	}
	var img = document.createElement("IMG");
	if(m.charAt(0)=="0")
	img.src = "images/c0.png";
	if(m.charAt(0)=="1")
	img.src = "images/c1.png";
	if(m.charAt(0)=="2")
	img.src = "images/c2.png";
	if(m.charAt(0)=="3")
	img.src = "images/c3.png";
	if(m.charAt(0)=="4")
	img.src = "images/c4.png";
	if(m.charAt(0)=="5")
	img.src = "images/c5.png";
	if(m.charAt(0)=="6")
	img.src = "images/c6.png";
	if(m.charAt(0)=="7")
	img.src = "images/c7.png";
	if(m.charAt(0)=="8")
	img.src = "images/c8.png";
	if(m.charAt(0)=="9")
	img.src = "images/c9.png";
	
	
	dv.appendChild(img);

	var dv=document.getElementById('image5');
	
	while(dv.hasChildNodes())
	{
		dv.removeChild(dv.lastChild);
	}
	var img = document.createElement("IMG");
	if(m.charAt(1)=="0")
	img.src = "images/c0.png";
	if(m.charAt(1)=="1")
	img.src = "images/c1.png";
	if(m.charAt(1)=="2")
	img.src = "images/c2.png";
	if(m.charAt(1)=="3")
	img.src = "images/c3.png";
	if(m.charAt(1)=="4")
	img.src = "images/c4.png";
	if(m.charAt(1)=="5")
	img.src = "images/c5.png";
	if(m.charAt(1)=="6")
	img.src = "images/c6.png";
	if(m.charAt(1)=="7")
	img.src = "images/c7.png";
	if(m.charAt(1)=="8")
	img.src = "images/c8.png";
	if(m.charAt(1)=="9")
	img.src = "images/c9.png";
	
	
	dv.appendChild(img);
}

    // process the promptation dialog result
function onPrompt(results) {
        alarmTime=results.input1;
	alarmSet=1;   
	flag=1; 
	
}

    // Show a custom prompt dialog
    //
function showPrompt() {
        navigator.notification.prompt(
            'Please enter the time HH:MM',  // message
            onPrompt,                  // callback to invoke
            'Add Alarm',            // title
            ['Ok','Cancel'],             // buttonLabels
            '00:00'                 // defaultText
        );
        
    }

// Wait for PhoneGap to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // PhoneGap is ready
    //
    function onDeviceReady() {
        // Empty
    }

    // Show a custom alert
    //
    function showAlert() {
        navigator.notification.alert(
            'Alarm Ringing',  // message
            resetAlarm,
            'Alarm',            // title
            'Ok'                  // buttonName
        );
    }
    function resetAlarm()
    {
    alarmSet=0;
    }
    // Beep three times
    //
    function playBeep() {
        navigator.notification.beep(1);
    }

    // Vibrate for 2 seconds
    //
    function vibrate() {
        navigator.notification.vibrate(2000);
    }
    
      function update()
    {
    if(myalarm1.length==4)
    	{
    		alert("MAXIMUM ALARM LIMIT IS 4!");
        	return;
        }
        var d = new Date();
        hours=document.getElementById('hrs').selectedIndex;
         minutes=document.getElementById('min').selectedIndex;
        hours1=hours;
        minutes1=minutes;
        hours=checkTime(hours);
        minutes=checkTime(minutes);
        hours=String(hours);
        minutes=String(minutes);
        alarmTime=hours+minutes;
        var tnow=h+m;
        if(tnow<=alarmTime)
        {
                var str="";
		var d = new Date();
		var weekday=new Array(7);
		weekday[0]="Sunday";
		weekday[1]="Monday";
		weekday[2]="Tuesday";
		weekday[3]="Wednesday";
		weekday[4]="Thursday";
		weekday[5]="Friday";
		weekday[6]="Saturday";
		str+=weekday[d.getDay()];
                alert("Alarm is set at "+ hours+":"+minutes+" on "+str);
              //  alert("alarTime "+alarmTime);
            //    alert("currentTime "+tnow);
        }
        else
        {
                var str="";
		var d = new Date();
		var weekday=new Array(7);
		weekday[0]="Sunday";
		weekday[1]="Monday";
		weekday[2]="Tuesday";
		weekday[3]="Wednesday";
		weekday[4]="Thursday";
		weekday[5]="Friday";
		weekday[6]="Saturday";
		str+=weekday[(d.getDay()+1)%7];
		
                alert("Alarm is set at "+ hours+":"+minutes+" on "+str );
          //      alert("alarTime "+alarmTime);
        //        alert("currentTime "+tnow);

        }
        myalarm1.push(alarmTime);
        myalarm1.sort();
      	var f=0;
      	while(myalarm1[f]<tnow&&f<myalarm1.length)
      		f++;
      	for(var j=f;j<myalarm1.length;j++)
      		myalarm2.push(myalarm1[j]);
      	for(var j=0;j<f;j++)
      		myalarm2.push(myalarm1[j]);
      	for(var j=0;j<myalarm2.length;j++)
      		myalarm1[j]=myalarm2[j];
      	while(myalarm2.length)
      		myalarm2.pop();
      	//alert(myalarm1[0]);
      	
        flag=1; 
    }

      function playAudio(src) {
            // Create Media object from src
            my_media = new Media(src, onSuccess, onError);

            // Play audio
            my_media.play();

            // Update my_media position every second
            if (mediaTimer == null) {
                mediaTimer = setInterval(function() {
                    // get my_media position
                    my_media.getCurrentPosition(
                        // success callback
                        function(position) {
                            if (position > -1) {
                                setAudioPosition((position) + " sec");
                            }
                        },
                        // error callback
                        function(e) {
                            console.log("Error getting pos=" + e);
                            setAudioPosition("Error: " + e);
                        }
                    );
                }, 1000);
            }
        }

        // Pause audio
        // 
        function pauseAudio() {
            if (my_media) {
                my_media.pause();
            }
        }

        // Stop audio
        // 
        function stopAudio() {
            if (my_media) {
                my_media.stop();
            }
            clearInterval(mediaTimer);
            mediaTimer = null;
        }

        // onSuccess Callback
        //
        function onSuccess() {
            console.log("playAudio():Audio Success");
        }

        // onError Callback 
        //
        function onError(error) {
         //alert('code: '    + error.code    + '\n' + 
             //     'message: ' + error.message + '\n');
        }

        // Set audio position
        // 
        function setAudioPosition(position) {
            document.getElementById('audio_position').innerHTML = position;
        }
function playtone(index)
{
	curring=index;
	stopAudio();
	playAudio("/android_asset/www/song"+index+".mp3");
}
function cancel()
{
	stopAudio();
}
function setring()
{
	stopAudio();
	var val="/android_asset/www/song"+curring+".mp3";
	var key = "ring";
	console.log(val.length);
    	var val1 = encodeURIComponent(val);
    	console.log(val1.length);
     	window.localStorage.setItem(key, val1);
}
function displaymult()
{
if(myalarm1.length)
	{
		var cn=document.getElementById("multalrm");
		
		while(cn.hasChildNodes())
		{
		cn.removeChild(cn.lastChild);
		}
for(var j=0;j<myalarm1.length;j++)
{
		var image1 =new Image();
		image1.src = "images/bell.png";
		
		var aTag = document.createElement('a');
		aTag.href = "#p"+j;		
		aTag.appendChild(image1);
		cn.appendChild(aTag);
		var tnow=h+m;
        	if(tnow<=myalarm1[j])
        	{
                var str="";
		var d = new Date();
		var weekday=new Array(7);
		weekday[0]="Sunday";
		weekday[1]="Monday";
		weekday[2]="Tuesday";
		weekday[3]="Wednesday";
		weekday[4]="Thursday";
		weekday[5]="Friday";
		weekday[6]="Saturday";
		str+=weekday[d.getDay()]+", ";
                //alert("Alarm is set at "+ hours+":"+minutes+" on "+str);
              	//  alert("alarTime "+alarmTime);
            	//    alert("currentTime "+tnow);
        	}
        	else
        	{
                var str="";
		var d = new Date();
		var weekday=new Array(7);
		weekday[0]="Sunday";
		weekday[1]="Monday";
		weekday[2]="Tuesday";
		weekday[3]="Wednesday";
		weekday[4]="Thursday";
		weekday[5]="Friday";
		weekday[6]="Saturday";
		str+=weekday[(d.getDay()+1)%7]+", ";
		
                //alert("Alarm is set at "+ hours+":"+minutes+" on "+str );
          //      alert("alarTime "+alarmTime);
        //        alert("currentTime "+tnow);

       		}
		str+=myalarm1[j].charAt(0)+myalarm1[j].charAt(1)+":"+myalarm1[j].charAt(2)+myalarm1[j].charAt(3);
	        var randomFontColor="white",randomFontSize="35px";
		coloredText="<span style='font-size:"+randomFontSize+";  color:"+randomFontColor+"'>"+str+"</span>"+"<div>"+"</div>";
		var link = document.createElement("a");
		link.href="#p"+j;
		
		link.innerHTML=coloredText;
		cn.appendChild(link);
			
}		
	}
else
	{
		var str="NO ALARM";
		var randomFontColor="white",randomFontSize="35px";
		coloredText="<span style='font-size:"+randomFontSize+";  color:"+randomFontColor+"'>"+str+"</span>"
		var cn=document.getElementById("multalrm");

		cn.innerHTML=coloredText;
		var img = document.createElement("IMG");
		img.src="images/alarm-off.png";
		cn.appendChild(img);	
	}
		//for(var i=0;i<myalarms1.length;i++)
	//	document.write("\n");
}
function displaydate()
{
		
		var str="";
		var d = new Date();
		var weekday=new Array(7);
		weekday[0]="Sunday";
		weekday[1]="Monday";
		weekday[2]="Tuesday";
		weekday[3]="Wednesday";
		weekday[4]="Thursday";
		weekday[5]="Friday";
		weekday[6]="Saturday";
		str+=weekday[d.getDay()];
		str+=", ";	
		
		var weekday2=new Array(12);
		weekday2[0]="January";
		weekday2[1]="February";
		weekday2[2]="March";
		weekday2[3]="April";
		weekday2[4]="May";
		weekday2[5]="June";
		weekday2[6]="July";
		weekday2[7]="August";
		weekday2[8]="September";
		weekday2[9]="October";
		weekday2[10]="November";
		weekday2[11]="December";
		
		str+=weekday2[d.getMonth()];
		str+=" "
		
		str+=d.getDate();
		str+=" ";
		
		str+=d.getFullYear();
		str+=" "; 
		
		var randomFontColor="white",randomFontSize="30px";
		coloredText="<span style='font-size:"+randomFontSize+";  color:"+randomFontColor+"'>"+str+"</span>"
		var cn=document.getElementById("date");
		cn.innerHTML=coloredText;
		
}

/*
function buy(){
alert("entering");
init();
alert("bello");
restoreTransactions();
purchase("android.test.purchased");
alert("hello"+purch);
if(purch=="OK")
	{
		var value=7;
		var key="number";
		window.localStorage.setItem(key, value);
	}
}
*/
