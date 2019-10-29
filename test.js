const obj = {}
let bValue = ''
Object.defineProperty(obj, "b", {
  get : function(){
    return bValue;
  },

  set: function (newValue) {
    console.log('newValue', newValue)
    bValue = newValue;
  }
});