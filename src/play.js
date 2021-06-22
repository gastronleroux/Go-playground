var xs, ys; x_x=-1; y_y=-1;
function readText(that){
	if(that.value.substring(that.value.lastIndexOf('.')).toLowerCase()=='.sgf'){
		var reader = new FileReader();
		reader.onload = function (e) {
			var output=e.target.result;
			reset_all();
			for(k=0;k<output.length-2;k++){
				if(output[k]==';'&&(output[k+1]=='B'||output[k+1]=='W')&&output[k+2]=='['){
					if(output[k+3]==']'){
						pass();
					}else{
						ys=output[k+3].charCodeAt(0)-97; xs=output[k+4].charCodeAt(0)-97; play_move(xs,ys);
					}
				}
			}
		};
		reader.readAsText(that.files[0]);
	}
	that.value='';
}
function reset_all(){
	cleartab(1); cleartab(2); cleartab(3); rewind(0); turn=1; zbit=1; histor=0;
	max_histor=0; opacity=0; point=0; finn=0; points(); res_ch=0; document.getElementById("rew4").style.opacity = '0';
	document.getElementById("rew5").style.opacity = '0'; document.getElementById("rew6").style.opacity = '0';
}
function uplohover(x){
	if(x==0) document.getElementById('upload').style.opacity=0.4;
	if(x==1) document.getElementById('upload').style.opacity=0.6;
}
function dowhover(x){
	if(x==0) document.getElementById('download').style.opacity=0.4;
	if(x==1){
		document.getElementById('download').style.opacity=0.65;
		string='(;FF[4]\nCA[UTF-8]\nGM[1]\nSZ[19]\nKM[6.5]\nRU[japanese]\n';
		var des; var whow; max_mov=max_histor+1;
		if(finn!=2){
			des='R'; max_mov--;
			if(turn==1) whow='B'; else whow='W';
		}else{
			des=Math.abs(points_f[0]-points_f[1]);
			if(points_f[0]>points_f[1]) whow='B'; else whow='W';
		}
		string+='RE['+whow+'+'+des+']\n';
		for(i=1;i<max_mov;i++){
			if(i%2==1)string+=';B['; else string+=';W[';
			for(j=0;j<19;j++){
				for(k=0;k<19;k++){
					if(tab_history[i][j][k]!=tab_history[i-1][j][k]&&tab_history[i-1][j][k]==0){
						string+=String.fromCharCode(k+97,j+97); k=19; j=19;
					}
				}
			}
			string+=']\n';
		}
		string+=')';
		document.getElementById('downl').setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(string));
		document.getElementById('downl').setAttribute('download', 'GoPlaygroundGame.sgf');
	}
}

points_f=[0,0];
function sum(){
	finn=2;
	document.getElementById('btns').style.pointerEvents="auto";
	document.getElementById('btns').style.opacity=1;
	document.getElementById('sum').style.pointerEvents="none";
	document.getElementById('suma').style.opacity=0;
	document.getElementById('sgf').style.pointerEvents="auto";
	document.getElementById('upload').style.opacity=0.4;
	document.getElementById('download').style.pointerEvents="auto";
	document.getElementById('download').style.opacity=0.4;
	for(i=0;i<19;i++){
		for(j=0;j<19;j++){
			if(tab2[i][j]==3)points_f[0]++;
			if(tab2[i][j]==5)points_f[0]+=2;
			if(tab2[i][j]==4)points_f[1]++;
			if(tab2[i][j]==6)points_f[1]+=2;
		}
	}
	points_f[0]+=jen[histor][0]; points_f[1]+=jen[histor][1]+6.5;
	string="Black: "+points_f[0]+"<br>White: "+points_f[1]+" ("+(points_f[1]-6.5)+" + 6.5 komi)<br><br>";
	if(points_f[0]>points_f[1]) string+="Black"; else string+="White";
	string+= " wins by "+Math.abs(points_f[0]-points_f[1])+" points";
	popit(string); document.getElementById("black_f").innerHTML="| "+points_f[0];
	document.getElementById("white_f").innerHTML="| "+points_f[1];
}
modal = document.getElementById('myModal');
function popit(string){
	modal.style.opacity=1; modal.style.pointerEvents="auto";
	document.getElementById('popup').innerHTML=string;
}
function dissapear(){ modal.style.opacity=0; modal.style.pointerEvents="none"}
res_ch=0;
function ress(){
	if(res_ch==0){
		res_ch=1;
		turn=((turn)%2)+1; past();
		if(turn==1)popit("Black wins by white resignation");
		if(turn==2)popit("White wins by black resignation");
		document.getElementById('download').style.pointerEvents="auto";
		document.getElementById('download').style.opacity=0.4;
		finn=0;
	}
}

