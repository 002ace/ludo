let deactivate;
let deid;
let declass;
const stopage = [1, 9, 14, 22, 27, 35, 40, 48];
class Player {
  constructor(el, start, end, stripStart) {
    this.playerStatus = false;
    this.winnerid = new Array(4).fill(false);
    this.color = el;
    this.status = new Array(4).fill(false);
    this.id = new Array(4);
    this.start = start;
    this.stripStart = stripStart;
    this.end = end;
    let elements = document.getElementsByClassName(el);
    for (let i = 0; i < elements.length; i++) {
      this.id[i] = elements[i];
      console.log(this.id[i]);
      console.log(this.id[i].id);
    }
    this.steps = new Array(4).fill(0);
  }
  setsubStatus(i) {
    this.status[i] = false;
  }
  setSteps(i) {
    this.steps[i] = 0;
  }
  checkStatus() {
    let flag = false;
    for (let i = 0; i < 4; i++) {
      if (this.status[i] == true) {
        flag = true;
      }
    }
    if (flag == false) {
      this.playerStatus = false;
    }
  }

  setStatus() {
    this.playerStatus = true;
  }
  getStatus() {
    return this.playerStatus;
  }
  getElementStatus(val) {
    return this.status[val];
  }

  activatePlayer() {
    for (let i = 0; i < 4; i++) {
      this.id[i].disabled = false;
      this.id[i].classList.add("btnzoom");
      console.log(this.id[i]);
    }
    btn.disabled = true;
    btn2.disabled = true;
    btn3.disabled = true;
    btn4.disabled = true;
    return;
  }
  openMove(el) {
    gotiSound()
    for (let i = 0; i < 4; i++) {
      if (this.id[i].id == el) {
        this.status[i] = true;
        console.log(this.id[i]);
        let ele = document.getElementById(this.start);

        console.log(ele);

        ele.appendChild(this.id[i]);
      }
    }
    for (let i = 0; i < 4; i++) {
      this.id[i].disabled = true;
      this.id[i].classList.remove("btnzoom");
    }
  }
  enableBtn() {
    for (let i = 0; i < 4; i++) {
      if (this.status[i] == true) {
        this.id[i].disabled = false;

        this.id[i].classList.add("btnzoom");
      }
    }
  }
  movePlayer(el, val) {
    gotiSound();
    let dest = 0;
    let fl = false;
  
    for (let i = 0; i < 4; i++) {
      if (this.id[i].id == el) {
        this.status[i] = true;
        this.id[i].classList.remove("btnzoom");
  
        // Calculate destination
        this.steps[i] += val;
        dest = this.start + this.steps[i];
        
        if (this.steps[i] > 50) {
          if (this.steps[i] > 56) {
            this.steps[i] -= val;
            break;
          } else if (this.steps[i] == 56) {
            let winel = document.getElementById("win");
            winel.appendChild(this.id[i]);
            winel.lastElementChild.classList.add("red1");
  
            this.winnerid[i] = true;
  
            fl = this.winnerid.some((status) => status === false);
            if (!fl) {
              alert(
                this.color + " Player Won! Please refresh to start a new game."
              );
            }
            break;
          }
          dest = this.steps[i] - 50 + this.stripStart;
        } else if (dest > 52) {
          dest -= 52;
        }
  
        // Smoothly move the element
        const targetElement = document.getElementById(dest);
        const currentElement = this.id[i];
        
        const rectTarget = targetElement.getBoundingClientRect();
        const rectCurrent = currentElement.getBoundingClientRect();
  
        // Calculate translation
        const translateX = rectTarget.left - rectCurrent.left;
        const translateY = rectTarget.top - rectCurrent.top;
  
        currentElement.style.transform = `translate(${translateX}px, ${translateY}px)`;
        currentElement.classList.add("moving");
  
        setTimeout(() => {
          targetElement.appendChild(currentElement);
          currentElement.style.transform = "";
          currentElement.classList.remove("moving");
        }, 500);
      }
    }
  
    // Disable buttons
    for (let i = 0; i < 4; i++) {
      this.id[i].classList.remove("btnzoom");
      this.id[i].disabled = true;
    }
  }
  
}

function deactivateSubPlayer() {
  if (deactivate == true) {
    if (declass == "red") {
      red.setsubStatus(parseInt(deid) - 101);
      red.setSteps(parseInt(deid) - 101);
      red.checkStatus();
      deactivate = false;
    } else if (declass == "yellow") {
      yellow.setsubStatus(parseInt(deid) - 201);
      yellow.setSteps(parseInt(deid) - 201);
      yellow.checkStatus();
      deactivate = false;
    } else if (declass == "blue") {
      blue.setsubStatus(parseInt(deid) - 301);
      blue.setSteps(parseInt(deid) - 301);
      blue.checkStatus();
      deactivate = false;
    } else if (declass == "green") {
      green.setsubStatus(parseInt(deid) - 401);
      green.setSteps(parseInt(deid) - 401);
      green.checkStatus();
      deactivate = false;
    }
  } else {
    return;
  }
}



