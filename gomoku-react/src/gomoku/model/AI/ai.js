import evaluatePoint from './evaluatePoint.js'

var blankList, occupiedList, AIList, humanList, nextPoint, board, aiColor, humanColor;

function aiMove(squares, humanMove, isBlack){
    board = squares;
    blankList = [];
    occupiedList = [];
    AIList = [];
    humanList = [];
    nextPoint = [];
    aiColor = isBlack? 'white' : 'black';
    humanColor = isBlack? 'black' : 'white';
    for (let i = 0; i<15; i++){
        for (let j = 0; j< 15; j++){
            if (board[i][j]===null){
                blankList.push([i,j])
            }
            else{
                occupiedList.push([i,j]);
            }
        }
    }
    negamax(true, 5, -Number.MAX_VALUE, Number.MAX_VALUE, humanMove);
    return nextPoint;
}

function negamax(isAI, depth, alpha, beta, humanMove){
    if (depth===0){
        return evaluate(isAI);
    }
    for (let i = 0; i < occupiedList.length; i++){
        let index = findIndex(blankList, occupiedList[i]);
        if (index > -1){
            blankList.splice(index, 1);
        }
    }
    order(humanMove);

    for (let nextStep of blankList){
        if (!hasNeighbour(nextStep)){
            continue;
        }
        if (isAI){
            AIList.push(nextStep);
            board[nextStep[0]][nextStep[1]] = aiColor;
        }
        else{
           humanList.push(nextStep); 
           board[nextStep[0]][nextStep[1]] = humanColor;
        }
        occupiedList.push(nextStep);
        let lastmove = occupiedList[occupiedList.length-1];
        let value = -negamax(!isAI, depth-1, -beta, -alpha, lastmove);
        // if (depth===1 && nextStep[0] === 10 && nextStep[1]===4){
        //     console.log('point: ' + nextStep + ' value: ' + value)
        //     console.log('AIlist: ' + AIList + "/ Human List: " + humanList)
        // }
        // if (depth===1 && nextStep[0] === 6 && nextStep[1]===8){
        //     console.log('point: ' + nextStep + ' value: ' + value)
        //     console.log('AIlist: ' + AIList + "/ Human List: " + humanList + "/ Occupied list: " + occupiedList + " ")
        // }
        // if (depth===1 && nextStep[0] === 10 && nextStep[1]===5){
        //     console.log('point: ' + nextStep + ' value: ' + value)
        //     console.log('AIlist: ' + AIList + "/ Human List: " + humanList)
        // }
        // if (depth===1 && nextStep[0] === 11 && nextStep[1]===3){
        //     console.log('point: ' + nextStep + ' value: ' + value)
        //     console.log('AIlist: ' + AIList + "/ Human List: " + humanList)
        // }
        if (isAI){
            AIList.pop();
        }
        else{
            humanList.pop();
        }
        occupiedList.pop();
        board[nextStep[0]][nextStep[1]]=null;

        if (value > alpha){
            if (depth===5){
                nextPoint = nextStep;

            }
            if (value >= beta){
                return Math.MAX_VALUE-1;
            }
            alpha = value;
        }
    }
    return alpha;
}

function evaluate(isAI){
    let AIScore = 0;
    // let humanScore = 0;
    for (let i = 0; i < AIList.length; i++){
        AIScore += evaluatePoint(board, AIList[i][0], AIList[i][1], aiColor);
    }
    // for (let i = 0; i < humanList.length; i++){
    //     humanScore += evaluatePoint(board, humanList[i][0], humanList[i][1], humanColor);
    // }
    // // let score = !isAI? AIScore - humanScore*0.5 : humanScore - AIScore*0.5
    // // let score = !isAI? AIScore : humanScore
    return -AIScore;
}

function order(humanMove){
    for (let i = -1; i < 2; i++){
        for (let j = -1; j<2; j++ ){
            if (i === 0 && j ===0){
                continue;
            }
            if (humanMove[0]+ i<15 && humanMove[1]+j < 15 && humanMove[0]+i >=0 && humanMove[1]+j>=0){
                let temp = [humanMove[0]+i, humanMove[1]+j];
                let index = findIndex(blankList, temp);
                if (index > -1){
                    blankList.splice(index, 1);
                    blankList.unshift(temp);
                }
            }
        }
    }
    return blankList;
}

function hasNeighbour(point){
    for (let i = -1; i < 2; i++){
        for (let j = -1; j < 2; j++){
            if (i===0 && j===0){
                continue;
            }
            if (point[0]+ i<15 && point[1]+j < 15 && point[0]+i >=0 && point[1]+j>=0){
                let index = findIndex(occupiedList, [point[0]+ i, point[1]+j]);
                if (index > -1) return true;
            }
        }
    }
    return false;
}

function findIndex(array, point){
    for (let i = 0; i < array.length; i++){
        if (array[i][0]===point[0] && array[i][1]===point[1]){
            return i;
        }
    }
    return -1;
}

export default aiMove;