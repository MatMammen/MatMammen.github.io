const gameBoard = (()=> {
    //the array
    const gameBoardArray = ['', '', '', '', '', '', '', '', '']
    //the function to create the ui
    const gameBoardRender = (Player1, Player2) => {
        const mainDiv = document.querySelector("#main");
        const parentDiv = document.createElement('div');
        mainDiv.appendChild(parentDiv)
        parentDiv.className = "boardTable";
        //Creating an actual box to house value board with flex box
        for (let i = 0; i < 9; i++) {
            let item = document.createElement('div')
            item.textContent = gameBoardArray[i]
            item.className = "boardTable-cell";
            parentDiv.appendChild(item);
        }
        //adding text and button area
        //figure out how to center them 
        const textAndButtonArea = document.createElement('div')
        textAndButtonArea.className = "text-button-area"
        parentDiv.appendChild(textAndButtonArea);
        const textArea = document.createElement('div');
        textArea.className = "text-area";
        textArea.textContent = "Player 1 turn"
        //textArea.position = "relative";
        //textArea.style.left = "50px"

        textAndButtonArea.appendChild(textArea);
        //eventlistener stuff
        let counter = 0;
        //function to determine element index
        function getElementIndex(node) {
            var index = 0;
            while ( (node = node.previousElementSibling) ) {
                index++;
            }
            return index;
        }
        //adding listener to parent div, changes color and item in index
        parentDiv.addEventListener('click', function stuff(e) {
            //add the restart button
            function resetButton() {
                const resetButton = document.createElement('button')
                resetButton.textContent = 'reset';
                resetButton.className = "button-area"
                textAndButtonArea.appendChild(resetButton);
                resetButton.addEventListener('click', function moreStuff() {
                    window.location.reload();
                })
            }
            //define functions for each player
            function player1Turn() {
                e.target.textContent = `${Player1.attribute}`
                e.target.style.background = `${Player1.color}`
                const pickedArray = getElementIndex(e.target)
                gameBoard.gameBoardArray[pickedArray] = Player1.attribute;
                counter++
                if (Player1.checkWin(gameBoardArray)) {
                    textArea.textContent = "Player 1 has won!"
                    counter = counter + 20
                    resetButton()
                }
                else {
                    textArea.textContent = "Player 2 turn"
                }
            }
            function player2Turn() {
                e.target.textContent = `${Player2.attribute}`
                e.target.style.background = `${Player2.color}`
                const pickedArray = getElementIndex(e.target)
                gameBoard.gameBoardArray[pickedArray] = Player2.attribute;
                counter++
                if (Player2.checkWin(gameBoardArray)) {
                    textArea.textContent = "Player 2 has won!"
                    counter = counter + 20
                    resetButton();
                }
                else {
                    textArea.textContent = "Player 1 turn"
                }
            }
            if(e.target.className == "boardTable-cell" && e.target.textContent == '')  {
                switch(counter){
                    case 0:player1Turn();break;
                    case 1:player2Turn();break;
                    case 2:player1Turn();break;
                    case 3:player2Turn();break;
                    case 4:player1Turn();break;
                    case 5:player2Turn();break;
                    case 6:player1Turn();break;
                    case 7:player2Turn();break;
                    case 8:player1Turn(); if (counter == 9) {
                        textArea.textContent = "There is a tie!"
                        resetButton();
                    }
        
        
                }
            }
        })
    }
    return {gameBoardRender, gameBoardArray}
})()

//creating the players
const Player = (color, attribute) => {
    //check to see if won
    const checkWin = (array) => {
        //horizontals
        if (array[0]==attribute && array[1]==attribute && array[2]==attribute) {
            return true
        }
        else if (array[3]==attribute && array[4]==attribute && array[5]==attribute) {
            return true
        }
        else if (array[6]==attribute && array[7]==attribute && array[8]==attribute) {
            return true
        }
        //verticals
        else if (array[0]==attribute && array[3]==attribute && array[6]==attribute) {
            return true
        }
        else if (array[1]==attribute && array[4]==attribute && array[7]==attribute) {
            return true
        }
        else if (array[2]==attribute && array[5]==attribute && array[8]==attribute) {
            return true
        }
        else if (array[0]==attribute && array[4]==attribute && array[8]==attribute) {
            return true
        }
        else if (array[2]==attribute && array[4]==attribute && array[6]==attribute) {
            return true
        }
    }
    return {color, attribute, checkWin}
}
//page reset to reset
//add references to 9 turns and while loop here?
const diplayController = (() => {
    const Player1 = Player('pink', "X")
    const Player2 = Player('green', 'O')
    gameBoard.gameBoardRender(Player1, Player2)
})()