let red = new Player("red", 1, 51, 109);
let yellow = new Player("yellow", 14, 12, 209);
let blue = new Player("blue", 27, 25, 309);
let green = new Player("green", 40, 38, 409);
let image = new Map([
  [1, "./assets/DICE-1.png"],
  [2, "./assets/DICE-2.png"],
  [3, "./assets/DICE-3.png"],
  [4, "./assets/DICE-4.png"],
  [5, "./assets/DICE-5.png"],
  [6, "./assets/DICE-6.png"],
  [7, "./assets/Dice_1.gif"],
]);

function adddice(dice) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let goti = document.getElementById("goti");
      goti.style.backgroundImage = "url(" + image.get(dice) + ")";
      resolve("resolved");
    }, 1000);
  });
}
function adddice2(dice) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let goti = document.getElementById("goti2");
      goti.style.backgroundImage = "url(" + image.get(dice) + ")";
      resolve("resolved");
    }, 1000);
  });
}
function adddice3(dice) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let goti = document.getElementById("goti3");
      goti.style.backgroundImage = "url(" + image.get(dice) + ")";
      resolve("resolved");
    }, 1000);
  });
}
function adddice4(dice) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let goti = document.getElementById("goti4");
      goti.style.backgroundImage = "url(" + image.get(dice) + ")";
      resolve("resolved");
    }, 1000);
  });
}
function removezoom(active) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let ani = document.getElementById(active);
      ani.classList.remove("zoom");
      resolve("resolved");
    }, 500);
  });
}

function showring() {
  let ring = document.getElementById("ludo-ring");
  ring.style.display = "block";
}

let die = 0;
let active = "red";
let btn = document.getElementById("roll");
let btn2 = document.getElementById("roll2");
let btn3 = document.getElementById("roll3");
let btn4 = document.getElementById("roll4");

btn.disabled = false; 
btn2.disabled = true; 
btn3.disabled = true;  
btn4.disabled = true; 

function playSound() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const audio = new Audio(
        "./assets/WhatsApp Audio 2024-12-06 at 1.24.15 AM.mpeg"
      );
      audio.play();
      resolve();
    }, 200);
  });
}
function gotiSound() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const audio = new Audio(
        "./assets/goti.mp4"
      );
      audio.play();
      resolve();
    }, 0);
  });
}
async function generaterandom() {
  playSound();
  message(active);

  btn.disabled = true;
  btn2.disabled = false;
  btn3.disabled = false;
  btn4.disabled = false;
  console.log(active);
  let dice = Math.floor(Math.random() * 6) + 1;
  let goti = document.getElementById("goti");
  goti.style.backgroundImage = "url(" + image.get(7) + ")";
  goti.textContent = "";

  await adddice(dice);
  await removezoom(active);
  die = dice;
  console.log(die);
  activePlayer(die);
}
async function generaterandom2() {
  playSound();
  message(active);

  btn.disabled = false;
  btn2.disabled = true;
  btn3.disabled = false;
  btn4.disabled = false;
  console.log(active);
  let dice = Math.floor(Math.random() * 6) + 1;
  let goti = document.getElementById("goti2");
  goti.style.backgroundImage = "url(" + image.get(7) + ")";
  goti.textContent = "";

  await adddice2(dice);
  await removezoom(active);
  die = dice;
  console.log(die, "This is second function");
  activePlayer(die);
}
async function generaterandom3() {
  playSound();
  message(active);

  btn.disabled = false;
  btn2.disabled = false;
  btn3.disabled = true;
  btn4.disabled = false;
  console.log(active);
  let dice = Math.floor(Math.random() * 6) + 1;
  let goti = document.getElementById("goti3");
  goti.style.backgroundImage = "url(" + image.get(7) + ")";
  goti.textContent = "";

  await adddice3(dice);
  await removezoom(active);
  die = dice;
  console.log(die);
  activePlayer(die);
}
async function generaterandom4() {
  playSound();
  message(active);

  btn.disabled = false;
  btn2.disabled = false;
  btn3.disabled = false;
  btn4.disabled = true;
  console.log(active);
  let dice = Math.floor(Math.random() * 6) + 1;
  let goti = document.getElementById("goti4");
  goti.style.backgroundImage = "url(" + image.get(7) + ")";
  goti.textContent = "";

  await adddice4(dice);
  await removezoom(active);
  die = dice;
  console.log(die);
  activePlayer(die);
}
function message(msg) {
  let ani = document.getElementById(msg);
  console.log(ani);
  ani.classList.add("zoom");
  let goti = document.getElementById("goti");
  goti.style.backgroundImage = "";
  goti.textContent = "Roll Dice";
  let el = document.getElementById("roll");
  el.value = msg + "'s turn";
}
function activePlayer(dice) {
  // Disable all dice buttons
  btn.disabled = true;
  btn2.disabled = true;
  btn3.disabled = true;
  btn4.disabled = true;

  // Determine the active player
  if (active === "red") {
      if (dice === 6) {
          red.activatePlayer();
          red.setStatus();
          btn.disabled = false; 
      } else if (!red.getStatus()) {
          active = "yellow";
          btn2.disabled = false; 
      } else {
          red.enableBtn();
      }
  } else if (active === "yellow") {
      if (dice === 6) {
          yellow.activatePlayer();
          yellow.setStatus();
          btn2.disabled = false; 
      } else if (!yellow.getStatus()) {
          active = "blue";
          btn3.disabled = false; 
      } else {
          yellow.enableBtn();
      }
  } else if (active === "blue") {
      if (dice === 6) {
          blue.activatePlayer();
          blue.setStatus();
          btn3.disabled = false; 
      } else if (!blue.getStatus()) {
          active = "green";
          btn4.disabled = false; 
      } else {
          blue.enableBtn();
      }
  } else if (active === "green") {
      if (dice === 6) {
          green.activatePlayer();
          green.setStatus();
          btn4.disabled = false; 
      } else if (!green.getStatus()) {
          active = "red";
          btn.disabled = false;
      } else {
          green.enableBtn();
      }
  }

  // Update zoom highlight for the active player
  updateZoomHighlight(active);
}





