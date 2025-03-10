// import React, { useState, useEffect, useRef } from 'react';
// import { useSelector ,  useDispatch} from 'react-redux';
// import { getUser  , gamedetails} from "../utils/userSlice";
// import { useLocation } from "react-router-dom";
// import wss from './socket';

// class Player {
//   constructor(el, start, end, stripStart) {
//     this.playerStatus = false;
//     this.winnerid = new Array(4).fill(false);
//     this.color = el;
//     this.status = new Array(4).fill(false);
//     this.id = new Array(4);
//     this.start = start;
//     this.stripStart = stripStart;
//     this.end = end;
//     this.steps = new Array(4).fill(0);
//   }


//   initializeElements() {
//     const elements = document.getElementsByClassName(this.color);
//     for (let i = 0; i < elements.length; i++) {
//       this.id[i] = elements[i];
//     }
//   }

//   setsubStatus(i) {
//     this.status[i] = false;
//     console.log("nnnnnn" , this.status[i] )
//   }
  
//   setSteps(i) {
//     this.steps[i] = 0;
//     console.log("mmm" , this.steps[i])

//   }

//   checkStatus() {
//     let flag = false;
//     for (let i = 0; i < 4; i++) {
//       if (this.status[i] === true) {
//         flag = true;
//       }
//     }
//     if (flag === false) {
//       this.playerStatus = false;
//     }
//   }

//   setStatus() {
//     this.playerStatus = true;
//   }

//   getStatus() {
//     return this.playerStatus;
//   }

//   getElementStatus(val) {
//     console.log('getElementStatus called with:', val, 'Status:', this.status[val]);
//     return this.status[val];
//   }

//   activatePlayer(setButtonStates) {
//     this.id.forEach((piece, i) => {
//       if (piece) {
//         piece.disabled = false;
//         piece.classList.add("btnzoom");
//       }
//     });
    
//     setButtonStates({
//       btn1: true,
//       btn2: true,
//       btn3: true,
//       btn4: true
//     });
//   }

//   openMove(el, gotiSound) {
//     console.log('openMove called with element:', el);
//     gotiSound();
    
//     for (let i = 0; i < 4; i++) {
//       console.log('Checking token:', i, 'ID:', this.id[i]?.id, 'Target:', el.toString());
//       if (this.id[i]?.id === el.toString()) {
//         console.log('Match found for token:', i);
//         this.status[i] = true;
//         const targetElement = document.getElementById(this.start.toString());
//         console.log('Target element:', targetElement);
        
//         if (targetElement && this.id[i]) {
//           targetElement.appendChild(this.id[i]);
//           console.log('Token moved to start position');
//         }
//       }
//     }
    
//     this.id.forEach(piece => {
//       if (piece) {
//         piece.disabled = true;
//         piece.classList.remove("btnzoom");
//       }
//     });
//   }

//   enableBtn() {
//     this.id.forEach((piece, i) => {
//       if (piece && this.status[i]) {
//         piece.disabled = false;
//         piece.classList.add("btnzoom");
//       }
//     });
//   }
  
//   //  steps
//   movePlayer(el, val, gotiSound, playerRefs, getPlayerButtonNumber, setButtonStates, setShowPopup, setPopupMessage) {
//     gotiSound();
//     let dest = 0;
//     let fl = false;

//     const safeSpots = [
//       1,
//       9,
//       14,
//       22,
//       27,
//       35,
//       40,
//       48,
//       110, 111, 112, 113, 114, 
//       210, 211, 212, 213, 214, 
//       310, 311, 312, 313, 314,
//       410, 411, 412, 413, 414 
//     ];

//     for (let i = 0; i < 4; i++) {
//       if (this.id[i]?.id === el.toString()) {
//         this.status[i] = true;
//         this.id[i].classList.remove("btnzoom");
//         console.log("this is->" , this.steps[i]);
//         this.steps[i] +=val;  //  this  line is used to  upgrade the  step
//         console.log("this is after->" , this.steps[i]);


       
//         dest = this.start + this.steps[i];
//         console.log("this is dest line")
//         console.log(dest);
     

//         if (this.steps[i] > 50) {
//           const entryPoints = {
//             red: dest >= 51,
//             yellow: dest >= 64,
//             blue: dest >= 77,
//             green: dest >= 90
//           };

//           const hasCompletedCircuit = this.start === 1 && entryPoints.red ||    // Red
//                                     this.start === 14 && entryPoints.yellow || // Yellow
//                                     this.start === 27 && entryPoints.blue || // Blue
//                                     this.start === 40 && entryPoints.green; // Green

//           if (!hasCompletedCircuit) {
//             console.log('Token must complete full circuit before entering home strip');
//             this.steps[i] -= val;
//             return;
//           }

//           if (this.steps[i] > 56) {
//             console.log('Cannot move beyond home strip');
//             this.steps[i] -= val;
//             return;
//           } else if (this.steps[i] === 56) {
//             const winel = document.getElementById("win");
//             if (winel && this.id[i]) {
//               winel.appendChild(this.id[i]);
//               winel.lastElementChild.classList.add("red1");
//               this.winnerid[i] = true;
              
//               // Check if ALL tokens have reached winning position
//               fl = this.winnerid.some((status) => status === false);
              
//               if (!fl) {
//                 // Only show game over popup when all tokens have won
//                 setPopupMessage(`Congratulations! ${this.color.toUpperCase()} player has won the game!`);
//                 setShowPopup(true);
                
//                 setButtonStates({
//                   btn1: true,
//                   btn2: true,
//                   btn3: true,
//                   btn4: true
//                 });
//               }
//               return;
//             }
//           }

//           // Calculate home strip position
//           const stripPosition = this.steps[i] - 50;
//           dest = this.stripStart + stripPosition - 1;
//           console.log(`Moving to home strip position: ${dest}`);
//         } else if (dest > 52) {
//           dest -= 52;
//         }
        
//         //move->define movement of goti
//         const targetElement = document.getElementById(dest.toString());
//         const currentElement = this.id[i];
//          //validation of ludo game
//         if (targetElement && currentElement) {
//           // For home strip moves, check if destination is already occupied by same color
//           if (dest >= this.stripStart && dest <= this.stripStart + 4) {
//             const existingToken = targetElement.querySelector('button');
//             if (existingToken) {
//               console.log('Position in home strip already occupied');
//               this.steps[i] -= val;
//               return;
//             }
//           } else {
//             // Normal collision check for main board
//             const existingToken = targetElement.querySelector('button');
//             if (existingToken && existingToken !== currentElement) {
//               const isSafeSpot = safeSpots.includes(dest);
//               const isSameColor = existingToken.className === this.color;
              
//               if (!isSafeSpot && !isSameColor) {
//                 console.log('Token collision detected - cutting token');
                
//                 const tokenColor = existingToken.className;
//                 const homePosition = document.getElementById(`${tokenColor}${existingToken.id.slice(-3)}`);
//                 if (homePosition) {
//                   Object.values(playerRefs.current).forEach(player => {
//                     if (player.color === tokenColor) {
//                       const tokenIndex = parseInt(existingToken.id.slice(-3)) - 
//                         (getPlayerButtonNumber(player.color) * 100 + 1);
//                       player.setsubStatus(tokenIndex);
//                       player.setSteps(tokenIndex);
//                       player.checkStatus();
//                     }
//                   });

//                   homePosition.appendChild(existingToken);
//                   gotiSound();
//                 }
//               } else {
//                 console.log('Token is on a safe spot or same color - cannot cut');
//                 this.steps[i] -= val;
//                 return;
//               }
//             }
//           }

//           // Move token to new position
//           const rectTarget = targetElement.getBoundingClientRect();
//           const rectCurrent = currentElement.getBoundingClientRect();

//           const translateX = rectTarget.left - rectCurrent.left;
//           const translateY = rectTarget.top - rectCurrent.top;

