/* eslint-disable default-case */
import Score from './score.js'


function evaluatePoint(board, x, y, color){
    let result = 0,
        count = 0,
        empty = -1,
        secondCount = 0,
        block = 0,
        len = board.length,
        role = color

    function reset(){
        count = 1;
        empty = -1;
        secondCount = 0;
        block = 0;
    }

    // -
    reset();
    //to right
    for (let i = y+1; true; i++){
        if (i > len-1) {
            block++;
            break;
        }
        if (board[x][i]===null){
            if (i+1<=len-1 && empty === -1 && board[x][i+1]===role){
                empty = count;
                continue;
            }
            else{
                break;
            }
        }
        if (board[x][i]===role){
            count ++;
            continue;
        }
        else{
            block++;
            break;
        }
    }
    //to left
    for (let j = y-1; true; j--){
        if (j < 0){
            block++;
            break;
        }
        if (board[x][j]===null){
            if (j-1>=0 && empty===-1 && board[x][j-1]===role){
                empty = 0;
                continue;
            }
            else {
                break;
            }
        }
        if (board[x][j]===role){
            secondCount ++;
            empty!==-1 && empty++;
            continue;
        }
        else{
            block++;
            break;
        }  
    }

    count += secondCount;
    result += countScore(count, block, empty);
// |

    reset();
    //to down
    for (let i = x+1; true; i++){
        if (i > len-1) {
            block++;
            break;
        }
        if (board[i][y]===null ){
            if (i+1<= len-1 && empty === -1 && board[i+1][y]===role){
                empty = count;
                continue;
            }
            else{
                break;
            }
        }
        if (board[i][y]===role){
            count ++;
            continue;
        }
        else{
            block++;
            break;
        }
    }

    //to up
    for (let j = x-1; true; j--){
        if (j < 0){
            block++;
            break;
        }
        if (board[j][y]===null){
            if (j-1 >= 0 && empty===-1 && board[j-1][y]===role){
                empty = 0;
                continue;
            }
            else {
                break;
            }
        }
        if (board[j][y]===role){
            secondCount ++;
            empty!==-1 && empty++;
            continue;
        }
        else{
            block++;
            break;
        }  
    }

    count += secondCount;

    result += countScore(count, block, empty);

    // /
   
    reset();
    //to down
    for (let i = 1; true; i++){
        let px = x+i, py = y-i;
        if (px<0 || py<0|| px>len-1|| py>len-1) {
            block++;
            break;
        }
        if (board[px][py]===null){
            if (px+1<=len-1 && py-1 >= 0 && empty === -1 && board[px+1][py-1]===role){
                empty = count;
                continue;
            }
            else{
                break;
            }
        }
        if (board[px][py]===role){
            count ++;
            continue;
        }
        else{
            block++;
            break;
        }
    }
    //to up
    for (let j = 1; true; j++){
        let px = x-j, py = y+j;
        if (px<0 || py<0 || px>=len|| py>=len){
            block++;
            break;
        }
        if (board[px][py]===null){
            if (px-1>=0 && py+1<=len-1 && empty===-1 && board[px-1][py+1]===role){
                empty = 0;
                continue;
            }
            else {
                break;
            }
        }
        if (board[px][py]===role){
            secondCount ++;
            empty!==-1 && empty++;
            continue;
        }
        else{
            block++;
            break;
        }  
    }

    count += secondCount;
    result += countScore(count, block, empty);

    // \
    
    reset();
    //to down
    for (let i = 1; true; i++){
        let px = x+i, py = y+i;
        if (px<0 || py<0 || px>=len|| py>=len) {
            block++;
            break;
        }
        if (board[px][py]===null){
            if (px+1 <= len-1 && py+1 <= len-1 && empty === -1 && board[px+1][py+1]===role){
                empty = count;
                continue;
            }
            else{
                break;
            }
        }
        if (board[px][py]===role){
            count ++;
            continue;
        }
        else{
            block++;
            break;
        }
    }
    //to up
    for (let j = 1; true; j++){
        let px = x-j, py = y-j;
        if (px<0 || py<0 || px>=len|| py>=len){
            block++;
            break;
        }
        if (board[px][py]===null){
            if (px-1 >= 0 && py-1 >= 0 && empty===-1 && board[px-1][py-1]===role){
                empty = 0;
                continue;
            }
            else {
                break;
            }
        }
        if (board[px][py]===role){
            secondCount ++;
            empty!==-1 && empty++;
            continue;
        }
        else{
            block++;
            break;
        }  
    }
    
    count += secondCount;
    result += countScore(count, block, empty);
    return result;
}

