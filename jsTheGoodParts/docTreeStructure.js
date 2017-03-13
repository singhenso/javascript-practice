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
	this.parent = null;
	this.lastChild = null; //has the value null for nodes without children
	this.childNodes = [];
	this.className = someClassName;
	this.innerHTML = null;
	this.id = null;
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

document.getElementsById(id);

document.getElementsByName(name);

node.getElementsByTagName(tagName);

element = document.querySelector(selectors); //DFS of CSS selectors seperated by commas, first element is returned

elementList = document.querySelectorAll(selectors) //nodeList is returned

//======================Manipulating Elements========================================

node.property = expression; //expression is whatever you want

if(my_thing.getAttribute('complet')){
	my_thing.setAttribute('src', superurl);
}

//=====================Styling Elements==============================================

node.className

node.style.stylename

node.style.color = 'bla';
node.style.marginTop = 'bla';
node.style.paddingBottom = 'bla';

document.defaultView().getComputedStyle(node, "").getPropertyValue(stylename);

//==========Creating Elements (not available until you paste into the tree)=========

var child = document.createElement(tagName);

document.createTextNode(text);

node.cloneNode()

node.cloneNode(true) //clone all an elements descendents too

//======================Linking elements (pasting into tree)=========================

node.appendChild(child)

node.insertBefore(new, sibling);

node.replaceChild(new, old);

old.parentNode.replaceChild(new, old);

//===============================Removing Elements===================================

node.removeChild(old); //won't work if node has an event handler

//=====================================InnerHTML=====================================

/*
	innerHTML is faster than building/cloning/appending/ elements to the Doc but it is a security risk
*/

var content = node.innerHTML;

otherElement.innerHTML = content;
