

if(typeof init === 'undefined'){
    
    

    const init = function(){
        
        var plugincontainer = document.createElement('div');
        plugincontainer.className = 'time-plugin-container';
        document.body.appendChild(plugincontainer);

        const injectElement = document.createElement('div');
        injectElement.className = 'plugin';
        injectElement.setAttribute('id','plugin') ;
        plugincontainer.appendChild(injectElement);
        injectElement.draggable = 'true';

        


        //Creating the div draggable
        // var dragItem = document.getElementById('plugin');

        var active = false;
        var currentX;
        var currentY;
        var initialX;
        var initialY;
        var xOffset = 0;
        var yOffset = 0;
        
        //touch & mouse event listeners
        injectElement.addEventListener("touchstart",dragStart,false);
        injectElement.addEventListener("touchend",dragEnd,false);
        injectElement.addEventListener("touchmove",drag,false);

        injectElement.addEventListener("mousedown",dragStart,false);
        injectElement.addEventListener("mouseup",dragEnd,false);
        injectElement.addEventListener("mousemove",drag,false);

        //intializing the drag - dragstart()

        function dragStart(e){
            if(e.type === "touchstart"){
                initialX = e.touches[0].clientX - xOffset;
                initialX = e.touches[0].clientY - yOffset;
            }
            else{
                initialX = e.clientX-xOffset;
                initialY = e.clientY-yOffset;
            }

            if(e.target === injectElement){
                active = true;
            }
        }

        //We set our initial position for the next drag operation to be the current position. 
        function dragEnd(e){
            initialX = currentX;
            initialY = currentY;
            
            active = false;
        }

        function drag(e){
            if (active){                        //check if drag is active
                e.preventDefault();
                if (e.type === "touchmove"){
                    currentX = e.touch[0].clientX - initialX;  //if touch or mouse is moved find the current position by subtracting from intialX/Y value from e.client
                    currentY = e.touch[0].clientY - initialY;
                }else {
                    currentX = e.clientX - initialX;
                    currentY = e.clientY - initialY;
                }

                xOffset = currentX;                         //store the latest pointer position in offset varialble. This allows future drag operations to pick up from where the current position left off.
                yOffset = currentY;

                setTranslate(currentX, currentY, injectElement);
            }
        }

        //using transform css
        function setTranslate(xPos,yPos,el){ 
            el.style.transform ="translate("+xPos+"px)";
        }

        
        var startTime;
        startTime = new Date();
       
        function display(){

            var endtime = new Date();

            var timeDiff = endtime - startTime;
    
            var saveTime = timeDiff;
            

            timeDiff /= 1000;

            var seconds = Math.round(timeDiff%60);

            timeDiff = Math.floor(timeDiff/60);

            var minutes =  Math.round(timeDiff%60);

            timeDiff = Math.floor(timeDiff/60);

            var hours = Math.round(timeDiff%24);

            timeDiff = Math.floor(timeDiff/24);

            // var days = timeDiff;
            injectElement.innerHTML = hours+"<b>h</b> "+ minutes + "<b>m</b> " + seconds +"s";
            
           
                    

                document.addEventListener("visibilitychange", () => {
                if (document.visibilityState === 'visible') {
                 setInterval(display,1000);  
                 console.log("if loop", startTime, saveTime, timeDiff)
                } else {
                 startTime = saveTime;
                 clearInterval(display);
                 console.log("else loop", startTime, saveTime, timeDiff)
                }
                });



            
            
                // if (!document.hidden) {
                //     setInterval(display,1000);  
                // } 
                // else{
                //     startTime = timeDiff;
                //     clearInterval(display);
                //     console.log('startTime',startTime);
                   
                // }

             
        }

        setInterval(display,1000);

           
          
        
        // let body = document.querySelector("body");
        // body.style.marginTop = "40px";


        // var firstElement = document.querySelector('div');
        // firstElement.prepend('injectElement');
        // console.log('firstElement');

       
        // var link = document.createElement('link');
        // link.rel = 'stylesheet';
        // link.type = 'text/css';
        // link.href = 'style.css';
        // document.appendChild(link);
        
    }
       
    init();


    
}



// if(typeof init === 'undefined'){
// const init = function(){
//     const injectElement = document.createElement('div');
//     injectElement.className = 'plugin';
//     injectElement.innerHTML = 'We are getting there';
//     document.body.appendChild(injectElement);

//     const hostEle = document.createElement('div');
//     hostEle.className = 'plugin-host';
//     hostEle.innerHTML = 'We are getting there';
//     document.body.appendChild(hostEle);

//     //Using Shadow Root
//     var host = document.querySelector('.plugin-host');
//     var root = host.attachShadow({mode: 'open'}); // Create a Shadow Root
//     var div = document.createElement('div');
//     div.className = 'div root-class';
//     div.innerHTML='<style>.div{border:3px solid blue;margin:10px;width:200px;padding:10px;}</style>'
//     +'We are getting there';
//     root.appendChild(div);
//   }
//   init();
// }