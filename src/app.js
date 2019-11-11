//
// app.js
//
//
// upg: setting to turn off sound fx
// adv: settings to pick sound fx from url.

import ElementClass from 'h2js-element'
import InputClass from 'h2js-input'

import EntryClass from './wigets/entry.js'

import SpacesClient from '@q9adam/spaces-client'

const uuidv4 = require('uuid/v4');

//import Unit from './libs/chat-app-plain-unit.js'
//import Unit from 'chat-app-encryption-unit'
import Unit from '../../chat-app-encryption-unit/main.js'

// https://ionicons.com/
const chatIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M425.9 170.4H204.3c-21 0-38.1 17.1-38.1 38.1v154.3c0 21 17.1 38 38.1 38h126.8c2.8 0 5.6 1.2 7.6 3.2l63 58.1c3.5 3.4 9.3 2 9.3-2.9v-50.6c0-6 3.8-7.9 9.8-7.9h1c21 0 42.1-16.9 42.1-38V208.5c.1-21.1-17-38.1-38-38.1z"/><path d="M174.4 145.9h177.4V80.6c0-18-14.6-32.6-32.6-32.6H80.6C62.6 48 48 62.6 48 80.6v165.2c0 18 14.6 32.6 32.6 32.6h61.1v-99.9c.1-18 14.7-32.6 32.7-32.6z"/></svg>`

const gearIconI = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416.3 256c0-21 13.1-38.9 31.7-46.1-4.9-20.5-13-39.7-23.7-57.1-6.4 2.8-13.2 4.3-20.1 4.3-12.6 0-25.2-4.8-34.9-14.4-14.9-14.9-18.2-36.8-10.2-55-17.3-10.7-36.6-18.8-57-23.7C295 82.5 277 95.7 256 95.7S217 82.5 209.9 64c-20.5 4.9-39.7 13-57.1 23.7 8.1 18.1 4.7 40.1-10.2 55-9.6 9.6-22.3 14.4-34.9 14.4-6.9 0-13.7-1.4-20.1-4.3C77 170.3 68.9 189.5 64 210c18.5 7.1 31.7 25 31.7 46.1 0 21-13.1 38.9-31.6 46.1 4.9 20.5 13 39.7 23.7 57.1 6.4-2.8 13.2-4.2 20-4.2 12.6 0 25.2 4.8 34.9 14.4 14.8 14.8 18.2 36.8 10.2 54.9 17.4 10.7 36.7 18.8 57.1 23.7 7.1-18.5 25-31.6 46-31.6s38.9 13.1 46 31.6c20.5-4.9 39.7-13 57.1-23.7-8-18.1-4.6-40 10.2-54.9 9.6-9.6 22.2-14.4 34.9-14.4 6.8 0 13.7 1.4 20 4.2 10.7-17.4 18.8-36.7 23.7-57.1-18.4-7.2-31.6-25.1-31.6-46.2zm-159.4 79.9c-44.3 0-80-35.9-80-80s35.7-80 80-80 80 35.9 80 80-35.7 80-80 80z"/></svg>`

