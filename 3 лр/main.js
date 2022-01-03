let inpVal = document.getElementById("input");
let btn = document.getElementById("btn");
let result = document.getElementById("result");

function digits(n){
    return Array.from(String(n),String);
}
function start(){
    let input=digits(inpVal.value);// исходные данные
    let choice = [...input];  // данные для обработки
     if(choice==""){
        console.log(choice);
        result.value = "Пустая цепочка";
        //console.log("Пустая цепочка");
        }
    else{
        check(choice);
        }
}
function check(choice){// обработка входного значения (S)
    if(choice[0] >= 1 && choice[0] <= 2){
        if(choice[0] == 2){
            result.value = "Нет перехода";
            //console.log("Нет перехода");
        }
        else{
            build(choice);
        }
    }
    else{
        result.value = "Недопустимый символ";
        //console.log("Недопустимый символ");
    }
}

function build(choice){
    let letter = 's';//предыдущая буква
    while(choice.length > 0){        
        switch(letter){
            case 's':
                if(choice[0] == 1){
                    letter = 'a';
                    choice.shift();
                }
                else{
                    if (choice[0] == 2){
                        result.value = "Нет перехода";
                        //console.log("Нет перехода");
                        return;
                    }
                    else{
                        result.value = "Недопустимый символ";
                        //console.log("Недопустимый символ");
                        return;
                    }
                }
            case 'a':
                if(choice[0] == 1){
                    letter = 'b';
                    choice.shift();
                }
                else{
                    if (choice[0] == 2){
                        result.value = "Нет перехода";
                        //console.log("Нет перехода");
                        return;
                    }
                    else{
                        result.value = "Недопустимый символ";
                        //console.log("Недопустимый символ");
                        return;
                    }
                }
                break;
                case 'b':
                    if(choice[0] == 2){
                        letter = 'c';
                        choice.shift();
                    }
                    else{
                        if (choice[0] == 1){
                            result.value = "Нет перехода";
                            //console.log("Нет перехода");
                            return;
                        }
                        else{
                            result.value = "Недопустимый символ";
                            //console.log("Недопустимый символ");
                            return;
                        }
                    }
                    break;
            case 'c':
                if (choice[0] == 2){
                    letter = 'ed';
                    //console.log(letter);
                    choice.shift();
                }
            
                else{
                    if (choice[0] == 1){
                        result.value = "Нет перехода";
                        //console.log("Нет перехода");
                        return;
                    }
                    else{
                        result.value = "Недопустимый символ";
                        //console.log("Недопустимый символ");
                        return;
                    }
                }
                break;

            case 'ed': 
                if (choice[0]==2){
                    letter='v';
                    choice.shift();
                }
                else if (choice[0]==1){
                    letter='i'
                    choice.shift();
                }
                else{  
                    result.value = "Недопустимый символ";
                    return;
                }
                break;
            case 'v':
                if(choice[0] == 1){
                    letter = 'wx';
                    //console.log(letter);
                    choice.shift();
                }
                else{
                    if (choice[0] == 2){
                        result.value = "Нет перехода";
                        //console.log("Нет перехода");
                        return;
                    }
                    else{
                        result.value = "Недопустимый символ";
                        //console.log("Недопустимый символ");
                        return;
                    }
                }
                break;
            case 'wx':
                if(choice[0] == 1){
                    letter = 'c';
                    //console.log(letter);
                    choice.shift();
                }
                else{
                    if (choice[0] == 2){
                        result.value = "Нет перехода";
                        //console.log("Нет перехода");
                        return;
                    }
                    else{
                        result.value = "Недопустимый символ";
                        //console.log("Недопустимый символ");
                        return;
                    }
                }
                break;
            case 'i':
                if(choice[0] == 2){
                    letter = 'wx';
                    //console.log(letter);
                    choice.shift();
                }
                else{
                    if (choice[0] == 1){
                        result.value = "Нет перехода";
                        //console.log("Нет перехода");
                        return;
                    }
                    else{
                        result.value = "Недопустимый символ";
                        //console.log("Недопустимый символ");
                        return;
                    }
                }
                break;
            default:
                result.value = "Нет перехода";
                //console.log("Нет перехода");
                return;
        }
        //console.log("prom " + letter);   
    }
    console.log("final: " + letter);
    if (letter == 'c'){
        result.value = "Допустимая цепочка";
        //console.log("Допустимая цепочка");
    }
    else{
        result.value = "Не достигнут конечный символ";
        //console.log("Не достигнут конечный символ");
    }
}   