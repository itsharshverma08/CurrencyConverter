const BaseURL= "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
//const BaseURL="https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_12xBvqsGT6zfqcFaiivhfxkUVengHwa4a6vc4jH7"
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr= document.querySelector(".from select");
const toCurr= document.querySelector(".to select");
const msg=document.querySelector(".msg");
// for( code in countryList){
//     console.log(countryList[code]);
// }
for( let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }
        else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
        }

        select.addEventListener("change",(evt)=>{
            updateFlag(evt.target);
        });
}

const updateFlag= (element) => {
   let currCode=element.value;
   let countryCode=countryList[currCode]; //INR ka IN , USD KA US
   let newIMG=`https://flagsapi.com/${countryCode}/flat/64.png`;
   let img=element.parentElement.querySelector("img");
   img.src=newIMG;

};
btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal==="" || amtVal < 1){
        amtVal= 1;
        amount.value=1;
    }
    //console.log(fromCurr.value,toCurr.value);
    const URL = `${BaseURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data=await response.json();
    let rate =data[toCurr.value.toLowerCase()];
    let finalAmount=amtVal*rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    
   
});
