const {World, Engine, Runner, Render, Bodies, Body, Events} = Matter;

const runGame = () =>{


const width = window.innerWidth - 10
const height = window.innerHeight - 3
const nW = Math.floor((width/height)*15)
const nH = 15

const engine = Engine.create()
const {world} = engine;

const render = Render.create({
    element : document.body,
    engine,
    options : {
        wireframes: false,
        width,
        height
    }
});

Render.run(render)
Runner.run(Runner.create(),engine)

engine.world.gravity.y=0;



const shuffle = (arr) => {
    let len = arr.length;
    let idx = 0;
        while (len) {
            idx = Math.floor (Math.random () * len);
                
            len--;
            [arr [len], arr [idx]] = [arr [idx], arr [len]];
        }
    return arr
}



const grid = Array(nH).fill(null).map(() => Array(nW).fill(false))
const verticals = Array(nH).fill(null).map(() => Array(nW-1).fill(false))
const horizontals = Array(nH-1).fill(null).map(() => Array(nW).fill(false))

// console.log(verticals,horizontals)

function recurseFunction  (row,column)  {
    if(grid[row][column])
    return;

    grid[row][column] = true;

    const neighbours = shuffle([
        [row-1,column,'up'],
        [row+1,column,'down'],
        [row,column-1,'left'],
        [row,column+1,'right']
    ])
    
    for(let neighbour of neighbours){
        const [nRow, nColumn, direction] = neighbour;

        if(nRow<0 || nRow>=nH || nColumn<0 || nColumn>=nW)
        continue;

        if(grid[nRow][nColumn])
        continue;

        if(direction==='left')
        verticals[row][column-1] = true;
        if(direction==='right')
        verticals[row][column] = true;
        if(direction==='up')
        horizontals[row-1][column] = true;
        if(direction==='down')
        horizontals[row][column] = true;

        recurseFunction(nRow,nColumn)
    }
    
    return;
    
}
recurseFunction(Math.floor(Math.random() * nH),Math.floor(Math.random() * nW))
// console.log(verticals,horizontals)

const walls = [
    Bodies.rectangle(width/2,0,width,3,{isStatic: true, render:{fillStyle:'purple'}}),
    Bodies.rectangle(width/2,height,width,3,{isStatic: true, render:{fillStyle:'purple'}}),
    Bodies.rectangle(0,height/2,3,height,{isStatic: true, render:{fillStyle:'purple'}}),
    Bodies.rectangle(width,height/2,3,height,{isStatic: true, render:{fillStyle:'purple'}})
];

World.add(world,walls);
let unitH = height/nH
let unitW = width/nW

verticals.forEach((row,ridx) => {
    row.forEach((col,cidx) => {
        if(col)
        return;
        
        let boundary = Bodies.rectangle(unitW + unitW*cidx,unitH/2 + unitH*ridx,3,unitH,{isStatic:true, 
                                                            label: 'wall', 
                                                            render:{fillStyle: 'purple'}})
        World.add(world,boundary)
    })
});

horizontals.forEach((row,ridx) => {
    row.forEach((col,cidx) => {
        if(col)
        return;
        
        let boundary = Bodies.rectangle(unitW/2 + unitW*cidx,unitH + unitH*ridx,unitW,3,{isStatic:true,
                                                            label: 'wall', 
                                                            render:{fillStyle: 'purple'}})
        World.add(world,boundary)
    })
});

const goal = Bodies.rectangle(width-unitW/2,height-unitH/2,unitW/2,unitH/2,{isStatic:true,
    label: 'goal',
    render: {        
        fillStyle: 'green'
    }
});
World.add(world,goal)

const ball = Bodies.circle(unitW/2,unitH/2,unitW/4,{
    label: 'user',
    render:{
        fillStyle: 'red'
    }
});
World.add(world,ball)

document.addEventListener('keydown', (evt) => {
    if(evt.key === 'w' || evt.key ==='W')
    Body.setVelocity(ball, { x:0, y:-8 })
    if(evt.key === 'a' || evt.key ==='A')
    Body.setVelocity(ball, { x:-8, y:0 })
    if(evt.key === 's' || evt.key ==='S')
    Body.setVelocity(ball, { x:0, y:8 })
    if(evt.key === 'd' || evt.key ==='D')
    Body.setVelocity(ball, { x:8, y:0 })
});

document.addEventListener('keyup', (evt) => {
    // console.log(evt)
    if(evt.key === 'w' || evt.key ==='W' || evt.key === 'a' || evt.key ==='A')
    Body.setVelocity(ball, { x:0, y:0 })
    
    if(evt.key === 's' || evt.key ==='S' || evt.key === 'd' || evt.key ==='D')
    Body.setVelocity(ball, { x:0, y:0 })
    
});

Events.on(engine, 'collisionStart', (evt) =>{
    evt.pairs.forEach((col) => {
        const labels = ['user','goal']
        // console.log(col.bodyA.label,col.bodyB.label)
        if(labels.includes(col.bodyA.label) && labels.includes(col.bodyB.label)){
        document.querySelector('.winner').classList.remove('hidden');
        setTimeout(() => {
        world.gravity.y=0.4;
        world.bodies.forEach((body) => {
            if(body.label === 'wall' || body.label === 'goal')
            Body.setStatic(body,false)
        })
    },50)

        }
    })
})
}
runGame()

const a = document.querySelector(a)
a.addEventListener('click',() => runGame())