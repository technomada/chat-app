//
// app.js
//

import ShellElement from './libs/element-class.js'

import Chat from './wigets/chat.js'

import Config from './config.js'

class Element extends ShellElement {
	constructor(){

		///////////////////////////////
		let name = 'app' // <-- change
		let C = `
			<style>
				.${name} {
					height: 100%;
					display: grid;
					background: #456fe6;
					}

				.${name} .chat {display: grid; background: #ffffff; height: 100vh; place-items: stretch; overflow: hidden;}


				@media (min-width: 850px) {

						.${name} .chat {
							width: 500px;
							margin: auto;
							}
						}
			</style>
			<div class='${name}'>
				<div class='chat'></div>
			</div>
			`

		;(async ()=>{
			super(name,C)

			// -
			const response = await fetch('config.json'); //upg: if ok?
			const conf = await response.json()
			Config.spaces = conf.spaces

			let t = this.shadow.querySelector('.chat')

			let c = new Chat()
			t.appendChild(c.element)
			})();
	}//func
}//class

export default Element
