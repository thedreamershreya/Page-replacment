

var count = 0;
var pages = [];
var pf;
var ph;
var f;
var rs;
var txt;

function fifo() {
    f = document.getElementById("frames1").value;
    rs = document.getElementById("rs1").value;
    var isnum = /^\d+$/.test(rs);
    if(f <= 0){
        alert( "Please provide proper input" );
        return;
    }
    else if(!isnum){
        alert( "Please use numbers in reference string" );
        return;
    }
    var x = document.getElementById("resetbtn1").style.display = "block";
    console.log(f);
    console.log(rs);
    var prev;
    pf = 0;
    ph = 0;
    var k = 0;
    var i, row = Number(f) + 1,
        j, col = rs.length;

    pages = new Array(row);
    for (i = 0; i < row; i++)
        pages[i] = new Array(col);

    for (i = 0; i < row - 1; i++) {
        for (j = 0; j < col; j++)
            pages[i][j] = "--";
    }

    for (j = 0; j < col; j++) {
        var smallest = -1;
        var flag = false;
        if (j > 0) {
            for (i = 0; i < row - 1; i++)
                pages[i][j] = pages[i][j - 1];
        }
        for (i = 0; i < row - 1; i++) {
            if (rs[k] == pages[i][j])
                flag = true;
        }
        if (flag == false) {
            for (i = 0; i < row - 1; i++) {
                if (pages[i][j] == "--") {
                    smallest = i;
                    break;
                }
            }
            if (smallest != -1) {
                pages[smallest][j] = rs[k];
                prev = (smallest + 1) % (row - 1);
            } else {
                pages[prev][j] = rs[k];
                prev = (prev + 1) % (row - 1);
            }
            pages[row - 1][j] = "PF";
            k++;
            pf++;
            console.log("pf=", pf);
        } else {
            ph++;
            k++;
            console.log("ph=", ph);
            pages[row - 1][j] = "PH";
        }
    }
    txt = " ";
    var real;
    var m = 0;
    var $table = $("<table border='1'></table>");
    $table.addClass('table table-striped');
    $tbody = $("<tbody></tbody>");
    for (i = 0; i < row; i++) {
        var line = $("<tr></tr>");
        // line.css({
        // 	'background-color': getRandomColor()
        // });
        for (j = 0; j < col; j++) {

            if (i == row - 1) {


                if (("PH".localeCompare(pages[i][j]) == 0)) {
                    line.append('<td style="color:green">' + 'PH' + '</td>');
                } else {
                    line.append('<td style="color:red">' + 'PF' + '</td>');
                }

                $tbody.append(line);

            } else {
                line.append($("<td></td>").html(pages[i][j] + ""));
                $tbody.append(line);
            }

        }
    $table.append($tbody);
    $table.appendTo($("#div"));
    $("#sp1").html('<p style="text-align:center">' + "<b>The no of page misses is:</b>" + "   " +
        '<span style="color:red">' + pf + '</span>' + '</p>')
    $("#sp2").html('<p style="text-align:center">' + "<b>The no of page hits is:</b>" + "   " +
        '<span style="color:green">' + ph + '</span>' + '</p>')


    console.log(m);
    document.getElementById( 'bottom1' ).scrollIntoView();
    txt = txt + "\n";
    console.log(txt);
    console.log(txt.length);
    document.getElementById( 'calcbtn1' ).disabled="disabled";
    document.getElementById("frames1").disabled = true;
    document.getElementById("rs1").disabled = true;

}
function getRandomColor() {
    m = m + 1;
    var color = '';
    if (m == 1) {
        color = 'blue';
    }
    if (m == 2) {
        color = 'yellow';
    }
    if (m == 3) {
        color = 'pink';
    }
    if (m == 4) {
        color = 'white';
    }

    return color;
}
}
function lru()
{
 f = document.getElementById("frames2").value;
 rs=document.getElementById("rs2").value;
 var isnum = /^\d+$/.test(rs);
 if(f <= 0){
	 alert( "Please provide proper input" );
	 return;
 }
 else if(!isnum){
	 alert( "Please use numbers in reference string" );
	 return;
 }
 var x = document.getElementById("resetbtn2").style.display = "block";
console.log(f);
console.log(rs);
var prev;
 pf=0;
 ph=0;
var k=0;
var l;
var least;
var index;
	var i,row=Number(f)+1,j,col=rs.length;

	pages = new Array(row);
	for(i=0;i<row;i++)
		pages[i]=new Array(col);

	for(i=0;i<row-1;i++)
	{
    for(j=0 ; j<col;j++)
		pages[i][j]= "--";
	}

	for(j=0;j<col;j++)
	{
		var smallest=-1;
		var flag=false;
		if(j>0)
		{
		for(i=0;i<row-1;i++)
			pages[i][j]=pages[i][j-1];
		}
		for(i=0;i<row-1;i++)
		{
			if(rs[k]==pages[i][j])
			flag=true;
		}
		if(flag==false)
		{
			for(i=0;i<row-1;i++)
			{
				if(pages[i][j]== "--")
				{
					smallest=i;
					break;
				}
			}
			if(smallest!=-1)
			{
		    pages[smallest][j]=rs[k];
			}
		    else
			{
				index=9999;
			  for(i=0;i<row-1;i++)
			  {
			  	for(l=j-1;l>=0;l--)
			  	{
			  		if(pages[i][j]==rs[l])
			  		{
			  			least = l;
			  			break;
			  		}

			  	}
			  	if(index > least)
			  		index = least;

			  }

			  for(i=0;i<row-1;i++)
			  {
			  	if(pages[i][j]==rs[index])
			  		break;
			  }

			  pages[i][j] = rs[k];
			}
		pages[row-1][j]="PF";
		k++;
		pf++;
		console.log("pf=",pf);
        }
		else
        {
        ph++;
        k++;
		console.log("ph=",ph);
		pages[row-1][j]="PH";
        }
	}
	txt= " ";var real;var m=0;
	var $table=$("<table border='1'></table>");
	$table.addClass('table table-striped');
	$tbody = $("<tbody></tbody>");
		for ( i=0; i<row;i++)
		  {
			var line =$("<tr></tr>");
			// line.css({'background-color': getRandomColor()});
			  for(j=0; j<col;j++){

			if(i==row-1) {


					if(("PH".localeCompare(pages[i][j])==0)){
						line.append('<td style="color:green">'+'PH'+'</td>');
					}
					else{
						line.append('<td style="color:red">'+'PF'+'</td>');
					}

				$tbody.append(line);

				}
			else{
				line.append($("<td></td>").html(pages[i][j]+""));
				$tbody.append(line);
			}


			  }
			}

		  $table.append($tbody);
		  $table.appendTo($("#div1"));
		  $("#sp11").html('<p style="text-align:center">'+"<b>The no of page misses is:</b>"+"   "+'<span style="color:red">'+pf+'</span>'+'</p>')
		  $("#sp21").html('<p style="text-align:center">'+"<b>The no of page hits is:</b>"+"   "+'<span style="color:green">'+ph+'</span>'+'</p>')
		  function getRandomColor() {
			m=m+1;
			var color ='';
			  if(m==1){
				  color='DodgerBlue';
			  }
			  if(m==2){
				  color='Tomato';
			  }
			  if(m==3){
				  color='Violet';
			  }
			  if(m==4){
				  color='LightGray';
			  }

			return color;
			 }
			 console.log(m);
			 document.getElementById( 'bottom2' ).scrollIntoView();
txt = txt + "\n";
console.log(txt);
document.getElementById( 'calcbtn2' ).disabled="disabled";
document.getElementById("frames2").disabled = true;
document.getElementById("rs2").disabled = true;
}
function mru()
{
 f = document.getElementById("frames3").value;
 rs=document.getElementById("rs3").value;
 var isnum = /^\d+$/.test(rs);
 if(f <= 0){
	 alert( "Please provide proper input" );
	 return;
 }
 else if(!isnum){
	 alert( "Please use numbers in reference string" );
	 return;
 }
 var x = document.getElementById("resetbtn3").style.display = "block";
console.log(f);
console.log(rs);
var prev;
 pf=0;
 ph=0;
var k=0;
var l;

var index;
	var i,row=Number(f)+1,j,col=rs.length;

	pages = new Array(row);
	for(i=0;i<row;i++)
		pages[i]=new Array(col);

	for(i=0;i<row-1;i++)
	{
    for(j=0 ; j<col;j++)
		pages[i][j]= "--";
	}

	for(j=0;j<col;j++)
	{
		var smallest=-1;
		var flag=false;
		if(j>0)
		{
		    for(i=0;i<row-1;i++)
			pages[i][j]=pages[i][j-1];
		}
		    for(i=0;i<row-1;i++)
	    	{
		    	if(rs[k]==pages[i][j])
		    	flag=true;
		    }
		if(flag==false)
		{
			for(i=0;i<row-1;i++)
			{
				if(pages[i][j]== "--")
				{
					smallest=i;
					break;
				}
			}
			if(smallest!=-1)
			{
		        pages[smallest][j]=rs[k];
			}
		    else
			{
				index=-1;
                var most_rec = -1;
			  for(i=0;i<row-1;i++)
			  {
                  for(m=0;m<=j-1;m++){
                      if(pages[i][j]==rs[m]){
                            most_rec = m;
                      }
                  }

			  	if(index < most_rec)
			  		index = most_rec;

			  }

			  for(i=0;i<row-1;i++)
			  {
			  	if(pages[i][j]==rs[index])
			  		break;
			  }

			  pages[i][j] = rs[k];
			}
	    	pages[row-1][j]="PF";
	    	k++;
	    	pf++;
	    	console.log("pf=",pf);
        }
		else
        {
            ph++;
            k++;
	    	console.log("ph=",ph);
	    	pages[row-1][j]="PH";
        }
	}
	txt= " ";var real;var m=0;
	var $table=$("<table border='1'></table>");
	$table.addClass('table table-striped');
	$tbody = $("<tbody></tbody>");
		for ( i=0; i<row;i++)
		  {
			var line =$("<tr></tr>");
			// line.css({'background-color': getRandomColor()});
			  for(j=0; j<col;j++){

			if(i==row-1) {


					if(("PH".localeCompare(pages[i][j])==0)){
						line.append('<td style="color:green">'+'PH'+'</td>');
					}
					else{
						line.append('<td style="color:red">'+'PF'+'</td>');
					}

				$tbody.append(line);

				}
			else{
				line.append($("<td></td>").html(pages[i][j]+""));
				$tbody.append(line);
			}


			  }
			}

		  $table.append($tbody);
		  $table.appendTo($("#div2"));
		  $("#sp12").html('<p style="text-align:center">'+"<b>The no of page misses is:</b>"+"   "+'<span style="color:red">'+pf+'</span>'+'</p>')
		  $("#sp22").html('<p style="text-align:center">'+"<b>The no of page hits is:</b>"+"   "+'<span style="color:green">'+ph+'</span>'+'</p>')

		 console.log(m);
		 document.getElementById( 'bottom3' ).scrollIntoView();
txt = txt + "\n";
console.log(txt);
document.getElementById( 'calcbtn3' ).disabled="disabled";
document.getElementById("frames3").disabled = true;
document.getElementById("rs3").disabled = true;
}
function optimal()
{
 f = document.getElementById("frames4").value;
 rs=document.getElementById("rs4").value;
 var isnum = /^\d+$/.test(rs);
 if(f <= 0){
	 alert( "Please provide proper input" );
	 return;
 }
 else if(!isnum){
	 alert( "Please use numbers in reference string" );
	 return;
 }
 var x = document.getElementById("resetbtn4").style.display = "block";
console.log(f);
console.log(rs);
var prev;
 pf=0;
 ph=0;
var k=0;
var l;
var farthest;
var index=-9999;
	var i,row=Number(f)+1,j,col=rs.length;

	pages = new Array(row);
	for(i=0;i<row;i++)
		pages[i]=new Array(col);

	for(i=0;i<row-1;i++)
	{
    for(j=0 ; j<col;j++)
		pages[i][j]= "--";
	}

	for(j=0;j<col;j++)
	{
		var smallest=-1;
		var flag=false;
		if(j>0)
		{
		for(i=0;i<row-1;i++)
			pages[i][j]=pages[i][j-1];
		}
		for(i=0;i<row-1;i++)
		{
			if(rs[k]==pages[i][j])
			flag=true;
		}
		if(flag==false)
		{
			for(i=0;i<row-1;i++)
			{
				if(pages[i][j]== "--")
				{
					smallest=i;
					break;
				}
			}
			if(smallest!=-1)
			{
		    pages[smallest][j]=rs[k];
			}
		    else
			{
				index=-9999;
			  for(i=0;i<row-1;i++)
			  {
			  	for(l=j+1;l<col;l++)
			  	{
			  		if(pages[i][j]==rs[l])
			  		{
			  			farthest = l;
			  			break;
			  		}
			  		else
			  			farthest = -2;
			  	}
			  	if(index < farthest)
			  		index = farthest;
			  	if(farthest == -2)
			  		break;
			  }
			  if(farthest!=-2)
			  {
			  for(i=0;i<row-1;i++)
			  {
			  	if(pages[i][j]==rs[index])
			  		break;
			  }
			  }
			  pages[i][j] = rs[k];
			}
		pages[row-1][j]="PF";
		k++;
		pf++;
		console.log("pf=",pf);
        }
		else
        {
        ph++;
        k++;
		console.log("ph=",ph);
		pages[row-1][j]="PH";
        }
	}
	txt= " ";var real;var m=0;
	var $table=$("<table border='1'></table>");
	$table.addClass('table table-striped');
	$tbody = $("<tbody></tbody>");
		for ( i=0; i<row;i++)
		  {
			var line =$("<tr></tr>");
			// line.css({'background-color': getRandomColor()});
			  for(j=0; j<col;j++){

			if(i==row-1) {


					if(("PH".localeCompare(pages[i][j])==0)){
						line.append('<td style="color:green">'+'PH'+'</td>');
					}
					else{
						line.append('<td style="color:red">'+'PF'+'</td>');
					}

				$tbody.append(line);

				}
			else{
				line.append($("<td></td>").html(pages[i][j]+""));
				$tbody.append(line);
			}


			  }
			}

		  $table.append($tbody);
		  $table.appendTo($("#div3"));
		  $("#sp13").html('<p style="text-align:center">'+"<b>The no of page misses is:</b>"+"   "+'<span style="color:red">'+pf+'</span>'+'</p>')
		  $("#sp23").html('<p style="text-align:center">'+"<b>The no of page hits is:</b>"+"   "+'<span style="color:green">'+ph+'</span>'+'</p>')
		  function getRandomColor() {
			m=m+1;
			var color ='';
			  if(m==1){
				  color='DodgerBlue';
			  }
			  if(m==2){
				  color='Tomato';
			  }
			  if(m==3){
				  color='Violet';
			  }
			  if(m==4){
				  color='White';
			  }

			return color;
			 }
			 console.log(m);
			 document.getElementById( 'bottom4' ).scrollIntoView();
txt = txt + "\n";

document.getElementById( 'calcbtn4' ).disabled="disabled";
document.getElementById("frames4").disabled = true;
document.getElementById("rs4").disabled = true;
}
function sec()
{
 f = document.getElementById("frames5").value;
 rs=document.getElementById("rs5").value;
 var isnum = /^\d+$/.test(rs);
 if(f <= 0){
	 alert( "Please provide proper input" );
	 return;
 }
 else if(!isnum){
	 alert( "Please use numbers in reference string" );
	 return;
 }
 var x = document.getElementById("resetbtn5").style.display = "block";
console.log(f);
console.log(rs);
var prev;
 pf=0;
 ph=0;
var k=0;
var n=0;
	var i,row=Number(f)+1,j,col=rs.length;

	pages = new Array(row);
	for(i=0;i<row;i++)
		pages[i]=new Array(col);
	var ref = [];
	ref = new Array(row-1);

	for(i=0;i<row-1;i++)
	{
    for(j=0 ; j<col;j++)
		pages[i][j]= "--";
	}

	for(j=0;j<col;j++)
	{
		var smallest=-1;
		var flag=false;
		n=0;
		if(j>0)
		{
		for(i=0;i<row-1;i++)
			pages[i][j]=pages[i][j-1];
		}
		for(i=0;i<row-1;i++)
		{
			if(rs[k]==pages[i][j])
			{
			flag=true;
			break;
		    }
		}
		if(flag==false)
		{
			for(i=0;i<row-1;i++)
			{
				if(pages[i][j]== "--")
				{
					smallest=i;
					break;
				}
			}
			if(smallest!=-1)
			{
		    pages[smallest][j]=rs[k];
			prev=(smallest+1)%(row-1);
			ref[smallest] = 0;
			}
		    else
			{
				for(i=prev;n!=(row-1);)
				{
					if(ref[i]==1)
					{
						ref[i] = 0;
						prev=(prev+1)%(row-1);
						i=(i+1)%(row-1);
						n++;
					}
					else
						break;
				}

				pages[prev][j]=rs[k];
				prev=(prev+1)%(row-1);
			}
		pages[row-1][j]="PF";
		k++;
		pf++;
		console.log("pf=",pf);
        }
		else
        {
        ph++;
        k++;
		console.log("ph=",ph);
		pages[row-1][j]="PH";
		ref[i] = 1;
        }
	}
txt= " ";var real;var m=0;
var $table=$("<table border='1'></table>");
$table.addClass('table table-striped');
$tbody = $("<tbody></tbody>");
	for ( i=0; i<row;i++)
	  {
        var line =$("<tr></tr>");

	  	for(j=0; j<col;j++){

        if(i==row-1) {


                if(("PH".localeCompare(pages[i][j])==0)){
					line.append('<td style="color:#008000">'+'PH'+'</td>');
                }
                else{
					line.append('<td style="color:red">'+'PF'+'</td>');
				}

			$tbody.append(line);

			}
        else{
            line.append($("<td></td>").html(pages[i][j]+""));
            $tbody.append(line);
        }


          }
        }

      $table.append($tbody);
	  $table.appendTo($("#div4"));
	  $("#sp14").html('<p style="text-align:center">'+"<b>The no of page misses is:</b>"+"   "+'<span style="color:red">'+pf+'</span>'+'</p>')
	  $("#sp24").html('<p style="text-align:center">'+"<b>The no of page hits is:</b>"+"   "+'<span style="color:green">'+ph+'</span>'+'</p>')

		 console.log(m);
		 document.getElementById( 'bottom5' ).scrollIntoView();
txt = txt + "\n";
console.log(txt);
console.log(txt.length);
document.getElementById( 'calcbtn5' ).disabled="disabled";
document.getElementById("frames5").disabled = true;
document.getElementById("rs5").disabled = true;
}
let act="###";
function change(req)
	{
		if(act!='###')
		{ let ptr=document.getElementById(act);
          ptr.style.display='none';
		}
		switch (req) {
			case 0:{act='fif';
						let ptr=document.getElementById(act);
          				ptr.style.display='block';
						document.getElementById( act ).scrollIntoView();
				        break;
		           }
			case 1:{act='lru';
						let ptr=document.getElementById(act);
          				ptr.style.display='block';
						  document.getElementById( act ).scrollIntoView();
					    break;
				   }
			case 2:{act='opt';
						let ptr=document.getElementById(act);
          				ptr.style.display='block';
						  document.getElementById( act ).scrollIntoView();
				        break;
				   }
			case 3:{act='sec';
						let ptr=document.getElementById(act);
          				ptr.style.display='block';
						  document.getElementById( act ).scrollIntoView();
				        break;
				   }
			case 4:{act='mru';
						let ptr=document.getElementById(act);
          				ptr.style.display='block';
						  document.getElementById( act ).scrollIntoView();
				        break;
				   }
			case 5:{act='com';
						let ptr=document.getElementById(act);
          				ptr.style.display='block';
						  document.getElementById( act ).scrollIntoView();
				        break;
				   }
			default:
				break;
		}
}

