let regular=[ 
    {
        value:"-",
        nextValue:['letter','(','num'],
        prevValue:['letter',')','num','','('],
        failMessage:"НЕ НАЙДЕНА ПЕРЕМЕННАЯ, НЕ НАЙДЕНА СКОБКА, ИЛИ НЕПРАВИЛЬНОЕ ИСПОЛЬЗОВАНИЕ СИНТАКСИЧЕСКОГО ЗНАКА",
        type:"binary"
        
    },
    {
        value:"+",
        nextValue:['letter','(','num'],
        prevValue:['letter',')','num'],
        failMessage:"НЕ НАЙДЕНА ПЕРЕМЕННАЯ, НЕ НАЙДЕНА СКОБКА, ИЛИ НЕПРАВИЛЬНОЕ ИСПОЛЬЗОВАНИЕ СИНТАКСИЧЕСКОГО ЗНАКА",
        type:"binary"
        
    },
    {
        value:"*",
        nextValue:['letter','(','num'],
        prevValue:['letter',')','num'],
        failMessage:"НЕ НАЙДЕНА ПЕРЕМЕННАЯ, НЕ НАЙДЕНА СКОБКА, ИЛИ НЕПРАВИЛЬНОЕ ИСПОЛЬЗОВАНИЕ СИНТАКСИЧЕСКОГО ЗНАКА",
        type:"binary"
        
    },
   {
        value:"letter",
        nextValue:['letter','*','-','+','',')'],
        prevValue:['letter','*','-','+','(',''],
        failMessage:"НЕДОПУСТИМЫЙ ИЛИ ПРОПУЩЕННЫЙ СИНТАКСИЧЕСКИЙ СИМВОЛ ПОСЛЕ ПЕРЕМЕННОЙ",
        type:"none"

   },
   {  
        value:"num",
        nextValue:['num','*','-','+','',')'],
        prevValue:['num','(','*','-','+',''],
        failMessage:"НЕДОПУСТИМЫЙ ИЛИ ПРОПУЩЕННЫЙ СИНТАКСИЧЕСКИЙ СИМВОЛ ПОСЛЕ КОНСТАНТЫ",
        type:"none"

        
   },
    {
        value:")",
        nextValue:['*','-','+','',')'],
        prevValue:['num','letter', ')'],
        failMessage:"НЕПРАВИЛЬНОЕ ИСПОЛЬЗОВАНИЕ СКОБОК, ПРОПУЩЕНА ПЕРЕМЕННАЯ ИЛИ КОНСТАНТА, НЕДОПУСТИМЫЙ СИНТАКСИЧЕСКИЙ СИМВОЛ",
        type:"none"


    },
    {
        value:"(",
        nextValue:['num','letter','-','('],
        prevValue:['*','-','+','','('],
        failMessage:"НЕПРАВИЛЬНОЕ ИСПОЛЬЗОВАНИЕ СКОБОК, ПРОПУЩЕНА ПЕРЕМЕННАЯ ИЛИ КОНСТАНТА, НЕДОПУСТИМЫЙ СИНТАКСИЧЕСКИЙ СИМВОЛ",
        type:"none"


    }
] 
console.log(regular[0].prevValue.length);
let arrOfPerems = [];//массив объявленных переменных
let inpVal = document.getElementById('inp-val');
let res = document.getElementById('res');
let variables=/^[a-z]{1,8}$/ //регулярное выражение для переменных
let regLetter = /[a-z]/;
let regNumber = /[0-9]/;

