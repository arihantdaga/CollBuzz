var dataObj = {"records":[]};
  
$(document).ready(function(){
console.log("ready");
console.log($.support.cors);
$.support.cors = true;
console.log($.support.cors);
console.log($.mobile.allowCrossDomainPages);
$.mobile.allowCrossDomainPages = true;
console.log($.mobile.allowCrossDomainPages);
$( document ).bind( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!
    console.log("binded");
    $.mobile.allowCrossDomainPages = true;
    $.support.cors = true;
});


function handleLogin() {
var form = $("#loginForm");
//disable the button so we can't resubmit while we wait
$("#submitButton",form).attr("disabled","disabled");
var u = $("#username", form).val();
var p = $("#password", form).val();
console.log("click");
if(u != '' && p!= '') {
$.post("http://www.coldfusionjedi.com/demos/2011/nov/10/service.cfc?method=login&returnformat=json", {username:u,password:p}, function(res) {
if(res == true) {
//store
window.localStorage["username"] = u;
window.localStorage["password"] = p;
$.mobile.changePage("some.html");
} else {
navigator.notification.alert("Your login failed", function() {});
}
$("#submitButton").removeAttr("disabled");
},"json");
}
return false;
}

});

$("#loginPage").on("pageinit",'' ,function(e) {
checkPreAuth();
});


function init() {
document.addEventListener("deviceready", deviceReady, true);
delete init;
}

function checkPreAuth() {
var form = $("#loginForm");
if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
$("#username", form).val(window.localStorage["username"]);
$("#password", form).val(window.localStorage["password"]);
handleLogin();
}
}

function handleLogin() {
var form = $("#loginForm");
//disable the button so we can't resubmit while we wait
$("#submitButton",form).attr("disabled","disabled");
var u = $("#username", form).val();
var p = $("#password", form).val();
console.log("click");
if(u != '' && p!= '') {
$.post("http://www.coldfusionjedi.com/demos/2011/nov/10/service.cfc?method=login&returnformat=json", {username:u,password:p}, function(res) {
if(res == true) {
//store
window.localStorage["username"] = u;
window.localStorage["password"] = p;
$.mobile.changePage("some.html");
} else {
navigator.notification.alert("Your login failed", function() {});
}
$("#submitButton").removeAttr("disabled");
},"json");
} else {
//Thanks Igor!
navigator.notification.alert("You must enter a username and password", function() {});
$("#submitButton").removeAttr("disabled");
}
return false;
}

function deviceReady() {

$("#loginForm").on("submit",handleLogin);

}


function getJSONdata(){
	console.log('Now i am being executed');
//http://campusmartdemo.pythonanywhere.com/CollBuzz/default/api/orders.json
return $.getJSON( "http://campusmartdemo.pythonanywhere.com/CollBuzz/default/api/orders.json", function( data ) {
  var items = [];
 /* console.log(data);*/
 
  $.each(data, function(key,val){
    $.each(val,function(key,val){
    dataObj.records.push(val);
    
   //console.log(val);
   /* var orderrow = {
        "orderID":val.orderID,"restaurent":val.restaurent,"price":val.price,"oDate":val.oDate,"item":val.item,"college":val.college
    }*/
//    console.log(orderrow);

 //   dataObj.records.push(orderrow);
});
  //console.log(JSON.stringify(dataObj));
  });
});


}


  $(document).on("pageinit","#page1",function(){ // When entering pagetwo


 $.when(getJSONdata().done(function(){
  console.log("page1 is now shown Now");
//  var dataObj = {"records":[]};

console.log(JSON.stringify(dataObj));
dataObj=JSON.stringify(dataObj)
    $(".xtra").slideUp(0);

  $(".orderrow").click(function(){
    $(".xtra",this).slideToggle("fast");
  });
}));});





