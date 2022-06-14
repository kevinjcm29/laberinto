export const board = [ 
    1,1,1,0,1,1,1,1,
    1,0,0,0,1,0,1,0,
    1,1,1,0,0,0,1,1,
    1,1,1,0,1,0,1,1,
    1,1,1,0,1,0,1,1,
    1,0,0,0,0,0,0,1,
    1,1,1,0,1,1,1,1,
    1,1,1,0,1,1,1,1,
]

// export const board = [ 
//     1,1,1,0,1,1,1,1,
//     1,0,1,0,0,0,0,1,
//     1,0,0,0,1,1,0,1,
//     1,0,1,0,1,1,0,1,
//     1,0,0,0,0,0,0,1,
//     1,1,1,0,1,1,1,1,
//     1,1,1,0,0,0,0,0,
//     1,1,1,1,1,1,1,1,
// ]

// Calcular el tama;o del tablero
export const boardSize = Math.sqrt(board.length)

// Encontrar los puntos de salida disponibles en el tablero
const exitPoints = (board, boardSize) => {
    const allRoadAvaible = []
    const leftSideExit = []
    const rightSideExit = []
    const bottomSideExit = []
    const exitAvaiblePosition = []

    // Save allRoads avaible
    for(const position in board){
        board[position] === 0 && allRoadAvaible.push(Number.parseInt(position))
    }
    
    // Save Left/Right exit position
    for(let i = boardSize; i < board.length; i+=boardSize){
        leftSideExit.push(i)
        rightSideExit.push( i +(boardSize-1) )
    }

    // Save bottom exit position
    const indexLeft = leftSideExit[leftSideExit.length - 1] + 1
    const indexRight = rightSideExit[rightSideExit.length - 1] - 1
    for(let i = indexLeft; i <= indexRight; i++){
        bottomSideExit.push(i)
    }

    // Save exit avaible position
    for(const position of allRoadAvaible){
        leftSideExit.includes(position) && exitAvaiblePosition.push(position)
        rightSideExit.includes(position) && exitAvaiblePosition.push(position)
        bottomSideExit.includes(position) && exitAvaiblePosition.push(position)
    }


    return {
        allRoadAvaible,
        exitAvaiblePosition
    }
}

// Encontrar la entrada del laberinto
export const searchInput = (board) => {
  for(const position in board){
      const indexPosition = board[position]
      if(indexPosition === 0){
          return Number.parseInt(position)
        }
    }
}

// Comprobar direcciones disponibles
const checkRoad =  ( currentIndex, roadHistory ) => {
    const sizeAvaible = []

    // Left/Right/Top/Bottom
    const leftSide = currentIndex - 1
    const rightSide = currentIndex + 1
    const topSide = currentIndex - boardSize
    const bottomSide = currentIndex + boardSize

    // Comprobar que la posición disponible no haya sido recorrida.
    const leftSideInHistory = roadHistory.includes(leftSide)
    const rightSideInHistory = roadHistory.includes(rightSide )
    const topSideInHistory = roadHistory.includes(topSide)
    const bottomSideInHistory = roadHistory.includes(bottomSide)

    if( board[leftSide] === 0 && !leftSideInHistory ){
        sizeAvaible.push(leftSide)
    }
    if( board[rightSide] === 0 && !rightSideInHistory ){
        sizeAvaible.push(rightSide)
    }
    if( board[topSide] === 0 && !topSideInHistory ){
        sizeAvaible.push(topSide)
    }
    if( board[bottomSide] === 0 && !bottomSideInHistory ){
        sizeAvaible.push(bottomSide)
    }

    return sizeAvaible
}

const roadHistory = [] // Camino recorrido/ Puestos de control Camino correcto

const { exitAvaiblePosition, allRoadAvaible  } = exitPoints(board, boardSize)
export const entryPosition = searchInput(board)

roadHistory.push(Number.parseInt(entryPosition))