function pass(){
	if(compare_p()){
		res_ch=0; turn=((turn)%2)+1; past(); points_f=[0,0];
	}else if(res_ch==0){
		document.getElementById('btns').style.pointerEvents="none";
		document.getElementById('btns').style.opacity=0;
		document.getElementById('sum').style.pointerEvents="auto";
		document.getElementById('sum').style.pointerEvents="auto";
		document.getElementById('suma').style.opacity=1;
		document.getElementById('sgf').style.pointerEvents="none";
		document.getElementById('upload').style.opacity=0;
		finn=1; cleartab(2); count_p(); turn=((turn)%2)+1; past(); res_ch=1;
	}

}
bp=0;wp=0;
function count_p(){
	cleartab(2);
	for(a=0;a<19;a++){
		for(b=0;b<19;b++){
			if(tab[a][b]==0&&tab2[a][b]==0)field(a,b);
			if(bp>wp)field2(3,a,b);
			if(bp<wp)field2(4,a,b);
			if(tab[a][b]==0&&bp==0&&wp==0&&tab2[a][b]==-1)field2(-1,a,b);
			bp=0; wp=0;
		}
	}
	for(a=0;a<19;a++){
		for(b=0;b<19;b++){
			if(tab2[a][b]==0)field3(a,b);
			if(tab[a][b]==2&&bp>0&&wp==0)field2(5,a,b);
			if(tab[a][b]==1&&wp>0&&bp==0)field2(6,a,b);
			bp=0; wp=0;
		}
	}
	for(a=0;a<19;a++){
		for(b=0;b<19;b++){
			if(tab2[a][b]>10)tab2[a][b]=0;
		}
	}
	repair_field(); cleartab(3); more_s=0;
	for(a=0;a<19;a++){
		for(b=0;b<19;b++){
			boow=[0,0]; boow_w[0]=[0,0]; boow_w[1]=[0,0];
			if(tab2[a][b]==-1){
				one_field(a,b);
				if(boow[0]>boow[1]) more_s=1; else more_s=2;
				if(more_s>0){
					ret_box=false;
					if(square_p(more_s,boow_w[more_s-1][0],boow_w[more_s-1][1])==true){
						cleartab(3); more_s=((more_s)%2)+1; ret_box=false;
						if(square_p(more_s,boow_w[more_s-1][0],boow_w[more_s-1][1])==false){
							more_s=((more_s)%2)+1; field2(more_s+2,a,b); in_f(more_s,a,b);
						}
					}else{
						cleartab(3); more_s=((more_s)%2)+1; ret_box=false;
						if(square_p(more_s,boow_w[more_s-1][0],boow_w[more_s-1][1])==true){
							field2(more_s+2,a,b); in_f(more_s,a,b);
						}
					}
					cleartab(3); more_s=0;
				}
			}
		}
	}
	for(a=0;a<19;a++){
		for(b=0;b<19;b++){
			if(tab2[a][b]==0)field3(a,b);
			if(tab[a][b]==2&&bp>0&&wp==0)field2(5,a,b);
			if(tab[a][b]==1&&wp>0&&bp==0)field2(6,a,b);
			bp=0; wp=0;
		}
	}
	repair_field();
	for(a=0;a<19;a++){
		for(b=0;b<19;b++){
			if(tab[a][b]==0&&tab2[a][b]>2&&tab3[a][b]==0&&than_3(a,b)<3){
				kill_group(boow[0],a,b);
				for(ah=0;ah<19;ah++){
					for(bh=0;bh<19;bh++){
						if(tab3[ah][bh]>2) tab2[ah][bh]=tab3[ah][bh];
					}
				}
			}
			cleartab(3);
		}
	}
	repair_field(); final_punct();
}
function kill_group(d,at,bt){
	if(tab[at][bt]==1)tab3[at][bt]=6;
	if(tab[at][bt]==2)tab3[at][bt]=5;
	if(tab2[at][bt]==3)tab3[at][bt]=4;
	if(tab2[at][bt]==4)tab3[at][bt]=3;
	if(at!=0&&(tab[at-1][bt]==d||tab2[at-1][bt]==d+2)&&tab3[at-1][bt]<3)kill_group(d,at-1,bt);
	if(at!=18&&(tab[at+1][bt]==d||tab2[at+1][bt]==d+2)&&tab3[at+1][bt]<3)kill_group(d,at+1,bt);
	if(bt!=0&&(tab[at][bt-1]==d||tab2[at][bt-1]==d+2)&&tab3[at][bt-1]<3)kill_group(d,at,bt-1);
	if(bt!=18&&(tab[at][bt+1]==d||tab2[at][bt+1]==d+2)&&tab3[at][bt+1]<3)kill_group(d,at,bt+1);
}
function than_3(at,bt){
	tab3[at][bt]=2; suma_t=1;
	if(tab2[at][bt]==3||tab2[at][bt]==5) boow[0]=1; else boow[0]=2;

	if(at!=0&&tab2[at-1][bt]==0&&tab[at-1][bt]==boow[0]){ ret_box=false; if(square_p(boow[0],at-1,bt)==true) return 5; }
	if(at!=18&&tab2[at+1][bt]==0&&tab[at+1][bt]==boow[0]){ ret_box=false; if(square_p(boow[0],at+1,bt)==true) return 5; }
	if(bt!=0&&tab2[at][bt-1]==0&&tab[at][bt-1]==boow[0]){ ret_box=false; if(square_p(boow[0],at,bt-1)==true) return 5; }
	if(bt!=18&&tab2[at][bt+1]==0&&tab[at][bt+1]==boow[0]){ ret_box=false; if(square_p(boow[0],at,bt+1)==true) return 5; }

	if(at!=0&&(tab2[at-1][bt]==tab2[at][bt]||tab2[at-1][bt]==tab2[at][bt]+2||(tab2[at-1][bt]==tab2[at][bt]-2&&tab2[at][bt]>4))&&tab3[at-1][bt]==0)suma_t+=than_3(at-1,bt);
	if(at!=18&&(tab2[at+1][bt]==tab2[at][bt]||tab2[at+1][bt]==tab2[at][bt]+2||(tab2[at+1][bt]==tab2[at][bt]-2&&tab2[at][bt]>4))&&tab3[at+1][bt]==0)suma_t+=than_3(at+1,bt);
	if(bt!=0&&(tab2[at][bt-1]==tab2[at][bt]||tab2[at][bt-1]==tab2[at][bt]+2||(tab2[at][bt-1]==tab2[at][bt]-2&&tab2[at][bt]>4))&&tab3[at][bt-1]==0)suma_t+=than_3(at,bt-1);
	if(bt!=18&&(tab2[at][bt+1]==tab2[at][bt]||tab2[at][bt+1]==tab2[at][bt]+2||(tab2[at][bt+1]==tab2[at][bt]-2&&tab2[at][bt]>4))&&tab3[at][bt+1]==0)suma_t+=than_3(at,bt+1);
	return suma_t;
}
function in_f(dd,att,btt){
	tab3[att][btt]=0;

	if(att!=0&&tab[att-1][btt]>0&&tab[att-1][btt]!=dd)field2(dd+4,att-1,btt);
	if(att!=18&&tab[att+1][btt]>0&&tab[att+1][btt]!=dd)field2(dd+4,att+1,btt);
	if(btt!=0&&tab[att][btt-1]>0&&tab[att][btt-1]!=dd)field2(dd+4,att,btt-1);
	if(btt!=18&&tab[att][btt+1]>0&&tab[att][btt+1]!=dd)field2(dd+4,att,btt+1);

	if(att!=0&&tab3[att-1][btt]==1)in_f(dd,att-1,btt);
	if(att!=18&&tab3[att+1][btt]==1)in_f(dd,att+1,btt);
	if(btt!=0&&tab3[att][btt-1]==1)in_f(dd,att,btt-1);
	if(btt!=18&&tab3[att][btt+1]==1)in_f(dd,att,btt+1);
}
ret_box=false;
function square_p(d,at,bt){
	tab3[at][bt]=2;

	if(at>0&&(tab2[at-1][bt]==d+2||tab2[at-1][bt]==d+4)&&tab3[at-1][bt]!=2) return true;
	if(at<18&&(tab2[at+1][bt]==d+2||tab2[at+1][bt]==d+4)&&tab3[at+1][bt]!=2) return true;
	if(bt>0&&(tab2[at][bt-1]==d+2||tab2[at][bt-1]==d+4)&&tab3[at][bt-1]!=2) return true;
	if(bt<18&&(tab2[at][bt+1]==d+2||tab2[at][bt+1]==d+4)&&tab3[at][bt+1]!=2) return true

	if(at!=0&&tab[at-1][bt]==d&&tab3[at-1][bt]!=2&&ret_box==false) ret_box=square_p(d,at-1,bt);
	if(at!=18&&tab[at+1][bt]==d&&tab3[at+1][bt]!=2&&ret_box==false) ret_box=square_p(d,at+1,bt);
	if(bt!=0&&tab[at][bt-1]==d&&tab3[at][bt-1]!=2&&ret_box==false) ret_box=square_p(d,at,bt-1);
	if(bt!=18&&tab[at][bt+1]==d&&tab3[at][bt+1]!=2&&ret_box==false) ret_box=square_p(d,at,bt+1);

	return ret_box;
}
boow=[0,0]; boow_w=[0,0]; boow_w[0]=new Array(2); boow_w[1]=new Array(2); boow_w[0]=[0,0]; boow_w[1]=[0,0];
function one_field(at,bt){
	tab3[at][bt]=1;

	if(at>0&&(tab[at-1][bt]==1||tab[at-1][bt]==2)){boow[tab[at-1][bt]-1]++; boow_w[tab[at-1][bt]-1]=[at-1,bt];}
	if(at<18&&(tab[at+1][bt]==1||tab[at+1][bt]==2)){boow[tab[at+1][bt]-1]++; boow_w[tab[at+1][bt]-1]=[at+1,bt];}
	if(bt>0&&(tab[at][bt-1]==1||tab[at][bt-1]==2)){boow[tab[at][bt-1]-1]++; boow_w[tab[at][bt-1]-1]=[at,bt-1];}
	if(bt<18&&(tab[at][bt+1]==1||tab[at][bt+1]==2)){boow[tab[at][bt+1]-1]++; boow_w[tab[at][bt+1]-1]=[at,bt+1];}

	if(at>0&&tab2[at-1][bt]==-1&&tab3[at-1][bt]!=1)one_field(at-1,bt);
	if(at<18&&tab2[at+1][bt]==-1&&tab3[at+1][bt]!=1)one_field(at+1,bt);
	if(bt>0&&tab2[at][bt-1]==-1&&tab3[at][bt-1]!=1)one_field(at,bt-1);
	if(bt<18&&tab2[at][bt+1]==-1&&tab3[at][bt+1]!=1)one_field(at,bt+1);
}
function field(at,bt){
	corner=[0,0];
	for(l=at+1;l<19;l++){
		if(tab[l][bt]!=0){
			if(tab[l][bt]==1)corner[0]++; else corner[1]++;
			l=19;
		}
	}
	for(l=at-1;l>=0;l--){
		if(tab[l][bt]!=0){
			if(tab[l][bt]==1)corner[0]++; else corner[1]++;
			l=-1;
		}
	}
	for(l=bt+1;l<19;l++){
		if(tab[at][l]!=0){
			if(tab[at][l]==1)corner[0]++; else corner[1]++;
			l=19;
		}
	}
	for(l=bt-1;l>=0;l--){
		if(tab[at][l]!=0){
			if(tab[at][l]==1)corner[0]++; else corner[1]++;
			l=-1;
		}
	}
	tab2[at][bt]=-1;
	if(corner[0]>0&&corner[1]==0) bp++;
	if(corner[1]>0&&corner[0]==0) wp++;
	if(at>0&&tab[at-1][bt]==0&&tab2[at-1][bt]==0)field(at-1,bt);
	if(at<18&&tab[at+1][bt]==0&&tab2[at+1][bt]==0)field(at+1,bt);
	if(bt>0&&tab[at][bt-1]==0&&tab2[at][bt-1]==0)field(at,bt-1);
	if(bt<18&&tab[at][bt+1]==0&&tab2[at][bt+1]==0)field(at,bt+1);
}
function field2(d, at, bt){
	tab2[at][bt]=d;
	if(at!=0&&tab[at-1][bt]==tab[at][bt]&&tab2[at-1][bt]!=d)field2(d,at-1,bt);
	if(at!=18&&tab[at+1][bt]==tab[at][bt]&&tab2[at+1][bt]!=d)field2(d,at+1,bt);
	if(bt!=0&&tab[at][bt-1]==tab[at][bt]&&tab2[at][bt-1]!=d)field2(d,at,bt-1);
	if(bt!=18&&tab[at][bt+1]==tab[at][bt]&&tab2[at][bt+1]!=d)field2(d,at,bt+1);
}
function field3(at,bt){
	for(l=at+1;l<19;l++){
		if(tab2[l][bt]==3){
			bp++; l=19; if(tab[at][bt]==1) return;
		}else if(tab2[l][bt]==4){
			wp++; l=19; if(tab[at][bt]==2) return;
		}
		if(l!=19&&tab[at][bt]!=tab[l][bt]&&tab[l][bt]!=0)l=19;
	}
	for(l=at-1;l>=0;l--){
		if(tab2[l][bt]==3){
			bp++; l=-1; if(tab[at][bt]==1) return;
		}else if(tab2[l][bt]==4){
			wp++; l=-1; if(tab[at][bt]==2) return;
		}
		if(l!=-1&&tab[at][bt]!=tab[l][bt]&&tab[l][bt]!=0)l=-1;
	}
	for(l=bt+1;l<19;l++){
		if(tab2[at][l]==3){
			bp++; l=19; if(tab[at][bt]==1) return;
		}else if(tab2[at][l]==4){
			wp++; l=19; if(tab[at][bt]==2) return;
		}
		if(l!=19&&tab[at][bt]!=tab[at][l]&&tab[at][l]!=0)l=19;
	}
	for(l=bt-1;l>=0;l--){
		if(tab2[at][l]==3){
			bp++; l=-1; if(tab[at][bt]==1) return;
		}else if(tab2[at][l]==4){
			wp++; l=-1; if(tab[at][bt]==2) return;
		}
		if(l!=-1&&tab[at][bt]!=tab[at][l]&&tab[at][l]!=0)l=-1;
	}
	if(tab[at][bt]==1) tab2[at][bt]=11; else tab2[at][bt]=12;

	if(at>0&&tab[at-1][bt]==tab[at][bt]&&tab2[at-1][bt]<10)field3(at-1,bt);
	if(at<18&&tab[at+1][bt]==tab[at][bt]&&tab2[at+1][bt]<10)field3(at+1,bt);
	if(bt>0&&tab[at][bt-1]==tab[at][bt]&&tab2[at][bt-1]<10)field3(at,bt-1);
	if(bt<18&&tab[at][bt+1]==tab[at][bt]&&tab2[at][bt+1]<10)field3(at,bt+1);
}
function repair_field(){
	for(at=0;at<19;at++){
		for(bt=0;bt<19;bt++){
			if(tab2[at][bt]==6||tab2[at][bt]==5){
				for(l=at+1;l<19;l++){
					if(tab2[l][bt]!=-1) l=19; else tab2[l][bt]=tab2[at][bt]-2;
				}
				for(l=at-1;l>=0;l--){
					if(tab2[l][bt]!=-1) l=0; else tab2[l][bt]=tab2[at][bt]-2;
				}
				for(l=bt+1;l<19;l++){
					if(tab2[at][l]!=-1) l=19; else tab2[at][l]=tab2[at][bt]-2;
				}
				for(l=bt-1;l>=0;l--){
					if(tab2[at][l]!=-1) l=0; else tab2[at][l]=tab2[at][bt]-2;
				}
			}
		}
	}
}

