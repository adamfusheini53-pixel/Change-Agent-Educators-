// Oware JS simplified
let board = [4,4,4,4,4,4, 4,4,4,4,4,4];
let currentPlayer = "A";
function renderBoard(){
  const container = document.getElementById("oware-board");
  container.innerHTML = "";
  let top = document.createElement("div"); top.className="pit-row";
  for(let i=5;i>=0;i--){ top.appendChild(makePit(i)); }
  let bottom = document.createElement("div"); bottom.className="pit-row";
  for(let i=6;i<12;i++){ bottom.appendChild(makePit(i)); }
  container.appendChild(top); container.appendChild(bottom);
}
function makePit(idx){ const pit=document.createElement("div"); pit.className="pit"; pit.textContent=board[idx]; pit.onclick=()=>pitClick(idx); return pit; }
function pitClick(index){ if(currentPlayer==="A" && index<6) return; if(currentPlayer==="B" && index>5) return; let seeds=board[index]; if(seeds===0) return; board[index]=0; let i=index; while(seeds>0){ i=(i+1)%12; if(i!==index){ board[i]++; seeds--; } } currentPlayer = currentPlayer==="A" ? "B" : "A"; renderBoard(); }
document.getElementById("oware-reset").onclick = function(){ board=[4,4,4,4,4,4,4,4,4,4,4,4]; currentPlayer="A"; document.getElementById("oware-message").textContent=""; renderBoard(); };
renderBoard();
