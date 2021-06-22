<html>
<head>
<title>Go Playground</title>
<meta charset="UTF-8">
<link rel="icon" href="img/favicon.png" type="image/x-icon">
<link href="https://fonts.googleapis.com/css?family=Dosis" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="src/gostyle.css">
</head>
<body>
<div style="position:absolute; width:50%; margin-top:20px; text-align:right;">
<a href='index.html'><img id="switch" style="margin-right:325px;" width="87px" height="69.2px" draggable="false" src="img/switch.png"></a>
</div>
<div id='download'></div>
<div style="position:absolute;margin-left:50%;margin-top:20px">
<span style="background-color: rgba(0, 0, 0, 0.2);margin-left:320px;border-radius: 25px;">
<img id="b_i" style="margin-left: 5px; opacity: 1;" draggable="false" width="40px" height="30px" src="img/bowl_b.png">
<span style="font-family:Tahoma, Geneva, sans-serif;font-size:17px;font-weight:bold;color:white;margin-right:10px; opacity:0.6" id="black_j"></span>
<span style="font-family:Tahoma, Geneva, sans-serif;font-size:17px;font-weight:bold;color:white;margin-right:5px; opacity:0.6" id="black_f"></span></span>
<br><br>
<span style="background-color: rgba(0, 0, 0, 0.2);margin-left:320px;border-radius: 25px;">
<img id="w_i" style="margin-left: 5px; opacity: 0.4;" draggable="false" width="40px" height="30px" src="img/bowl_w.png">
<span style="font-family:Tahoma, Geneva, sans-serif;font-size:17px;font-weight:bold;color:white;margin-right:10px; opacity:0.6" id="white_j"></span>
<span style="font-family:Tahoma, Geneva, sans-serif;font-size:17px;font-weight:bold;color:white;margin-right:5px; opacity:0.6" id="white_f"></span></span>
<br><br>
<span id="iler" style="display: inline-block; opacity:0.5; margin-left:320px;"></span><br>
<span id="ilew" style="opacity:0.5; margin-left:320px;"></span>
</div>
<div onmouseout='settnot()' onclick='moves()'>
<div onclick="where(event)" onmousemove="hoverr(event)" onmouseout="setnot()" id="board"></div></div>
<div id="btns" style="transition: opacity 1s ease 0s; margin: 0px auto; position: relative; width: 600px; height: 80px; pointer-events: auto; opacity: 1;">
<div onclick='moves()'>
<div style="background-image: url('img/rew3.png');" class="rew" id="rew3" onclick="rewind(0)" ></div>
<div style="background-image: url('img/rew2.png'); margin-left: 10px; " class="rew" id="rew2" onclick="rewind(-10)" ></div>
<div style="background-image: url('img/rew1.png'); margin-left: 10px;" class="rew" id="rew1" onclick="rewind(-1)" ></div>
<div style="background-image: url('img/rew1.png'); margin-left: 45px; transform: scaleX(-1);" class="rew" id="rew4" onclick="rewind(1)" ></div>
<div style="background-image: url('img/rew2.png'); margin-left: 10px; transform: scaleX(-1);" class="rew" id="rew5" onclick="rewind(10)" ></div>
<div style="background-image: url('img/rew3.png'); margin-left: 10px; transform: scaleX(-1);" class="rew" id="rew6" onclick="rewind(11)" ></div>
</div>
</div>

<div id="myModal" onclick="dissapear()" class="modal" style="opacity: 0; pointer-events: none;">
<div class="modal-content"><p style="opacity:1;font-size: 23px;text-align:center" id="popup"></p></div>
</div>
<p id="check"></p>
<script src='src/play.js'></script>
<script>

document.getElementById("board").addEventListener('mousemove', function(event){
	xx_h = event.offsetX?(event.offsetX):event.pageX-document.getElementById("board").offsetLeft;
	yy_h = event.offsetY?(event.offsetY):event.pageY-document.getElementById("board").offsetTop;
	if(tab[Math.round(Math.abs((yy_h-12))/32)][Math.round(Math.abs((xx_h-12))/32)]==0){
		if(Math.round(Math.abs((yy_h-12))/32)!=yy_b&&Math.round(Math.abs((xx_h-12))/32)!=xx_b){
			sett(xx_b,yy_b,xx_h,yy_h);
		}
	}
})
function sett(xx_b,yy_b,xx_h,yy_h){
	ilew=[0,0];
	xx_b = Math.round(Math.abs(xx_h-12)/32); yy_b = Math.round(Math.abs(yy_h-12)/32);
	if(document.getElementById(yy_b*100+xx_b).style.opacity!=1&&iler!=1){
		for(c=1;c<211;c++){
			if(pro_c[c][histor]==0&&pro[c][histor][0]==yy_b&&pro[c][histor][1]==xx_b){
				ilew[0]++;
				if((inf[c][0]=="B"&&turn==1)||(inf[c][0]=="W"&&turn==2)) ilew[1]++;
			}
		}
		colc=((ilew[1]/ilew[0]*100).toFixed(0));
		document.getElementById('ilew').innerHTML=colc+"% chance of winning";
		colc="rgb("+(200-(colc/100*200))+","+(colc/100*200)+",0)";
		document.getElementById('ilew').style.color=colc;
	}else{
		document.getElementById('ilew').innerHTML="";
	}
}
function settnot(){
	document.getElementById('ilew').innerHTML='';
}

