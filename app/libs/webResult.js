import xss from 'xss'
import moment from 'moment'

function WebResult(req) {
  this.jsonCallbackName = xss(req.query.callback || "");
  this.code = 1;
  this.msg = "";
  this.data = {};
}

WebResult.prototype = {
  set: function (code, msg) {
    this.code = code;
    this.msg = msg
  },
  setResult: function (result) {
    this.data = result
  },

  toJSON: function () {
    return {
      success: (this.code == 1),
      code: this.code,
      message: this.msg,
      data: this.data,
      returnTime: moment().format('YYYY-MM-DD HH:mm:ss')
    }
  },
  toString: function () {
    var resultString = JSON.stringify(this.toJSON());

    return this.jsonCallbackName ? this.jsonCallbackName + "(" + resultString + ")" : resultString;

  }
}

module.exports = WebResult;