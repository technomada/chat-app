#!/usr/bin/env node
const program = require('commander')
const fs = require('fs-extra')
const path = require('path')
const webpack = require('webpack');
// https://www.npmjs.com/package/commander

program
  .command('init [template]')
  .description('setup local environment')
  //.option("-s, --setup_mode [mode]", "Which setup mode to use")
  .action(function(env, options){
    //var mode = options.setup_mode || "normal";
    env = env || 'all';
    //console.log('setup for %s env(s) with %s mode', env, mode);
  	//console.log({env,options})

	// upg: warn if existing build.
	// upg: unzip package file? run init.js from it?
	//fs.mkdirSync('app')
	//fs.writeFileSync('app/test.txt','hello.')
	 
	let from = __dirname+'/../templates/default'
	let to = './app'
	if(!fs.existsSync(to)){
		fs.copy(from+'/files',to).then(v=>{}) // upg: error control?
		let init = require(from+'/init.js')
		if(typeof(init) == 'function'){
			init({to:path.resolve(to)}) // upg pass {opts}
			}
		}//if
	else
	  	console.log(to,'exists')
  	});

program
	.command('build')
	.description('build application')
	.action(function(env,opts){
		console.log("BUILD!")

		const base = path.resolve('.')+'/app'
		const src = base+'/src'
		const dist = base+'/dist'
		const compiler = webpack({
  			entry: src+'/main.js',
  			output: {
    			filename: 'main.js',
    			//path: path.resolve(__dirname, 'dist')
  			path: dist
			},
			mode:'development' // upg: --dist (for distribution mode)
			});


		compiler.run((err, stats) => { // Stats Object
			if(err){ console.log(err)}
  			//console.log({err,stats})
			});

		fs.copy(src+'/index.html',dist+'/index.html')
		})


program.parse(process.argv)
