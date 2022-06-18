function convertNumericStringsToNumbers (jsonArray) {
  for (var jsonObjectIndex in jsonArray) {
    const jsonObject = jsonArray[jsonObjectIndex];
    for (var property in jsonObject) {
      if (Number(jsonObject[property])){
        jsonArray[jsonObjectIndex][property] = Number(jsonObject[property]);
      }
    }
  }
  return jsonArray;
}

export default convertNumericStringsToNumbers;
