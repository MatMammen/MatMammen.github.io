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
        const textAndButtonArea = document.createElement('div')
        textAndButtonArea.className = "text-button-area"
        parentDiv.appendChild(textAndButtonArea);
        const textArea = document.createElement('div');
        textArea.className = "text-area";
        textArea.textContent = ""
        textAndButtonArea.appendChild(textArea);
        //add inputs for names
        const player1Name = document.createElement('input')
        textAndButtonArea.appendChild(player1Name)
        player1Name.placeholder = "Enter Player 1 name"
        const player2Name = document.createElement('input')
        player2Name.placeholder = "Enter Player 2 name";
        textAndButtonArea.appendChild(player2Name)
        //add inputs for colors
        const player1Color = document.createElement('input')
        player1Color.type = "color"
        //textAndButtonArea.appendChild(player1Color);
        textAndButtonArea.insertBefore(player1Color, player2Name)
        const player2Color = document.createElement('input')
        player2Color.type = "color"
        textAndButtonArea.appendChild(player2Color);
        //player2Color
        //function to remove stuff
        function removeContent(parent, child) {
            parent.removeChild(child)
        }
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
                e.target.style.background = `${player1Color.value}`
                e.target.style.borderStyle = "hidden"
                const pickedArray = getElementIndex(e.target)
                gameBoard.gameBoardArray[pickedArray] = Player1.attribute;
                counter++
                if (Player1.checkWin(gameBoardArray)) {
                    textArea.textContent = `${player1Name.value} has won!`
                    counter = counter + 20
                    resetButton()
                }
                else {
                    textArea.textContent = `${player2Name.value}'s turn`
                }
            }
            function player2Turn() {
                e.target.textContent = `${Player2.attribute}`
                e.target.style.background = `${player2Color.value}`
                e.target.style.borderStyle = "hidden"
                const pickedArray = getElementIndex(e.target)
                gameBoard.gameBoardArray[pickedArray] = Player2.attribute;
                counter++
                if (Player2.checkWin(gameBoardArray)) {
                    textArea.textContent = `${player2Name.value} has won!`
                    counter = counter + 20
                    resetButton();
                }
                else {
                    textArea.textContent = `${player1Name.value}'s turn`
                }
            }
            if(e.target.className == "boardTable-cell" && e.target.textContent == '' && player1Name.value != '' && player2Name.value != '' && player1Color.value != player2Color.value)  {
                switch(counter){
                    case 0:player1Turn();removeContent(textAndButtonArea, player1Name);removeContent(textAndButtonArea, player2Name);removeContent(textAndButtonArea, player1Color);removeContent(textAndButtonArea, player2Color);break;
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
            else if (player1Name.value == '' || player2Name.value == '') {
                textArea.textContent = "Please name your players!"
            }
            else if (player1Color.value == player2Color.value) {
                textArea.textContent = "Player Colors cannot be the exact same!"
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