function comaprison() {

	// DEFINING VARIABLES

	var count = 0;
	var pages = [];
	var pf;
	var ph;
	var f;
	var rs;
	var txt;
	let F=new Array(5);
	let H=new Array(5);
	f = document.getElementById("frames6").value;
	rs = document.getElementById("rs6").value;
	var isnum = /^\d+$/.test(rs);
	if (f <= 0) {
		alert("Please provide proper input");
		return;
	}
	else if (!isnum) {
		alert("Please use numbers in reference string");
		return;
	}
	// var x = document.getElementById("graphbtn").style.display = "block";
	var ymn = document.getElementById("resetbtn6").style.display = "block";
	console.log(f);
	console.log(rs);
	var prev;
	pf1 = 0; pf2 = 0; pf3 = 0;
	ph = 0;
	var k = 0;
	var i, row = Number(f) + 1, j, col = rs.length;

	// GETING THE INPUT

	pages = new Array(row);
	for (i = 0; i < row; i++)
		pages[i] = new Array(col);

	for (i = 0; i < row - 1; i++) {
		for (j = 0; j < col; j++)
			pages[i][j] = "--";
	}

	// FIFO COMPUTE FUNC

	for (j = 0; j < col; j++) {
		var smallest = -1;
		var flag = false;
		if (j > 0) {
			for (i = 0; i < row - 1; i++)
				pages[i][j] = pages[i][j - 1];
		}
		for (i = 0; i < row - 1; i++) {
			if (rs[k] == pages[i][j])
				flag = true;
		}
		if (flag == false) {
			for (i = 0; i < row - 1; i++) {
				if (pages[i][j] == "--") {
					smallest = i;
					break;
				}
			}
			if (smallest != -1) {
				pages[smallest][j] = rs[k];
				prev = (smallest + 1) % (row - 1);
			}
			else {
				pages[prev][j] = rs[k];
				prev = (prev + 1) % (row - 1);
			}
			pages[row - 1][j] = "PF";
			k++;
			pf1++;
			console.log("pf=", pf1);
		}
		else {
			ph++;
			k++;
			console.log("ph=", ph);
			pages[row - 1][j] = "PH";
		}
	}
	F[0]=pf1; H[0]=ph;

	// OPTIMAL COMPUTE FUNC

	pf = 0;
	ph = 0;
	k = 0;
	var l;
	var farthest;
	var index = -9999;
	for (i = 0; i < row - 1; i++) {
		for (j = 0; j < col; j++)
			pages[i][j] = "--";
	}

	for (j = 0; j < col; j++) {
		var smallest = -1;
		var flag = false;
		if (j > 0) {
			for (i = 0; i < row - 1; i++)
				pages[i][j] = pages[i][j - 1];
		}
		for (i = 0; i < row - 1; i++) {
			if (rs[k] == pages[i][j])
				flag = true;
		}
		if (flag == false) {
			for (i = 0; i < row - 1; i++) {
				if (pages[i][j] == "--") {
					smallest = i;
					break;
				}
			}
			if (smallest != -1) {
				pages[smallest][j] = rs[k];
			}
			else {
				index = -9999;
				for (i = 0; i < row - 1; i++) {
					for (l = j + 1; l < col; l++) {
						if (pages[i][j] == rs[l]) {
							farthest = l;
							break;
						}
						else
							farthest = -2;
					}
					if (index < farthest)
						index = farthest;
					if (farthest == -2)
						break;
				}
				if (farthest != -2) {
					for (i = 0; i < row - 1; i++) {
						if (pages[i][j] == rs[index])
							break;
					}
				}
				pages[i][j] = rs[k];
			}
			pages[row - 1][j] = "PF";
			k++;
			pf2++;
			console.log("pf=", pf2);
		}
		else {
			ph++;
			k++;
			console.log("ph=", ph);
			pages[row - 1][j] = "PH";
		}
	}


	F[3]=pf2; H[3]=ph;

	// LRU FUNC

	pf = 0;
	ph = 0;
	var k = 0;
	var least;

	var ref = [];
	ref = new Array(row - 1);
	for (i = 0; i < row - 1; i++) {
		for (j = 0; j < col; j++)
			pages[i][j] = "--";
	}

	for (j = 0; j < col; j++) {
		var smallest = -1;
		var flag = false;
		if (j > 0) {
			for (i = 0; i < row - 1; i++)
				pages[i][j] = pages[i][j - 1];
		}
		for (i = 0; i < row - 1; i++) {
			if (rs[k] == pages[i][j])
				flag = true;
		}
		if (flag == false) {
			for (i = 0; i < row - 1; i++) {
				if (pages[i][j] == "--") {
					smallest = i;
					break;
				}
			}
			if (smallest != -1) {
				pages[smallest][j] = rs[k];
			}
			else {
				index = 9999;
				for (i = 0; i < row - 1; i++) {
					for (l = j - 1; l >= 0; l--) {
						if (pages[i][j] == rs[l]) {
							least = l;
							break;
						}

					}
					if (index > least)
						index = least;

				}

				for (i = 0; i < row - 1; i++) {
					if (pages[i][j] == rs[index])
						break;
				}

				pages[i][j] = rs[k];
			}
			pages[row - 1][j] = "PF";
			k++;
			pf3++;
			console.log("pf=", pf3);
		}
		else {
			ph++;
			k++;
			console.log("ph=", ph);
			pages[row - 1][j] = "PH";
		}
	}

	F[1]=pf3; H[1]=ph;

	//sec chance compute

	pf4 = 0;
	ph = 0;
	var k = 0;
	var n = 0;

	for (i = 0; i < row - 1; i++) {
		for (j = 0; j < col; j++)
			pages[i][j] = "--";
	}

	for (j = 0; j < col; j++) {
		var smallest = -1;
		var flag = false;
		n = 0;
		if (j > 0) {
			for (i = 0; i < row - 1; i++)
				pages[i][j] = pages[i][j - 1];
		}
		for (i = 0; i < row - 1; i++) {
			if (rs[k] == pages[i][j]) {
				flag = true;
				break;
			}
		}
		if (flag == false) {
			for (i = 0; i < row - 1; i++) {
				if (pages[i][j] == "--") {
					smallest = i;
					break;
				}
			}
			if (smallest != -1) {
				pages[smallest][j] = rs[k];
				prev = (smallest + 1) % (row - 1);
				ref[smallest] = 0;
			}
			else {
				for (i = prev; n != (row - 1);) {
					if (ref[i] == 1) {
						prev = (prev + 1) % (row - 1);
						i = (i + 1) % (row - 1);
						n++;
					}
					else
						break;
				}
				for (i = 0; i <= prev; i++) {
					ref[i] = 0;
				}
				pages[prev][j] = rs[k];
				prev = (prev + 1) % (row - 1);
			}
			pages[row - 1][j] = "PF";
			k++;
			pf4++;
			console.log("pf=", pf4);
		}
		else {
			ph++;
			k++;
			console.log("ph=", ph);
			pages[row - 1][j] = "PH";
			ref[i] = 1;
		}
	}

	F[4]=pf4; H[4]=ph;

	function getRandomColor() {
		m = m + 1;
		var color = '';
		if (m == 1) {
			color = 'blue';
		}
		if (m == 2) {
			color = 'yellow';
		}
		if (m == 3) {
			color = 'pink';
		}
		if (m == 4) {
			color = 'white';
		}

		return color;
	}

	// MRU starts here

	ph = 0;
	pf5 = 0
	f = document.getElementById("frames6").value;
	rs = document.getElementById("rs6").value;
	var isnum = /^\d+$/.test(rs);
	if (f <= 0) {
		alert("Please provide proper input");
		return;
	}
	else if (!isnum) {
		alert("Please use numbers in reference string");
		return;
	}
	var x = document.getElementById("resetbtn6").style.display = "block";
	console.log(f);
	console.log(rs);
	var prev;
	pf = 0;
	ph = 0;
	var k = 0;
	var l;
	var least;
	var index;
	var i, row = Number(f) + 1, j, col = rs.length;

	pages = new Array(row);
	for (i = 0; i < row; i++)
		pages[i] = new Array(col);

	for (i = 0; i < row - 1; i++) {
		for (j = 0; j < col; j++)
			pages[i][j] = "--";
	}

	for (j = 0; j < col; j++) {
		var smallest = -1;
		var flag = false;
		if (j > 0) {
			for (i = 0; i < row - 1; i++)
				pages[i][j] = pages[i][j - 1];
		}
		for (i = 0; i < row - 1; i++) {
			if (rs[k] == pages[i][j])
				flag = true;
		}
		if (flag == false) {
			for (i = 0; i < row - 1; i++) {
				if (pages[i][j] == "--") {
					smallest = i;
					break;
				}
			}
			if (smallest != -1) {
				pages[smallest][j] = rs[k];
			}
			else {
				index = -1;
				var most_rec = -1;
				for (i = 0; i < row - 1; i++) {
					for (m = 0; m <= j - 1; m++) {
						if (pages[i][j] == rs[m]) {
							most_rec = m;
						}
					}

					if (index < most_rec)
						index = most_rec;

				}

				for (i = 0; i < row - 1; i++) {
					if (pages[i][j] == rs[index])
						break;
				}

				pages[i][j] = rs[k];
			}
			pages[row - 1][j] = "PF";
			k++;
			pf++;
			console.log("pf=", pf);
		}
		else {
			ph++;
			k++;
			console.log("ph=", ph);
			pages[row - 1][j] = "PH";
		}
	}

	F[2]=pf; H[2]=ph;

	pf5 = pf
	txt = txt + "\n";
	console.log(txt);
	$('input[type="button"]').attr('disabled', 'disabled');
	document.getElementById("frames6").disabled = true;
	document.getElementById("rs6").disabled = true;

	console.log(m);
	crt_table(F,H);



	// creating chart

	$('input[type="button"]').attr('disabled', 'disabled');
	console.log(txt);

	var chart = new CanvasJS.Chart("chartContainer", {
		theme: "light2",
		width: 650,
		height: 350,

		title: {
			text: "GRAPHICAL REPRESENTATION",
			fontSize: "20"

		},
		axisX: {
			title: "Algorithms",
			gridThickness: 1,
			tickLength: 10
		},

		axisY: {
			title: "Page misses",
			gridThickness: 1,
			tickLength: 10
		},
		data: [
			{
				type: "column",
				dataPoints: [
					{ label: "FIFO", y: pf1 },
					{ label: "OPTIMAL", y: pf2 },
					{ label: "LRU", y: pf3 },
					{ label: "SECOND CHANCE", y: pf4 },
					{ label: "MRU", y: pf5 },

				]
			}
		]
	});
	chart.render();
	$("#chartContainer").append('<hr />');
	document.getElementById('bottom6').scrollIntoView();
}
function crt_table(flts,hits) {
	var $table = $("<table border='1'></table>");
	$table.addClass('table table-striped');
	$tbody = $("<tbody></tbody>");
	let line=$("<tr style='background-color:antiquewhite;  font-weight: 600;'></tr>");
	line.append('<td>'+ 'Algorithms'+'</td>');$tbody.append(line);
	line.append('<td>'+ 'Page misses'+'</td>');$tbody.append(line);
	line.append('<td>'+ 'Page Hits'+'</td>');$tbody.append(line);
	line.append('<td>'+ 'Fault Ratio(%)'+'</td>');
	$tbody.append(line);
	for (i = 0; i < 5; i++) {
		let line = $("<tr></tr>");
		let rat;
		 switch (i) {
			 case 0: line.append('<td>'+ 'FIFO'+'</td>');$tbody.append(line);
					  line.append($("<td></td>").html(flts[i] + ""));$tbody.append(line);
					  line.append($("<td></td>").html(hits[i] + ""));$tbody.append(line);
					  rat=(flts[i]*100/(flts[i]+hits[i])).toFixed(2);
					  line.append($("<td></td>").html(rat + ""));
					 $tbody.append(line);
				 break;
			 case 1: line.append('<td>'+ 'LRU'+'</td>');$tbody.append(line);
					  line.append($("<td></td>").html(flts[i] + ""));$tbody.append(line);
					  line.append($("<td></td>").html(hits[i] + ""));$tbody.append(line);
					  rat=(flts[i]*100/(flts[i]+hits[i])).toFixed(2);
					  line.append($("<td></td>").html(rat + ""));
					 $tbody.append(line);
				 break;
			 case 2: line.append('<td>'+ 'MRU'+'</td>');$tbody.append(line);
					  line.append($("<td></td>").html(flts[i] + ""));$tbody.append(line);
					  line.append($("<td></td>").html(hits[i] + ""));$tbody.append(line);
					  rat=(flts[i]*100/(flts[i]+hits[i])).toFixed(2);
					  line.append($("<td></td>").html(rat + ""));
					 $tbody.append(line);
				 break;
			 case 3: line.append('<td>'+ 'OPTIMAL'+'</td>');$tbody.append(line);
					  line.append($("<td></td>").html(flts[i] + ""));$tbody.append(line);
					  line.append($("<td></td>").html(hits[i] + ""));$tbody.append(line);
					  rat=(flts[i]*100/(flts[i]+hits[i])).toFixed(2);
					  line.append($("<td></td>").html(rat + ""));
					 $tbody.append(line);
				 break;
			 case 4: line.append('<td>'+ 'SEC. CHANCE'+'</td>');$tbody.append(line);
					  line.append($("<td></td>").html(flts[i] + ""));$tbody.append(line);
					  line.append($("<td></td>").html(hits[i] + ""));$tbody.append(line);
					  rat=(flts[i]*100/(flts[i]+hits[i])).toFixed(2);
					  line.append($("<td></td>").html(rat + ""));
					 $tbody.append(line);
				 break;

			 default:
				 break;
		 }

		}
		console.log(flts);
		console.log(hits);
		$table.append('<caption  style="caption-side:top; text-align:center"><font color = "black" size = "5px">' + "<b>COMPARISION OF ALGORITHMS</b>" + '</font>	</caption><br />');
		$table.append($tbody);
		$table.appendTo($("#div5"));
		$("#div5").append('<hr />');
}
