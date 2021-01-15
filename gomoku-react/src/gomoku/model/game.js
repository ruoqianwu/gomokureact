
function winCondition(squares, row, column) {
    let [countH, countV, count45, count315] = Array(4).fill(1);

    // find horizontal
    for (let i = 1; i<5; i++){ //check left
        if(column-i>=0){
            if (squares[row][column-i]===squares[row][column] && squares[row][column]!=null) countH++;
            else break;
        }
    }
    for (let i = 1; i<5; i++){ //check right
        if(column+i<15){
            if (squares[row][column+i]===squares[row][column] && squares[row][column]!=null) countH++;
            else break;
        }
    }

    if (countH>=5){
        let color = squares[row][column];
        if (color==='white') {
            return 'white'
        }
        else{
            return 'black'
        }
    }

    //find vertical
    for (let i = 1; i<5; i++){ //check up
        if(row-i>=0){
            if (squares[row-i][column]===squares[row][column] && squares[row][column]!=null) countV++;
            else break;
        }
    }
    for (let i = 1; i<5; i++){ //check down
        if(row+i<15){
            if (squares[row+i][column]===squares[row][column] && squares[row][column]!=null) countV++;
            else break;
        }
    }

    if (countV>=5){
        let color = squares[row][column];
        if (color==='white') {
            return 'white'
        }
        else{
            return 'black'
        }
    }

    //find 45 degree
    for (let i = 1; i<5; i++){ //check 45 degree down
        if(row+i<15 && column-i >= 0){
            if (squares[row+i][column-i]===squares[row][column] && squares[row][column]!=null) count45++;
            else break;
        }
    }
    for (let i = 1; i<5; i++){ //check up
        if(row-i>=0 && column+i < 15){
            if (squares[row-i][column+i]===squares[row][column] && squares[row][column]!=null) count45++;
            else break;
        }
    }

    if (count45>=5){
        let color = squares[row][column];
        if (color==='white') {
            return 'white'
        }
        else{
            return 'black'
        }
    }

    //find 315 degree
    for (let i = 1; i<5; i++){ //check 315 degree down
        if(row+i<15 && column+i <15 ){
            if (squares[row+i][column+i]===squares[row][column] && squares[row][column]!=null) count315++;
            else break;
        }
    }
    for (let i = 1; i<5; i++){ //check up
        if(row-i >= 0 && column-i >= 0){
            if (squares[row-i][column-i]===squares[row][column] && squares[row][column]!=null) count315++;
            else break;
        }
    }

    if (count315>=5){
        let color = squares[row][column];
        if (color==='white') {
            return 'white'
        }
        else{
            return 'black'
        }
    }

}

export default winCondition