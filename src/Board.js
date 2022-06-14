import React from "react";
import 'animate.css';
import { Notify, Table, Td } from "./styles";

const Board = ({ boardFormatted, notifyResp, isSearch }) => {
  return (
    <>
      {notifyResp && <Notify className="animate__animated animate__pulse" search={isSearch}>{notifyResp}</Notify>}
      <Table>
        {boardFormatted.map((row) => (
          <tr>
            {row.map((position) =>
              position === 1 
              ? <Td block={true}>.</Td> 
              : <Td block={false}>{position !== 0 && position !== 1 && position}</Td>
            )}
          </tr>
        ))}
      </Table>
    </>
  );
};

export default Board;
