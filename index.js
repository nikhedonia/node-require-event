
var emmett = require('emmett');
//var fs     = require('fs');
var extend = require('extend');

var m = require('module');

var org={
//  _compile    : m.prototype._compile,
//  load       : m.prototype.load,
  require    : m.prototype.require
};

var wrapped = {}
var ev = new emmett();

for( var k in org ){
   wrapped[k] = function(file){
     var myK=k;
     ev.emit('before:'+file, {self:this, file:file} );
  //   try{
  //     console.log(myK);
       var res = org[myK].apply(this,arguments);
 //    }catch(e){
  //     ev.emit('fail:'+myK,{self:this, args:arguments, e:e})
  //   }
     ev.emit('after:'+file, {self:this, args:file,export:res} );
     return res;
   }
}




ev.hook=function(){
  extend( m.prototype , wrapped );
  return ev;
}

ev.unhook=function(){
  extend( m.prototype , org );
  return ev;
}

//var debug = null;
ev.debug=function(){
  ev.on( /.*/ , console.log.bind(console) );
  return ev;
}

module.exports= ev;
