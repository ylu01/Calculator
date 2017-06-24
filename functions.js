/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//example 15+46x25+
//15+35
//15+46+35+222
//15-3+254-16
//5x4+5-6/2+14 -> break down to "A5x4", "A5", "S6/2", "A14"
//do i even have to?
//
//5x4+5-6/2+14
//treat "5x4" as one object
//have a toAdd array, it would contain in this case
//["5x4",5,"-6/2",14]
//
/*

*/
//
//
//
//or just
//turn input to integer
//change result
//takes strings in the format of "(15+3-5/2*3)" 
var display;// the display variable on screen,. 
var toAdd = [];//handles all the add and minus's
var MDarr = []; //multiplications and divisions.
var test = "a";
var finalAnswer; //type int.


//-----------------TEST UNCTIONS -----------------------------     


function test1(){
    //calculate(["-5","25","33","-15","-20"]);
    //sin-25*15/5*4+25+cos-90-15/3+2*-8/4+15-10-2*-3*4
    var str = "sin-25*15/5*4+25+cos-90-15/3+2*-8/4+15-10-2*-3*4";
    var s1 = str.replace(/\+/gi,",+");
    
    var s2 = s1.replace(/\-/gi,",-");
    var s3 = s2.replace(/(\*\,)/gi,"*");
    var s4 = s3.replace(/(\/\,)|(\,\/)/gi, "/");
    s4 = s4.replace(/(sin\,)/gi,"sin");
    s4 = s4.replace(/(cos\,)/gi, "cos");
    s4 = s4.replace(/(tan\,)/gi, "tan");
    var res = s4.split(",");
    for(var temp = 0; temp < res.length; temp++){
        if(res[temp][0] === "+"){
            //alert(s4[temp]);
            res[temp] = res[temp].substr(1);
            //alert(s4[temp]);
        }
    }
    alert(res);
}
//test equation validity
//go through cases that shouldn't be legal.
function test2(input){
    var testStr = "1+4+5-6*-sin-90+40/5";
    if(/([\+\-\*\/][\+\-\*\/]+)/gi.test(input) === true){
        alert("somethings wrong repeat");
    }
    if(input[0] === "/" || input[0] === "*" || input[0] === "+" ){
        alert("something wrong beginning with");
    }
    if(/(sin[\+\*\/]+)/gi.test(input) === true || /(cos[\+\*\/]+)/gi.test(input) === true || /(tan[\+\*\/]+)/gi.test(input) === true){
        alert("somethings wrong trig illegal");
    }
    if(/(sin[a-zA-Z]+)/gi.test(input) === true || /(cos[a-zA-Z]+)/gi.test(input) === true || /(tan[a-zA-Z]+)/gi.test(input) === true){
        alert("somethings wrong repeated trig");
    }
    else{
        alert("good");
    }
}





//-------------------END TEST FUNCTIONS--------------------------
function makeArr(equation) {
    
    var s1 = equation.replace(/\+/gi,",+");
    
    var s2 = s1.replace(/\-/gi,",-");
    var s3 = s2.replace(/(\*\,)/gi,"*");
    var s4 = s3.replace(/(\/\,)|(\,\/)/gi, "/");
    s4 = s4.replace(/(sin\,)/gi,"sin");
    s4 = s4.replace(/(cos\,)/gi, "cos");
    s4 = s4.replace(/(tan\,)/gi, "tan");
    var res = s4.split(",");
    if(res[0] === ""){
        alert("yes");
        res.shift();
    }
    for(var temp = 0; temp < res.length; temp++){
        if(res[temp][0] === "+"){
            //alert(s4[temp]);
            res[temp] = res[temp].substr(1);
            //alert(s4[temp]);
        }
    }
    return res;
    
    
    
}
function initialize(){
    display = "";
    toAdd = [];
    MDarr = [];
    finalAnswer = 0;
}

function append(id){
    //alert(document.getElementById(id).innerHTML);
    display += document.getElementById(id).innerHTML.toLowerCase();
    document.getElementById("display").innerHTML = display;
}

