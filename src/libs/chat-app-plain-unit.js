//
// plain interface unit
//

const Unit = function(){
	//this._use = e=>{} // unwrap covers this.
	this._send = e=>{} // override this.

	//upg: could simply hook thru this and use this as the ondata and broadcast.

	this.wrap = e=>new Promise((res,rej)=>{
		res(e)
		})
	this.unwrap = e=>new Promise((res,rej)=>{
		res(e)
		})
}

export default Unit