function countScore(count, block, empty){
    if (empty<=0){
        if (count>=5) return Score.FIVE
        if (block===0){
            switch(count){
                case 1: return Score.ONE;
                case 2: return Score.TWO;
                case 3: return Score.THREE;
                case 4: return Score.FOUR;
            }
        }
        if (block===1){
            switch(count){
                case 1: return Score.BLCOKED_ONE;
                case 2: return Score.BLOCKED_TWO;
                case 3: return Score.BLOCKED_THREE;
                case 4: return Score.BLOCKED_FOUR;
            }
        }
    }
    if (empty===1 || empty===count-1){
        if (count>=6) return Score.FIVE;
        if (block===0){
            switch(count) {
                case 2: return Score.TWO/2;
                case 3: return Score.THREE;
                case 4: return Score.BLOCKED_FOUR;
                case 5: return Score.FOUR;
            }
        }
        if (block===1){
            switch(count){
                case 2: return Score.BLOCKED_TWO;
                case 3: return Score.BLOCKED_THREE;
                case 4: return Score.BLOCKED_FOUR;
                case 5: return Score.BLOCKED_FOUR;
            }
        }
        if (block===2){
            if (count===5) return Score.BLOCKED_FOUR;
        }
    }
    if (empty===2 || empty===count-2){
        if (count >= 7) return Score.FIVE;
        if (block===0){
            switch(count){
                case 3: return Score.THREE;
                case 4: return Score.BLOCKED_FOUR
                case 5: return Score.BLOCKED_FOUR
                case 6: return Score.FOUR
            }
        }
        if (block===1){
            switch(count){
                case 3: return Score.BLOCKED_THREE;
                case 4: return Score.BLOCKED_FOUR
                case 5: return Score.BLOCKED_FOUR
                case 6: return Score.FOUR
            }
        }
        if (block===2){
            if (count===6) return Score.BLOCKED_FOUR
        }
    }
    if (empty===3 || empty===count-3){
        if (count >= 8) return Score.FIVE;
        if (block===0){
            switch(count){
                case 4: return Score.BLOCKED_FOUR
                case 5: return Score.BLOCKED_FOUR
                case 6: return Score.BLOCKED_FOUR
                case 7: return Score.FOUR
            }
        }
        if (block===1){
            switch(count){
                case 4: return Score.BLOCKED_FOUR
                case 5: return Score.BLOCKED_FOUR
                case 6: return Score.BLOCKED_FOUR
                case 7: return Score.FOUR
            }
        }
        if (block===2){
            if (count===7) return Score.BLOCKED_FOUR
        }
    }
    if (empty===4 || empty===count-4){
        if (count >= 9) return Score.FIVE;
        if (block===0){
            switch(count){
                case 5: return Score.BLOCKED_FOUR
                case 6: return Score.BLOCKED_FOUR
                case 7: return Score.BLOCKED_FOUR
                case 8: return Score.FOUR
            }
        }
        if (block===1){
            switch(count){
                case 5: return Score.BLOCKED_FOUR
                case 6: return Score.BLOCKED_FOUR
                case 7: return Score.BLOCKED_FOUR
                case 8: return Score.FOUR
            }
        }
        if (block===2){
            if (count===8) return Score.BLOCKED_FOUR
        }
    }
    return 0;

}

export default evaluatePoint;