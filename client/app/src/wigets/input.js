//
// input.js
//
const ee = require('event-emitter')

import ShellElement from '../libs/element-class.js'

class Element extends ShellElement {
	constructor(opts){
		opts = opts||{}
		let name = 'input' // <-- change
		let C = `
			<style>
				.${name} {
					display: grid;
					grid-template-rows: auto 1fr auto;
					height: 100%;
					}
				.${name} textarea {width: 100%; outline: none; border: none; resize:none; background: none; xborder-top: solid 1px #333; color: #eee; font: normal 16px arial; margin-top 3px; padding-top: 3px;
			color: #777;}

			</style>
			<div class='${name}'>
				<textarea ${opts.autofocus?'autofocus':''} placeholder='tap to edit'></textarea>
			</div>
			`

		super(name,C)

		let t = this.shadow.querySelector('textarea')

		t.onkeypress = e=>{
			let {key,code,which} = e
			let c = e.char

			if(!key && which == 13) //hack for other systems.
				key = 'Enter'

			if(key == 'Enter'){
				let {value} =  t
				if(value.trim() != ''){
					this.emit('value',value)
					}
				t.value = ''
				e.preventDefault()
				}//if
			}//func
	}//func
}//class

ee(Element.prototype) // eventize element.

export default Element