function calcTrig(arr){
    var isNegative; //flag for is negative or not. 
    var trig; 
    var num; 
    var result; 
    if(arr[0] === "-"){
        isNegative = 1;
        trig = arr.substring(0, 4);
        num = arr.substr(4);
    }
    else{
        isNegative = 0;
        trig = arr.substring(0, 3);
        var num = arr.substr(3);
    }
     //alert("trig = " + trig + " num = " + num);
     num = parseFloat(num);
        if(trig === "sin" || trig === "-sin"){
            result = Math.sin(toRadians(num));
        }
        else if(trig === "cos" || trig === "-cos"){
            result = Math.cos(toRadians(num));
        }
        else if(trig === "tan" || trig === "-tan"){
            if(num % 90 === 0){
                alert("Error in calculation - Math Error");
            }
            else{
                result = Math.tan(toRadians(num));
            }
        }
        if(isNegative === 1){
            result *= -1;
        }
        return result;
    
}
function calculate(){
    var finalArr = makeArr(document.getElementById("display").innerHTML);
    for(var calcCount = 0; calcCount < finalArr.length;calcCount++){
        
        
        if(finalArr[calcCount].indexOf("*") === -1 && finalArr[calcCount].indexOf("/") === -1){
            if(finalArr[calcCount].indexOf("sin") >= 0 || finalArr[calcCount].indexOf("cos") >= 0 || finalArr[calcCount].indexOf("tan") >= 0 ){
                finalAnswer += calcTrig(finalArr[calcCount]);
            }
            else{
                finalArr[calcCount]=parseFloat(finalArr[calcCount]);
                finalAnswer += finalArr[calcCount];
                
            }
            
            //alert("????" + finalAnswer);
        
        }
        else{
            //alert("tempvar = " +finalArr[calcCount]);
            var tempVar = parseMD(finalArr[calcCount]);
            
            finalAnswer += tempVar;
        }
    }
    
    //alert("final answer = " + finalAnswer);
    document.getElementById("display").innerHTML = "" + finalAnswer;
    finalArr = [];
    finalArr.push(finalAnswer);
    display = finalAnswer;
    finalAnswer = 0;
    

}

function make(){
    //alert("The final line is: " + document.getElementById("display").innerHTML);
    calculate();
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

function parseF(arr){
    for(var count = 0; count<arr.length; count++){
        arr[count]=parseFloat(arr[count]);
        //alert(arr[count] + "+ 5 = " + (arr[count]+5));
    }
}
function parseMD(str){
    //var str1 = "2*10/5";
    var start; 
    var rep1 = str.replace(/\*/gi,",*");
    var rep2 = rep1.replace(/\//gi, ",/");
    var res = rep2.split(",");
    start = res[0];
    if(start.indexOf("sin") >= 0 || start.indexOf("cos") >= 0 || start.indexOf("tan") >= 0){
        //alert("yes");
        var trig = start.substring(0, 3);
        var num = start.substr(3);
        num = parseFloat(num);
        if(trig === "sin"){
            start = Math.sin(toRadians(num));
        }
        else if(trig === "cos"){
            start = Math.cos(toRadians(num));
        }
        else if(trig === "tan"){
            if(num % 90 === 0){
                alert("Error in calculation - Math Error");
            }
            else{
                start = Math.tan(toRadians(num));
            }
        }
        
    }
    for(var cnt1 = 1; cnt1 < res.length; cnt1++){
        if(res[cnt1][0] === "*"){
            if(res[cnt1].indexOf("sin") > 0){
                alert("yes");
                res[cnt1] = res[cnt1].substr(4);
                res[cnt1] = parseFloat(res[cnt1]);
                start *=  Math.round(Math.sin(toRadians(res[cnt1])) /10000);
            //alert(Math.sin(90*Math.PI/180));
            }
            else if(res[cnt1].indexOf("cos") >= 0){
                res[cnt1] = res[cnt1].substr(4);
                res[cnt1] = parseFloat(res[cnt1]);
                alert("?????" + Math.cos(res[cnt1]*Math.PI/180));
                start *= Math.round(Math.cos(toRadians(res[cnt1])) /10000);
            }
            else if(res[cnt1].indexOf("tan") >= 0){
                res[cnt1] = res[cnt1].substr(4);
                res[cnt1] = parseFloat(res[cnt1]);
                if(res[cnt1] % 90 === 0){
                    alert("Error in Calculation.");
                }
                else{
                    start *= Math.tan(res[cnt1]*Math.PI/180);
                }
                
                
                
            }
            else{
                res[cnt1] = res[cnt1].substr(1);
                res[cnt1] = parseFloat(res[cnt1]);
                start *= res[cnt1];
            }
            
            
        }
        else if(res[cnt1][0] === "/"){
            if(res[cnt1].indexOf("sin") >= 0){
                res[cnt1] = res[cnt1].substr(4);
                res[cnt1] = parseFloat(res[cnt1]);
                start /= Math.sin(res[cnt1]*Math.PI/180);
            //alert(Math.sin(90*Math.PI/180));
            }
            else if(res[cnt1].indexOf("cos") >= 0){
                res[cnt1] = res[cnt1].substr(4);
                res[cnt1] = parseFloat(res[cnt1]);
                if(res[cnt1] !== 0){
                    start /= Math.cos(res[cnt1]*Math.PI/180);
                }
                else{
                    alert("Fatal Math Error");
                }
                
            }
            else if(res[cnt1].indexOf("tan") >= 0){
                res[cnt1] = res[cnt1].substr(4);
                res[cnt1] = parseFloat(res[cnt1]);
                if(res[cnt1] % 90 === 0){
                    alert("Error in Calculation.");
                }
                else{
                    start /= Math.tan(res[cnt1]*Math.PI/180);
                }
                
                
                
            }
            else{
                res[cnt1] = res[cnt1].substr(1);
                res[cnt1] = parseFloat(res[cnt1]);
                start /= res[cnt1];
            }
        }
    }
    //return start;
    alert("= " + start);
    return start;
}
initialize();
