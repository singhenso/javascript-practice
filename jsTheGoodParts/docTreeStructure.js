/*
	<html></html> node --> documentElement (serves as the root node)
	<body></body> node --> document.body
	root node --> document

	These are all read only. You have to use the DOM API to edit this tree.
	
	You can think of the document as a binary tree.
*/

function Node(){
	this.nodeType = null //numeric code that identifies type of node
	this.firstChild = null; //has the value null for nodes without children
	this.previousSibling = null; //for a first child, previousSibling will be null
	this.nextSibling = null; //for last child, next sibling will be null
	this.parentNode = null;
	this.lastChild = null; //has the value null for nodes without children
	this.childNodes = [];
	this.className = someClassName;
	this.innerText = null;
	this.id = null;
	this.nodeType = null;
	this.nodeType = null;
	this.textContent = null;
}

//Use recursion to walk the DOM depth first search

function walkTheDOM(node, func){
	func(node);
	node = node.firstChild;
	while(node){
		walkTheDOM(node, func);
		node = node.nextSibling;
	}
}

//get ELement by Class Name

function getElementsByClassName(className){
	var results = [];

	walkTheDom(document.body, function(node){
		var a, c = node.className, i;

		if (c){
			a = c.split(' ');
			for(i = 0; i < a.length; i += 1){
				if(a[i] === className){
					results.push(node);
					break;
				}
			}
		}
	});
	return results;
}

//======================Retrieving Nodes=============================================


/*
	In order of speed
*/

document.getElementsById(id); 

document.getElementsByTagName(tagName);

document.getElementsByClassName(className);

document.getElementByName(name);

document.querySelector(selectors); //DFS of CSS selectors seperated by commas, first element is returned

document.querySelectorAll(selectors) //nodeList is returned

//======================Manipulating Elements========================================

node.property = expression; //expression is whatever you want

if(my_node.getAttribute('complete')){
	my_node.setAttribute('src', superurl);
}

//=====================Styling Elements==============================================

node.style.styleName = 'newThingIwant';

node.style.color = 'bla';
node.style.marginTop = 'bla';
node.style.paddingBottom = 'bla';

document.defaultView().getComputedStyle(node, "").getPropertyValue(stylename);

//======================== Creating Elements ========================================

document.createElement(tagName);

document.createTextNode(text);

node.cloneNode()

node.cloneNode(true) //clone all an elements descendents too

//============================= Linking elements ====================================

node.appendChild(child)

node.insertBefore(new, sibling);

node.replaceChild(new, old); --> old.parentNode.replaceChild(new, old);

//============================== Removing Elements ==================================

node.removeChild(old); //won't work if node has an event handler

//==================================== InnerHTML ====================================

/*
	innerHTML is faster than building/cloning/appending/ elements to the Doc but it is a security risk

	If a user inputs a script tag, they can inject it through innerHTML into the site, but in HTML5,
	browsers never execute scripts that are inserted using innerHTML
*/

var content = node.innerHTML;

otherElement.innerHTML = content;
