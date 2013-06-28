(function( $ ) {
  $.fn.messages = function(container, lgg) {
    var result = container;
    var cont = result;
    $.each(this.get()[0], function(key, value) {
      var path = $(key.split("\."));
      var li = path.length - 1;
      path.each(function(idx, elt) {
        //if (li != idx) {
          if (!$(cont).prop(elt))
            cont[elt] = {};
          cont = cont[elt];
        //}
      });
      cont[lgg] = value;
      result.__path__ = result.__path__ || {};
      result.__path__[key] = result.__path__[key] || {};
      result.__path__[key][lgg] = value;
    });
    return result;
  };
})( jQuery );