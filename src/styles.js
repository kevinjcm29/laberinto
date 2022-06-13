import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const Table = styled.table`
    border-collapse: collapse;
    background-color: #FAF7BC;
`

export const Td = styled.td`
    padding: 1.5em;
    background-color: ${props => props.block && 'gray'};
    text-align: center;
    border: 1px solid black;
`

export const Button = styled.div`
    padding: 1em;
    font-family: 'Courier New', Courier, monospace;
    font-size: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    background-color: #FAF7BC;
    border: 1px solid black;
    cursor: pointer;
    margin-bottom: 2em;

`

export const NotifyError = styled.div`
    background-color: red;
    padding: .7em;
    color: white;
    margin-bottom: 2em;
    font-family: 'Courier New', Courier, monospace;
`
