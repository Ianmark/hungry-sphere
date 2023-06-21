alertFunc = (mainText,btnColour,bgColour,mainTextColour,func) => {
	let body = document.body;
	let container = document.createElement("div");
	let p = document.createElement("p");
	let text = document.createTextNode(mainText);
	let btn = document.createElement("button");
	let bText = document.createTextNode("OK");
	let cs = container.style;
	let bs = btn.style;
	let ps = p.style;
	let html = document.documentElement.style
	p.appendChild(text);
	container.prepend(p);
	btn.appendChild(bText);
	container.append(btn);
	body.appendChild(container);
	body.position = "relative";
	cs.position = "absolute";
	cs.top = "50%";
	cs.left = "50%";
	cs.transform = "translate(-50%, -50%)"
	cs.display = "grid";
	cs.gridTemplateRows = "70% 30%";
	cs.gap = "2%";
	cs.gridTemplateColumn = "auto"
	cs.justifyContent = "center";
	cs.backgroundColor = bgColour;
	cs.width = "70%";
	cs.height = "20%";
	cs.padding = "5px";
	ps.fontStyle = "arial";
	ps.fontSize = "30px";
	ps.color = mainTextColour;
	ps.margin = "0"
	bs.backgroundColor = btnColour;
	bs.width = "70%";
	bs.height = "60%";
	bs.margin = "auto"
	bs.textAlign = "center"
	bs.fontFamily = "Verdana,Arial,sans-serif"
	bs.border = "none";
	bs.fontWeight = "700";
	//funct = func + "()"
	//console.log(func)
	btn.onclick = e =>{
 		func();
 		cs.display = "none";
	}
}
/*
start = () => {
alert("it worked")
}
alertFunc("text","#345678","#345675","#667879",start)
*/