export const dataMoveBoard = {
    entryPosition: entryPosition,
    checkPointPositions: [],
    wayTraveled: [],
    previousRoadHistory: [],
    roadHistory: roadHistory
}

export const movePosition = (dataMoveBoard) => {
    const { entryPosition, checkPointPositions, wayTraveled, roadHistory,previousRoadHistory } = dataMoveBoard
    const sideAvaible = checkRoad(entryPosition, roadHistory)

    // Guarda el camino si este no fué recorrido antes
    if(!wayTraveled.includes(entryPosition)){
        wayTraveled.push(entryPosition)
    }

    // Si no existe ningúna salida.
    if(exitAvaiblePosition.length === 0){
        console.log('El tablero no tiene ninguna salida')
        return  {
            search : false,
            resp: 'El tablero no tiene ninguna salida',
            data: {
                exitPosition: entryPosition,
                traveled: wayTraveled
            }
        }
    }

    // Si encuentra la salida
    if(exitAvaiblePosition.includes(entryPosition)){
        console.log('La salida está en la posición', entryPosition)
        console.log('El camino para llegar a la salida es,', wayTraveled)
        return  {
            search : true,
            resp : `La salida está en la posición ${ entryPosition }, se necesitaron ${wayTraveled.length} pasos para llegar a ella`,
            data: {
                exitPosition: entryPosition,
                traveled: wayTraveled
            }
        }
    }

    // Si no hay caminos disponibles para llegar a la salida.
    if(sideAvaible.length === 0 && checkPointPositions.length === 0){
        console.log('No hay caminos disponibles para llegar a la salida')
        return  {
            search : false,
            resp : 'No hay caminos disponibles para llegar a la salida',
            data: {
                exitPosition: entryPosition,
                traveled: wayTraveled
            }
        }
    }
    
    // Si no hay ningún espacio disponible, volver al último checkpoints.
    if(sideAvaible.length === 0){
        
        // Ubica cual fue el ultimo puesto de control, vuelve a el y elimina todos los posteriores en el camino correcto.
        const lastCheckpoint = checkPointPositions[checkPointPositions.length - 1]
        const indexLastCheckPoint = wayTraveled.indexOf(lastCheckpoint) + 1
        const newWayTraveled = wayTraveled.slice(0, indexLastCheckPoint)
        checkPointPositions.pop()

        const NewPreviousRoadHistory = [...roadHistory]
        roadHistory.push(entryPosition)

        // Crear nueva data
        const newDataMoveBoard = {
            entryPosition: lastCheckpoint,
            checkPointPositions: checkPointPositions,
            roadHistory: roadHistory,
            wayTraveled: newWayTraveled,
            previousRoadHistory: NewPreviousRoadHistory
        }
        return movePosition(newDataMoveBoard)
    }

    // Si hay mas de un espacio disponible, crear un checkpoints y recorrer uno por uno.
    if(sideAvaible.length > 1){
        checkPointPositions.push(entryPosition)
        for(const move of sideAvaible){
            const newPreviousRoadHistory = [...roadHistory]
            roadHistory.push(move)

            // Crear nueva data
            const newDataMoveBoard = {
                entryPosition: move,
                checkPointPositions: checkPointPositions,
                roadHistory: roadHistory,
                wayTraveled: wayTraveled,
                previousRoadHistory: newPreviousRoadHistory
            }
            return movePosition(newDataMoveBoard)
        }
    }

    // Continua avanzando si solo hay un espacio disponible.
    if(sideAvaible.length === 1){
        const position = sideAvaible[0]
        const newPreviousRoadHistory = [...roadHistory]
        roadHistory.push(position)

        // Crear nueva data
        const newDataMoveBoard = {
            entryPosition: position,
            checkPointPositions: checkPointPositions,
            roadHistory: roadHistory,
            wayTraveled: wayTraveled,
            previousRoadHistory: newPreviousRoadHistory
        }
        return movePosition(newDataMoveBoard)
    }


}