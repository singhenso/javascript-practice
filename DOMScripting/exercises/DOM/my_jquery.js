(function() {
  $ = function(selector) {
    //makes sure that this is an instance of $
    if(!(this instanceof $)){
      return new $(selector);
    }
    if(typeof selector === 'string'){
      var elements = document.querySelectorAll(selector);
    }
    else{
      
    }
    
    Array.prototype.push.apply(this, elements);
  };

  $.extend = function(target, object) {
    for(var property in object){
      if(object.hasOwnProperty(property)){
        target[property] = object[property];
      }
    }
    return target;
  };

  // Static methods
  var isArrayLike = function(obj) {
    if(if typeof obj.length === 'number'){
      if(obj.length === 0){
        return true;
      }
      else if (obj.length > 0){
        return (obj.length - 1) in obj;
      }
    }
    return false;
  };

  $.extend($, {
    isArray: function(obj) {
      if(Object.prototype.toString.call(obj) === '[object Array]') return true;
      return false;
    },
    // $.each() iterates over objects or arrays with a callback that takes (index, value)
    each: function(collection, cb) {
      if(isArrayLike(collection)){
        for (var i = 0; i < collection.length; i++){
          var value = collection[i];
          cb.call(value, i, value)
        }
      }
      else{
        for(var prop in collection){
          if(collection.hasOwnProperty(prop)){
            var value = collection[prop];
            cb.call(value, prop, value);
          }
        }
      }
      return collection;
    },
    // convert array like object to an array
    makeArray: function(arr) {
      var array = [];
      $.each(arr, function(i, value){
        array.push(value);
      });
      return array;
    },
    // proxy does the exact same thing as bind
    proxy: function(fn, context) {
      return function(){
        return fn.apply(context, arguments);
      }
    }
  });

  $.extend($.prototype, {
    html: function(newHtml) {
      if(arguments.length){
        $.each(this, function(i, el){
          el.innerHTML = newHtml;
        });
        return this;
      }else{
        return this[0].innerHTML;
      }
    },
    val: function(newVal) {
      if(arguments.length){
        $.each(this, function(i, el){
          el.value = newVal;
        });
        return this;
      }else{
        return this[0].value;
      }
    },
    text: function(newText) {
      function getText(node){
        var text = "";
        $.each(el.childNodes, function(i, childNode){
          if(childNode.nodeType === 3){
            text += childNode.nodeValue;
          }
          else if(childNode.nodeType === 1){
            text += getText(childNode);
          }
        })
        return text;
      }

      if(arguments.length){
        
        $.each(this, function(i, el){
          el.innerHTML = "";
          // creation of new text node needs to be inside so that it makes 1 new node per element
          var newTextNode = document.createTextNode(newText);
          el.appendChild(newTextNode);
        })
      }
      else{
        return this[0] && getText(this[0]);
      }
    },
    find: function(selector) {
      var foundNodes = [];
      $.each(this, function(i, el){
        if(el.tagName === selector){
          foundNodes.push(el);
        }
      });
      return $(foundNodes);
    },
    next: function() {},
    prev: function() {},
    parent: function() {},
    children: function() {},
    attr: function(attrName, value) {},
    css: function(cssPropName, value) {},
    width: function() {},
    offset: function() {
      var offset = this[0].getBoundingClientRect();
      return {
        top: offset.top + window.pageYOffset,
        left: offset.left + window.pageXOffset
      };
    },
    hide: function() {},
    show: function() {},

    // Events
    bind: function(eventName, handler) {},
    unbind: function(eventName, handler) {},
    has: function(selector) {
      var elements = [];
	
      $.each(this, function(i, el) {
        if(el.matches(selector)) {
          elements.push(el);
        }
      });
    
      return $( elements );
    },
    on: function(eventType, selector, handler) {
      return this.bind(eventType, function(ev){
        var cur = ev.target;
        do {
          if ($([ cur ]).has(selector).length) {
            handler.call(cur, ev);
          }
          cur = cur.parentNode;
        } while (cur && cur !== ev.currentTarget);
      });
    },
    off: function(eventType, selector, handler) {},
    data: function(propName, data) {},

    // Extra
    addClass: function(className) {},
    removeClass: function(className) {},
    append: function(element) {}
  });

  $.buildFragment = function(html) {};
})();