//           currentElement.style.transform = `translate(${translateX}px, ${translateY}px)`;
//           currentElement.classList.add("moving");

//           setTimeout(() => {
//             targetElement.appendChild(currentElement);
//             currentElement.style.transform = "";
//             currentElement.classList.remove("moving");
//           }, 500);
//         }
//       }
//     }

//     this.id.forEach(piece => {
//       if (piece) {
//         piece.classList.remove("btnzoom");
//         piece.disabled = true;
//       }
//     });
//   }

//   checkWin() {
//     return !this.winnerid.some(status => status === false);
//   }
// }

// const Game = () => {

//    const location = useLocation();
//    const searchParams = new URLSearchParams(location.search);
//    const selectedColor = searchParams.get("color"); // Extracts "?color=red"

//     console.log("Selected Player Color:", selectedColor);

//   // State management
//     const  dispatch =  useDispatch();
//     const  user  =    useSelector((store)=>store?.user)
//     const gameDetails = useSelector((store) => store.user?.game);
  
//     const gamePlayerId  =   gameDetails?.playerDetails.id

//     const pawn  =   gameDetails?.playerDetails.color


//     const gameData   = gameDetails?.gameDetails

//     console.log(gameData)

//     const rang = gameData?.players?.map(player => player.color) || [];

//     console.log(rang);


//     const createPlayerOrder = (rangArray) => {
//       const playerOrder = {};
      
//       // Loop through each color
//       for (let i = 0; i < rangArray.length; i++) {
//         // Get the current color and the next color (wrapping around if needed)
//         const currentColor = rangArray[i];
//         const nextColor = rangArray[(i + 1) % rangArray.length];
        
//         // Assign the next color as the value for the current color key
//         playerOrder[currentColor] = nextColor;
//       }
      
//       return playerOrder;
//     };
    
//     const Order = createPlayerOrder(rang);
   

//    console.log(Order)

//     console.log(JSON.stringify(gameData));


//     console.log("this is pawn" , pawn);

//     console.log("this is  gameDetails" ,  gameDetails?.playerDetails.id);
    

//     console.log("user details" , user?.user?.userDetails?._id);
     
//     const userId = user?.user?.userDetails?._id ;

//     if(userId ===  gamePlayerId)
//     {
//          console.log("both  id  is equal ")
//     }
//     console.log("this is  userID"  ,  userId)
//     const[ws ,  setWs] =  useState() ;
//     let  player ;
//     const[cubes  , setCubes]  =  useState();
    
    


//     console.log("this is player" , player)



//     const sendMess = (id , active)=>{
//       console.log("send message work")
//        wss?.send(JSON.stringify({
//              type:"update",
//              roomCode:"room002",
//              payload:{
//                 message:{
  
//                      "playerId": userId,
//                      "player":id,
//                      "cubes" :cubes,
//                      "active" : active
//               }
//              }
//        }))
//     }


     
  
  
 











//   const [die, setDie] = useState(0);
//   const [active, setActive] = useState('red');
//   const [deactivate, setDeactivate] = useState(false);
//   const [deid, setDeid] = useState(null);
//   const [declass, setDeclass] = useState(null);
//   const [buttonStates, setButtonStates] = useState({
//     btn1: false,
//     btn2: true,
//     btn3: true,
//     btn4: true
//   });
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupMessage, setPopupMessage] = useState('');

//   // Player instances
//   const playerRefs = useRef({
//     red: new Player("red", 1, 51, 109),
//     yellow: new Player("yellow", 14, 12, 209),
//     blue: new Player("blue", 27, 25, 309),
//     green: new Player("green", 40, 38, 409)
//   });

//   // Image mapping
//   const imageMap = new Map([
//     [1, "../assets/DICE-1.png"],
//     [2, "../assets/DICE-2.png"],
//     [3, "../assets/DICE-3.png"],
//     [4, "../assets/DICE-4.png"],
//     [5, "../assets/DICE-5.png"],
//     [6, "../assets/DICE-6.png"],
//     [7, "../assets/Dice_1.gif"],
//   ]);


//   const [joinedPlayers, setJoinedPlayers] = useState(() => {
//         const storedPlayers = localStorage.getItem("joinedPlayers");
//         return storedPlayers ? JSON.parse(storedPlayers) : {
//           red: false,
//           yellow: false,
//            blue: false,
//           green: false
//        };
//    });


//    useEffect(()=>{
//     localStorage.setItem("joinedPlayers", JSON.stringify(joinedPlayers));
//    } , [joinedPlayers])

//   useEffect(() => {
//     // Initialize player elements after component mount
//     // const wss  =  new WebSocket("ws://localhost:8080")

    
//     dispatch(getUser());
//     dispatch(gamedetails());
//     // setWs(wss)
//     wss.onopen = () => {
//       console.log('WebSocket connection opened');
//       setWs(wss)
//     };

  
//     wss.onerror = (event) => {
//       console.error("WebSocket Error:", event);
//   };

//   wss.onclose = () => console.log("WebSocket Disconnected");

 

   
    
   
     
//   let tokenPositions = {}; // Track positions outside message handler
//   let firstMoves = {}; // Track first moves for each token
  
//   wss.onmessage = (event) => {
  
//   try{
 
//               const data = JSON.parse(event.data)
//               console.log(data);
//               // if (data.type === "update" ) {
//               //  console.log("Update received:", data);
               
//               //  // Calculate token ID based on player number
//               //  const tokenId = data.payload.message.player 
//               //  const cubes = data.payload.message.cubes;
               
               
//               //  console.log("Token ID:", tokenId);
               
//               //  // Check if this is the first move for this token
//               //  if (!firstMoves[tokenId]) {
//               //      // First move - move to starting position
//               //      firstMoves[tokenId] = true;
//               //      tokenPositions[tokenId] = 1; // Set to starting position
                   
//               //      // Get player's starting position based on color/player number
//               //      const startingPositions = {
//               //          1: 1,  // Red starts at position 1
//               //          2: 14, // Yellow starts at position 14
//               //          3: 27, // Blue starts at position 27
//               //          4: 40  // Green starts at position 40
//               //      };
                   
//               //      const playerNum = Math.floor(tokenId / 100);
//               //      const startPos = startingPositions[playerNum];
                   
//               //      const currentElement = document.getElementById(tokenId.toString());
//               //      const targetElement = document.getElementById(startPos.toString());
                   
//               //      if (currentElement && targetElement) {
//               //          const rectTarget = targetElement.getBoundingClientRect();
//               //          const rectCurrent = currentElement.getBoundingClientRect();
                       
//               //          const translateX = rectTarget.left - rectCurrent.left;
//               //          const translateY = rectTarget.top - rectCurrent.top;
                       
//               //          currentElement.style.transition = 'transform 0.5s ease';
//               //          currentElement.style.transform = `translate(${translateX}px, ${translateY}px)`;
//               //          currentElement.classList.add("moving");
                       
//               //          setTimeout(() => {
//               //              targetElement.appendChild(currentElement);
//               //              currentElement.style.transform = "";
//               //              currentElement.style.transition = "";
//               //              currentElement.classList.remove("moving");
//               //          }, 500);

                     
//               //      }
//               //  } else {
//               //      // Subsequent moves - add to current position
//               //      const nextPlayer  =  data.payload.message.active
//               //      tokenPositions[tokenId] = (tokenPositions[tokenId] || 0) + cubes;
//               //      const totalPosition = tokenPositions[tokenId];
                   
//               //      console.log("Current position:", totalPosition);
                   
//               //      const currentElement = document.getElementById(tokenId.toString());
                   
//               //      // Handle wrapping around the board
//               //      let destPosition = totalPosition;
//               //      if (destPosition > 52) {
//               //          destPosition = destPosition - 52;
//               //      }
                   
