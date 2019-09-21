   // custom function - convert miles to radian
   let milesToRadian = function(miles) {
    var earthRadiusInMiles = 3963;
    return miles / earthRadiusInMiles;
};

// or custom function - convert km to radian
let kmToRadian = function(miles) {
    var earthRadiusInMiles = 6378;
    return miles / earthRadiusInMiles;
};