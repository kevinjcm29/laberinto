import React from "react";
import Board from "./Board";
import { Button, Container} from "./styles";
import { board, movePosition, entryPosition } from "./utils/laberinto";

const App = () => {
  const [boardWin, setBoardWin] = React.useState([]);
  const [searchExit, setSearchExit] = React.useState({
    search: false,
    resp: "",
    data: {
      exitPosition: "",
      traveled: [],
    },
  });

  const formattedBoard = (board) => {
    const newBoard = [];
    for (let i = 0; i < board.length; i += 8) {
      const row = [
        board[i],
        board[i + 1],
        board[i + 2],
        board[i + 3],
        board[i + 4],
        board[i + 5],
        board[i + 6],
        board[i + 7],
      ];
      newBoard.push(row);
    }
    return newBoard;
  };

  // Ejecuta la función
  const handleSearchExit = () => {
    const data = {
      entryPosition: entryPosition,
      checkPointPositions: [],
      wayTraveled: [],
      previousRoadHistory: [],
      roadHistory: [entryPosition],
    };

    const respData = movePosition(data);

    if(!respData.search){
      setSearchExit({ ...searchExit, resp: respData.resp, search: false });
    }


    if (respData.search) {
      const traveled = respData.data.traveled;
      const newBoard = [];
      for (let i = 0; i < board.length; i++) {
        if (traveled.includes(i)) {
          newBoard.push(i);
        } else {
          newBoard.push(board[i]);
        }
      }
      setBoardWin(formattedBoard(newBoard));
      setSearchExit(respData);
    }
  };

  const newFormattedBoard = formattedBoard(board);

  return (
    <Container>
      <Button onClick={() => handleSearchExit()}>ENCONTRAR SALIDA</Button>

      {/* Si no hay caminos o no existe salida*/}
      {!searchExit.search && (
        <Board
          boardFormatted={newFormattedBoard}
          isSearch={searchExit.search}
          notifyResp={searchExit.resp}
        />
      )}

      {/* Si hay caminos disponibles */}
      {searchExit.search && (
        <Board
          boardFormatted={boardWin}
          isSearch={searchExit.search}
          notifyResp={searchExit.resp}
        />
      )}
    </Container>
  );
};

export default App;
