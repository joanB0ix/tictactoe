export function getRand(start:number, end:number){
    return start + Math.floor(Math.random() * (end - start));
}

export const GAME_TYPE = {
    HUMAN: 0,
    COMPUTER: 1
}

export function movesLeft(board:number[][]){
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(board[i][j] === -1){
                return true;
            }
        }
    }
    return false;
}

function evaluate(b: number[][], robot:number){
    for (let row = 0; row < 3; row++) {
        if (b[row][0] === b[row][1] && b[row][1] === b[row][2]) {
          if (b[row][0] === robot) return 10;
          else if (b[row][0] === 1 - robot) return -10;
        }
      }
  
      for (let col = 0; col < 3; col++) {
        if (b[0][col] === b[1][col] && b[1][col] === b[2][col]) {
          if (b[0][col] === robot) return 10;
          else if (b[0][col] === 1 - robot) return -10;
        }
      }
  
      if (b[0][0] === b[1][1] && b[1][1] === b[2][2]) {
        if (b[0][0] === robot) return 10;
        else if (b[0][0] === 1 - robot) return -10;
      }
  
      if (b[0][2] === b[1][1] && b[1][1] === b[2][0]) {
        if (b[0][2] === robot) return 10;
        else if (b[0][2] === 1 - robot) return -10;
      }
  
      return 0;
}

export async function findBestMove(board:number[][], robot: number){
    
    console.log(board)

    let bestVal = -1000;
    let row = -1;
    let col = -1;

    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(board[i][j] === -1){
                board[i][j] = robot;
                let moveVal = minimax(board, 0, false, robot);
                board[i][j] = -1;
                if(moveVal > bestVal){
                    row = i;
                    col = j;
                    bestVal = moveVal;
                }
            }
        }
    }

    return [row, col]
}

function minimax(board:number[][], depth:number, isMax:boolean, robot:number){
    let score = evaluate(board, robot);

    if(score === 10){
        return score;
    }

    if(score === -10){
        return score;
    }

    if(!movesLeft(board)){
        return score;
    }

    if(isMax){
        
        let bestOne = -1000;

        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(board[i][j] === -1){
                    board[i][j] = robot;
                    bestOne = Math.max(bestOne, minimax(board, depth+1, !isMax, robot))
                    board[i][j] = -1;
                }
            }
        }

        return bestOne;
    
    }else{
        
        let bestTwo = 1000;

        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(board[i][j] === -1){
                    board[i][j] = 1-robot;
                    bestTwo = Math.min(bestTwo, minimax(board, depth+1, !isMax, robot))
                    board[i][j] = -1;
                }
            }
        }

        return bestTwo;
    }
}