//
// log-entry.js
//
import ElementClass from 'h2js-element'

//const linkify = require('linkifyjs')
//import * as linkify from 'linkifyjs';
//console.log(linkify)

// upg: try media outside of bubble.
//
// upg: focus events.. (animate title)

const linkifyHtml = require('linkifyjs/html')
const url = require('url')
const mime = require('mime')

class Element extends ElementClass {
	constructor(text,opts){ // type,name,etc
		text = text||''
		opts = opts||{
			guest:true,
			onload:n=>{}
			}

		//upg: test fix for long words ddddddddddddddddddddddddddddddddddddd (break them) or hide at max width.
		//upg: cleaner html/css design.  (use grid)

		let owner_color = '#4777ff'

		//upg: include #hashtag in urls
		const about = (value,type)=>{
			let u = false
			try{
			u = new URL(value)
			} catch(e){
				}
			let m = mime.getType(value)
			let [mime_type] = (m||'null/null').split('/')

			return {u,m,t: mime_type}
			}

		//upg: no href if div.
		//upg: nice4html first.
		let format = (value,type)=>{
			let {u,m,t} = about(value,type)
			let res = value
			if(t == 'image'){
				res = `<img src='${value}'>`
				}
			else
			if(t == 'audio'){
				res = `<audio controls src='${value}'></audio>`//</audio><br><a href='${value}'>${value}</a>`
				}
			else
			if(t == 'video'){
				res = `<video controls src='${value}'></video>`//</audio><br><a href='${value}'>${value}</a>`
				}
			else
			if(u && u.host == 'www.youtube.com'){ // upg: smarter
				//upg: full width and correct aspect ratio.
				//https://www.youtube.com/watch?v=vgLOv36an3s
				//`<iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="788.54" height="443" type="text/html" src="https://www.youtube.com/embed/DBXH9jJRaDk?autoplay=0&fs=1&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&origin=https://synchsys.com"></iframe>`
				//`<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/a_IA-8nQ4FY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
				let v = u.searchParams.get('v')
				res = `<iframe width="100%" src="https://www.youtube-nocookie.com/embed/${v}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
				console.log('YOUTUBR.',v)
				}

			return res
			}

		let tagName = (value,type)=>{
			//if is media etc.
			let {m,u,t} = about(value,type)
			//upg: link somehow with format (use a common control file in about? or?)
			if(t == 'video' || t == 'audio' || t == 'image' || u && u.host == 'www.youtube.com')
				return 'div'
			else
				return 'a'
			}



		let name = 'log-entry' // <-- change
		let C = `
			<style>
				.${name} {
					font-weight: bold;
					line-height: 1.2em;
					display: flex;
					}

				.${name}.owner {
					justify-content: flex-end;
					}


				.${name}.guest {
					justify-content: flex-start;
					}

				.${name} .contain {max-width: 100%;}
				
				.${name} .content {
					padding: 12px;
					padding-left: 25px;
					padding-right: 25px;
					border-radius: 1.5em;
					margin: 5px;
					word-break: break-word;
					box-sizing: content-box;
					max-width: 100%;
					}

				.${name}.guest .content {
					background: #ddd;
					color: #333;
					margin-right: 65px;
					margin-left: 15px;
					}

				.${name}.owner .content {
					background: ${owner_color};
					color: #eee;
					margin-left: 65px;
					margin-right: 15px;
					}

	
				.${name} img {background: #fff; max-width: 100%; max-height: 100%; border-radius: 3px;}

				.${name} video {max-width: 100%; max-height: 100%;}
				.${name} audio {max-width: 100%; max-height: 100%;}
				.${name} a {text-decoration: none; font-weight: 1000; color: unset;}

			</style>
			<div class='${name}'>
				<div class='contain'>
					<div class='content'></div>
				</div>
			</div>
			`

		//upg: better handle media maxes.
		super(name,C)

		//-----------------------

		//console.log(text,opts)
		

		this.loaded = new Promise((res,rej)=>{

			let d = this.shadow.querySelector('.'+name)
			let dc = d.querySelector('.content')

			//opts.guest = Math.random() > 0.5 // debug.
			d.classList.add(opts.guest?'guest':'owner')

			dc.textContent = text // note: security. upg: process urls
			dc.innerHTML = linkifyHtml(dc.textContent,{format,tagName})

			let i = dc.querySelector('img')
			if(i){
				i.onload = e=>{
					res(i)
					opts.onload(i)
					i.onload = null
					}
				}
			else
				res(true)

			
			})

	}//func
}//class

export default Element
