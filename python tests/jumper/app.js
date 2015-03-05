function Task(name) {
	this.name = name;
	this.next = [];
	this.prev = [];

	this.draw = function(level, numLevels, numInLevel){
		var c = document.getElementById("gameCanvas");
		var w = c.width;
		var h = c.height/2;
		var xstride = w/numLevels;
		var ystride = w/numInLevel;
		var ctx = c.getContext("2d");
		ctx.fillStyle = "#FF0000";
		// CHANGE
		if(true){
			   ctx.beginPath();
			   ctx.moveTo(xstride*(level-1),h);
    		   ctx.lineTo(xstride*level,h);
    		   ctx.closePath();
    		   ctx.stroke();
		}
		ctx.fillRect(xstride*level, h-(xstride/2), xstride, xstride);		
	}
	this.addNext = function(next){
		this.next = next;
	}
	this.addPrev = function(prev){
		this.prev = prev;
	}
}

function Workflow(tasks) {
	this.tasks = tasks;

	this.drawWorkflow = function(task, level, numLevels, numInLevel){
		task.draw(level, numLevels, numInLevel);
		var l = task.next.length;
		for (var i = 0; i < l; i++){
			this.drawWorkflow(task.next[i], level + 2, numLevels, l);
		}
		this.tasks[i].draw();
	}
}

function getMaxDepth(task){
		if(task.next.length == 0){
			alert(task.name);
			return 1;
		}	
		else{
			max = 0;
			for (var t in task.next){
				d = getMaxDepth(t)
				if (d > max){
					max = d;					
				}

			}
			return 1 + max;
		}
}

function drawShit(){
	var A = new Task("TaskA");
	var B = new Task("TaskB");
	var C = new Task("TaskC");
	A.addNext([B]);
	B.addNext([C]);
	B.addPrev([A]);
	C.addPrev([B]);
	var w = new Workflow([A, B, C]);
	w.drawWorkflow(A, 1, 7);
	alert(getMaxDepth(A));
}

drawShit();

