/**
 * Created by Salvador on 4/9/2015.
 */
var Util = (function() {
  var proto = {
    b: null,
    p: null,

    status: function() {
      if (arguments.length === 0) {
        return this.b[this.p[0]][this.p[1]];
      } else {
        var arg = arguments[0];
        return this.b[arg[0]][arg[1]];
      }

    },

    argue: {
      defArgP: function(args) {
        if (args.length === 0) {
          return this.p;
        } else {
          return args[0];
        }
      },

      retVal: function(func, args) {
        if (args.length === 0) {
          return func();
        } else {
          return func(args[0]);
        }
      },

      retVals: function(funcs, args) {
        var results = [];

        if (args.length === 0) {
          for (var i = 0; i < funcs.length; ++i) {
            results.push(funcs[i]());
          }
        } else {
          for (var k = 0; k < funcs.length; ++k) {
            results.push(funcs[k](args[0]));
          }
        }

        return results;
      }
    },

    is: {
      /**
       * @return {boolean}
       */
      Free: function() {
        return this.argue.retVal(this.status, arguments) === "null";
      },

      /**
       * @return {boolean}
       */
      Bot: function() {
        return this.argue.retVal(this.status, arguments) === "P";
      },

      /**
       * @return {boolean}
       */
      Other: function() {
        return this.argue.retVal(this.status, arguments) === "C";
      },

      /**
       * @return {boolean}
       */
      Visited: function() {
        return this.argue.retVal(this.status, arguments) === "XP";
      },

      /**
       * @return {boolean}
       */
      oVisited: function() {
        return this.argue.retVal(this.status, arguments) === "XC";
      }
    },

    area: {
      raw: {
        aRawL: function() {
          var p = this.argue.defArgP(arguments);

          return [p[0], p[1] - 1];
        },

        aRawT: function() {
          var p = this.argue.defArgP(arguments);

          return [p[0] - 1, p[1]];
        },

        aRawR: function() {
          var p = this.argue.defArgP(arguments);

          return [p[0], p[1] + 1];
        },

        aRawB: function() {
          var p = this.argue.defArgP(arguments);

          return [p[0] + 1, p[1]];
        }
      },

      refined: {
        refiners: null,

        arL: function() {
          var rawCoord = this.argue.retVal(this.area.raw.aRawL, arguments);

          if (rawCoord[1] < 0) {
            rawCoord = null;
          }

          return rawCoord;
        },

        arT: function() {
          var rawCoord = this.argue.retVal(this.area.raw.aRawT, arguments);

          if (rawCoord[0] < 0) {
            rawCoord = null;
          }

          return rawCoord;
        },

        arR: function() {
          var rawCoord = this.argue.retVal(this.area.raw.aRawR, arguments);

          if (rawCoord[1] > 15) {
            rawCoord = null;
          }

          return rawCoord;
        },

        arB: function() {
          var rawCoord = this.argue.retVal(this.area.raw.aRawB, arguments);

          if (rawCoord[0] > 15) {
            rawCoord = null;
          }

          return rawCoord;
        },

        all: function() {
          return this.argue.retVals(this.area.refined.refiners, arguments);
        }
      }
    },

    hazard: {
      canners: null,

      canLeft: function() {
        var left = this.argue.retVal(this.area.raw.aRawL, arguments);

        return left[1] !== -1 && this.is.Free(left);
      },

      canTop: function() {
        var top = this.argue.retVal(this.area.raw.aRawT, arguments);

        return top[0] !== -1 && this.is.Free(top);
      },

      canRight: function() {
        var right = this.argue.retVal(this.area.raw.aRawR, arguments);

        return right[0] !== 16 && this.is.Free(right);
      },

      canBot: function() {
        var bot = this.argue.retVal(this.area.raw.aRawB, arguments);

        return bot[1] !== 16 && this.is.Free(bot);
      }
    },

    edge: {
      directions: ["W", "N", "E", "S"],

      count: function() {
        var edgy = this.argue.retVals(this.hazard.canners, arguments);

        return edgy[0] + edgy[1] + edgy[2] + edgy[3];
      },

      countEdges: function() {
        var coords = this.argue.retVal(this.area.refined.all, arguments);

        var edges = [], mininal = 0;
        for (var point in coords) {
          if (point === null) {
            edges.push(Infinity);
          } else {
            var count = this.edge.count(point);
            edges.push(count);

            if (mininal > count) {
              mininal = edges.length - 1;
            }
          }
        }

        return mininal;
      },

      minimalEdge: function () {
        var idx = this.argue.retVal(this.edge.countEdges, arguments);

        return this.edge.directions[idx];
      }
    }
  };
  proto.area.refined.refiners = [proto.area.refined.arL, proto.area.refined.arT, proto.area.refined.arR, proto.area.refined.arB];
  proto.hazard.canners = [proto.hazard.canLeft, proto.hazard.canTop, proto.hazard.canRight, proto.hazard.canBot];

  var f_ = function(board, point) {
    this.b = board;
    this.p = point;
  };

  f_.prototype = proto;

  return f_;
});

// INPUT:  board   -> [RxC] multidimensional array with each element being either
//                    "null" (empty space),
//                    "P"    (your bot)
//                    "C"    (opponent bot),
//                    "XP"   (visited space by your bot),
//                    "XC"   (visited space by opponent bot)
//         bot_loc -> [r,c] where r=row and c=col of your bot on board
//         opp_loc -> [r,c] where r=row and c=col of opponent on board
// OUTPUT: N, E, S, W which signifies which direction to move

(function bot(board, bot_loc, opp_loc) {
  var util = new Util(board, bot_loc);

  return util.edge.minimalEdge();

})(readline());