//               //      const targetElement = document.getElementById(destPosition.toString());
                   
//               //      if (currentElement && targetElement) {
//               //          const rectTarget = targetElement.getBoundingClientRect();
//               //          const rectCurrent = currentElement.getBoundingClientRect();
                       
//               //          const translateX = rectTarget.left - rectCurrent.left;
//               //          const translateY = rectTarget.top - rectCurrent.top;
                       
//               //          currentElement.style.transition = 'transform 0.5s ease';
//               //          currentElement.style.transform = `translate(${translateX}px, ${translateY}px)`;
//               //          currentElement.classList.add("moving");
                       
//               //          setTimeout(() => {
//               //              targetElement.appendChild(currentElement);
//               //              currentElement.style.transform = "";
//               //              currentElement.style.transition = "";
//               //              currentElement.classList.remove("moving");
                           
//               //              // Check for home strip entry
//               //              if (totalPosition >= 51) {
//               //                  const playerColor = Math.floor(tokenId / 100);
//               //                  const homeStripStart = playerColor * 100 + 10;
//               //                  const homePosition = document.getElementById(homeStripStart.toString());
                               
//               //                  if (homePosition) {
//               //                      setTimeout(() => {
//               //                          const rectHome = homePosition.getBoundingClientRect();
//               //                          const rectToken = currentElement.getBoundingClientRect();
                                       
//               //                          const translateToHome = {
//               //                              x: rectHome.left - rectToken.left,
//               //                              y: rectHome.top - rectToken.top
//               //                          };
                                       
//               //                          currentElement.style.transition = 'transform 0.5s ease';
//               //                          currentElement.style.transform = 
//               //                              `translate(${translateToHome.x}px, ${translateToHome.y}px)`;
                                       
//               //                          setTimeout(() => {
//               //                              homePosition.appendChild(currentElement);
//               //                              currentElement.style.transform = "";
//               //                              currentElement.style.transition = "";
//               //                          }, 500);
//               //                      }, 100);
//               //                  }
//               //              }
//               //          }, 500);


//               //          if (ws && ws.readyState === WebSocket.OPEN) {
//               //           ws.send(JSON.stringify({
//               //               type: "turn_update",
//               //               currentPlayer: nextPlayer,
//               //               nextPlayer: getNextPlayer(nextPlayer) // Get the next player
//               //           }));
//               //         }
                     
//               //      }
//               //  }
//               // } 

//               // if (data.type === "update") {
//               //   console.log("Update received:", data);
                
//               //   const tokenId = data.payload.message.player;
//               //   const cubes = data.payload.message.cubes;
//               //   const nextPlayer = data.payload.message.active;
                
//               //   console.log("Token ID:", tokenId);
                
//               //   // Get player number and starting position
//               //   const playerNum = Math.floor(tokenId / 100);
//               //   const startingPositions = {
//               //       1: 1,   // Red starts at position 1
//               //       2: 14,  // Yellow starts at position 14
//               //       3: 27,  // Blue starts at position 27
//               //       4: 40   // Green starts at position 40
//               //   };
                
//               //   // Check if this is the first move for this token
//               //   if (!firstMoves[tokenId]) {
//               //       firstMoves[tokenId] = true;
//               //       const startPos = startingPositions[playerNum];
//               //       tokenPositions[tokenId] = startPos; // Initialize position to player's start
                    
//               //       const currentElement = document.getElementById(tokenId.toString());
//               //       const targetElement = document.getElementById(startPos.toString());
                    
//               //       if (currentElement && targetElement) {
//               //           const rectTarget = targetElement.getBoundingClientRect();
//               //           const rectCurrent = currentElement.getBoundingClientRect();
                        
//               //           const translateX = rectTarget.left - rectCurrent.left;
//               //           const translateY = rectTarget.top - rectCurrent.top;
                        
//               //           currentElement.style.transition = 'transform 0.5s ease';
//               //           currentElement.style.transform = `translate(${translateX}px, ${translateY}px)`;
//               //           currentElement.classList.add("moving");
                        
//               //           setTimeout(() => {
//               //               targetElement.appendChild(currentElement);
//               //               currentElement.style.transform = "";
//               //               currentElement.style.transition = "";
//               //               currentElement.classList.remove("moving");
//               //           }, 500);
//               //       }
//               //   } else {
//               //       // Calculate next position based on current position and dice roll
//               //       const currentPos = tokenPositions[tokenId];
//               //       let newPosition = currentPos + cubes;
                    
//               //       // Handle board wrapping
//               //       if (newPosition > 52) {
//               //           newPosition = newPosition - 52;
//               //       }
                    
//               //       tokenPositions[tokenId] = newPosition;
                    
//               //       const currentElement = document.getElementById(tokenId.toString());
//               //       const targetElement = document.getElementById(newPosition.toString());
                    
//               //       if (currentElement && targetElement) {
//               //           const rectTarget = targetElement.getBoundingClientRect();
//               //           const rectCurrent = currentElement.getBoundingClientRect();
                        
//               //           const translateX = rectTarget.left - rectCurrent.left;
//               //           const translateY = rectTarget.top - rectCurrent.top;
                        
//               //           currentElement.style.transition = 'transform 0.5s ease';
//               //           currentElement.style.transform = `translate(${translateX}px, ${translateY}px)`;
//               //           currentElement.classList.add("moving");
                        
//               //           setTimeout(() => {
//               //               targetElement.appendChild(currentElement);
//               //               currentElement.style.transform = "";
//               //               currentElement.style.transition = "";
//               //               currentElement.classList.remove("moving");
                            
//               //               // Check for home strip entry
//               //               const playerStartPos = startingPositions[playerNum];
//               //               const distanceFromStart = (newPosition - playerStartPos + 52) % 52;
                            
//               //               if (distanceFromStart >= 50) { // Token has completed full circuit
//               //                   const homeStripStart = playerNum * 100 + 10;
//               //                   const homePosition = document.getElementById(homeStripStart.toString());
                                
//               //                   if (homePosition) {
//               //                       setTimeout(() => {
//               //                           const rectHome = homePosition.getBoundingClientRect();
//               //                           const rectToken = currentElement.getBoundingClientRect();
                                        
//               //                           const translateToHome = {
//               //                               x: rectHome.left - rectToken.left,
//               //                               y: rectHome.top - rectToken.top
//               //                           };
                                        
//               //                           currentElement.style.transition = 'transform 0.5s ease';
//               //                           currentElement.style.transform = 
//               //                               `translate(${translateToHome.x}px, ${translateToHome.y}px)`;
                                        
//               //                           setTimeout(() => {
//               //                               homePosition.appendChild(currentElement);
//               //                               currentElement.style.transform = "";
//               //                               currentElement.style.transition = "";
//               //                           }, 500);
//               //                       }, 100);
//               //                   }
//               //               }
//               //           }, 500);
            
//               //           if (ws && ws.readyState === WebSocket.OPEN) {
//               //               ws.send(JSON.stringify({
//               //                   type: "turn_update",
//               //                   currentPlayer: nextPlayer,
//               //                   nextPlayer: getNextPlayer(nextPlayer)
//               //               }));
//               //           }
//               //       }
//               //   }
//               // }

//               if (data.type === "update") {
//                 console.log("Update received:", data);
                
//                 const tokenId = data.payload.message.player;
//                 const cubes = data.payload.message.cubes;
//                 const nextPlayer = data.payload.message.active;
                
//                 console.log("Token ID:", tokenId);
                
//                 // Define safe spots where tokens cannot be cut
//                 const safeSpots = [
//                     1, 9, 14, 22, 27, 35, 40, 48, // Star positions
//                     110, 111, 112, 113, 114, // Home strips
//                     210, 211, 212, 213, 214,
//                     310, 311, 312, 313, 314,
//                     410, 411, 412, 413, 414
//                 ];
                