function startProgram() {
    let str = inpVal.value;
    if(str === ''){//проверка на пустоту строки
        res.value = "ПУСТАЯ СТРОКА";
        return;
    }
    let toCheck=str.substr(0, 4)//берем из строки первых 4 символов

    if (toCheck !=='VAR '){
        res.value="НЕВЕРНОЕ КЛЮЧЕВОЕ СЛОВО, ЛИШНИЙ СИНТАКСИЧЕСКИЙ ЗНАК ИЛИ ОТСУТСТВИЕ ПРОБЕЛА";
        return;
    }

    str = str.substr(4);

    let check2= str.search(':INTEGER');//-1 берем блок с переменными от VAR до :INTEGER
    let perems= str.substr(0, check2); 
  
    if(perems.indexOf(',') ==-1){//если в блоке с переменными одна переменная
        arrOfPerems[0] = perems;
        let test = variables.test(arrOfPerems[0]);//проверка на допустимую переменную
        if(!test) {
            res.value="ОШИБКА В ОБЬЯВЛЕНИИ ПЕРЕМЕННОЙ ИЛИ НЕВЕРНОЕ КЛЮЧЕВОЕ СЛОВО";
            return;
        }
    }
    else{
        arrOfPerems=perems.split(',');//если переменных несколько, делим блок с переменными на отдельные переменные
        for(let i=0;i < arrOfPerems.length;i++){
            let test = variables.test(arrOfPerems[i]);
            if(!test) {
                res.value="ОШИБКА В ОБЬЯВЛЕНИИ ПЕРЕМЕННОЙ ИЛИ НЕВЕРНОЕ КЛЮЧЕВОЕ СЛОВО";
                return;
            }
        }
    }
    
    if(check2 == -1){//проверка на :INTEGER
        res.value = "НЕВЕРНОЕ КЛЮЧЕВОЕ СЛОВО ИЛИ НЕДОПУСТИМЫЙ СИНТАКСИЧЕСКИЙ СИМВОЛ";
        return;
    }
    str = str.substr(check2+8);
    if(!str.startsWith(';')){//проверка на ; после INTEGER
        res.value = "НЕДОПУСТИМЫЙ СИНТАКСИЧЕСКИЙ СИМВОЛ ИЛИ ЕГО ОТСУТСТВИЕ";
        return;
    }
    str = str.substr(1);
    if(!str.startsWith('BEGIN ')){// проверка на BEGIN 
        res.value = "НЕВЕРНОЕ КЛЮЧЕВОЕ СЛОВО, ЛИШНИЙ ПРОБЕЛ ИЛИ ОТСУТСТВИЕ ПРОБЕЛА";
        return;
    }
    str = str.substr(6);
    
    // let check2= str.search(':INTEGER');//-1 берем блок с переменными от VAR до :INTEGER
    // let perems= str.substr(0, check2); 

    //let final = [];//END
    let end = str.search('END');
    let str_end = str.substr(end);
    str = str.substr(0,end);
    if(end ===-1){
        res.value = "НЕВЕРНОЕ КЛЮЧЕВОЕ СЛОВО, ОТСУТСТВИЕ КЛЮЧЕВОГО СЛОВА, НЕДОПУСТИМЫЕ СИМВОЛЫ ИЛИ ОТСУТСТВИЕ СИНТАКСИЧЕСКОГО СИМВОЛА";
        return;
    }
    console.log("end ", str_end)
    console.log("str ",str);
    let prisv=str.split(';');//одно из присваиваний
    let perems2=[];//массив пар идентификатор, выражение в присваивании
    for(let i=0;i<prisv.length;i++){
        if(prisv[i].indexOf('=') !==-1){
            perems2.push(prisv[i].split('='));
        }
        /*else{
            final.push(prisv[i]);
            console.log("final ",final);
        }*/
    }
    console.log("perems2 ",perems2);
    console.log(arrOfPerems);
    let counter = [];//количество каждого элемента из arrOfPerems перед = в присваивании
    for(let i = 0; i <arrOfPerems.length;i++){
        counter.push(0);
    }
    for(let i = 0; i <perems2.length;i++){
        let c = 0;//количество инициализированных переменных  до = в присваивании
        
        for(let j = 0; j < arrOfPerems.length; j++){
            if(perems2[i][0] == arrOfPerems[j]){
                counter[j]++;
                c++;
            }
        }
        if(c == 0){
            res.value = "ПЕРЕМЕННАЯ НЕ ОБЪЯВЛЕНА ИЛИ НЕДОПУСТИМЫЙ СИНТАКСИЧЕСКИЙ СИМВОЛ";
            return;
        }
    }
    for(let j = 0; j < counter.length; j++){
        if(counter[j] == 0){
            res.value = "ОБЪЯВЛЕННАЯ ПЕРЕМЕННАЯ НЕ ИСПОЛЬЗОВАНА, ПЕРЕМЕННАЯ НЕ ИНИЦИАЛИЗИРОВАНА, ОТУТСТВИЕ СИНТАКСИЧЕСКОГО СИМВОЛА, ПРИСУТСТВИЕ ЛИШНЕГО СИНТАКСИЧЕСКОГО СИМВОЛА";
            return;
        }
        if(counter[j] > 1){
            res.value = "ПЕРЕМЕННАЯ ИНИЦИАЛИЗИРОВАНА НЕСКОЛЬКО РАЗ";
            return;
        }
    }
    /**=============================== ОБРАБОТКА ПОДВЫРАЖЕНИЙ ============================ */
    for(let i = 0; i < perems2.length; i++){
        let stroka = [];
        let perem = perems2[i][1];
        if(perem === ''){
            res.value = "ОЖИДАЛОСЬ ПРИСВАИВАНИЕ";
            return;
        }
        for(let j = 0; j <perem.length; j++){
            let tek = perem[j];
            if(regLetter.test(tek)){
                stroka.push('letter');
            }
            else if(regNumber.test(tek)){
                stroka.push('num');
            }
            else{
                stroka.push(tek);
            }
        }
        let countLet = 0;
        let flag = false;
        for(let i = 0; i <stroka.length; i++){
            if(stroka[i] === 'letter'){
                flag = true;
                countLet++;
                //break;
            }
        }
        let findPerem=0;
        console.log("flag ",flag);
        if(flag){
            for(let i = 0; i <arrOfPerems.length; i++){
                console.log(perem.search(arrOfPerems[i]))
                console.log(arrOfPerems[i])
                console.log(perem)
                if((perem.search(arrOfPerems[i])!==-1) && (countLet===arrOfPerems[i].length)){
                    findPerem++;
                }
            }
            if(findPerem===0){
                res.value="ПЕРЕМЕННАЯ НЕ ОБЪЯВЛЕНА";
                return;
            }
        }
        console.log(stroka);
        let count = 0;
        let pred = '';
        while(stroka.length > 0){
            if((pred ==='') && ((stroka[0] === '*')||(stroka[0] ==='+'))){
                res.value = "НЕДОПУСТИМЫЙ СИМВОЛ";
                return;
            }
            console.log("str ", stroka[0]);
            switch(stroka[0]){
                case regular[0].value:
                    console.log("pred ",pred);
                    if(stroka.length === 1){
                        if(regular[0].type !=="binary"){
                            arr0 = regular[0].prevValue.filter(i=>i===pred);
                        }
                        else{
                            res.value = regular[0].failMessage;
                            return;
                        }
                    }
                    else{
                        arr0=regular[0].nextValue.filter(i=>i===stroka[1]);
                    }
                    if(arr0.length===0){
                        res.value = regular[0].failMessage;
                        return;
                    }
                    pred = stroka[0];
                    stroka.shift();
                    break;
                case regular[1].value:
                    console.log("pred ",pred);
                    if(stroka.length === 1){
                        if(regular[1].type !=="binary"){
                            arr1 = regular[1].prevValue.filter(i=>i===pred);
                        }
                        else{
                            res.value = regular[1].failMessage;
                            return;
                        }
                    }
                    else{
                        arr1=regular[1].nextValue.filter(i=>i===stroka[1]);
                    }
                    if(arr1.length===0){
                        res.value = regular[1].failMessage;
                        return;
                    }
                    pred = stroka[0];
                    stroka.shift();
                    break;
                case regular[2].value:
                    console.log("pred ",pred);
                    if(stroka.length === 1){
                        if(regular[2].type !=="binary"){
                            arr2 = regular[2].prevValue.filter(i=>i===pred);
                        }
                        else{
                            res.value = regular[2].failMessage;
                            return;
                        }
                    }
                    else{
                        arr2=regular[2].nextValue.filter(i=>i===stroka[1]);
                    }
                    if(arr2.length===0){
                        res.value = regular[2].failMessage;
                        return;
                    }
                    pred = stroka[0];
                    stroka.shift();
                    break;
                case regular[3].value:
                    console.log("pred ",pred);
                    if(stroka.length === 1){
                        arr3 = regular[3].prevValue.filter(i=>i===pred);
                    }
                    else{
                        arr3=regular[3].nextValue.filter(i=>i===stroka[1]);
                    }
                    if(arr3.length===0){
                        res.value = regular[3].failMessage;
                        return;
                    }
                    pred = stroka[0];
                    stroka.shift();
                    break;
                case regular[4].value:
                    console.log("pred ",pred);
                    if(stroka.length === 1){
                        arr4= regular[4].prevValue.filter(i=>i===pred);
                    }
                    else{
                        arr4=regular[4].nextValue.filter(i=>i===stroka[1]);
                    }
                    if(arr4.length===0){
                        res.value = regular[4].failMessage;
                        return;
                    }
                    pred = stroka[0];
                    stroka.shift();
                    break;
                case regular[5].value:
                    console.log("pred ",pred);
                    if(stroka.length === 1){
                        arr5= regular[5].prevValue.filter(i=>i===pred);
                    }
                    else{
                        arr5=regular[5].nextValue.filter(i=>i===stroka[1]);
                    }
                    if(arr5.length===0){
                        res.value = regular[5].failMessage;
                        return;
                    }
                    count--;//подсчет скобок
                    pred = stroka[0];
                    stroka.shift();
                    break;  
                case regular[6].value:
                    console.log("pred ",pred);
                    if(stroka.length === 1){
                        arr6= regular[6].prevValue.filter(i=>i===pred);
                    }
                    else{
                        arr6=regular[6].nextValue.filter(i=>i===stroka[1]);
                        
                    }
                    console.log("arr6 ",arr6);
                    if(arr6.length===0){
                        res.value = regular[6].failMessage;
                        return;
                    }
                    count++;//подсчет скобок
                    pred = stroka[0];
                    stroka.shift();
                    break;
            }
            console.log(count);
        }
        console.log(count);
            if(count !== 0){
                res.value = "НЕПРАВИЛЬНОЕ ИСПОЛЬЗОВАНИЕ СКОБОК";
                return;
            }
    }
    if( str_end!== 'END'){
        res.value = "НЕВЕРНОЕ КЛЮЧЕВОЕ СЛОВО, ОТСУТСТВИЕ КЛЮЧЕВОГО СЛОВА, НЕДОПУСТИМЫЕ СИМВОЛЫ ИЛИ ОТСУТСТВИЕ СИНТАКСИЧЕСКОГО СИМВОЛА";
        return;
      
    }
    res.value = "ВСЕ ВЕРНО";
    return;
}



