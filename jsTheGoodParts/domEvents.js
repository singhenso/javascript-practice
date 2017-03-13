/*
	W3C: node.addEventListener(type, f, false); //false means bubble up phase
	Microsoft: node.attachEvent("on" + type, f);

	Bubbling means that the event is given to the target, and then its parent,
	and then its parent, and so on until the event is canceled
*/