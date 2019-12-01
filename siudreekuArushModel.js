var counter = 0;
var grid = [
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
];

var visited = [
  [[null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null]],
  [[null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null]],
  [[null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null]],
  [[null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null]],
  [[null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null]],
  [[null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null]],
  [[null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null]],
  [[null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null]],
  [[null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null]],
];

var checkboxr = [0, 0, 0, 3, 3, 3, 6, 6, 6];
var checkboxc = [0, 3, 6, 0, 3, 6, 0, 3, 6];


function output() {
   console.log("Solution " + counter + "\n");
   counter++;
   for (let i = 0; i < 9; i++) {
       for (let j = 0; j < 9; j++) {
           console.log(grid[i][j] + " ");
       }
       console.log("\n");
   }
   return;
}

function DFS(row, col){
   for (let i = 1; i <= 9; i++) {
       visited[row][col][i] = false;
   }
   for (let i = 0; i < 9; i++) {
       visited[row][col][grid[i][col]] = true;
       visited[row][col][grid[row][i]] = true;
   }
   for (let i = 0; i < 9; i++){
       if (checkboxr[i] <= row && row < checkboxr[i] + 3 && checkboxc[i] <= col && col < checkboxc[i] + 3){
           for (let j = checkboxr[i]; j < checkboxr[i] + 3; j++){
               for (let k = checkboxc[i]; k < checkboxc[i] + 3; k++){
                   visited[row][col][grid[j][k]] = true;
               }
           }
           break;
       }
   }
   var nextrow = -1, nextcol  = -1;
   var broken = false;
   for (let i = 0; i < 9; i++){
       for (let j = 0; j < 9; j++){
        if(i == row && j == col) continue;
           if(grid[i][j] == 0){
               nextrow = i;
               nextcol = j;
               broken = true;
               break;
           }
       }
       if(broken == true) break;
   }
   if(nextrow == -1 && nextcol == -1){
       for(let i = 1; i <= 9; i++){
           if(visited[row][col][i] == true) continue;
           grid[row][col] = i;
       }
       output();
       return;
   }
   for(let i = 1; i <= 9; i++){
       if(visited[row][col][i] == true) continue;
       grid[row][col] = i;
       DFS(nextrow, nextcol);
       grid[row][col] = 0;
   }
}

for(let i = 0; i < 9; i++){
    for(let j = 0; j < 9; j++){
        grid[i][j] = window.prompt("Enter the " + (i+1) + "th number in the " + (j+1) + "th row.")
    }
}
//goes to function to output all solutions
for(let i = 0; i < 9; i++){
    for(let j = 0; j < 9; j++){
        if(grid[i][j] == 0){
            DFS(i,j);
            if(counter == 0){
                console.log("NO SOLUTION" + "\n")
            }
        }
    }
}
