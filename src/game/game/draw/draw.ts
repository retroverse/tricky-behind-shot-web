import {CanvasRectangle} from '../t/canvas'
import {State} from '../t/state'
import drawGrid from './drawGrid'
import drawUnits from './drawUnits'
import drawSelectingEffects from './drawSelectingEffects'
import drawUnitCrossEffects from './drawUnitCrossEffects'
import drawUnitArrowEffects from './drawUnitArrowEffects'

export default (state : State, canvasRect : CanvasRectangle) => (ctx : CanvasRenderingContext2D) => {
  // get canvas size
  const width = canvasRect.width
  const height = canvasRect.height

  // Clear screen
  ctx.clearRect(0, 0, width, height)

  // draw grid
  drawGrid(canvasRect, ctx)

  // draw selecting effects
  drawSelectingEffects(state, canvasRect, ctx)

  // draw unit arrow effects
  drawUnitArrowEffects([...state.game.units], state.ui, canvasRect, ctx)

  // draw units
  drawUnits([...state.game.units], state.ui, canvasRect, ctx)

  // draw unit crosses
  drawUnitCrossEffects([...state.game.units], state.ui, canvasRect, ctx)
}
