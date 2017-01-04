function  Hello() { 
  var  name; 
   
  this.setName =  function (thyName) { 
    name = thyName; 
  }; 
   
  this.sayHello = function () { 
    console.log('Hello ' + name); 
	console.log('333');
  }; 
}; 
 
module.exports = Hello;
