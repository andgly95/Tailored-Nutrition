export default class NutritionFunctions extends Component<{}> {
    function dailyBurn(weight, Height, gender, age){ // calories burned by simply existing
        if (Gender == M){
            return (66 + (6.2 * weight) + (12.7 * Height) - (6.76 * age));
        }
        else{
            return (655.1 +(4.35 * weight) + (4.7 * Height) - (4.7 * age));
        }
    }

    function actualBurn(dailyBurn, activity){ // calories actually burned according to activity level
        if (activity == L){
            return (dailyBurn * 1.2);
        }
        else if (activity == M){
            return (dailyBurn * 1.55);
        }
        else if (activity == H){
            return (dailyBurn * 1.725);
        }
    }



    function keto(actualBurn){
        actualBurn = actualBurn * .20; // set deficit
        var macros = new Object();
        macros.carbs = (actualBurn * .07) / 4;  // grams of carbs
        macros.fats = (actualBurn * .69) / 9;  // grams of fats
        macros.protein = (actualBurn * .24) / 4; // grams of protein
    }

    function atkins(actualBurn){
        actualBurn = actualBurn * .20; // set deficit
        var macros = new Object();
        macros.carbs;
        macros.fats;
        macros.protein;
    }


    // Calorie Restrictive Diets (Calorie based not macros based)
    function SmallCalorieRestrictive(dailyBurn){ // small calorie deficit
        return dailyBurn - (dailyBurn * .12);
    }

    function MediumCalorieRestrictive(dailyBurn){ // medium calorie deficit
        return dailyBurn - (dailyBurn * .24);
    }

    function LargeCalorieRestrictive(dailyBurn){ // large calorie deficit 
        return dailyBurn - (dailyBurn * .36);
    }
};