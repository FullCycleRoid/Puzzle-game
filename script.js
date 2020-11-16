import create from "./js/utilities/create.js";


const container = create('div', 'container', null, null)
document.body.appendChild(container)



class Timer {
    constructor(parent) {
        this.initTime = 0;
        this.isPaused = true;
        this.time = '';
        this.parent = parent
        this.parent.textContent = "00:00"

        this.startTime()
    }

    tick() {
        let minutes = parseInt(this.initTime / 60, 10)
        let seconds = parseInt(this.initTime % 60, 10)

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ?  '0' + seconds : seconds;

        ++this.initTime;

        this.parent.textContent = `${minutes}:${seconds}`;
    }

    startTime() {

            setInterval(()=> {this.tick()} ,1000)
    }

    paused () {
        if (this.isPaused) {
            setInterval( this.startTime ,200000);
            // this.isPaused = false
        } else {
            setInterval( this.startTime ,5);
            // this.isPaused = true;

        }
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
        this.menu = [];
        this.header = [];
        this.timer;
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

    generateMenu() {

        let menu = create('div', 'overlay visible',[
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


        for (let i=0; i<menu.children.length; i++) {
            this.menu.push(menu.children[i])
        }
        return menu;
    }

    generateHeader() {
        let header = create('div', 'header');

        let headerElements = [create('div', 'timer',[ create('span', null, 'Timer: '),
                                                                        create('span')
                                                                       ]),
                              create('div', 'moves', [ create('span', null, 'Moves: '),
                                                                         create('span')
                                                                       ]),
                              create('button', 'pause visible', 'Pause game'),
                              create('button', 'pause', 'Resume game')
        ];

        headerElements.forEach((elem)=> {
            header.appendChild(elem)
        })

        return {header, headerElements} ;
    }

    generateGameBoard() {

        let temporaryTilesArray = this.createTiles();
        this.randomTiles(temporaryTilesArray).forEach((tile) => {
            this.tiles.push(tile)
            this.gameBoard.appendChild(tile)
        });

        this.tiles.forEach((el, index)=> {
            el.addEventListener('click', (e)=> { this.tileHandler(e, index)})
        })

        let {header, headerElements} = this.generateHeader()

        this.timer = new Timer(headerElements[0].children[1]);

        this.gameBoard.appendChild(this.generateMenu())

        this.menu[0].children[0].addEventListener('click', (e)=> this.startGame(e, this.timer))
        headerElements[2].addEventListener('click', (e)=> this.startGame(e, this.timer))


        headerElements[1].children[1].textContent = '0';

        container.appendChild(header)
        container.appendChild(this.gameBoard)
    }

    startGame(e, timer) {

        let startBtn = document.getElementsByClassName('overlay')[0]
        if (this.isPaused) {
                timer.paused()
                timer.isPaused = false;
                startBtn.classList.add('visible')
                this.isPaused = false;
            } else {
                timer.paused()
                timer.isPaused = false;
                startBtn.classList.remove('visible')
                this.isPaused = true;
                console.log(timer)

            }
    }

    tileHandler(e, index) {
        let swapedElem = this.gameBoard.children[index]

        let deletedElem = this.gameBoard.removeChild(this.gameBoard.children[index])

        console.log('this shit',deletedElem)

        if (deletedElem.id !== empty) {
            this.gameBoard.insertBefore(deletedElem, swapedElem.parentNode )
            this.gameBoard.insertBefore(deletedElem, swapedElem.parentNode )
            this.gameBoard.insertBefore(deletedElem, swapedElem.parentNode )
        }
        console.log('this tile', this.gameBoard.children[index-1].nextSibling.id)

        if (this.gameBoard.children[index].nextSibling.id === 'empty' ||
            this.gameBoard.children[index].previousSibling.id === 'empty') {
            console.log('empty inside sibling')


        }


        if (this.gameBoard.children[index].nextSibling.id % index === 0) {
            console.log('empty row')
        }


    }

}

new Game(4).generateGameBoard()




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