function final_punct(){
	for(at=0;at<19;at++){
		for(bt=0;bt<19;bt++){
			f_img=document.getElementById(at*100+bt);
			if((tab2[at][bt]==0&&tab[at][bt]==1)||tab2[at][bt]==11) f_img.setAttribute("src", "img/black.png");
			if((tab2[at][bt]==0&&tab[at][bt]==2)||tab2[at][bt]==12) f_img.setAttribute("src", "img/white.png");
			if(tab2[at][bt]==3) f_img.setAttribute("src", "img/bp.png"); if(tab2[at][bt]==4) f_img.setAttribute("src", "img/wp.png");
			if(tab2[at][bt]==5) f_img.setAttribute("src", "img/wd.png"); if(tab2[at][bt]==6) f_img.setAttribute("src", "img/bd.png");
			if(tab2[at][bt]==-1) f_img.setAttribute("src", "");
		}
	}
}

function compare_p(){
	if(histor==0)return true;
	for(a=0;a<19;a++){
		for(b=0;b<19;b++){
			if(tab[a][b]!=tab_history[histor-1][a][b])return true;
		}
	}
	return false;
}

x_b=-1;y_b=-1;
function hoverr(event){
	if(!(res_ch==1&&histor==max_histor)){
		x_h = event.offsetX?(event.offsetX):event.pageX-document.getElementById("board").offsetLeft;
		y_h = event.offsetY?(event.offsetY):event.pageY-document.getElementById("board").offsetTop;
		if(tab[Math.round(Math.abs((y_h-12))/32)][Math.round(Math.abs((x_h-12))/32)]==0){
			if(Math.round(Math.abs((y_h-12))/32)!=y_b&&Math.round(Math.abs((x_h-12))/32)!=x_b){
				set(x_b,y_b,x_h,y_h);
			}
		}
	}
}
function set(x_b,y_b,x_h,y_h){
	x_b = Math.round(Math.abs(x_h-12)/32); y_b = Math.round(Math.abs(y_h-12)/32);
	hov.style.left=(12+32*x_b)-15+"px"; hov.style.top=(12+32*y_b)-15+"px";
	if(turn==1) hov.setAttribute("src", "img/black.png"); else hov.setAttribute("src", "img/white.png");
}
function setnot(x_b,y_b,x_h,y_h){
	hov.setAttribute("src", "");
}
function where(event){
	if(event.target===event.currentTarget&&!(res_ch==1&&histor==max_histor)){
		x = event.offsetX?(event.offsetX):event.pageX-document.getElementById("board").offsetLeft;
		y = event.offsetY?(event.offsetY):event.pageY-document.getElementById("board").offsetTop;
		if(tab[Math.round(Math.abs((y-12))/32)][Math.round(Math.abs((x-12))/32)]==0){
			x_t = Math.round(Math.abs((x-12))/32); y_t = Math.round(Math.abs((y-12))/32);
			x_x=x_t; y_y=y_t;
			play_move(y_t,x_t);
		}
	}else if(event.target===event.currentTarget&&finn==1){
		x = Math.round(Math.abs(((event.offsetX?(event.offsetX):event.pageX-document.getElementById("board").offsetLeft)-12))/32);
		y = Math.round(Math.abs(((event.offsetY?(event.offsetY):event.pageY-document.getElementById("board").offsetTop)-12))/32);
		change_s=0; if(tab2[y][x]==0&&tab[y][x]==1) change_s=6;
		if(tab2[y][x]==0&&tab[y][x]==2) change_s=5;
		if(tab2[y][x]==3) change_s=4;
		if(tab2[y][x]==4) change_s=-1;
		if(tab2[y][x]==-1) change_s=3;
		if(tab2[y][x]==6||tab2[y][x]==5) change_s=0;
		rev_sto(change_s,y,x); repair_field(); final_punct();
	}
}
function play_move(y_t,x_t){
	tab[y_t][x_t]=turn;
	img=document.getElementById((y_t*100)+x_t);
	if(turn==1){
		img.setAttribute("src", "img/black.png");
	}else{
		img.setAttribute("src", "img/white.png");
	}
	turn=((turn)%2)+1; cleartab(2); point=0;
	for(i=0;i<19;i++){
		for(j=0;j<19;j++){
			if(tab[i][j]==turn&&check_beat(i,j,1)==1){
				beat(i,j); renew(); cleartab(3); diff=0; if(histor<=2)diff=1;
				for(a=0;a<19&&histor>2;a++){
					for(b=0;b<19;b++){
						if(tab[a][b]!=tab_history[histor-1][a][b]){
							diff=1; b=19; a=19;
						}
					}
				}
				if(diff==0){
					popit("Forbidden ko move >_>"); tab[y_t][x_t]=0; tab[i][j]=turn;
					if(turn==1)document.getElementById((i*100)+j).setAttribute("src", "img/black.png");
					if(turn==2)document.getElementById((i*100)+j).setAttribute("src", "img/white.png");
					img.setAttribute("src", ""); turn=((turn)%2)+1; point=0; return;
				}
			}
			zbit=1;
		}
	}
	for(i=0;i<19;i++){
		for(j=0;j<19;j++){
			if(tab[i][j]==((turn)%2)+1&&check_beat(i,j,1)==1){
				img.setAttribute("src", ""); turn=((turn)%2)+1; tab[y_t][x_t]=0;
				popit("Forbidden suicidal move >_>"); zbit=1; point=0; return;
			}
			zbit=1;
		}
	}
	past(); res_ch=0; finn=0; points_f=[0,0];
}

