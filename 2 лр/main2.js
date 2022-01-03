let inpVal = document.getElementById("input");
let btn = document.getElementById("btn");
let result = document.getElementById("result");

function digits(n) {
  return Array.from(String(n), String);
}
function start() {
  let input = digits(inpVal.value); // исходные данные
  let choice = [...input]; // данные для обработки
  if (choice == "") {
    console.log(choice);
    result.value = "Пустая цепочка";
    //console.log("Пустая цепочка");
  } else {
    check(choice);
  }
}

function check(choice) {
  // обработка входного значения (S)
  if (choice[0] >= 1 && choice[0] <= 4) {
    if (choice[0] != 1 && choice[0] != 2) {
      result.value = "Нет перехода";
      //console.log("Нет перехода");
    } else {
      build(choice);
    }
  } else {
    result.value = "Недопустимый символ";
    //console.log("Недопустимый символ");
  }
}

function build(choice) {
  let letter = "s"; //предыдущая буква
  while (choice.length > 0) {
    switch (letter) {
      case "s":
        if (choice[0] == 1) {
          letter = "b";
          //console.log(letter);
          choice.shift();
        } else if (choice[0] == 2) {
          letter = "a";
          //console.log(letter);
          choice.shift();
        } else {
          if (choice[0] >= 1 && choice[0] <= 4) {
            result.value = "Нет перехода";
            //console.log("Нет перехода");
            return;
          } else {
            result.value = "Недопустимый символ";
            //console.log("Недопустимый символ");
            return;
          }
        }
        break;
      case "a":
        if (choice[0] == 1) {
          letter = "a";
          //console.log(letter);
          choice.shift();
        } else if (choice[0] == 3) {
          letter = "z";
          //console.log(letter);
          choice.shift();
        } else {
          if (choice[0] >= 1 && choice[0] <= 4) {
            result.value = "Нет перехода";
            //console.log("Нет перехода");
            return;
          } else {
            result.value = "Недопустимый символ";
            //console.log("Недопустимый символ");
            return;
          }
        }
        break;
      case "b":
        if (choice[0] == 1) {
          letter = "b";
          //console.log(letter);
          choice.shift();
        } else if (choice[0] == 3) {
          letter = "z";
          //console.log(letter);
          choice.shift();
        } else {
          if (choice[0] >= 1 && choice[0] <= 4) {
            result.value = "Нет перехода";
            //console.log("Нет перехода");
            return;
          } else {
            result.value = "Недопустимый символ";
            //console.log("Недопустимый символ");
            return;
          }
        }
        break;
      case "z":
        if (choice[0] == 3) {
          letter = "b";
          //console.log(letter);
          choice.shift();
        } else if (choice[0] == 4) {
          letter = "a";
          //console.log(letter);
          choice.shift();
        } else {
          if (choice[0] >= 1 && choice[0] <= 4) {
            result.value = "Нет перехода";
            //console.log("Нет перехода");
            return;
          } else {
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
  if (letter == "z") {
    result.value = "Допустимая цепочка";
    //console.log("Допустимая цепочка");
  } else {
    result.value = "Не достигнут конечный символ";
    //console.log("Не достигнут конечный символ");
  }
}
