//
// app.js
//

import ElementClass from 'h2js-element'
import InputClass from 'h2js-input'

import EntryClass from './wigets/entry.js'

import SpacesClient from '@q9adam/spaces-client'

const uuidv4 = require('uuid/v4');

// https://ionicons.com/
const chatIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M425.9 170.4H204.3c-21 0-38.1 17.1-38.1 38.1v154.3c0 21 17.1 38 38.1 38h126.8c2.8 0 5.6 1.2 7.6 3.2l63 58.1c3.5 3.4 9.3 2 9.3-2.9v-50.6c0-6 3.8-7.9 9.8-7.9h1c21 0 42.1-16.9 42.1-38V208.5c.1-21.1-17-38.1-38-38.1z"/><path d="M174.4 145.9h177.4V80.6c0-18-14.6-32.6-32.6-32.6H80.6C62.6 48 48 62.6 48 80.6v165.2c0 18 14.6 32.6 32.6 32.6h61.1v-99.9c.1-18 14.7-32.6 32.7-32.6z"/></svg>`

class App extends ElementClass {
	constructor(){
		let name = 'app' // <-- change
		let C = `
			<style>

				.${name} {
					height: 100%;
					display: grid;
					grid-template-rows: auto 1fr auto;
					overflow: hidden;
					background: white;
					}

				.${name} header {
					display: grid;
					place-content: center;
					background: #dfdfea;
					height: 45px;
					}

				.${name} header svg {height: 25px; width: 25px; fill: #555;}

				.${name} header > div > span:nth-child(2) {color: #333;}
				.${name} header > div > span:nth-child(3) {color: blue;}

				.${name} main {position: relative;}
				.${name} main .content-container {
					position: absolute;
					top:0;right:0;left:0;bottom:0;
					overflow-y: scroll;
					display: flex;
					flex-direction: column-reverse;
					}

				.${name} footer {
					border-top: solid 1px #cfcfd6;
					}

				@media (min-width: 850px) {

						.${name} {
							width: 500px;
							margin: auto;
							}
						}

			</style>
			<div class='${name}'>
				<header>
					<div>
					${chatIcon}
					<span>up</span><span>CHAT</span>
					</div>
				</header>
				<main>
					<div class='content-container'>
						<div class='content'></div>
					</div>
				</main>
				<footer></footer>
			</div>
			`

		super(name,C)
		
		let messages = {}

		const rand = n=>{ //upg: crypto random crypto.randomBytes?
			return uuidv4()
			}

		let root = this.shadow.querySelector('.'+name)

		if(!localStorage.bid){
			localStorage.bid = rand() 
			}
		let myBID = localStorage.bid

		console.log({myBID})

		const use = m=>{
			//var r = await sc.put(this.space,JSON.stringify(m))

			console.log('use',m)

			//let d = new EntryClass(n.value,{guest:n.from != myBID})
			//appendChild(d.element)


			let {from,mid,value,type} = m
			if(type && type == 'message' && !messages[mid]){
				let e = new EntryClass(value,{guest:from!=myBID})
				root.querySelector('.content').appendChild(e.element)
				messages[mid] = {
					org: m,
					utime: Date.now()
					}

				// upg: delete old messages
				// upg: sync old messages
				}
			}

		// ----
		let i = new InputClass({autofocus: true})
		i.on('value',async v=>{
			
			let mid = uuidv4()
			let m = {mid,from:myBID,type:'message',value:v} //upg: bid/instanceid

			use(m)
			let r = await sc.put(space,JSON.stringify(m))
			})

		// ----
		root.querySelector('footer').appendChild(i.element)

		let sc = false
		let space = false
		// ----
		// start
		;(async n=>{
			space = config.spacesID

			sc = new SpacesClient(config.spacesBase)
			let {since} = await sc.about(space) //upg: selectable space name

			console.log('since',{since,space})

			// a few from history
			since = since - 15
			if(since < 0)
				since = 0 // or?

			sc.watch(l=>{
				l.forEach(n=>{
					let m = JSON.parse(n)
					use(m)
					})
				},space,since)
			})();

	}//const
}//class

export default App