class App extends ElementClass {
	constructor(){
		let name = 'app' // <-- change
		let C = `
			<style>

				.${name} {
					height: 100%;
					display: grid;
					grid-template-rows: auto 1fr auto auto;
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
				.${name} footer svg {height: 25px; width: 25px; fill: #555;}

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
					display: grid;
					grid-template-columns: 1fr auto;
					place-items: center;
					}

				.${name} .settings-button {cursor: pointer; padding-right: 5px;}

				.${name} footer .input {place-self: stretch;}

				.${name} .settings {
					height: 45px;
					overflow: hidden;
					transition: height 0.2s;
					align-items: center;
					}
				.${name} .settings.hidden {
					height: 0px;
					transition: height 0.35s;
					}
				.${name} .settings-content {
					display: grid;
					height: 100%;
					background: #333; color: eee;
					grid-template-columns: auto 1fr;
					height: 45px;
					box-sizing: border-box;
					padding: 5px;
					place-items: center;
					grid-column-gap: 7px;
					}

				.${name} .settings input {outline: none; border: none; width: 100%; padding: 3px; box-sizing: border-box; border-radius: 25px; background: #555; color: #eee; padding: 3px 15px 3px 15px; align-self: stretch;}

				.${name} .settings-content .tag {font-weight: bold;} 
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
				<div class='settings hidden'>
					<div class='settings-content'>
						<div class='tag'>ROOM ID</div> <input class='room-id-field' value='default room'></input>
					</div>
				</div>
				<footer>
					<div class='input'></div>
					<div class='icons'>
						<div class='settings-button'>${gearIconI}</div>
					</div>
				</footer>
			</div>
			`

		super(name,C)

		let unit = new Unit()
		
		let messages = {}
		let sc = false
		let space = false


		const rand = n=>{ //upg: crypto random crypto.randomBytes?
			return uuidv4()
			}

		let root = this.shadow.querySelector('.'+name)
		let scroller = root.querySelector('.content-container')
		let footer = root.querySelector('footer')
		let roomIDField = root.querySelector('.room-id-field')

		// ---
		if(!localStorage.bid || config.newUserEverySession){
			localStorage.bid = rand() 
			}
		let myBID = localStorage.bid

		// ---
		let reqSpace = location.hash.replace(/^#/,'').trim()
		if(reqSpace != ''){
			localStorage.space = reqSpace
			location.hash = ''//?
			}


		if(!localStorage.space){
			localStorage.space = config.spacesID
			}
		space = localStorage.space
		roomIDField.value = space
		document.title = 'Chat - '+space

		console.log({myBID})

		const setRoom = n=>{
			localStorage.space = n
			location.reload() // upd: make a cancel method from wait	
			}

		roomIDField.addEventListener('change',e=>{
			let {value} = roomIDField
			setRoom(value)	
			})

		let _blinkTitle = false
		const blinkTitle = (n,force)=>{
			if(!_blinkTitle){
				n.count = 0
				_blinkTitle = n
				}//if
			else
				if(!force)
					return

			let b = _blinkTitle
			let i = b.l[b.count]
			document.title = i
			b.count = (b.count+1)%b.l.length
			b.timeout = setTimeout(nn=>{
				blinkTitle(n,true)
				},
					1500)
			}//func

		const use = m=>{
			let {scrollTop,clientHeight,clientTop,scrollHeight} = scroller 
			let hh = scrollTop+clientHeight

			let readyScroll = (hh == scrollHeight)

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
				e.loaded.then(v=>{
				if(readyScroll)
					scroller.scroll({behavior:'smooth',top:scroller.scrollHeight})
					//console.log('loaded for',m)
					})
				
				let {hidden} = document
				console.log('is hidden',hidden)
				if(hidden){
					let ap = root.querySelector('.im-auto-player')
					if(ap){
						//play sound: upg .. use audio api?
						ap.play()
						}

					blinkTitle({l:[document.title,' 😃 '+document.title]})
					}
				}//if
			}//func

		// ----
		window.addEventListener("hashchange",e=>{
			let h = location.hash.replace(/^#/,'').trim()
			if(h != ''){
				setRoom(h)
				}
			});

		// ----
		root.querySelector('.settings-button').addEventListener('click',e=>{
			root.querySelector('.settings').classList.toggle('hidden')
			})

		// ----
		let i = new InputClass({autofocus: true})
		i.on('value',async v=>{
			
			let mid = uuidv4()
			let m = {mid,from:myBID,type:'message',value:v} //upg: bid/instanceid

			use(m)
			console.log('on A',m)
			let wm = await unit.wrap(JSON.stringify(m))
			console.log('on B',wm)
			let r = await sc.put(space,wm)

			//hook user interaction to add this.
			let ap = root.querySelector('.im-auto-player')
			if(!ap){
				let a = document.createElement('audio')
				a.onload = e=>{
					console.log('laded',e)
					}

				a.src = 'message.mp3'
				//a.autoplay = true
				a.classList.add('im-auto-player')
				root.appendChild(a)
				}//if
			})

		// ----
		footer.querySelector('.input').appendChild(i.element)

		// ----
		// start
		;(async n=>{

			sc = new SpacesClient(config.spacesBase)
			let {since} = await sc.about(space) //upg: selectable space name

			console.log('since',{since,space})

			unit._send = async e=>{
				let r = await sc.put(space,e)
				}

			// a few from history
			since = since - 15
			if(since < 0)
				since = 0 // or?

			sc.watch(l=>{
				//upg: use stepping queue?
				l.forEach(async n=>{
					console.log("A DATA",n)
					let wn = await unit.unwrap(n)
					console.log("B DATA",wn)
					if(wn !== false){ // some data might be internal messages?
						let m = JSON.parse(Buffer.from(wn).toString())
						use(m)
						}
					else
						console.log('skip',n)
					})
				},space,since)
			})();

		document.addEventListener("visibilitychange", e=>{
			let {hidden} = document
			//console.log('vischange',e,hidden)
			if(!hidden && _blinkTitle){
				clearTimeout(_blinkTitle.timeout)
				document.title = _blinkTitle.l[0]
				_blinkTitle = false
				}//if
			}, false);
	}//const
}//class

export default App