//                 // Get player number and starting position
//                 const playerNum = Math.floor(tokenId / 100);
//                 const startingPositions = {
//                     1: 1,   // Red starts at position 1
//                     2: 14,  // Yellow starts at position 14
//                     3: 27,  // Blue starts at position 27
//                     4: 40   // Green starts at position 40
//                 };
                
//                 // First move handling
//                 if (!firstMoves[tokenId]) {
//                     firstMoves[tokenId] = true;
//                     const startPos = startingPositions[playerNum];
//                     tokenPositions[tokenId] = startPos;
                    
//                     const currentElement = document.getElementById(tokenId.toString());
//                     const targetElement = document.getElementById(startPos.toString());
                    
//                     if (currentElement && targetElement) {
//                         // Check if target position has another token
//                         const existingToken = targetElement.querySelector('button');
//                         if (existingToken && !safeSpots.includes(startPos)) {
//                             // Cut the token if it's not on a safe spot and not the same color
//                             const existingTokenColor = existingToken.className;
//                             if (existingTokenColor !== currentElement.className) {
//                                 const homePosition = document.getElementById(`${existingTokenColor}${existingToken.id.slice(-3)}`);
//                                 if (homePosition) {
//                                     homePosition.appendChild(existingToken);
//                                     delete tokenPositions[parseInt(existingToken.id)];
//                                     delete firstMoves[parseInt(existingToken.id)];
//                                 }
//                             }
//                         }
                        
//                         // Move animation
//                         const rectTarget = targetElement.getBoundingClientRect();
//                         const rectCurrent = currentElement.getBoundingClientRect();
                        
//                         const translateX = rectTarget.left - rectCurrent.left;
//                         const translateY = rectTarget.top - rectCurrent.top;
                        
//                         currentElement.style.transition = 'transform 0.5s ease';
//                         currentElement.style.transform = `translate(${translateX}px, ${translateY}px)`;
//                         currentElement.classList.add("moving");
                        
//                         setTimeout(() => {
//                             targetElement.appendChild(currentElement);
//                             currentElement.style.transform = "";
//                             currentElement.style.transition = "";
//                             currentElement.classList.remove("moving");
//                         }, 500);
//                     }
//                 } else {
//                     // Regular move handling
//                     const currentPos = tokenPositions[tokenId];
//                     let newPosition = currentPos + cubes;
                    
//                     // Check if token has completed a full circuit before entering home strip
//                     const playerStartPos = startingPositions[playerNum];
//                     const distanceFromStart = (newPosition - playerStartPos + 52) % 52;
                    
//                     if (distanceFromStart >= 50) {
//                         // Token has completed full circuit, can enter home strip
//                         const homeStripStart = playerNum * 100 + 10;
//                         const homePosition = document.getElementById(homeStripStart.toString());
                        
//                         if (homePosition) {
//                             const currentElement = document.getElementById(tokenId.toString());
                            
//                             setTimeout(() => {
//                                 const rectHome = homePosition.getBoundingClientRect();
//                                 const rectToken = currentElement.getBoundingClientRect();
                                
//                                 const translateToHome = {
//                                     x: rectHome.left - rectToken.left,
//                                     y: rectHome.top - rectToken.top
//                                 };
                                
//                                 currentElement.style.transition = 'transform 0.5s ease';
//                                 currentElement.style.transform = 
//                                     `translate(${translateToHome.x}px, ${translateToHome.y}px)`;
                                
//                                 setTimeout(() => {
//                                     homePosition.appendChild(currentElement);
//                                     currentElement.style.transform = "";
//                                     currentElement.style.transition = "";
                                    
//                                     // Send turn update
//                                     if (ws && ws.readyState === WebSocket.OPEN) {
//                                         ws.send(JSON.stringify({
//                                             type: "turn_update",
//                                             currentPlayer: nextPlayer,
//                                             nextPlayer: getNextPlayer(nextPlayer)
//                                         }));
//                                     }
//                                 }, 500);
//                             }, 100);
//                         }
//                         return;
//                     }
                    
//                     // Handle board wrapping
//                     if (newPosition > 52) {
//                         newPosition = newPosition - 52;
//                     }
                    
//                     tokenPositions[tokenId] = newPosition;
                    
//                     const currentElement = document.getElementById(tokenId.toString());
//                     const targetElement = document.getElementById(newPosition.toString());
                    
//                     if (currentElement && targetElement) {
//                         // Check for token collision
//                         const existingToken = targetElement.querySelector('button');
//                         if (existingToken && !safeSpots.includes(newPosition)) {
//                             // Cut the token if it's not on a safe spot and not the same color
//                             const existingTokenColor = existingToken.className;
//                             if (existingTokenColor !== currentElement.className) {
//                                 const homePosition = document.getElementById(`${existingTokenColor}${existingToken.id.slice(-3)}`);
//                                 if (homePosition) {
//                                     homePosition.appendChild(existingToken);
//                                     delete tokenPositions[parseInt(existingToken.id)];
//                                     delete firstMoves[parseInt(existingToken.id)];
//                                 }
//                             }
//                         }
                        
//                         // Move animation
//                         const rectTarget = targetElement.getBoundingClientRect();
//                         const rectCurrent = currentElement.getBoundingClientRect();
                        
//                         const translateX = rectTarget.left - rectCurrent.left;
//                         const translateY = rectTarget.top - rectCurrent.top;
                        
//                         currentElement.style.transition = 'transform 0.5s ease';
//                         currentElement.style.transform = `translate(${translateX}px, ${translateY}px)`;
//                         currentElement.classList.add("moving");
                        
//                         setTimeout(() => {
//                             targetElement.appendChild(currentElement);
//                             currentElement.style.transform = "";
//                             currentElement.style.transition = "";
//                             currentElement.classList.remove("moving");
                            
//                             // Send turn update
//                             // if (ws && ws.readyState === WebSocket.OPEN) {
//                             //     ws.send(JSON.stringify({
//                             //         type: "turn_update",
//                             //         currentPlayer: nextPlayer,
//                             //         nextPlayer: getNextPlayer(nextPlayer)
//                             //     }));
//                             // }
//                         }, 500);
//                     }
//                 }
//               }
            
            
           
//                if(data.type === "dice_roll")
//                  {  
           
//                    const currPlayer  =  data.player ;
//                    const goti = document.getElementById(data.diceId);
//                     if (goti) {
//                      goti.textContent = ""; // Remove "Roll Dice" text
//                     goti.classList.add("rotate-dice"); // Start dice rotation
//                     goti.style.backgroundImage = `url(${imageMap.get(7)})`; // Show rolling animation
//                     }
  
//         // After 1 second, stop rotation and show final dice face
//                    setTimeout(() => {
//                      if (goti) {
//                        goti.classList.remove("rotate-dice"); // Stop rotation
//                        goti.style.backgroundImage = `url(${imageMap.get(data.diceValue)})`; // Show correct dice face
//                      }
//                      setDie(data.diceValue);
//                    }, 1000);

//                    console.log("sending-data -from roll dice")
                
//                    console.log("WebSocket ReadyState:", wss?.readyState);

//                    setTimeout(()=>{
//                     wss?.send(JSON.stringify({
//                         type: "turn_update",
//                         currentPlayer: currPlayer,
//                         nextPlayer: getNextPlayer(currPlayer)  // Call function here
//                     })); } , 5000 )
                
      
        
        
//                }

//               if (data.type === "turn_update") {
//                 console.log(`Turn update received: Next player is ${data.nextPlayer}`);
//                 setActive(data.nextPlayer);
        
//                 setButtonStates(prev => ({
//                     ...prev,
//                     btn1: true,
//                     btn2: true,
//                     btn3: true,
//                     btn4: true,
//                     [`btn${getPlayerButtonNumber(data.nextPlayer)}`]: false
//                 }));
        
