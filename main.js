import Vue from 'vue'
import App from './App'
import CryptoJS from './static/crypto-js/crypto-js.js'



Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()

Vue.prototype.config=function(){
	return {
		UIDLength:12,
		PWLength:8
	}
};
Vue.prototype.createSerialNumber=function(length){
	let a="";
	do {a+=Math.floor(Math.random()*10)}while(length!=a.length)
	return a;
}
Vue.prototype.getUID=function(){
	 let value = uni.getStorageSync("UID");
	 if(value)return value;
	 else return Vue.prototype.refreshUID();	
}
Vue.prototype.refreshUID=function(){
	let UID=Vue.prototype.createSerialNumber(Vue.prototype.config().UIDLength);
	uni.setStorageSync("UID",UID);
	return UID;
				
}
Vue.prototype.getDynamicPassword=function(length,ori){
	let timestamp=parseInt(new Date().getTime()/1000/60)
	timestamp=timestamp&0xffffffff;
	let ol=CryptoJS.enc.Utf8.parse(ori+""+timestamp)
	let sha256=CryptoJS.SHA256(ol)
	let b1=[];
	for(let i=0,j=0;i<sha256.words.length;i++){
		let word=sha256.words[i];
		let l0=word&0xff;
		let l1=(word>>8)&0xff;
		let l2=(word>>16)&0xff;
		let l3=(word>>24)&0xff;
		b1.push(l3)
		b1.push(l2)
		b1.push(l1)
		b1.push(l0)
	}
	sha256=b1;
	var re=	[];
	do {re.push(0)}while(length!=re.length)
	for(let i=0,j=0;i<sha256.length;i++,j++) {
		re[j]= (i%2==0?re[j]|sha256[i]:re[j]&sha256[i]);
		if(j==length-1)j=0;
	}
	var s="";
	for(var i=0;i<length;i++) {
		if(re[i]<0||re[i]>9) {
			re[i]= (re[i]&0x07);
		}
		s+=re[i];
	}
	return s;
}