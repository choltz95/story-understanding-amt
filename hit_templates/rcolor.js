!function(t,e){"object"==typeof exports?module.exports=e:"function"==typeof define&&define.amd?define(e):t.RColor=e()}(this,function(){var t=function(){this.hue=Math.random(),this.goldenRatio=.618033988749895,this.hexwidth=2};return t.prototype.hsvToRgb=function(t,e,o){var h=Math.floor(6*t),i=6*t-h,r=o*(1-e),n=o*(1-i*e),a=o*(1-(1-i)*e),s=255,f=255,u=255;switch(h){case 0:s=o,f=a,u=r;break;case 1:s=n,f=o,u=r;break;case 2:s=r,f=o,u=a;break;case 3:s=r,f=n,u=o;break;case 4:s=a,f=r,u=o;break;case 5:s=o,f=r,u=n}return[Math.floor(256*s),Math.floor(256*f),Math.floor(256*u)]},t.prototype.padHex=function(t){return t.length>this.hexwidth?t:Array(this.hexwidth-t.length+1).join("0")+t},t.prototype.get=function(t,e,o){this.hue+=this.goldenRatio,this.hue%=1,"number"!=typeof e&&(e=.5),"number"!=typeof o&&(o=.95);var h=this.hsvToRgb(this.hue,e,o);return t?"#"+this.padHex(h[0].toString(16))+this.padHex(h[1].toString(16))+this.padHex(h[2].toString(16)):h},t});