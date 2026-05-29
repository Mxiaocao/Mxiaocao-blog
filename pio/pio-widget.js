console.log('[Pio] start');
if(window.innerWidth<769){console.log('[Pio] skip mobile')}else{
var n=0;var t=setInterval(function(){n++;if(window.PioBundle&&PioBundle.Live2DModel&&typeof Live2DCubismCore!=='undefined'){clearInterval(t);init(PioBundle.Live2DModel,PioBundle.PIXI)}else if(n>80){clearInterval(t);console.error('[Pio] timeout')}},100)}
function init(Live2DModel,PIXI){
var c=document.createElement('div');c.id='pio';c.style.cssText='position:fixed;right:30px;bottom:0;width:280px;height:500px;z-index:52;pointer-events:none';document.body.appendChild(c);
var d=document.createElement('div');d.style.cssText='width:100%;height:100%;pointer-events:auto';c.appendChild(d);
var a=new PIXI.Application({width:280,height:500,backgroundAlpha:0,antialias:true,resolution:window.devicePixelRatio||2,autoDensity:true});d.appendChild(a.view);a.view.style.cssText='width:100%;height:100%;cursor:grab';
Live2DModel.from('/pio/UG/ugofficial.model3.json',{autoInteract:false}).then(function(m){a.stage.addChild(m);var s=Math.min(a.screen.width/m.width*0.85,a.screen.height/m.height*0.85);m.scale.set(s);m.x=a.screen.width/2;m.y=a.screen.height/2;m.anchor.set(0.5,0.5);m.autoInteract=true;
var dx=0,dy=0,sx=0,sy=0,cx=0,cy=0,moved=false,dragging=false;
a.view.addEventListener('pointerdown',function(e){dragging=true;moved=false;sx=e.clientX;sy=e.clientY;var r=c.getBoundingClientRect();cx=r.left;cy=r.top});
window.addEventListener('pointermove',function(e){if(!dragging)return;var mx=e.clientX-sx,my=e.clientY-sy;if(!moved&&Math.abs(mx)<5&&Math.abs(my)<5)return;moved=true;a.view.style.cursor='grabbing';c.style.right='auto';c.style.bottom='auto';c.style.left=(cx+mx)+'px';c.style.top=(cy+my)+'px'});
window.addEventListener('pointerup',function(){if(!dragging)return;dragging=false;a.view.style.cursor='grab'});
console.log('[Pio] ready')}).catch(function(e){console.error('[Pio] error:',e)})}
