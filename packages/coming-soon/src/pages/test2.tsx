/*
import {useEffect, useRef} from 'react'
import Matter, {Engine, Render, Bodies, World} from 'matter-js'
import {numbers} from "./SecondStub.js";

function Test2(props) {
  const scene = useRef(null);
  const isPressed = useRef(false)
  const engine = useRef(Engine.create())

  useEffect(() => {
    const cw = document.body.clientWidth
    const ch = document.body.clientHeight
    var Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Composites = Matter.Composites,
      Common = Matter.Common,
      Constraint = Matter.Constraint,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      Composite = Matter.Composite,
      Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(),
      world = engine.world;

    // create renderer
    var render = Render.create({
      element: scene.current,
      engine: engine,
      options: {
        width: cw,
        height: ch,
        showAngleIndicator: false
      }
    });
    Render.run(render);

    var runner = Runner.create();
    Runner.run(runner, engine);

    const items = numbers.map((item,i) =>{
      var body = Bodies.polygon(item.medianLeft, item.desktopTop, 4, 30,[{label:`${item.number}`}]);
      console.log('body',body)
      var constraint = Constraint.create({
        pointA: { x: item.medianLeft, y: item.desktopTop },
        bodyB: body,
        pointB: { x: -10, y: -10 },
        stiffness: 0.05,
        damping: 0.01,
      });
      return {body, constraint}
    })
    // add soft global constraint
    items.forEach(elem => (Composite.add(world, [elem.body, elem.constraint])))

    // add mouse control
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          // allow bodies on mouse to rotate
          angularStiffness: 0,
          render: {
            visible: false
          }
        }
      });

    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: 800, y: 600 }
    });

    /!*const Engine = Matter.Engine;
    const Render = Matter.Render;
    const Runner = Matter.Runner;
    const MouseConstraint = Matter.MouseConstraint
    const Mouse = Matter.Mouse
    const  World = Matter.World
    const  Bodies = Matter.Bodies;
    const engine = Engine.create();
    const world = engine.world;
    engine.world.wireframes = false;
    engine.world.gravity.x = 0.0;
    engine.world.gravity.y = 0.0;
    const render = Render.create({
      element: scene.current,
      engine: engine,
      options: {
        showBounds: false,
        wireframes: false,
        width: 300,
        height:400,
        background: 'black'
      }
    })
    var runner = Runner.create();
    Runner.run(runner, engine);
    // Render.run(render)
    World.add(world, [Bodies.rectangle(12.5, 12.5, 800, 25, { isStatic: true })]);
    World.add(world, [Bodies.rectangle(12.5, 287.5, 800, 25, { isStatic: true })]);
    World.add(world, [Bodies.rectangle(12.5, 12.5, 25, 600, { isStatic: true })]);
    World.add(world, [Bodies.rectangle(387.5, 12.5, 25, 600, { isStatic: true })]);
    let bodies = [];
    let bodies2 = [];

    let categories = {
      catMouse: 0x0002,
      catBody: 0x0004
    };
    const head2 = document.querySelector(".text-to-canvas h2");
    let letters2 = head2.querySelectorAll("span");
    for (let i = 0; i < letters2.length; i++) {
      bodies2.push(
        Bodies.rectangle(
          head2.offsetLeft +
          letters2[i].offsetLeft +
          letters2[i].offsetWidth * 0.5 +
          10,
          150 - i * 2,
          letters2[i].offsetWidth,
          letters2[i].offsetHeight,
          {
            isSleeping: false,
            density: 1,
            restitution: 0.7,
            frictionAir: 0.0001,
            collisionFilter: {
              category: categories.catBody
            },
            render: {
              opacity: 0
            }
          }
        )
      );
    }
    const head = document.querySelector(".text-to-canvas h1");
    let letters = head.querySelectorAll("span");
    for (let i = 0; i < letters.length; i++) {
      bodies.push(
        Bodies.rectangle(
          head.offsetLeft + letters[i].offsetLeft + letters[i].offsetWidth * 0.5,
          // head.offsetTop + letters[i].offsetTop + letters[i].offsetWidth * 0.5,
          180 - i * 2,
          letters[i].offsetWidth,
          letters[i].offsetHeight,
          {
            isSleeping: false,
            density: 1,
            restitution: 0.7,
            frictionAir: 0.0001,
            collisionFilter: {
              category: categories.catBody
            },
            render: {
              opacity: 0
            }
          }
        )
      );
    }
    bodies.push(Bodies.circle(160, 90, 15));
    bodies.push(Bodies.circle(150, 200, 25));
    bodies.push(Bodies.circle(240, 190, 20));
    bodies.push(Bodies.circle(90, 60, 25));
    bodies.push(Bodies.circle(50, 140, 20));
    bodies.push(Bodies.circle(300, 80, 25));
    bodies.push(Bodies.circle(200, 180, 18));
    World.add(world, bodies);
    World.add(world, bodies2);
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false
          }
        }
      });*!/
    return  {
      stop: function (){
        Matter.Render.stop(render)
      }
    }  /!*{
      engine: engine,
      runner: runner,
      render: render,
      canvas: render.canvas,
      stop: function() {
        Matter.Render.stop(render);
        Matter.Runner.stop(runner);
      }}*!/
  }, [])

  return (
    <div
    >
      <div ref={scene} style={{width: '100%', height: '100%'}}/>
    </div>
  )
}

export default Test2
*/