function rev_sto(d,a,b){
	if(tab2[a][b]!=d) tab2[a][b]=d;
	if(a>0&&tab[a-1][b]==tab[a][b]&&tab2[a-1][b]!=d)rev_sto(d,a-1,b);
	if(a<18&&tab[a+1][b]==tab[a][b]&&tab2[a+1][b]!=d)rev_sto(d,a+1,b);
	if(b>0&&tab[a][b-1]==tab[a][b]&&tab2[a][b-1]!=d)rev_sto(d,a,b-1);
	if(b<18&&tab[a][b+1]==tab[a][b]&&tab2[a][b+1]!=d)rev_sto(d,a,b+1);
}

function renew(){
	for(a=0;a<19;a++){
		for(b=0;b<19;b++){
			if(tab3[a][b]<0){
				img_s=document.getElementById((a*100)+b); point++;
				img_s.setAttribute("src", ""); tab[a][b]=0; tab2[a][b]=0;
			}
		}
	}
}

function beat(ix,jx){
	if(tab[ix][jx]!=0&&tab3[ix][jx]==0){
		tab3[ix][jx]=tab[ix][jx]*(-1);
		if(ix+1<19&&(tab[ix+1][jx]==tab[ix][jx]&&tab3[ix+1][jx]==0)) beat(ix+1,jx,1);
		if(ix-1>=0&&(tab[ix-1][jx]==tab[ix][jx]&&tab3[ix-1][jx]==0)) beat(ix-1,jx,1);
		if(jx+1<19&&(tab[ix][jx+1]==tab[ix][jx]&&tab3[ix][jx+1]==0)) beat(ix,jx+1,1);
		if(jx-1>=0&&(tab[ix][jx-1]==tab[ix][jx]&&tab3[ix][jx-1]==0)) beat(ix,jx-1,1);
	}
}
function check_beat(ix,jx,k){
	if(tab[ix][jx]!=0&&tab2[ix][jx]==0){
		tab2[ix][jx]=tab[ix][jx];
		if((ix+1<19&&tab[ix+1][jx]==0)||(ix-1>=0&&tab[ix-1][jx]==0)||(jx+1<19&&tab[ix][jx+1]==0)||(jx-1>=0&&tab[ix][jx-1]==0)){ k=0; zbit=0 }
		if(ix+1<19&&(tab[ix+1][jx]==tab[ix][jx]&&tab2[ix+1][jx]==0)){ k=check_beat(ix+1,jx,1); if(k==0){ zbit=0; }}
		if(ix-1>=0&&(tab[ix-1][jx]==tab[ix][jx]&&tab2[ix-1][jx]==0)){ k=check_beat(ix-1,jx,1); if(k==0){ zbit=0; }}
		if(jx+1<19&&(tab[ix][jx+1]==tab[ix][jx]&&tab2[ix][jx+1]==0)){ k=check_beat(ix,jx+1,1); if(k==0){ zbit=0; }}
		if(jx-1>=0&&(tab[ix][jx-1]==tab[ix][jx]&&tab2[ix][jx-1]==0)){ k=check_beat(ix,jx-1,1); if(k==0){ zbit=0; }}
	}else{
		return 0;
	}
	if(zbit==0) return 0; else return 1;
}

