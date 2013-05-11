/*
 * jQuery Lister
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(jQuery);
    }
})(function($, undefined) {
  var $overlay;
   
  function Lister($el, options) {
  };
  
  Lister.prototype.sayHello = function(name) {
    console.log('hi' + (name ? ' ' + name : '') + ', i like you. do you like me?');
    return this;
  };

  Lister.prototype.setCount = function(count) {
      this._count = count;
      return this;
  };
  
  Lister.prototype.getCount = function() {
      return this._count;
  };

  $.fn.lister = function(options) {
    var UNIQUE_FRAG =  '!!*-LISTER-*!!',
      $elements,
      args = arguments,
      returnVal = UNIQUE_FRAG;
    
    $elements = this.each(function() {
      var $this = $(this),
        lister = $this.data('lister'),
        listerReturn;
      
      if (!lister) {
        if (typeof options === 'string') {
          throw new Error('Lister must be initalized before calling any methods');
        } else {
          $this.data('lister', new Lister($this, options));
        }
      } else if (typeof options === 'string') {
        if (lister[options]) {
          listerReturn = lister[options].apply(lister, [].slice.call(args, 1));
          if (listerReturn !== lister) {
            returnVal = listerReturn;
            return false;
          }
        } else {
          throw new Error('no such method \'' + options + '\' for lister instance');
        }
      }
    });

    return returnVal !== UNIQUE_FRAG ? returnVal : $elements;
  }
});