//                 updateZoomHighlight(data.nextPlayer);
//               }

//               if (data.type === "chat") {   
//                 console.log("helo guys i am under the water");
//                 console.log("Received chat message:", data);
//                 const playerColor = data.payload?.message?.selectedColor;
//                 setJoinedPlayers(prev => {
//                   const updatedState = {
//                     ...prev,
//                     [playerColor]: true,
//                     red: prev.red || (playerColor === "red"),
//                     yellow: prev.yellow || (playerColor === "yellow"),
//                     blue: prev.blue || (playerColor === "blue"),
//                     green: prev.green || (playerColor === "green")
//                   };
              
//                   wss.send(JSON.stringify({
//                     type: "sync_state",
//                     payload: { joinedPlayers: updatedState }
//                   }));
//                   console.log(updatedState, "✅ Updated joinedPlayers inside setJoinedPlayers");
//                   return updatedState;
//                 });
//               }
              
//               if (data.type === "sync_state") {
//                 console.log("🔄 Syncing full joinedPlayers state:", data.payload.joinedPlayers);
//                 setJoinedPlayers(prev => ({
//                   red: prev.red || data.payload.joinedPlayers.red,
//                   yellow: prev.yellow || data.payload.joinedPlayers.yellow,
//                   blue: prev.blue || data.payload.joinedPlayers.blue,
//                   green: prev.green || data.payload.joinedPlayers.green
//                 }));
//               }
              
//   }
//  catch(error)
//  {
//     console.error("Invalid JSON received:", event.data);
//  }

//   };


//   return () => wss.close(); // Cleanup WebSocket on unmount
  

//     Object.values(playerRefs.current).forEach(player => {
//       player.initializeElements();
//     });
//   }, []);

  

//   const playSound = async () => {
//     const audio = new Audio("../assets/WhatsApp Audio 2024-12-06 at 1.24.15 AM.mpeg");
//     await audio.play();
//   };

//   const gotiSound = async () => {
//     const audio = new Audio("../assets/goti.mp4");
//     await audio.play();
//   };

//   const addDice = async (diceId, value) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const goti = document.getElementById(diceId);
//         if (goti) {
//           goti.style.backgroundImage = `url(${imageMap.get(value)})`;
//         }
//         resolve();
//       }, 1000);
//     });
//   };

//   const removeZoom = async (activePlayer) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const element = document.getElementById(activePlayer);
//         if (element) {
//           element.classList.remove("zoom");
//         }
//         resolve();
//       }, 500);
//     });
//   };

//   const updateMessage = (msg) => {
//     const element = document.getElementById(msg);
//     if (element) {
//       element.classList.add("zoom");
//     }
//     const goti = document.getElementById("goti");
//     if (goti) {
//       goti.style.backgroundImage = "";
//       goti.textContent = "Roll Dice";
//     }
//     const rollButton = document.getElementById("roll");
//     if (rollButton) {
//       rollButton.value = `${msg}'s turn`;
//     }
//   };

//   const handleActivePlayer = (dice) => {
//     console.log(`Handling active player ${active} with dice ${dice}`);
    
//     // First disable all dice buttons
//     setButtonStates({
//       btn1: true,
//       btn2: true,
//       btn3: true,
//       btn4: true
//     });

//     const currentPlayer = playerRefs.current[active];
    
//     if (dice === 6) {
//       console.log(`Got a 6! ${active} player should roll again`);
//       currentPlayer.activatePlayer(setButtonStates);
//       currentPlayer.setStatus();
//       currentPlayer.enableBtn();
      
//       // Enable only current player's dice button
//       setButtonStates(prev => ({
//         ...prev,
//         [`btn${getPlayerButtonNumber(active)}`]: false
//       }));
      
//       updateZoomHighlight(active);
      
//     } else if (!currentPlayer.getStatus()) {
//       const nextPlayer = getNextPlayer(active);
//       console.log(`No active tokens - ${nextPlayer} player should roll next`);
//       setActive(nextPlayer);
      
//       // Enable only next player's dice button
//       setButtonStates(prev => ({
//         ...prev,
//         [`btn${getPlayerButtonNumber(nextPlayer)}`]: false
//       }));
      
//       updateZoomHighlight(nextPlayer);
      
//     } else {
//       console.log(`${active} player should roll again`);
//       currentPlayer.enableBtn();
      
//       // Enable only current player's dice button
//       setButtonStates(prev => ({
//         ...prev,
//         [`btn${getPlayerButtonNumber(active)}`]: false
//       }));
      
//       updateZoomHighlight(active);
//     }
//   };

//   const generateRandom = async (diceId, btnConfig) => {
    
//     console.log("console.log click on dice");

//     // if(pawn !== active )
//     // {   console.log("i am here  inside  return statement")
//     //     return  ;
//     // }

//     if(selectedColor  !== active)
//     { 
//         console.log("i am here  inside  return statement");
//         return ;
          
//     }
    
//     console.log(`${active} player is rolling the dice`);
//     await playSound();
//     updateMessage(active);
  
//     // Disable all buttons while dice is rolling
//     setButtonStates({
//       btn1: true,
//       btn2: true,   
//       btn3: true,
//       btn4: true
//     });
  
//     const dice = Math.floor(Math.random() * 6) + 1;
//     // const dice =6;
//     setCubes(dice)
//     console.log(`Dice Roll: ${dice} for ${active} player`);
  
//     const goti = document.getElementById(diceId);
//     if (goti) {
//       goti.style.backgroundImage = `url(${imageMap.get(7)})`;
//       goti.textContent = "";
//     }

//     if (wss && wss.readyState === WebSocket.OPEN) {
//     wss.send(JSON.stringify({
//       type: "dice_roll",
//       player: active,
//       diceId: diceId, // Sending the diceId as well
//       diceValue: dice
//     }));
//     }
//     else
//     {
//       console.error("WebSocket is not open:", wss.readyState);
//     }
  
//     await addDice(diceId, dice);
//     await removeZoom(active);
//     setDie(dice);
//     handleActivePlayer(dice);
//   };

//   const updateZoomHighlight = (currentPlayer) => {
//     console.log('Updating zoom highlight for:', currentPlayer);
    
//     // First remove all zoom classes from all players
//     ["red", "yellow", "blue", "green"].forEach((color) => {
//       const element = document.getElementById(color);
//       if (element) {
//         element.classList.remove("zoom");
//         element.classList.remove(`zoom-${color}`);
//       }
//     });

//     // Add zoom classes to current player
//     const playerElement = document.getElementById(currentPlayer);
//     if (playerElement) {
//       console.log(`Adding zoom classes to ${currentPlayer}`);
//       playerElement.classList.add("zoom");
//       playerElement.classList.add(`zoom-${currentPlayer}`);
//     } else {
//       console.log(`Could not find element for player: ${currentPlayer}`);
//     }
//   };

//   const getPlayerButtonNumber = (player) => {
//     const playerMap = { red: 1, yellow: 2, blue: 3, green: 4 };
//     return playerMap[player];
//   };

//   const getNextPlayer = (currentPlayer) => {
//     // const playerOrder = { red: 'yellow', yellow: 'blue', blue: 'green', green: 'red' };
//       //  const playerOrder =  {red : 'green' , green : 'red'};
//       // const playerOrder = { red: "yellow", yellow: "blue", blue: "green", green: "red" };
      
//       const  playerOrder  = {red : "yellow" , yellow:"red"}
//       // console.log("before intialization" , playerOrder)
       
//       // playerOrder =  Order;
       
//       // console.log("after  intialization" , playerOrder)
      
//       // console.log("next-player"  ,  playerOrder[currentPlayer] )

//      return playerOrder[currentPlayer]

   
//   };

