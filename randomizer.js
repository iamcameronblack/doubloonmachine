const spinner = document.getElementById("spinner");
const slots = document.getElementsByClassName("slot");
const collector = document.getElementById("collect");
const doubloonCounter = document.getElementById("doubloonsCounter");
const spinsCounter = document.getElementById("spinsCounter");
const multiplesDisplay = document.getElementById("multiplesDisplay");
let spinScore = document.getElementById("spinScore");
let doubloons = 1000;
let timesSpinned = 0;
let instanceScore = 0;
let spinning = false;
let collected = true;
let spinCounter = 0;
let mSteps = 0;
let dSteps = 0;

for (let slot of slots) {
    slot.innerHTML = "-";
}

collector.addEventListener("click", e => {
    if (!collected && !spinning) {
        collected = true;
        instanceScore = 0;
        mSteps = 0;
        dSteps = 0;
        for (let slot of slots) {
            for (otherSlot of slots) {
                if ((slot.name == otherSlot.name) && !(slot.id == otherSlot.id) && !((slot.name == "blank")||(otherSlot.name == "blank"))){
                    multiplesDisplay.innerHTML = "MULTIPLES BONUS!";
                    instanceScore += 200;
                }
            }
            if (slot.name == "mahjong") instanceScore += 15;
            if (slot.name == "beer") instanceScore += 25;
            if (slot.name == "cherry") instanceScore += 5;
            if (slot.name == "flower") instanceScore += 1;
            if (slot.name == "dvd") instanceScore += 2;
            if (slot.name == "eye") instanceScore -= 5;
            if (slot.name == "evil-cat") instanceScore -= 100;
            if (slot.name == "evil-moon") instanceScore -= 500;
            if (slot.name == "spade") mSteps += 3;
            if (slot.name == "alien") dSteps += 1;
            if (slot.name == "xiaohongshu") mSteps += 7;
            if(slot.name == "sparkle") mSteps += 1;
        }
        console.log(instanceScore);
        for(let i = 0; i< mSteps;i++){
            instanceScore = instanceScore * 2;
        }
        for(let i = 0; i< dSteps;i++){
            instanceScore = Math.round(instanceScore / 3);
        }
        if (instanceScore < 0) {
            spinScore.style.color = "red"
            spinScore.innerHTML = ` ${instanceScore}`;
        } else {
            spinScore.style.color = "yellow"
            spinScore.innerHTML = `+${instanceScore}`;
        }

        doubloons += instanceScore;
        spinCounter += 1;
        doubloonCounter.innerHTML = `${doubloons}`;
        spinsCounter.innerHTML = `${spinCounter}`;

    } else {
        spinScore.innerHTML = "WAIT FOR SPINNING TO FINISH";
    }
})

spinner.addEventListener("click", e => {
    if (!spinning && collected && doubloons > 0) {
        multiplesDisplay.innerHTML = "";
        spinScore.innerHTML = "";
        spinning = true;
        spinnerColors();
        spinSlots();
        collected = false;
    } else if (doubloons < 1&&!spinning) {
        spinScore.style.fontSize = "x-large";
        spinScore.style.color = "red";
        spinScore.innerHTML = "YOU LOST ALL OF YOUR DOUBLOONS, YE SCOUNDREL, PISS OF THEE NOW!";
    } else if(!collected&&!spinning){
        spinScore.innerHTML = "CONFIRM YA POINTS BEFORE YA SPIN AGAIN";
    }else {
        spinScore.innerHTML = "WAIT FOR SPINNING TO FINISH";
    }

})




function spinSlots() {

    spinSlot(slots[0]);
    spinSlot(slots[1]);
    spinSlot(slots[2]);
    spinSlot(slots[3]);
    spinSlot(slots[4]);
    spinSlot(slots[5]);


}

function spinSlot(slot) {
    let spinCount = Math.round(Math.random() * 111);
    let spin = 0;
    const slot1Spinner = setInterval(() => {
        spinning = true;
        if (spin % 25 == 1) {
            slot.innerHTML = `<img src="imgs/mahjong.png" width="80" height="80" title="+15">`;
            slot.name = "mahjong";
        } else if (spin % 21 == 2) {
            slot.innerHTML = `<img src="imgs/beer.png" width="80" height="80" title="+25">`;
            slot.name = "beer";
        } else if (spin % 21 == 3) {
            slot.innerHTML = `<img src="imgs/cherries.png" width="80" height="80" title="+5">`;
            slot.name = "cherry";
        } else if (spin % 21 == 4) {
            slot.innerHTML = `<img src="imgs/cherry_blossom.png" width="80" height="80" title="+1">`;
            slot.name = "flower";
        } else if (spin % 21 == 5) {
            slot.innerHTML = `<img src="imgs/dvd.png" width="80" height="80" title="+2">`
            slot.name = "dvd";
        } else if (spin % 21 == 6) {
            slot.innerHTML = `<img src="imgs/eye.png" width="80" height="80" title="-5">`;
            slot.name = "eye";
        } else if (spin % 25 == 7) {
            slot.innerHTML = `<img src="imgs/joy_cat.png" width="80" height="80" title="-100">`;
            slot.name = "evil-cat";
        } else if (spin % 28 == 8) {
            slot.innerHTML = `<img src="imgs/new_moon_with_face.png" width="80" height="80" title="-500">`;
            slot.name = "evil-moon";
        } else if (spin % 32 == 9) {
            slot.innerHTML = `<img src="imgs/spades.png" width="80" height="80" title="x8 (stacks)">`;
            slot.name = "spade";
        } else if (spin % 30 == 0) {
            slot.innerHTML = `<img src="imgs/alien.png" width="80" height="80" title="divide all by 3 (stacks) (applies last)">`;
            slot.name = "alien";
        }else if(spin % 108 == 0){
            slot.innerHTML = `<img src="imgs/u6307.png" width="80" height="80" title="x128">`;
            slot.name = "xiaohongshu";
        }else if(spin % 29 == 0){
            slot.innerHTML = `<img src="imgs/sparkle.png" width="80" height="80" title="x2 (stacks)">`;
            slot.name = "sparkle";
        }
        else if (spin % 2 == 0){
            slot.innerHTML = `<img src="imgs/black_joker.png" width="80" height="80" title="rewards you with absolutely nothing">`;
            slot.name = "blank";
        }else{
            slot.innerHTML = `<img src="imgs/red_joker.png" width="80" height="80" title="rewards you with absolutely nothing">`;
            slot.name = "blank";
        }
        spin++;
        if (spin >= spinCount) {
            clearInterval(slot1Spinner);
            spinning = false;
        }
    }, 55);
}

function spinnerColors() {
    let iteration = 0;
    const colorSpin0 = setInterval(() => {
        spinner.style.backgroundColor = "red";
        iteration++;
        if (iteration >= 12) {
            clearInterval(colorSpin0);
        }
    }, 44);
    const colorSpin1 = setInterval(() => {
        spinner.style.backgroundColor = "blue";
        if (iteration >= 12) {
            clearInterval(colorSpin1);
            spinner.style.backgroundColor = "black";
            
        }
    }, 47);
    const colorSpin2 = setInterval(() => {
        spinner.style.backgroundColor = "yellow";
        if (iteration >= 12) {
            clearInterval(colorSpin2);
            
        }
    }, 35);
    const colorSpin3 = setInterval(() => {
        spinner.style.backgroundColor = "green";
        if (iteration >= 12) {
            clearInterval(colorSpin3);
            

        }
    }, 43);

}


