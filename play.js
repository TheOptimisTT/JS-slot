const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A:2,
    B:4,
    C:6,
    D:8
};

const SYMBOLS_VALUES = {
    A:5,
    B:4,
    C:3,
    D:2
};

let balance=0;
let lines;
let bet;
isValid = false;

document.getElementById("depositBtn").onclick = function (){
    let deposit = document.getElementById("depositText").value;
    deposit = Number(deposit);
    if(deposit<=0||isNaN(deposit)){
        document.getElementById("test").innerHTML = "Enter a valid deposit";
    }else{
        balance += deposit;
        document.getElementById("balance").innerHTML = "Balance: " + balance;
        document.getElementById("test").innerHTML = "";
    }
}

document.getElementById("betBtn").onclick = function (){
    lines = document.getElementById("linesText").value;
    bet = document.getElementById("betText").value;

    lines = Number(lines);
    bet = Number(bet);

    if(lines<=0||isNaN(lines)||lines>3||bet<=0||isNaN(bet)){
        document.getElementById("test").innerHTML = "Enter a valid lines/bet";
    }else if(balance<bet*lines){
        document.getElementById("test").innerHTML = "Not enought money";
    }else{
        document.getElementById("test").innerHTML = "";
        document.getElementById("showBet").innerHTML = "Your Bet per line: " + bet;
        document.getElementById("showLines").innerHTML = "Your number of lines: " + lines;
        isValid = true;
    }
    balance-=lines*bet;
    document.getElementById("balance").innerHTML = "Balance: " + balance;
}

document.getElementById("spinBtn").onclick = function (){
    document.getElementById("rowLabel-0").innerHTML ="";
    document.getElementById("rowLabel-1").innerHTML ="";
    document.getElementById("rowLabel-2").innerHTML ="";
    if(!isValid){
        document.getElementById("test").innerHTML = "Not enought money/Enter new bet";
    }else{
        const symbols = [];
        for(const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
            for(let i=0;i<count;i++){
                symbols.push(symbol);
            }
        }
        
        const reels = [];
        for(let i = 0; i < COLS; i++){
            reels.push([]);
            const reelSymbols= [...symbols];
            for(let j = 0; j < ROWS; j++){
                const randomIndex = Math.floor(Math.random()*reelSymbols.length);
                const selectedSymbol = reelSymbols[randomIndex];
                reels[i].push(selectedSymbol);
                reelSymbols.splice(randomIndex,1);
            }
        }
        const rows = [];
        for(let i=0; i<ROWS;i++){
            rows.push([]);
            let labelNum = "rowLabel-"+i;
            console.log(labelNum);
            for(let j=0; j < COLS;j++){
                rows[i].push(reels[j][i]);
                document.getElementById(labelNum).innerHTML += reels[j][i];
            }
        }
        
        let winnings = 0;
        for(let row = 0; row < lines; row++){
            const symbols = rows[row];
            let allSame = true;

            for(const symbol of symbols){
                if(symbol != symbols[0]){
                    allSame=false;
                    break;
                }
            }

            if(allSame){
                winnings += bet * SYMBOLS_VALUES[symbols[0]];
            }
        }
    document.getElementById("win").innerHTML = winnings;
    balance+=winnings;
    document.getElementById("balance").innerHTML = "Balance: " + balance;
    isValid=false;
    }
}



