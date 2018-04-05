export default class NutritionFunctions extends Component<{}> {
    function dailyBurn(weight, Height, gender, age){
        if (Gender == M){
            return 66 + (6.2 * weight) + (12.7 * Height) - (6.76 * age);
        }
        else{
            return 655.1 +(4.35 * weight) + (4.7 * Height) - (4.7 * age);
        }
    }



    function atkins(dailyBurn){
        var macros = new Object();
        macros.carbs;
        macros.fats;
        macros.protein;
    }

    function keto(dailyBurn){
        var macros = new Object();
        macros.carbs;
        macros.fats;
        macros.protein;
    }

    function calorieRestrictive(dailyBurn){
        return dailyBurn - (dailyBurn * )
    }
};