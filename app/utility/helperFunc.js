
exports.mainCityArr = ["mumbai", "delhi", "kolkata", "pune", "bangalore", "hyderabad", "ahmedabad", "chennai"];

const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

exports.isEmpty = isEmpty;

exports.addSlashes = function addSlashes(input) {
  //  let str;
  if(input != undefined && input != null){
    return (input = input.replace(/'/g, "\\'"));
  }
};

exports.isJSON = function isJSON(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};


exports.addslashes = (str) => {
    str = str.replace(/\\/g, '\\\\');
    str = str.replace(/\'/g, '\\\'');
    str = str.replace(/\"/g, '\\"');
    str = str.replace(/\0/g, '\\0');
    return str;
};
 
exports.stripslashes = (str) => {
    str = str.replace(/\\'/g, '\'');
    str = str.replace(/\\"/g, '"');
    str = str.replace(/\\0/g, '\0');
    str = str.replace(/\\\\/g, '\\');
    return str;
};

exports.undefNullEmptyCheck = (obj) => {
  if( typeof obj !== 'undefined' && obj && obj != "" ) {
    return true;
  }else{
    return false;
  }
}


