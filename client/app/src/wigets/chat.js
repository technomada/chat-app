//
// chat.js
//

import ShellElement from '../libs/element-class.js'
import Icons from '../libs/icons.js'

import Config from '../config.js'

const uuidv4 = require('uuid/v4');

import Input from './input.js'
import LogEntry from './log-entry.js'


const SpacesClient = require('../libs/spaces-client.js')  // upg: global api abstract.

//upg: browser id sessionvars


class Element extends ShellElement {
	constructor(){

		// static browser id  -- upg: manage option changing profile per browswer session.
		if(!localStorage.myID){
			localStorage.myID = uuidv4()
			}
		let myID = localStorage.myID

		let messages = {}
		let sc = false

		const start = async ()=>{
			//fix: started flag/system
			let {space} = this

			sc = new SpacesClient(Config.spaces) //upg: api.config.
			var {since} = await sc.about(space) //upg: selectable space name

			console.log('since',space,since)

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
			}//func

		const use = m=>{
			let {src,mid,value,type} = m
			if(type && type == 'message' && !messages[mid]){
				let e = new LogEntry(value,{guest:src!=myID})
				l.appendChild(e.element)
				l.scroll({behavior:'smooth',top:99999})

				messages[mid] = {
					org: m,
					utime: Date.now()
					}

				// upg: delete old messages
				// upg: sync old messages
				}
			}//func

		let name = 'chat-widget' // <-- change
		let C = `
			<style>
				.${name} {height: 100vh;}
				.${name} header {display: grid; place-items: center; background: #eee; padding: 15px;}
				.${name} header > * {display: grid; place-items: center; grid-template-columns: auto auto; font-weight: bold;}
				.${name} header svg {width: 25px; height: 25px; margin-left: 5px;}

				.${name} {
					display: grid;
					grid-template-rows: auto 1fr auto;
					}


				.${name} .log {
					display: grid;
					grid-template-rows: 1fr;
					align-items: end;
					overflow-y: scroll;
					}

				.${name} .log > * {
					padding-bottom: 10px;
					}

				.${name} .input {padding-top: 2px; border-top: solid 1px #ccc; min-height: 3.5em; padding: 5px; box-sizing: border-box;}

				.${name} header .a {color: #4e4e5f;}
				.${name} header .b {color: #1d78d6;}
			</style>
			<div class='${name}'>
				<header><div><div><span class='a'>Up</span><span class='b'>Chat</span></div> ${Icons.message_square}</div></header>
				<div class='log'></div>
				<div class='input'></div>
			</div>
			`

		super(name,C)


		this.space = 'chat-app-demo'


		let l = this.shadow.querySelector('.log')
		
		// -----
		let i = new Input({autofocus: true})
		this.shadow.querySelector('.input').appendChild(i.element)

		i.on('value',async value=>{
			

			let mid = uuidv4()
			let m = {mid,src:myID,type:'message',value} //upg: bid/instanceid
			use(m)
			var r = await sc.put(this.space,JSON.stringify(m))


			use(m)

			})

		start()

		// -----
	}//func
}//class

export default Element
