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
    defArg: function(args, defVal) {
      if (args.length === 0) {
        return defVal;
      } else {
        return args[0];
      }
    },

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
    Free: function() {
      return util.argue.retVal(util.status, arguments) === "null";
    },

    Bot: function() {
      return util.argue.retVal(util.status, arguments) === "P";
    },

    Other: function() {
      return util.argue.retVal(util.status, arguments) === "C";
    },

    Visited: function() {
      return util.argue.retVal(util.status, arguments) === "XP";
    },

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
        var rawCoord;
        if (arguments.length === 0) {
          rawCoord = util.area.raw.aRawL();
        } else {
          rawCoord = util.area.raw.aRawL(arguments[0]);
        }

        if (rawCoord[1] < 0) {
          rawCoord = null;
        }

        return rawCoord;
      },

      arT: function() {
        var rawCoord;
        if (arguments.length === 0) {
          rawCoord = util.area.raw.aRawT();
        } else {
          rawCoord = util.area.raw.aRawT(arguments[0]);
        }

        if (rawCoord[0] < 0) {
          rawCoord = null;
        }

        return rawCoord;
      },

      arR: function() {
        var rawCoord;
        if (arguments.length === 0) {
          rawCoord = util.area.raw.aRawR();
        } else {
          rawCoord = util.area.raw.aRawR(arguments[0]);
        }

        if (rawCoord[1] < 0) {
          rawCoord = null;
        }

        return rawCoord;
      },

      arB: function() {
        var rawCoord;
        if (arguments.length === 0) {
          rawCoord = util.area.raw.aRawB();
        } else {
          rawCoord = util.area.raw.aRawB(arguments[0]);
        }

        if (rawCoord[0] < 0) {
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

    bleed: function() {
      var around = [];
      var refinedAreas;
      if (arguments.length === 0) {
        refinedAreas = util.area.refined.all();
      } else {
        refinedAreas = util.area.refined.all(arguments[0]);
      }

      for (var dir in refinedAreas) {
        if (dir !== null) {
          around.push(dir);
        }
      }
      return around;
    }
  },

  dir: {
    canLeft: function() {
      var left;
      if (arguments.length === 0) {
        left = util.area.raw.aRawL();
      } else {
        left = util.area.raw.aRawL(arguments[0]);
      }

      return left[1] !== -1 && util.is.Free(left);
    },

    canTop: function() {
      var top;
      if (arguments.length === 0) {
        top = util.area.raw.aRawT();
      } else {
        top = util.area.raw.aRawT(arguments[0]);
      }

      return top[0] !== -1 && util.is.Free(top);
    },

    canBot: function() {
      var bot;
      if (arguments.length === 0) {
        bot = util.area.raw.aRawT();
      } else {
        bot = util.area.raw.aRawT(arguments[0]);
      }

      return bot[0] !== 16 && util.is.Free(bot);
    },

    canRight: function() {
      var right;
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

  if (util.dir.canTop()) {
    return "N";
  } else if (util.dir.canLeft()) {
    return "W";
  } else if (util.dir.canBot()) {
    return "S";
  } else {
    return "E";
  }

})(readline());