//   const deactivateSubPlayer = () => {
//     if (deactivate) {
//       const player = playerRefs.current[declass];
//       if (player) {
//         const index = parseInt(deid) - (getPlayerButtonNumber(declass) * 100 + 1);
//         player.setsubStatus(index);
//         player.setSteps(index);
//         player.checkStatus();
//         setDeactivate(false);
//       }
//     }
//   };
//   const handleMove = (id) => {

//     // if(pawn != active)
//     // {
//     //     return 
//     // }

//     console.log("this is  inside selected and sctive" , selectedColor , active);

//     if(selectedColor !==  active)
//     {   
//          console.log("i am not ready for move one");
//          return 
//     }

//     if (die === 0) {
//       console.log('No dice roll yet - tokens cannot be moved');
//       return;
//     }
    
//     console.log(`Attempting to move token ${id} for ${active} player`);
    
//     setButtonStates({
//       btn1: true,
//       btn2: true,
//       btn3: true,
//       btn4: true
//     });

//     removeZoomClass();
//     const currentPlayer = playerRefs.current[active];
//     const playerNumber = getPlayerButtonNumber(active);
//     const baseId = playerNumber * 100 + 1;
//     const betlastid=String(id).split("")
//     const betlastidnew=betlastid[2]
//     player  = (betlastidnew-1);
    

//     sendMess(id , active)
//     console.log("this is  lastid" , betlastidnew)
    

//     // console.log("this is currentplayer" ,  currentPlayer.status);
//     console.log("this  is playerNumber" , playerNumber);
//     console.log("this is base id" ,  baseId)


//     if (!currentPlayer.getElementStatus(id - baseId)) {
//       // Only allow opening move if dice shows 6
//       if (die !== 6) {
//         console.log('Cannot open new token without rolling a 6');
//         setButtonStates(prev => ({
//           ...prev,
//           [`btn${playerNumber}`]: false
//         }));
//         return;
//       }
      
//       console.log(`Opening move for token ${id}`);
//       currentPlayer.openMove(id, gotiSound);
//       setDie(0);
      
//       setButtonStates(prev => ({
//         ...prev,
//         [`btn${playerNumber}`]: false
//       }));
//       updateZoomHighlight(active);
//     } else {
//       console.log(`Moving existing token ${id} by ${die} steps`);
//       currentPlayer.movePlayer(
//         id, 
//         die, 
//         gotiSound, 
//         playerRefs, 
//         getPlayerButtonNumber, 
//         setButtonStates,
//         setShowPopup,
//         setPopupMessage
//       );
//       deactivateSubPlayer();
//       checkGameWinner();

//       if (die !== 6) {
//         const nextPlayer = getNextPlayer(active);
//         setActive(nextPlayer);
//         const nextPlayerNumber = getPlayerButtonNumber(nextPlayer);
        
//         setButtonStates(prev => ({
//           ...prev,
//           [`btn${nextPlayerNumber}`]: false
//         }));
//         updateZoomHighlight(nextPlayer);
//       } else {
//         setButtonStates(prev => ({
//           ...prev,
//           [`btn${playerNumber}`]: false
//         }));
//         updateZoomHighlight(active);
//       }
//     }
//   };
  

//   const removeZoomClass = () => {
//     // This function can be removed as its functionality is now in updateZoomHighlight
//     console.log('removeZoomClass is deprecated');
//   };

//   const checkGameWinner = () => {
//     Object.entries(playerRefs.current).forEach(([color, player]) => {
//       if (player.checkWin()) {
//         // alert(`🎉 Congratulations! ${color.toUpperCase()} player has won the game! 🎉`);
        
//         setButtonStates({
//           btn1: true,
//           btn2: true,
//           btn3: true,
//           btn4: true
//         });
        
//         // if (window.confirm("Would you like to start a new game?")) {
//         //   window.location.reload();
//         // }
//       }
//     });
//   };

//   const CustomPopup = ({ message, onNewGame, onClose }) => {
//     if (!message) return null;

//     return (
   
//       <div className="fixed inset-0  flex items-center justify-center z-50">
//         <div className="bg-[#2634ffe7] border-2 border-[#a5a506] rounded-lg p-8 max-w-md w-11/12 transform transition-all scale-100 animate-fade-in">
//           <div className="text-center">
//             <h2 className="text-3xl font-bold mb-4 text-[#ffff2c]">
//               🎉 Game Over! 🎉
//             </h2>
//             <p className="text-xl text-white mb-8">
//               {message}
//             </p>
//             <div className="flex justify-center gap-4">
//               <div
//                 onClick={onNewGame}
//                 className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200 text-sm font-semibold"
//               >
//                 New Game
//               </div>
//               <div 
//                 onClick={onClose}
//                 className="px-6 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 font-semibold"
//               >
//                 Close
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // ... Previous React component code remains the same ...

// return (
//   <div className="main-ludo">
//     <div className="contain">
//       <div className="dice-top">
//         <div className="control-dice"   style={{display: joinedPlayers?.red ? '' : 'none' }}>
//           <div className="one-goti" style={{ borderRight: 'none', borderRadius: '5px 0px 0px 5px' }}>
//             <img src="./assets/ludo button(red ring).png" alt="" />
//           </div>
//           <button
//             disabled={buttonStates.btn1}
//             onClick={() => generateRandom('goti', { btn1: true, btn2: true, btn3: true, btn4: true })}
//             id="roll"
//           >
//             {active === 'red' ? "Roll Dice" : "Wait for your turn"}
//           </button>
//           <div className="diceImage" style={{ borderLeft: 'none' }} id="goti">
//             Roll Dice
//           </div>
//         </div>

//         <div className="control-dice"   style={{ display: joinedPlayers.yellow ? '' : 'none'}}>
//           <div className="diceImage" style={{ borderRight: 'none' }} id="goti2">
//             Roll Dice
//           </div>
//           <button
//             disabled={buttonStates.btn2}
//             onClick={() => generateRandom('goti2', { btn1: true, btn2: true, btn3: true, btn4: true })}
//             id="roll2"
//           >
//             {active === 'yellow' ? "Roll Dice" : "Wait for your turn"}
//           </button>
//           <div className="one-goti" style={{ borderLeft: 'none', borderRadius: '0px 5px 5px 0px' }}>
//             <img src="../assets/ludo buttonyellow ring).png" alt="" />
//           </div>
//         </div>
//       </div>

//       <div className="main-container">
//         <div className="sizing">
//           <div className="homeA" id="red" >
//             <div className="circle">
//               <div>
//                 <div className="innercircle" id="red101">
//                   <button
//                     className="red"
//                     id="101"
//                     onClick={() => handleMove(101)}
//                     disabled={false}
//                     style={{display: joinedPlayers?.red ? '' : 'none' }}
                    

