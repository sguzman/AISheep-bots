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

  is: {
    Free: function() {
      if (arguments.length === 0) {
        return util.status() === "null";
      } else {
        return util.status(arguments[0]) === "null";
      }
    },

    Bot: function() {
      if (arguments.length === 0) {
        return util.status() === "P";
      } else {
        return util.status(arguments[0]) === "P";
      }
    },

    Other: function() {
      if (arguments.length === 0) {
        return util.status() === "C";
      } else {
        return util.status(arguments[0]) === "C";
      }
    },

    Visited: function() {
      if (arguments.length === 0) {
        return util.status() === "XP";
      } else {
        return util.status(arguments[0]) === "XP";
      }
    },

    oVisited: function() {
      if (arguments.length === 0) {
        return util.status() === "XC";
      } else {
        return util.status(arguments[0]) === "XC";
      }
    }
  },

  area: {
    raw: {
      aRawL: function() {
        var p;
        if (arguments.length === 0) {
          p = util.p;
        } else {
          p = arguments[0];
        }

        return [p[0], p[1] - 1];
      },

      aRawT: function() {
        var p;
        if (arguments.length === 0) {
          p = util.p;
        } else {
          p = arguments[0];
        }

        return [p[0] - 1, p[1]];
      },

      aRawR: function() {
        var p;
        if (arguments.length === 0) {
          p = util.p;
        } else {
          p = arguments[0];
        }

        return [p[0], p[1] + 1];
      },

      aRawB: function() {
        var p;
        if (arguments.length === 0) {
          p = util.p;
        } else {
          p = arguments[0];
        }

        return [p[0] + 1, p[1]];
      }
    },

    refined: {
      arL: function() {
        var rawCoord = util.area.raw.aRawL();
        if (rawCoord[1] < 0) {
          rawCoord = null;
        }

        return rawCoord;
      },

      arT: function() {
        var rawCoord = util.area.raw.aRawT();
        if (rawCoord[0] < 0) {
          rawCoord = null;
        }

        return rawCoord;
      },

      arR: function() {
        var rawCoord = util.area.raw.aRawR();
        if (rawCoord[1] < 0) {
          rawCoord = null;
        }

        return rawCoord;
      },

      arB: function() {
        var rawCoord = util.area.raw.aRawB();
        if (rawCoord[0] < 0) {
          rawCoord = null;
        }

        return rawCoord;
      },

      all: function() {
        return [util.area.refined.arL(), util.area.refined.arT(), util.area.refined.arR(), util.area.refined.arB()];
      }
    },

    bleed: function() {
      var around = [];
      var refinedAreas = util.area.refined.all();

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
      var left = util.area.raw.arL();
      return left[1] !== -1 && util.is.Free(left);
    },

    canTop: function() {
      var top = util.area.raw.arT();
      return top[0] !== -1 && util.is.Free(top);
    },

    canBot: function() {
      var bot = util.area.raw.arB();
      return bot[0] !== 16 && util.is.Free(bot);
    },

    canRight: function() {
      var right = util.area.raw.arR();
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