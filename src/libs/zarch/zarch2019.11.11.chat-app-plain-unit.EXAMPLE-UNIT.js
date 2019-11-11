//
// plain interface unit
//

const Unit = function(){
	this._send = e=>{} // override this
	this._recv = e=>{ // call this
		this.ondata(e)
		}

	this.broadcast = e=>new Promise((res,rej)=>{
		this._send(e)
		})
	this.ondata = e=>{}
}

export default Unit