function cleartab(x){
	for(af=0;af<19;af++){
		for(bf=0;bf<19;bf++){
			if(x==1) tab[af][bf]=0;
			if(x==2) tab2[af][bf]=0;
			if(x==3) tab3[af][bf]=0;
		}
	}
}

function past(){
	histor++; max_histor=histor;
	if(typeof tab_history[histor]=="undefined"){
		tab_history.push(histor);
		tab_history[histor]=new Array(19);
	}
	for(a=0;a<19;a++){
		if(typeof tab_history[histor][a]=="undefined")tab_history[histor][a]=new Array(19);
		for(b=0;b<19;b++){
			tab_history[histor][a][b]=tab[a][b];
		}
	}
	if(typeof jen[histor]=="undefined"){
		jen.push(histor); jen[histor]=new Array(2);
	}
	jen[histor][0]=jen[histor-1][0]; jen[histor][1]=jen[histor-1][1];
	jen[histor][((turn)%2)]+=point; points(); point=0;

	document.getElementById("rew4").style.opacity = '0';
	document.getElementById("rew5").style.opacity = '0';
	document.getElementById("rew6").style.opacity = '0';
	if(histor>0){
		document.getElementById("rew1").style.opacity = '1';
		document.getElementById("rew2").style.opacity = '1';
		document.getElementById("rew3").style.opacity = '1';
	}
}
function rewind(por){
	if((histor+por<1||por==0)&&histor!=0){
		document.getElementById("rew1").style.opacity = '0'; document.getElementById("rew4").style.opacity = '1';
		document.getElementById("rew2").style.opacity = '0'; document.getElementById("rew5").style.opacity = '1';
		document.getElementById("rew3").style.opacity = '0'; document.getElementById("rew6").style.opacity = '1';
		histor=0; points();
		for(a=0;a<19;a++){
			for(b=0;b<19;b++){
				tab[a][b]=0; document.getElementById(a*100+b).setAttribute("src", "");
			}
		}
		document.getElementById('black_f').innerHTML=''; document.getElementById('white_f').innerHTML='';
		document.getElementById('download').style.pointerEvents="none"; document.getElementById('download').style.opacity=0;
	}else if((por+histor>=max_histor||por==11)&&histor!=max_histor){
		document.getElementById("rew1").style.opacity = '1'; document.getElementById("rew4").style.opacity = '0';
		document.getElementById("rew2").style.opacity = '1'; document.getElementById("rew5").style.opacity = '0';
		document.getElementById("rew3").style.opacity = '1'; document.getElementById("rew6").style.opacity = '0';
		histor=max_histor; points();
		for(a=0;a<19;a++){
			for(b=0;b<19;b++){
				tab[a][b]=tab_history[histor][a][b];
				re_img=document.getElementById(a*100+b);
				if(tab[a][b]==0) re_img.setAttribute("src", "");
				if(tab[a][b]==1) re_img.setAttribute("src", "img/black.png");
				if(tab[a][b]==2) re_img.setAttribute("src", "img/white.png");
			}
		}
		if(res_ch==1){
			document.getElementById('download').style.pointerEvents="auto";
			document.getElementById('download').style.opacity=0.4;
		}
		if(finn==2){
			final_punct(); document.getElementById('black_f').innerHTML='| '+points_f[0];
			document.getElementById('white_f').innerHTML='| '+points_f[1];
		}
	}else if((por<0&&histor!=0)||(max_histor!=histor&&por>0)){
		document.getElementById("rew1").style.opacity = '1';
		document.getElementById("rew2").style.opacity = '1';
		document.getElementById("rew3").style.opacity = '1';
		if(histor+por!=max_histor) opac=1; else opac=0;
		document.getElementById("rew4").style.opacity = opac;
		document.getElementById("rew5").style.opacity = opac;
		document.getElementById("rew6").style.opacity = opac;
		for(a=0;a<19;a++){
			for(b=0;b<19;b++){
				tab[a][b]=tab_history[histor+por][a][b];
				re_img=document.getElementById(a*100+b);
				if(tab[a][b]==0) re_img.setAttribute("src", "");
				if(tab[a][b]==1) re_img.setAttribute("src", "img/black.png");
				if(tab[a][b]==2) re_img.setAttribute("src", "img/white.png");
			}
		}
		histor+=por;
		if(opac==0&&res_ch==1){
			document.getElementById('download').style.pointerEvents="auto";
			document.getElementById('download').style.opacity=0.4;
		}else{
			document.getElementById('download').style.pointerEvents="none";
			document.getElementById('download').style.opacity=0;
		}
		if(opac==0&&finn==2){
			final_punct(); document.getElementById('black_f').innerHTML='| '+points_f[0];
			document.getElementById('white_f').innerHTML='| '+points_f[1];
		}else{
			document.getElementById('black_f').innerHTML=''; document.getElementById('white_f').innerHTML='';
		}
	}
	turn=histor%2+1;
	points();

}

