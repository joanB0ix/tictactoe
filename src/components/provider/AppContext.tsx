import * as React from "react";
import { getRand, GAME_TYPE, findBestMove, movesLeft } from "../common";

export interface AppContextInterface {
  gameType: number;
  current: number;
  robot: number;
  table: number[][];
  status: number;
  flag: boolean;
  makeMove: (index: number[]) => void;
  changeType: (type: any) => void;
  newGame: () => void;
}

const ctxt = React.createContext<AppContextInterface | null>(null);

export const AppContextProvider = ctxt.Provider;
export const AppContextConsumer = ctxt.Consumer;

export class AppContext extends React.Component {
  state = {
    gameType: GAME_TYPE.HUMAN,
    current: getRand(0, 2),
    robot: getRand(0, 2),
    table: [
      [-1, -1, -1],
      [-1, -1, -1],
      [-1, -1, -1],
    ],
    status: -1,
    moveCount: 0,
    flag: false,
    makeMove: async(index: number[]) => await this.makeMove(index),
    changeType: (type: any) => this.changeType(type),
    newGame: async() => await this.newGame(),
    findBestMove: async() => await findBestMove([...this.state.table], this.state.robot),
  };

  makeMove = async (i:number[]) => {
    
    if(i[0] !== -1){
      
      let newTable = this.cloneMat(this.state.table);
      newTable[i[0]][i[1]] = this.state.current;

      await this.setState({
        table: newTable,
        moveCount: this.state.moveCount + 1,
      })
      await this.checkGame(this.state.table, this.state.robot);
      await this.setState({
        current: 1 - this.state.current
      },()=>{
        if(this.state.current === this.state.robot && this.state.gameType === 1){
          setTimeout(async()=>{      
            let move = await this.state.findBestMove();
            await this.state.makeMove(move);                           
          },1000)
        }
      });
    }
  
  }

  cloneMat = (table:number[][]) => {
    let res = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]]
    for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        res[i][j] = table[i][j]
      }
    }
    return res
  }

  changeType = (type: any) => {
    if (type !== this.state.gameType) {
      this.setState({
        gameType: type,
      });
      this.newGame();
    }
  };

  checkGame = async(b:number[][], robot: number) => {
    for (let row = 0; row < 3; row++) {
      if (b[row][0] === b[row][1] && b[row][1] === b[row][2]) {
        if (b[row][0] === robot){
          await this.setState({
            status: robot
          })
          return;
        }
        else if (b[row][0] === 1 - robot){
          await this.setState({
            status: 1 - robot
          })
          return;
        };
      }
    }

    for (let col = 0; col < 3; col++) {
      if (b[0][col] === b[1][col] && b[1][col] === b[2][col]) {
        if (b[0][col] === robot){
          await this.setState({
            status: robot
          })
          return;
        }
        else if (b[0][col] === 1 - robot){
          await this.setState({
            status: 1 - robot
          })
          return;
        };
      }
    }

    if (b[0][0] === b[1][1] && b[1][1] === b[2][2]) {
      if (b[0][0] === robot){
        await this.setState({
          status: robot
        })
        return;
      }
      else if (b[0][0] === 1 - robot){
        await this.setState({
          status: 1 - robot
        })
        return;
      }
    }

    if (b[0][2] === b[1][1] && b[1][1] === b[2][0]) {
      if (b[0][2] === robot){
        await this.setState({
          status: robot
        })
        return;
      }
      else if (b[0][2] === 1 - robot){
        await this.setState({
          status: 1 - robot
        })
        return;
      }
    }

    if(!movesLeft(this.state.table)){
      await this.setState({
        status: 2
      })
      return;
    }
  };

  checkDraw = async() => {
    if (
      !movesLeft(this.state.table) &&
      this.state.status === -1
    ) {
      await this.setState({
        status: 2,
      });
    }
  };

  newGame = async () => {
    await this.setState({
      current: getRand(0,2),
      robot: getRand(0,2),
      flag: !this.state.flag,
      table: [
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1],
      ],
      status: -1,
      moveCount: 0,
    });
  };

  render() {
    return (
      <AppContextProvider value={this.state}>
        {this.props.children}
      </AppContextProvider>
    );
  }

}
