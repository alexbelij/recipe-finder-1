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
    var
      defaults = {
        addOnEnter: $el[0].tagName.toUpperCase() === 'INPUT' ?
          true : false,
        renderListItem: function(value) {
          return '<li>' + value + '<button data-remove="lister">X'
            + '</button></li>';
        }
      },
      options = $.extend({}, defaults, options),
      _self = this; 

      if (typeof options.renderListItem !== 'function') {
        throw new Error('options.renderListItem must be a function');
      }

      options.$listContainer = options.$listContainer || $('<ul />').insertAfter($el);
      this._options = options;
      this._values = [];

      if (options.addOnEnter) {
        $el.keypress(function(e) {
            if (e.which === 13) {
              _self.splice(_self._values.length, 0, $el.val());
              $el.val('');
            }
        });
      }

      options.$listContainer.on('click', '[data-remove=lister]', function(e) {
        var
          vals = _self._values;

        for (var i=0; i < vals.length; i++) {
          if (vals[i].$el.find(e.target).length) {
            break;
          }
        }

        _self.splice(i, 1);
      });
  };
  
  Lister.prototype.splice = function(index, howMany) {
    var
      args = arguments,
      valuesToAdd = [].slice.call(args, 2, args.length),
      processedValuesToAdd,
      options = this._options;

    processedValuesToAdd = this.getProcessedValues(valuesToAdd);
    processedValuesToAdd.unshift(args[0], args[1]);
    [].splice.apply(this._values, processedValuesToAdd);
    this.render();

    return this;
  };

  Lister.prototype.render = function() {
      var
        vals = this._values,
        $container = this._options.$listContainer,
        $tempContainer = $();

      for (var i=0; i < vals.length; i++) {
        $tempContainer = $tempContainer.add(vals[i].$el);
      }
      $container.html($tempContainer);
      
      return this;
  };
  
  // converts an array of string values to our internal values hash
  // which is an array of objects with $el and value attributes
  Lister.prototype.getProcessedValues = function(values) {
    var
      options = this._options;

    return $.map(values, function(val, index) {
          var $el;

          try {
            $el = $(options.renderListItem(val));
          } catch (e) {
            throw new Error('There was an error rendering the list item for \'' +
              val + '\'. Ensure options.renderListItem returns proper markup.');
          }

          return {
            $el: $el,
            value: val
          }
        });
  };

  Lister.prototype.value = function(items) {
      if (arguments.length) {
        if ($.isArray(items)) {
          this._values = this.getProcessedValues(items);
          this.render();
        } else {
          throw new Error('the items passed in must be an Array');
        }
      } else {
        return $.map(this._values, function(val, index) {
          return val.value;
        });;
      }
  };

  $.fn.lister = function(options) {
    var
      UNIQUE_FRAG =  '!!*-LISTER-*!!',
      $elements,
      args = arguments,
      returnVal = UNIQUE_FRAG;
    
    $elements = this.each(function() {
      var
        $this = $(this),
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