function points(){
	document.getElementById("black_j").innerHTML=jen[histor][0];
	document.getElementById("white_j").innerHTML=jen[histor][1];
	if(turn==1){ document.getElementById("w_i").style.opacity = "0.4"; document.getElementById("b_i").style.opacity = "1";}
	if(turn==2){ document.getElementById("w_i").style.opacity = "1"; document.getElementById("b_i").style.opacity = "0.4";}
}

tab = new Array(19); tab2 = new Array(19); tab3 = new Array(19);
tab_history = [0];  tab_history[0]= new Array(19);
turn=1; zbit=1; histor=0; max_histor=0; opacity=0; point=0; finn=0;
jen=[0]; jen[0] = new Array(2); jen[0][0]=0; jen[0][1]=0; points();
hov = document.createElement("img");
hov.setAttribute("src", "");
hov.setAttribute("draggable", "false");
hov.style.position = 'absolute';
hov.setAttribute('disabled','disabled');
hov.style.opacity = "0.4";
hov.style.pointerEvents="none"
document.getElementById('board').appendChild(hov);

for(i=0;i<19;i++){
	tab[i]= new Array(19); tab2[i] = new Array(19); tab3[i] = new Array(19); tab_history[0][i]= new Array(19);
	for(j=0;j<19;j++){
		tab[i][j]=0; tab2[i][j]=0; tab3[i][j]=0; tab_history[0][i][j]=0;
		var img = document.createElement("img");
		img.setAttribute("id", ((i*100)+j));
		img.setAttribute("src", "");
		img.setAttribute("draggable", "false");
		img.setAttribute('disabled','disabled');
		img.style.position = 'absolute';
		img.style.left=(12+32*j)-15+"px";
		img.style.top=(12+32*i)-15+"px";
		img.style.pointerEvents="none"
		document.getElementById('board').appendChild(img);
	}
}