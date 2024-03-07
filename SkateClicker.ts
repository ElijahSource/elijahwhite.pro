//default values
let clickRate = 1;
let score = 15;
let offset = [1,1,1,1,1,1,1,1,1,1,1,1,1,1];
let properties = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
let idleClickRate=0;
var intervalID = window.setInterval(myCallback, 500);


//set elements
const notification = document.getElementsByClassName("text notification");

function buttonClick() {
    let clickScore = (score +=clickRate) | 0; //score refresh on each button click
    updateScore(clickScore)
}

function Purchase(clickPrice, clickIncrease, purchaseID, idleStatus){
    document.getElementById('notification')!.innerHTML = 'Purchase successful!';
    let price = (clickPrice*offset[purchaseID])| 0;;//calculate price from price and price offset
    if(score>=price){
    
    score = score-price;//subtract money for purchase
    updateScore(score)//update score text

    if(idleStatus==false){//if purchase id greater than 10 then it is idle upgrade
    clickRate = (clickRate+clickIncrease);//upgrade
    document.getElementById('clickrate')!.innerHTML = clickRate.toString();//update clickrate text
    offset[purchaseID] = offset[purchaseID] +0.2;//increase price by 1.2 x 
    document.getElementById("Purchase"+purchaseID)!.innerHTML = '+' + clickIncrease + ' click per click for ' + ((price*offset[purchaseID])| 0);//update purchase price text
    properties[purchaseID]+=1;
    updateProperties([properties],purchaseID);
    }
    else{
        idleClickRate = (idleClickRate+clickIncrease);//upgrade
        document.getElementById('idleClickrate')!.innerHTML = idleClickRate.toString();//update clickrate text
        offset[purchaseID] = offset[purchaseID] +0.2;//increase price by 1.2 x 
        document.getElementById("Purchase"+purchaseID)!.innerHTML = '+' + clickIncrease + ' clicks per second for ' +((price*offset[purchaseID])| 0);//update purchase price text
        properties[purchaseID]+=1;
        updateProperties([properties],purchaseID)
    }

    }

    else{//denial code for not enough money
        document.getElementById('notification')!.innerHTML = 'Not enough money!';
    }
}


function updateScore(newScore){
    document.getElementById('score')!.innerHTML = newScore;//updates 
    //document.getElementById('score')!.value = newScore;
    document.getElementById('title')!.innerHTML = newScore +' clicks: Skate Clicker';
}

function updateProperties([newCount],pID){
    document.getElementById("Purchase"+pID+" properties")!.innerHTML = newCount[pID];
}

function myCallback() {
    let clickScore = (score+=idleClickRate)|0;
    updateScore(clickScore);
}