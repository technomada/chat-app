//
// app.js
//

import ShellElement from './libs/element-class.js'

class Element extends ShellElement {
	constructor(){
		let name = 'app' // <-- change
		let ns = name+'-class'
		let root = '.'+ns
		let C = `
			<style>
				${root} {}
			</style>
			<div class='${name}'>Hello!</div>
			`

		super(name,C)
	}
}

export default Element
