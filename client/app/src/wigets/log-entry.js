//
// log-entry.js
//
import ShellElement from '../libs/element-class.js'

class Element extends ShellElement {
	constructor(text,opts){ // type,name,etc
		text = text||''
		opts = opts||{guest:true}

		//upg: fix long words ddddddddddddddddddddddddddddddddddddd (break them) or hide at max width.

		let owner_color = '#4777ff'

		let name = 'log-entry' // <-- change
		let C = `
			<style>
				.${name} {
					display: grid;
					grid-template-columns: auto;
					font-weight: bold;
					line-height: 1.2em;
					}

				.${name}.owner {
					justify-items: end;
					}


				.${name}.guest {
					justify-items: start;
					}

				.${name} .content {padding: 12px;
					padding-left: 25px;
					padding-right: 25px;
					border-radius: 1.5em;
					margin: 5px;
					xoverflow-wrap: break-word;
					}
				.${name}.guest .content {
					background: #eee;
					margin-right: 65px;
					margin-left: 15px;
					}

				.${name}.owner .content {
					background: ${owner_color};
					color: #eee;
					margin-left: 65px;
					margin-right: 15px;
					}

			</style>
			<div class='${name}'>
				<div class='content'></div>
			</div>
			`

		super(name,C)

		//-----------------------

		//console.log(text,opts)

		let d = this.shadow.querySelector('.'+name)
		let dc = d.querySelector('.content')

		dc.textContent = text // note: security. upg: process urls
		
		//opts.guest = Math.random() > 0.5 // debug.
		d.classList.add(opts.guest?'guest':'owner')

	}//func
}//class

export default Element