function move(id) {
  console.log("Player moving goti:", id);

  // Disable all buttons temporarily
  btn.disabled = true;
  btn2.disabled = true;
  btn3.disabled = true;
  btn4.disabled = true;

  // Remove the current player's zoom-* class
  removeZoomClass();

  switch (active) {
      case "red":
          if (!red.getElementStatus(id - 101)) {
              // Open a new goti
              red.openMove(id);
              die = 0;
              btn.disabled = false; // Keep red active
              updateZoomHighlight("red");
          } else {
              // Move an active goti
              red.movePlayer(id, die);
              deactivateSubPlayer();

              // If dice roll is not 6, switch to the next player
              if (die !== 6) {
                  active = "yellow";
                  btn2.disabled = false;
                  updateZoomHighlight("yellow");
              } else {
                  updateZoomHighlight("red"); // Stay with red if 6
                  btn.disabled = false;
              }
          }
          break;

      case "yellow":
          if (!yellow.getElementStatus(id - 201)) {
              yellow.openMove(id);
              die = 0;
              btn2.disabled = false; // Keep yellow active
              updateZoomHighlight("yellow");
          } else {
              yellow.movePlayer(id, die);
              deactivateSubPlayer();

              if (die !== 6) {
                  active = "blue";
                  btn3.disabled = false;
                  updateZoomHighlight("blue");
              } else {
                  updateZoomHighlight("yellow");
                  btn2.disabled = false;
              }
          }
          break;

      case "blue":
          if (!blue.getElementStatus(id - 301)) {
              blue.openMove(id);
              die = 0;
              btn3.disabled = false;
              updateZoomHighlight("blue");
          } else {
              blue.movePlayer(id, die);
              deactivateSubPlayer();

              if (die !== 6) {
                  active = "green";
                  btn4.disabled = false;
                  updateZoomHighlight("green");
              } else {
                  updateZoomHighlight("blue");
                  btn3.disabled = false;
              }
          }
          break;

      case "green":
          if (!green.getElementStatus(id - 401)) {
              green.openMove(id);
              die = 0;
              btn4.disabled = false;
              updateZoomHighlight("green");
          } else {
              green.movePlayer(id, die);
              deactivateSubPlayer();

              if (die !== 6) {
                  active = "red";
                  btn.disabled = false;
                  updateZoomHighlight("red");
              } else {
                  updateZoomHighlight("green");
                  btn4.disabled = false;
              }
          }
          break;
  }
}



function updateZoomHighlight(currentPlayer) {
  // Remove all existing zoom-* classes
  document.querySelectorAll(".zoom-red, .zoom-yellow, .zoom-blue, .zoom-green").forEach((el) => {
      el.classList.remove("zoom-red", "zoom-yellow", "zoom-blue", "zoom-green");
  });

  // Add the correct zoom class to the active player
  const playerElement = document.getElementById(currentPlayer);
  if (playerElement) {
      playerElement.classList.add(`zoom-${currentPlayer}`);
  }
}


function removeZoomClass() {
  const allPlayers = ["red", "yellow", "blue", "green"];

  allPlayers.forEach((color) => {
    const element = document.getElementById(color);
    if (element) element.classList.remove("zoom");
  });
}