function show_all(){
	document.getElementById("ilew").innerHTML="";
	for(c=0;c<19;c++){
		for(v=0;v<19;v++){
			place=document.getElementById((c*100)+v);
			if(tab[c][v]==0&&place.style.opacity==1) place.setAttribute("src", "");
			if(tab[c][v]==1){ place.style.opacity=1; place.setAttribute("src", "img/black.png"); }
			if(tab[c][v]==2){ place.style.opacity=1; place.setAttribute("src", "img/white.png"); }
		}
	}
	if(iler!=1){
		document.getElementById("iler").innerHTML=iler+' corresponding games<br>';
	}else{
		document.getElementById("iler").innerHTML="Date: "+inf[temp_k][1]+"<br>Black: "+inf[temp_k][2]+" "+inf[temp_k][3]+"<br>";
		document.getElementById("iler").innerHTML+="White: "+inf[temp_k][4]+" "+inf[temp_k][5]+"<br>";
		if(inf[temp_k][0]=="B")document.getElementById("iler").innerHTML+="Black "; else document.getElementById("iler").innerHTML+="White ";
		document.getElementById("iler").innerHTML+="wins by ";
		if(inf[temp_k][6]=='R')document.getElementById("iler").innerHTML+="resignation"; else document.getElementById("iler").innerHTML+=inf[temp_k][6]+" points";
	}
}

function moves(){
	iler=0;
	if(histor!=0&&histor==max_histor){
		for(k=1;k<211;k++){
			pro_c[k][histor]=pro_c[k][histor-1];
			if(pro[k].length>histor-1&&(pro[k][histor-1][0]!=y_y||pro[k][histor-1][1]!=x_x)) pro_c[k][histor]=1;
		}
	}
	for(c=0;c<19;c++){
		for(v=0;v<19;v++){
			if(tab[c][v]==0){
				document.getElementById((c*100)+v).setAttribute("src", "");
				document.getElementById((c*100)+v).style.opacity=1;
				for(k=1;k<211;k++){
					if(pro[k].length>histor+1&&c==pro[k][histor][0]&&v==pro[k][histor][1]&&pro_c[k][histor]==0){
						if(turn==1)document.getElementById(c*100+v).setAttribute("src", "img/black.png");
						if(turn==2)document.getElementById(c*100+v).setAttribute("src", "img/white.png");
						document.getElementById(c*100+v).style.opacity=0.5;
						iler++;
						if(iler==1)temp_k=k;
					}
				}
			}
		}
	}
	show_all();
}

output=new Array(1000); inf=new Array(1000); iler=0; temp_k=0;
xx_b=-1;yy_b=-1; pro=new Array(1000); pro_c=new Array(1000)

<?php for($x=1;$x<211;$x++){
	$name="./games/".$x.".sgf"; $content=fopen($name, "r"); echo "output[".($x)."]='";
	while(!feof($content)){ echo preg_replace("/[\n|\r]/",'',fgets($content)); }
	fclose($content); echo "';
	";
} ?>;
for(i=1;i<211;i++){
	step=0; inf[i]=new Array(); pro[i]=new Array(); pro_c[i]=new Array(0); pro_c[i][0]=0;
	for(k=0;k<output[i].length-3;k++){
		if(output[i][k]=='K'&&output[i][k+1]=='M'&&output[i][k+2]=='['){
			inf[i][6]=''
			for(j=k+3;j!=0;j++){
				if(output[i][j]=="[") inf[i][0]=output[i][j+1];
				if(inf[i][0]=='B'||inf[i][0]=='W'){
					inf[i][6]+=output[i][j+3];
					if(output[i][j+4]==']') j=-1;
				}
			}
		}
		if(output[i][k]=='D'&&output[i][k+1]=='T'&&output[i][k+2]=='['){
			inf[i][1]='';
			for(j=k+3;output[i][j]!=']';j++){
				inf[i][1]+=output[i][j];
			}
		}
		if(output[i][k]=='P'&&output[i][k+1]=='B'&&output[i][k+2]=='['){
			inf[i][2]='';
			for(j=k+3;output[i][j]!=']';j++){
				inf[i][2]+=output[i][j];
			}
		}
		if(output[i][k]=='B'&&output[i][k+1]=='R'&&output[i][k+2]=='['){
			inf[i][3]='';
			for(j=k+3;output[i][j]!=']';j++){
				inf[i][3]+=output[i][j];
			}
		}
		if(output[i][k]=='P'&&output[i][k+1]=='W'&&output[i][k+2]=='['){
			inf[i][4]='';
			for(j=k+3;output[i][j]!=']';j++){
				inf[i][4]+=output[i][j];
			}
		}
		if(output[i][k]=='W'&&output[i][k+1]=='R'&&output[i][k+2]=='['){
			inf[i][5]='';
			for(j=k+3;output[i][j]!=']';j++){
				inf[i][5]+=output[i][j];
			}
		}
		if(output[i][k]==';'&&(output[i][k+1]=='B'||output[i][k+1]=='W')&&output[i][k+2]=='['&&output[i][k+3]!=']'){
			pro[i].push([(output[i][k+4].charCodeAt(0)-97),(output[i][k+3].charCodeAt(0)-97)]);
		}
	}
}
moves();

</script>
</body>
</html>
