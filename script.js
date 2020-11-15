import create from "./js/utilities/create.js";


const container = create('div', 'container', null, null)
document.body.appendChild(container)



// window.addEventListener('DOMContentLoaded', function() {
//     let game = new Game()
// })



class GameBoard {
    // создать поле игры
    constructor() {
        this.isOverlay = false;
        this.gameBoard = create('div', 'game-board')
        this.menu = new Menu();
        this.game = new Game();
    }


}

class Menu {
    constructor() {

    }

    newGame() {

    }

    settings() {

    }

    savedGames() {

    }

    bestScores() {

    }

    rules() {

    }
}

class Game {
    constructor(size) {
        this.size = size;
        this.tiles = [];
        this.isOverlay = true;
        this.isPaused = false;
        this.gameBoard = create('div', 'game-board')
        this.moves = 0;
        // this.timer = new Timer().init()
    }

    randomTiles(tiles) {
      let currentIndex = tiles.length, temporaryValue, randomIndex;
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = tiles[currentIndex];
        tiles[currentIndex] = tiles[randomIndex];
        tiles[randomIndex] = temporaryValue;
      }
      return tiles;
    }

    createTiles() {
        let tiles = [];
        for (let i=0; i<this.size; i++) {
            if (i === 0) {
                tiles.push(create('div', 'empty', null, null, ['id', 'empty']))
            } else {
                tiles.push(create('div', 'tile', `${i}`, null, ['id', i]))
            }
        }
        return tiles;
    }

    overlay() {
        return create('div', 'overlay visible',[
            create('div', 'screen__container active', [
                create('button', 'nav__btn', 'New Game',),
                create('button', 'nav__btn', 'Saved Games',),
                create('button', 'nav__btn', 'Best Scores',),
                create('button', 'nav__btn', 'Rules',),
                create('button', 'nav__btn', 'Settings',),
            ], null,['name', 'main']),
            create('div', 'screen__container hidden', null, null,['name', 'settings']),
            create('div', 'screen__container hidden', null, null,['name', 'scores']),
            create('div', 'screen__container hidden', null, null,['name', 'saved']),
            create('div', 'screen__container hidden', null, null,['name', 'rules']),
        ])
    }

    generateGameBoard() {
        let temporaryTilesArray = this.createTiles();
        this.randomTiles(temporaryTilesArray).forEach((tile) => {
            this.tiles.push(tile)
            this.gameBoard.appendChild(tile)
        });

        console.log('inside generate tiles', this.tiles.length)

        document.addEventListener('click', this.tileHandler)

        if (this.isOverlay) {
            this.gameBoard.appendChild(this.overlay())
        }
        container.appendChild(this.gameBoard)

    }

    tileHandler(e) {
        console.log('click', this.tiles, this.size)
    }

}

new Game(9).generateGameBoard()