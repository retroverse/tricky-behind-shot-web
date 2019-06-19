import Input from './util/input'
import turns from './game/config/turns' // TEMPORARY #HACK

export default class GameControl {
  constructor (canvas, updateFunc, drawFunc, initialState) {
    this.canvas = canvas
    this.updateFunc = updateFunc
    this.drawFunc = drawFunc
    this.state = {...initialState}
    this.previousUpdateTime = Date.now()

    this.input = new Input(this.canvas.getPosition.bind(this.canvas))
  }

  update () {
    const deltaTime = Date.now() - this.previousUpdateTime
    const input = this.input.getMouseInput()
    const canvasRect = this.canvas.getRect()
    const newState = this.updateFunc({...this.state}, input, deltaTime, canvasRect)
    this.state = newState

    // for debugging purposes
    window.state = {...this.state}
    const startTime = window.state.game.turnStartTime
    const duration = Date.now() - startTime
    const currentPlayer = window.state.game.turn === 0 ? 'Red' : 'Blue'
    window.document.title = `TBS (${currentPlayer} has ${Math.floor(turns.turnMaxTime / 1000) - Math.floor(duration / 1000)}s left)`

    // Update updateTime
    this.previousUpdateTime = Date.now()
  }

  draw () {
    const canvasRect = this.canvas.getRect()
    const drawOperation = this.drawFunc({...this.state}, canvasRect)
    this.canvas.draw(drawOperation)
  }

  loop () {
    this.update()
    this.draw()
  }
}
