/**
 * Created by Salvador on 4/9/2015.
 */
var util = {
  b: null,
  p: null,

  status: function() {
    if (arguments.length === 0) {
      return util.b[util.p[0]][util.p[1]];
    } else {
      var arg = arguments[0];
      return util.b[arg[0]][arg[1]];
    }

  },

  argue: {
    defArgP: function(args) {
      if (args.length === 0) {
        return util.p;
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
    }
  },

  is: {
    /**
     * @return {boolean}
     */
    Free: function() {
      return util.argue.retVal(util.status, arguments) === "null";
    },

    /**
     * @return {boolean}
     */
    Bot: function() {
      return util.argue.retVal(util.status, arguments) === "P";
    },

    /**
     * @return {boolean}
     */
    Other: function() {
      return util.argue.retVal(util.status, arguments) === "C";
    },

    /**
     * @return {boolean}
     */
    Visited: function() {
      return util.argue.retVal(util.status, arguments) === "XP";
    },

    /**
     * @return {boolean}
     */
    oVisited: function() {
      return util.argue.retVal(util.status, arguments) === "XC";
    }
  },

  area: {
    raw: {
      aRawL: function() {
        var p = util.argue.defArgP(arguments);

        return [p[0], p[1] - 1];
      },

      aRawT: function() {
        var p = util.argue.defArgP(arguments);

        return [p[0] - 1, p[1]];
      },

      aRawR: function() {
        var p = util.argue.defArgP(arguments);

        return [p[0], p[1] + 1];
      },

      aRawB: function() {
        var p = util.argue.defArgP(arguments);

        return [p[0] + 1, p[1]];
      }
    },

    refined: {
      arL: function() {
        var rawCoord = util.argue.retVal(util.area.raw.aRawL, arguments);

        if (rawCoord[1] < 0) {
          rawCoord = null;
        }

        return rawCoord;
      },

      arT: function() {
        var rawCoord = util.argue.retVal(util.area.raw.aRawT, arguments);

        if (rawCoord[0] < 0) {
          rawCoord = null;
        }

        return rawCoord;
      },

      arR: function() {
        var rawCoord = util.argue.retVal(util.area.raw.aRawR, arguments);

        if (rawCoord[1] > 15) {
          rawCoord = null;
        }

        return rawCoord;
      },

      arB: function() {
        var rawCoord = util.argue.retVal(util.area.raw.aRawB, arguments);

        if (rawCoord[0] > 15) {
          rawCoord = null;
        }

        return rawCoord;
      },

      all: function() {
        if (arguments.length === 0) {
          return [util.area.refined.arL(), util.area.refined.arT(), util.area.refined.arR(), util.area.refined.arB()];
        } else {
          var arg = arguments[0];
          return [util.area.refined.arL(arg), util.area.refined.arT(arg), util.area.refined.arR(arg), util.area.refined.arB(arg)];
        }
      }
    },

  hazard: {
    canLeft: function() {
      var left = util.argue.retVal(util.area.raw.aRawL, arguments);

      return left[1] !== -1 && util.is.Free(left);
    },

    canTop: function() {
      var top = util.argue.retVal(util.area.raw.aRawT, arguments);

      return top[0] !== -1 && util.is.Free(top);
    },

    canRight: function() {
      var right = util.argue.retVal(util.area.raw.aRawR, arguments);

      return right[0] !== 16 && util.is.Free(right);
    },

    canBot: function() {
      var bot = util.argue.retVal(util.area.raw.aRawB, arguments);

      return bot[1] !== 16 && util.is.Free(bot);
    }
  },

      if (arguments.length === 0) {
        right = util.area.raw.aRawT();
      } else {
        right = util.area.raw.aRawT(arguments[0]);
      }

      return right[1] !== 16 && util.is.Free(right);
    }
  }
};

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
  util.b = board;
  util.p = bot_loc;

  if (util.hazard.canTop()) {
    return "N";
  } else if (util.hazard.canLeft()) {
    return "W";
  } else if (util.hazard.canBot()) {
    return "S";
  } else {
    return "E";
  }

})(readline());