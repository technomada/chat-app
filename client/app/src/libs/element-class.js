//
// element-class v(2019.07.21)
//

const randStr = n=>Math.random().toString(36).substring(7);

class ElementClass { 
	constructor(a,b) {

	let _this = this
	// new ShellElement('flower','hello') //str,str = name, innerhtml
	// new ShellElement('hello') //str = content
	// new ShellElement('flower',false) // str,false == name
	// new ShellElement({name;'sdf',innerHTML:'',textContent:{})

	//upg: make a shadow dom in the shadow dom for host content.
	// 	(so we can make a border standard for this etc.)
	
	var opts

	if(!a){
		opts = {}
		}
	else{
		if(typeof(a) == 'string'){
			if(typeof(b) == 'string'){
				opts = {
					name:a,
					innerHTML : b
					}
				}
			else {
				if(typeof(b) == 'undefined')
					opts = {
						innerHTML : a
						}
				else
					opts = {
						name: a
						}
				}
			}
		else
			opts = a
		}//else

	var name = (opts.name || 'shell').toLowerCase() // upg: replace so only alphanumirc etc.. make tagnamesafe tool

	// ================
	var ID = 'xshell-'+name+'-'+ randStr()// upg: better random
	var shadow

	class XDom extends HTMLElement {
	  constructor() {
	    // Always call super first in constructor
	    super();

	    // write element functionality in here
		shadow = this.attachShadow({mode:'open'})

	  	}

	  connectedCallback() {
		  //myEmitter.emit('connected')
		  //console.log('CONNECTED',_this)
		  _this.connected()
	  	}

	  disconnectedCallback() {
		  //myEmitter.emit('disconnected')
		  //console.log('DISCONNECCTED',_this)
		 _this.disconnected()
		}
		}//XDom
	 
	customElements.define(ID, XDom);

	var element = new XDom()

	if(opts.innerHTML)
		shadow.innerHTML =  opts.innerHTML
	
	if(opts.textcontent)
		shadow.textContent = opts.textContent || ''


	///////////////////////////  
	//this.name = name;
	//this.element = new ShellElement(name,c)
	//on(){}
	//emit(){}

	//upg: make a this._ namespace for these? (if needed?)
	this.name = name
	this.element = element
	this.shadow = shadow
	this.tag = ID // or can use this.element.tagName

	}//constructor
  
   connected() {
	   //console.log("method: connected")
		}
	
   disconnected() {
	   //console.log("method: disconnected")
		}
}//Class

export default ElementClass