//                   >
//                     <img src="./assets/ludo-button-red.png" alt="" />
//                     <img
//                       src="./assets/ludo ring.png"
//                       alt=""
//                       style={{
//                         position: 'absolute',
//                         height: 20,
//                         top: '15%',
//                         display: 'none'
//                       }}
//                       id="ludo-ring"
//                     />
//                   </button>
//                 </div>
//                 <div className="innercircle" id="red102">
//                   <button
//                     className="red"
//                     id="102"
//                     onClick={() => handleMove(102)}
//                     disabled={false}
//                     style={{display: joinedPlayers?.red ? '' : 'none' }}
//                   >
//                     <img src="./assets/ludo-button-red.png" alt="" />
//                     <img
//                       src="./assets/ludo ring.png"
//                       alt=""
//                       style={{
//                         position: 'absolute',
//                         height: 20,
//                         top: '15%',
//                         display: 'none'
//                       }}
//                       id="ludo-ring"
//                     />
//                   </button>
//                 </div>
//               </div>
//               <div>
//                 <div className="innercircle" id="red103">
//                   <button
//                     className="red"
//                     id="103"
//                     onClick={() => handleMove(103)}
//                     disabled={false}
//                     style={{display: joinedPlayers?.red ? '' : 'none' }}
//                   >
//                     <img src="./assets/ludo-button-red.png" alt="" />
//                     <img
//                       src="./assets/ludo ring.png"
//                       alt=""
//                       style={{
//                         position: 'absolute',
//                         height: 20,
//                         top: '15%',
//                         display: 'none'
//                       }}
//                       id="ludo-ring"
//                     />
//                   </button>
//                 </div>
//                 <div className="innercircle" id="red104">
//                   <button
//                     className="red"
//                     id="104"
//                     onClick={() => handleMove(104)}
//                     disabled={false}
//                     style={{display: joinedPlayers?.red ? '' : 'none' }}
//                   >
//                     <img src="./assets/ludo-button-red.png" alt="" />
//                     <img
//                       src="./assets/ludo ring.png"
//                       alt=""
//                       style={{
//                         position: 'absolute',
//                         height: 20,
//                         top: '15%',
//                         display: 'none'
//                       }}
//                       id="ludo-ring"
//                     />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col">
//             <img src="./assets/yellowA.png" alt="img" className="yellow-arrow" />
//             <div className="first">
//               <div className="col-one" id="11" />
//               <div className="col-one" id="10" />
//               <div className="col-one" id="9">
//                 <img src="./assets/star.png" alt="" className="star-img" />
//               </div>
//               <div className="col-one" id="8" />
//               <div className="col-one" id="7" />
//               <div className="col-one" id="6" />
//             </div>
//             <div className="winyellow">
//               <div className="col-two" id="12" style={{ backgroundColor: "#eeeeee" }} />
//               <div className="col-two" id="210" />
//               <div className="col-two" id="211" />
//               <div className="col-two" id="212" />
//               <div className="col-two" id="213" />
//               <div className="col-two" id="214" />
//             </div>
//             <div className="second">
//               <div className="col-third" id="13" />
//               <div className="col-third" id="14" style={{ backgroundColor: "#fff200" }} />
//               <div className="col-third" id="15" />
//               <div className="col-third" id="16" />
//               <div className="col-third" id="17" />
//               <div className="col-third" id="18" />
//             </div>
//           </div>

//           <div className="homeB" id="yellow">
//             <div className="circle">     
//               <div>
//                 <div className="innercircle" id="yellow201">
//                   <button
//                     className="yellow"
//                     id="201"
//                     onClick={() => handleMove(201)}
//                        disabled={false}
//                        style={{ display: joinedPlayers.yellow ? '' : 'none'}}
                       


//                   >
//                     <img src="../assets/ludo-button-yellow.png" alt="yellow-goti" />
//                     <img
//                       src="./assets/ludo ring.png"
//                       alt=""
//                       style={{
//                         position: 'absolute',
//                         height: 20,
//                         top: '15%',
//                         display: 'none'
//                       }}
//                       id="ludo-ring"
//                     />
//                   </button>
//                 </div>
//                 <div className="innercircle" id="yellow202">
//                   <button
//                     className="yellow"
//                     id="202"
//                     onClick={() => handleMove(202)}
//                        disabled={false}
//                        style={{ display: joinedPlayers.yellow ? '' : 'none'}}
//                   >
//                     <img src="./assets/ludo-button-yellow.png" alt="yellow-goti" />
//                     <img
//                       src="./assets/ludo ring.png"
//                       alt=""
//                       style={{
//                         position: 'absolute',
//                         height: 20,
//                         top: '15%',
//                         display: 'none'
//                       }}
//                       id="ludo-ring"
//                     />
//                   </button>
//                 </div>
//               </div>
//               <div>
//                 <div className="innercircle" id="yellow203">
//                   <button
//                     className="yellow"
//                     id="203"
//                     onClick={() => handleMove(203)}
//                        disabled={false}
//                     style={{ display: joinedPlayers.yellow ? '' : 'none'}}
//                   >
//                     <img src="./assets/ludo-button-yellow.png" alt="yellow-goti" />
//                     <img
//                       src="./assets/ludo ring.png"
//                       alt=""
//                       style={{
//                         position: 'absolute',
//                         height: 20,
//                         top: '15%',
//                         display: 'none'
//                       }}
//                       id="ludo-ring"
//                     />
//                   </button>
//                 </div>
//                 <div className="innercircle" id="yellow204">
//                   <button
//                     className="yellow"
//                     id="204"
//                     onClick={() => handleMove(204)}
//                        disabled={false}
//                     style={{ display: joinedPlayers.yellow ? '' : 'none'}}
//                   >
//                     <img src="./assets/ludo-button-yellow.png" alt="yellow-goti" />
//                     <img
//                       src="./assets/ludo ring.png"
//                       alt=""
//                       style={{
//                         position: 'absolute',
//                         height: 20,
//                         top: '15%',
//                         display: 'none'
//                       }}
//                       id="ludo-ring"
//                     />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="sizing">
//           <div className="row">
//             <div className="four">
//               <div className="row-one" id="52" />
//               <div className="row-one" id="1" style={{ backgroundColor: "#ff0000" }} />
//               <div className="row-one" id="2" />
//               <div className="row-one" id="3" />
//               <div className="row-one" id="4" />
//               <div className="row-one" id="5" />
//             </div>
//             <div className="winred">
//               <div className="row-two" id="51" style={{ backgroundColor: "#eeeeee" }}>
//                 <img src="./assets/redA.png" alt="a" className="props red-arrow" />
//               </div>
//               <div className="row-two" id="110" />
//               <div className="row-two" id="111" />
//               <div className="row-two" id="112" />
//               <div className="row-two" id="113" />
//               <div className="row-two" id="114" />
//             </div>
//             <div className="six">
//               <div className="row-third" id="50" />
//               <div className="row-third" id="49" />
//               <div className="row-third" id="48">
//                 <img src="./assets/star.png" alt="" className="star-img" />
//               </div>
//               <div className="row-third" id="47" />
//               <div className="row-third" id="46" />
//               <div className="row-third" id="45" />
//             </div>
//           </div>

//           <div className="winnerBox" id="win">
//             <i className="fa-solid fa-trophy" />
//           </div>

