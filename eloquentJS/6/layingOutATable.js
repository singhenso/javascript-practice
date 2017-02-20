//returns an array of heights
function rowHeights(rows){
	return rows.map(function(row){ //wrapped in map to apply to all rows in rows array
		return row.reduce(function(max, cell){
			return Math.max(max, cell.minHeight()); //compute maximum height of each cell in array
			//max is the returned value from the previous round of reduction
			//max is the "accumulation" parameter
			//finds largest height in array
		});
	});
}

//returns an array of widths
function colWidths(rows){
	return rows[0].map(function(_, i){ //only use second parameter, i, which is the index of the current element
		return rows.reduce(function(max, row){
			return Math.max(max, rows[i].minWidth);
		});
	});
}

function drawTable(rows){
	var heights = rowHeights(rows);
	var widths = colWidths(rows);

	function drawLine(blocks, lineNo){
		return blocks.map(function(block){
			return block[lineNo];
		}).join(' ');
	}

	function drawRow(row, rowNum){
		var blocks = row.map(function(cell, colNum){
			return cell.draw(widths[colNum], heights[rowNum]);
		});
		return blocks[0].map(function(_, lineNo){
			return drawLine(blocks, lineNo);
		}).join('\n');
	}

	return rows.map(drawRow).join('\n');
}

function repeat(string, times) {
    var result = "";

    for (var i = 0; i < times; i++)
      	result += string;
    	return result;
  	}

  function TextCell(text) {
    this.text = text.split("\n");
  }

  TextCell.prototype.minWidth = function() {
    return this.text.reduce(function(width, line) {
      return Math.max(width, line.length);
    }, 0);
};

TextCell.prototype.minHeight = function() {
	return this.text.length;
};

TextCell.prototype.draw = function(width, height) {
var result = [];
for (var i = 0; i < height; i++) {
  var line = this.text[i] || "";
  result.push(line + repeat(" ", width - line.length));
}
return result;
};

/*underlined cell constructor and prototypes*/

function UnderlinedCell(inner) {
this.inner = inner;
}

UnderlinedCell.prototype.minWidth = function() {
return this.inner.minWidth();
};

UnderlinedCell.prototype.minHeight = function() {
return this.inner.minHeight() + 1;
};

UnderlinedCell.prototype.draw = function(width, height) {
return this.inner.draw(width, height - 1).concat([repeat("-", width)]);
};

/*repeat function for TextCell draw method */
function repeat(string, times){
	var result = "";
	for(var i = 0; i < times; i++){
		result += string;
	}
	return result;
}

/*Text cell constructor and prototype*/
function TextCell(text){
	this.text = text.split("\n");
}

TextCell.prototype.minWidth = function(){
	return this.text.reduce(function(width, line){
		return Math.max(width, line.length); 
	}, 0);
}

TextCell.prototype.minHeight = function() {
	return this.text.length; //returns amount of lines in one text cell, indicated by newline characters
};

TextCell.prototype.draw = function(width, height){
	var result = [];
	for(var i = 0; i < height; i++){
		var line = this.text[i] || "";
		result.push(line + repeat(" ", width - line.length));
	}
	return result;
}

/*Checkerboard example*/

var rows = []
for(var i = 0; i < 5; i++){
	var row [];
	for (var j = 0; j < 5; j++){
		if ((j+1)%2 === 0){
			row.push(new TextCell("##"))
		}
		else{
			row.push(new TextCell("  "))
		}
	}
	rows.push(row);
}



function dataTable(data) {
    var keys = Object.keys(data[0]); //get keys of our objects in our array, assuming first element has same keys as all the others

    var headers = keys.map(function(name) {
      return new UnderlinedCell(new TextCell(name));
    }); //use map method to change each name in key to be a new text cell object that is underlined

    var body = data.map(function(row) {
      return keys.map(function(name) {
        var value = row[name];
        if (typeof value == "number")
          return new RTextCell(String(value));
        else
          return new TextCell(String(value));
      });
    });
    return [headers].concat(body);
 }

function RTextCell(text) {
TextCell.call(this, text);
}

RTextCell.prototype = Object.create(TextCell.prototype);

RTextCell.prototype.draw = function(width, height) {
var result = [];
for (var i = 0; i < height; i++) {
  var line = this.text[i] || "";
  result.push(repeat(" ", width - line.length) + line);
}
return result;
};

