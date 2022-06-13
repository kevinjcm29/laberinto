import React from 'react'
import { Button, Container, ContainerFlex, NotifyError, Table, Td } from './styles'
import { board, boardSize, movePosition, entryPosition } from './utils/laberinto'

const App = () => {
  const [ boardWin, setBoardWin ] = React.useState([])
  const [searchExit, setSearchExit] = React.useState({
    search: false,
    resp: '',
    data: {
      exitPosition: '',
      traveled: []
    }
  })

  // Formatea el tablero para poder imprimir en filas
  const formattedBoard = (board) => {
    const newBoard = []
    for(let i = 0; i < board.length; i+=8){
      const row = [board[i], board[i+1], board[i+2], board[i+3], board[i+4], board[i+5], board[i+6],board[i+7]]
      newBoard.push(row)
    }
    return newBoard
  }

  // Ejecuta la función
  const handleSearchExit = () => {
    // debugger
    const data = {
      entryPosition: entryPosition,
      checkPointPositions: [],
      wayTraveled: [],
      previousRoadHistory: [],
      roadHistory: [entryPosition],
    };
    const respData = movePosition(data);
    console.log(respData)
    !respData.search && setSearchExit({...searchExit, resp: respData.resp})
    
    if(respData.search){
      const traveled = respData.data.traveled
      const newBoard = []
      for(let i = 0; i < board.length; i++){
        if(traveled.includes(i)){
          newBoard.push(i)
        } else{
          newBoard.push(board[i])
        }
      }
      console.log(newBoard)
      setBoardWin(formattedBoard(newBoard))
      setSearchExit(respData)
    }
  };

  const newFormattedBoard = formattedBoard(board)

  return (
    <Container>
      <Button onClick={() => handleSearchExit()} >ENCONTRAR SALIDA</Button>

      {/* Imprimir este tablero si hay error o no se inicia la app */}
      {
        searchExit.search === false &&
        <>
        { searchExit.resp  && <NotifyError>{searchExit.resp}</NotifyError>}
        <Table>
          {
            newFormattedBoard.map( row => (
              <tr>
                {
                  row.map( position => (
                    position === 1 ? <Td block={true}></Td> : <Td block={false}></Td> 
                  ) )
                }
              </tr>
            ) )
          }
        </Table>
        </>
      }

      {/* Imprimir este si se encuentra la salida */}
      {
        searchExit.search &&
        <>
        { searchExit.resp  && <NotifyError search={true}>{searchExit.resp}</NotifyError>}
        <ContainerFlex>
          <img src='https://c.tenor.com/SjP7Hjzb7M0AAAAM/tilin-dancing.gif' alt='loading' width={300}></img>
          <Table>
            {
              boardWin.map( row => (
                <tr>
                  {
                    row.map( position => {
                      return position === 1 ? <Td block={true}></Td> : <Td block={false}>{ position !== 0 && position !== 1 && position}</Td> 
                    })
                  }
                </tr>
              ) )
            }
          </Table>
          <img src='https://c.tenor.com/SjP7Hjzb7M0AAAAM/tilin-dancing.gif' alt='loading' width={300}></img>
        </ContainerFlex>
        </>
      }
    </Container>
  );
}

export default App