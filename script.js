console.clear();
var app = {
  init: function() {
    this.tiles = $("li");
    //this.image = "https://picsum.photos/300/300?8";
    this.image = 'https://i.giphy.com/media/13gvXfEVlxQjDO/giphy.webp';
    this.setup();
    this.addEvents();
    this.scramble();
  },
  setup: function() {
    var _self = this;
    _self.address = [];
    var _row = 0,
      _ctr = 0;
    _self.tiles.push(false);
    _self.tiles.each(function() {
      if (!_self.address[_row]) _self.address[_row] = [];
      _self.address[_row][_ctr] = this;

      if (!this) return;

      $(this)
        .css({
          top: 33.33 * _row + "%",
          left: 33.33 * _ctr + "%"
        })
        .attr({
          x: _ctr,
          y: _row
        });
      $(this)
        .find("button")
        .css({
          backgroundImage: "url(" + _self.image + ")",
          backgroundPosition: _ctr * 50 + "% " + _row * 50 + "%"
        });

      _ctr++;
      if (_ctr > 2) {
        _row++;
        _ctr = 0;
      }
    });
  },
  addEvents: function() {
    var _self = this;

    _self.tiles.each(function() {
      $(this).click(function(e) {
        _self.move($(this));
      });
    });
  },
  move: function(_tile) {
    var _x = parseInt(_tile.attr("x")),
      _y = parseInt(_tile.attr("y"));

    var _left = $("[x=" + (_x - 1) + "][y=" + _y + "]");
    var _top = $("[x=" + _x + "][y=" + (_y - 1) + "]");
    var _right = $("[x=" + (_x + 1) + "][y=" + _y + "]");
    var _bottom = $("[x=" + _x + "][y=" + (_y + 1) + "]");

    switch (true) {
      case _x > 0 && _left.length == 0: /* move left */
        _tile.css("left", (_x - 1) * 33.33 + "%").attr("x", _x - 1);
        break;
      case _x < 2 && _right.length == 0: /* move right */
        _tile.css("left", (_x + 1) * 33.33 + "%").attr("x", _x + 1);
        break;
      case _y > 0 && _top.length == 0: /* move up */
        _tile.css("top", (_y - 1) * 33.33 + "%").attr("y", _y - 1);
        break;
      case _y < 2 && _bottom.length == 0: /* move down */
        _tile.css("top", (_y + 1) * 33.33 + "%").attr("y", _y + 1);
        break;
    }
  },
  scramble: function() {
    var _clickNumber = 5;
    var _self = this;
    var doMove = function() {
      var _tile = _self.tiles[Math.floor(Math.random() * _self.tiles.length)];
      _self.move($(_tile));

      _clickNumber--;
      setTimeout(function() {
        if (_clickNumber > 0) doMove();
      }, 500);
    };
    //doMove();
  }
};

$(document).ready(function() {
  app.init();
});
