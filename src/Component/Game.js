import React from 'react';
import '../CSS/Game.css';

function Square(props){
    return(
    <button className="square" onClick={props.onClick}>
     {props.value}
    </button>
    )
}
class Board extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            squares : Array(9).fill(null),
            xIsNext: true,
            result: '0',
        };
        this.props = this.state.result;
    }
    onSquareClick(i){
        const squares = this.state.squares.slice();
        if(CountWinnerScore(squares) || squares[i])
        {
            return;
        }
        squares[i]= this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }
    onRestartClick(i){  
        this.setState({
            squares : Array(9).fill(null),
            xIsNext: true,
        });
    }
    renderSquare(i){
        return (
        <Square 
            value={this.state.squares[i]} 
            onClick={()=> this.onSquareClick(i)} 
        />
        );
    }
    render(){
        const winner = CountWinnerScore(this.state.squares);
        let resultNull = matchNull(this.state.squares);
        let status;
        let buttonRestart = <button className="btnRestart" 
        onClick={()=> this.onRestartClick(this.state.squares)}>
        Click here to restart</button>;
        let contentRestart;
                
        if(winner){
            status = 'Winner : ' + winner;
            contentRestart = buttonRestart;
            this.state.result = winner;
        }    
        else if(!resultNull){                       
            status = 'Match Null';
            contentRestart = buttonRestart;
            this.state.result = 'Null';
        }
        else{
            status = 'Next player : '+(this.state.xIsNext ? 'X' : 'O');
        }
                
        return(
            <div>
                <div className="status">{status}</div>
                {/* <div className="restart">{contentRestart}</div> */}
                {<div>{winner}</div>}
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
            
        )
    }
}
function CountWinnerScore(squares){
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    for(let i = 0; i < lines.length; i++){
        const[a,b,c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
        {
            return squares[a];
        }
    }
    return null;
}

function matchNull(squares){
    for(let i = 0; i < squares.length; i++){
        if(squares[i] === null){
            return true;
        }
    }
    return false;
}

class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            board : Array(5).fill(null),
        };
    }
    renderBoard(i){       
        return(
        <div className="game-board">
            <Board value={this.props.result}/>
          </div>
        );
        
    }
    renderRemplir(i){
        // this.renderBoard(i)=

    }
    render() {
      return (
        <div className="game">    
            {this.renderBoard()}
          <div className="game-info">
          </div>
        </div>
      );
    }
}

export default Game;