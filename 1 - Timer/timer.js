class Timer {
    constructor(duration,startB,pauseB,callbacks){
        this.startB = startB
        this.duration = duration
        this.pauseB = pauseB
        
        if(callbacks){
            this.onTick = callbacks.onTick
            this.onComplete = callbacks.onComplete
        }
        this.s=0
        this.i = this.duration.value
        this.yo = this.duration.value 
        this.startB.addEventListener('click', this.start)
        this.pauseB.addEventListener('click', this.pause)

    }

    start = ()=>{   
        
        if(this.s===0){
            if(this.pause != this.duration.value){
                this.i = this.duration.value
                this.onComplete()
            }

        this.timerID = setInterval(this.tick,20)
        this.s=1
        
        }
    }

    pause = ()=>{
        this.s=0
        this.pause=this.duration.value
        clearInterval(this.timerID)
    }

    tick = ()=>{
        
        if(this.onTick)
        this.onTick(this.i)

        if(this.duration.value>20)
            hi.setAttribute('stroke','green')
        
        if(this.duration.value>0){       
            this.duration.value = parseFloat(this.duration.value - 0.02).toFixed(2)  
        if(this.duration.value>10 && this.duration.value<20)
            hi.setAttribute('stroke','yellow')
        if(this.duration.value<10)
            hi.setAttribute('stroke','red')
    }    
        
        else
        this.complete()
    }

    complete = ()=>{
        this.s=0
        clearInterval(this.timerID)
    }


}