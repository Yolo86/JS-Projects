const duration = document.querySelector('#watch')
const startB = document.querySelector('#start')
const pauseB = document.querySelector('#pause')


const hi = document.querySelector('#circle')
let wtf = hi.getAttribute('stroke-dashoffset')

const peri = 2*(Math.PI)*180;

const timer = new Timer(duration,startB,pauseB,{ onTick(time) {
    let oneSec = peri/time;
    let oneTick = oneSec/50;
    hi.setAttribute('stroke-dashoffset',wtf-oneTick)
    wtf-=oneTick

},
onComplete() {
    hi.setAttribute('stroke-dashoffset',0)
    wtf=0
}
});