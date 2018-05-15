/*
    We will need to store the following nutritional information on user on our database:
    1. User dailyBurn/actualBurn (these will need to be updated as user updates there weight/age)
    2. As far as what diet user is on, I am not sure how you want to implement this. Should we store the macro and calories limits everytime they are
       recalculated or should we simply calculate in real time everyday?

*/

//export default class NutritionFunctions extends Component<{}> {
    export function dailyBurn(weight, Height, gender, age){ // calories burned by simply existing
        if (gender == 0){
            return 66 + (6.23 * weight) + (12.7 * Height) - (6.8 * age);
        }
        else{
            return 655 + (4.35 * weight) + (4.7 * Height) - (4.7 * age);
        }
    }

    export function actualBurn(dailyBurn, activity){ // calories actually burned according to activity level
        if (activity == 0){
            return (dailyBurn);
        }
        else if (activity == 1){
            return (dailyBurn * 1.1);
        }
        else if (activity == 2){
            return (dailyBurn * 1.15);
        }
    }



    export function keto(actualBurn){
       // actualBurn = actualBurn - (actualBurn * .20) ; // set deficit
        var macros = new Object();
        macros.carbs = (actualBurn * .07) / 4;  // grams of carbs
        macros.fats = (actualBurn * .69) / 9;  // grams of fats
        macros.protein = (actualBurn * .24) / 4; // grams of protein
        macros.carbs = Math.round(macros.carbs);
        macros.fats = Math.round(macros.fats);
        macros.protein = Math.round(macros.protein);
        return macros;
    }

    export function atkins(actualBurn){
        //actualBurn = actualBurn - (actualBurn * .20); // set deficit
        var macros = new Object();
        macros.carbs;
        macros.fats;
        macros.protein;
        return macros
    }


    // Calorie Restrictive Diets (Calorie based not macros based)
    export function SmallCalorieRestrictive(actualBurn){ // small calorie deficit
        return actualBurn - (actualBurn * .12);
    }

    export function MediumCalorieRestrictive(actualBurn){ // medium calorie deficit
        return actualBurn - (actualBurn * .24);
    }

    export function LargeCalorieRestrictive(actualBurn){ // large calorie deficit 
        return Math.round(actualBurn - (actualBurn * .50));
    }
//};