//           <div className="row">
//             <div className="four">
//               <div className="row-one" id="19" />
//               <div className="row-one" id="20" />
//               <div className="row-one" id="21" />
//               <div className="row-one" id="22">
//                 <img src="./assets/star.png" alt="" className="star-img" />
//               </div>
//               <div className="row-one" id="23">
//                 <img
//                   src="./assets/blueA.png"
//                   alt="aa"
//                   style={{ position: 'relative', marginLeft: 80 }}
//                   className="props blue-arrow"
//                 />
//               </div>
//               <div className="row-one" id="24" />
//             </div>
//             <div className="winblue">
//               <div className="row-two" id="314" />
//               <div className="row-two" id="313" />
//               <div className="row-two" id="312" />
//               <div className="row-two" id="311" />
//               <div className="row-two" id="310" />
//               <div className="row-two" id="25" style={{ backgroundColor: "#eeeeee" }} />
//             </div>
//             <div className="six">
//               <div className="row-third" id="31" />
//               <div className="row-third" id="30" />
//               <div className="row-third" id="29" />
//               <div className="row-third" id="28" />
//               <div className="row-third" id="27" style={{ backgroundColor: "#00acff" }} />
//               <div className="row-third" id="26" />
//             </div>
//           </div>
//         </div>
//         <div className="sizing">
//           <div className="homeC" id="green">
//             <div className="circle">
//               <div>
//                 <div className="innercircle" id="green401">
//                   <button
//                     className="green"
//                     id="401"
//                     onClick={() => handleMove(401)}
//                        disabled={false}
//                     style={{ display: selectedColor === 'green' ? '' : 'none' }}
//                   >
//                     <img src="./assets/ludo-button-green.png" alt="green-goti" />
//                     <img
//                       src="./assets/ludo ring.png"
//                       alt=""
//                       style={{
//                         position: 'absolute',
//                         height: 20,
//                         top: '15%',
//                         display: 'none'
//                       }}
//                       id="ludo-ring-green"
//                     />
//                   </button>
//                 </div>
//                 <div className="innercircle" id="green402">
//                   <button
//                     className="green"
//                     id="402"
//                     onClick={() => handleMove(402)}
//                        disabled={false}
//                     style={{ display: joinedPlayers.green ? '' : 'none' }}
//                   >
//                     <img src="./assets/ludo-button-green.png" alt="green-goti" />
//                     <img
//                       src="./assets/ludo ring.png"
//                       alt=""
//                       style={{
//                         position: 'absolute',
//                         height: 20,
//                         top: '15%',
//                         display: 'none'
//                       }}
//                       id="ludo-ring-green"
//                     />
//                   </button>
//                 </div>
//               </div>
//               <div>
//                 <div className="innercircle" id="green403">
//                   <button
//                     className="green"
//                     id="403"
//                     onClick={() => handleMove(403)}
//                        disabled={false}
//                        style={{ display: joinedPlayers.green ? '' : 'none' }}
//                   >
//                     <img src="./assets/ludo-button-green.png" alt="green-goti" />
//                     <img
//                       src="./assets/ludo ring.png"
//                       alt=""
//                       style={{
//                         position: 'absolute',
//                         height: 20,
//                         top: '15%',
//                         display: 'none'
//                       }}
//                       id="ludo-ring-green"
//                     />
//                   </button>
//                 </div>
//                 <div className="innercircle" id="green404">
//                   <button
//                     className="green"
//                     id="404"
//                     onClick={() => handleMove(404)}
//                        disabled={false}
//                        style={{ display: joinedPlayers.green ? '' : 'none' }}
//                   >
//                     <img src="./assets/ludo-button-green.png" alt="green-goti" />
//                     <img
//                       src="./assets/ludo ring.png"
//                       alt=""
//                       style={{
//                         position: 'absolute',
//                         height: 20,
//                         top: '15%',
//                         display: 'none'
//                       }}
//                       id="ludo-ring-green"
//                     />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col">
//             <div className="first">
//               <div className="col-one" id="44" />
//               <div className="col-one" id="43" />
//               <div className="col-one" id="42" />
//               <div className="col-one" id="41" />
//               <div className="col-one" id="40" style={{ backgroundColor: "#009a2b" }} />
//               <div className="col-one" id="39" style={{ borderBottom: 'none' }} />
//             </div>
//             <div className="wingreen">
//               <div className="col-two" id="414" />
//               <div className="col-two" id="413" />
//               <div className="col-two" id="412" />
//               <div className="col-two" id="411" />
//               <div className="col-two" id="410">
//                 <img src="./assets/greenA.png" alt="a" className="props green-arrow" />
//               </div>
//               <div className="col-two" id="38" style={{ backgroundColor: "#eeeeee" }} />
//             </div>
//             <div className="second">
//               <div className="col-third" id="32" />
//               <div className="col-third" id="33" />
//               <div className="col-third" id="34" />
//               <div className="col-third" id="35">
//                 <img src="./assets/star.png" alt="" className="star-img" />
//               </div>
//               <div className="col-third" id="36" />
//               <div className="col-third" id="37" style={{ borderBottom: 'none' }} />
//             </div>
//           </div>

//           <div className="homeD" id="blue">
//             <div className="circle">
//               <div>
//                 <div className="innercircle" id="blue301">
//                   <button
//                     className="blue"
//                     id="301"
//                     onClick={() => handleMove(301)}
//                        disabled={false}
//                        style={{ display: joinedPlayers.blue ? '' : 'none' }}
//                   >
//                     <img src="./assets/ludo-button-blue.png" alt="" />
//                     <img
//                       src="./assets/ludo ring.png"
//                       alt=""
//                       style={{
//                         position: 'absolute',
//                         height: 20,
//                         top: '15%',
//                         display: 'none'
//                       }}
//                       id="ludo-ring-blue"
//                     />
//                   </button>
//                 </div>
//                 <div className="innercircle" id="blue302">
//                   <button
//                     className="blue"
//                     id="302"
//                     onClick={() => handleMove(302)}
//                        disabled={false}
//                        style={{ display: joinedPlayers.blue ? '' : 'none' }}
//                   >
//                     <img src="./assets/ludo-button-blue.png" alt="" />
//                     <img
//                       src="./assets/ludo ring.png"
//                       alt=""
//                       style={{
//                         position: 'absolute',
//                         height: 20,
//                         top: '15%',
//                         display: 'none'
//                       }}
//                       id="ludo-ring-blue"
//                     />
//                   </button>
//                 </div>
//               </div>
//               <div>
//                 <div className="innercircle" id="blue303">
//                   <button
//                     className="blue"
//                     id="303"
//                     onClick={() => handleMove(303)}
//                        disabled={false}
//                        style={{ display: joinedPlayers.blue ? '' : 'none' }}
//                   >
//                     <img src="./assets/ludo-button-blue.png" alt="" />
//                     <img
//                       src="./assets/ludo ring.png"
//                       alt=""
//                       style={{
//                         position: 'absolute',
//                         height: 20,
//                         top: '15%',
//                         display: 'none'
//                       }}
//                       id="ludo-ring-blue"
//                     />
//                   </button>
//                 </div>
//                 <div className="innercircle" id="blue304">
//                   <button
//                     className="blue"
//                     id="304"
//                     onClick={() => handleMove(304)}
//                        disabled={false}
//                        style={{ display: joinedPlayers.blue ? '' : 'none' }}
//                   >
//                     <img src="./assets/ludo-button-blue.png" alt="" />
//                     <img
//                       src="./assets/ludo ring.png"
//                       alt=""
//                       style={{
//                         position: 'absolute',
//                         height: 20,
//                         top: '15%',
//                         display: 'none'
//                       }}
//                       id="ludo-ring-blue"
//                     />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="dice-top"   style={{ display: joinedPlayers.green ? '' : 'none' }}  >
//         <div className="control-dice"        >
//           <div className="one-goti" style={{ borderRight: 'none', borderRadius: '5px 0px 0px 5px' }}>
//             <img src="./assets/ludo button(green ring).png" alt="" />
//           </div>
//           <button
//             disabled={buttonStates.btn4}
//             onClick={() => generateRandom('goti4', { btn1: true, btn2: true, btn3: true, btn4: true })}
//             id="roll4"
//           >
//             {active === 'green' ? "Roll Dice" : "Wait for your turn"}
//           </button>
//           <div className="diceImage" style={{ borderLeft: 'none' }} id="goti4">
//             Roll Dice
//           </div>
//         </div>

//         <div className="control-dice"    style={{ display: joinedPlayers.blue ? '' : 'none' }} >
//           <div className="diceImage" style={{ borderRight: 'none' }} id="goti3"  >
//             Roll Dice
//           </div>
//           <button
//             disabled={buttonStates.btn3}
//             onClick={() => generateRandom('goti3', { btn1: true, btn2: true, btn3: true, btn4: true })}
//             id="roll3"
//           >
//             {active === 'blue' ? "Roll Dice" : "Wait for your turn"}
//           </button>
//           <div className="one-goti">
//             <img src="./assets/ludo button(blue ring).png" alt="" />
//           </div>
//         </div>
//       </div>
//     </div>
    
//     <CustomPopup 
//       message={popupMessage}
//       onNewGame={() => window.location.reload()}
//       onClose={() => setShowPopup(false)}
//     />
//   </div>
// );
// };

// export default Game;


