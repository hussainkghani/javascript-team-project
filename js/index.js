// intial page/resource and dom element.
window.onload = function(){
    //create a variable for picture zoom out effect.
    var bigImgIndex = 0;
   
    //navPathRendering. 
    navPathDataBind();
    function navPathDataBind(){
    //1.get navPath element 
        var navPath = document.querySelector(".navPath");
        
        //2. get data for all the a element within navPath element.
        var path = goodData.path;
    
        //3. create dom elements by iterate path
        for(var i=0; i<path.length; i++){
            if(i == path.length-1){
                //create aNode but don't set href attribute 
                var aNode = document.createElement("a");
                aNode.innerText = path[i].title;
                navPath.appendChild(aNode);
            }else{
                //create a elements
                var aNode = document.createElement("a");
                aNode. href = path[i].url;
                aNode.innerText = path[i].title;

                //4 create i element
                var iNode = document.createElement("i");
                iNode.innerText = " / ";

                //5. append a and i into navPath element
                navPath.appendChild(aNode);
                navPath.appendChild(iNode);
            }
            
        }
    }

    //picture zoom out
    picZoom();
    function picZoom(){
        //1. get smallPic element and leftTop element.
        var smallPic = document.querySelector('.smallPic')
        var leftTop = document.querySelector(".leftTop");

        var imagessrc = goodData.imagessrc;

        //2. bind mouse move in event 
        smallPic.onmouseenter = function(){
          
            //3. create mask element.
            var maskDiv = document.createElement("div");
            maskDiv.className = "mask";

            //4. create mask element and bigPic element.
            var bigPic = document.createElement('div');
            bigPic.className = "bigPic";
           
            //5. create zoom out element.
            var bigImg = document.createElement('img');
            bigImg.src = imagessrc[bigImgIndex].b;

            //6. Append bigImg element and 
            bigPic.appendChild(bigImg);
             
            //7 Append mask element 
            smallPic.appendChild(maskDiv);

            //8. Appen bigPic element
            leftTop.appendChild(bigPic);

            //9. pic zoom out when mouse move
            smallPic.onmousemove = function(event){
                /* clientX
                    the horizontal coordinate within 
                    the application's viewport at which the event occurred
                */
               /* 
                    getBoundingClientRect() method returns a DOMRect object providing information about 
                    the size of an element and its position relative to the viewport.
                */

                /* offsetWidth
                    a measurement in pixels of the element's CSS width, 
                    including any borders, padding(not margin), and vertical scrollbars (if rendered)
                */
                var left = event.clientX -smallPic.getBoundingClientRect().left - maskDiv.offsetWidth/2; 
                var top = event.clientY -smallPic.getBoundingClientRect().top - maskDiv.offsetHeight/2 ;
                
                //edge control
                if(left < 0){
                    left = 0;
                }else if(left > smallPic.clientWidth - maskDiv.offsetWidth){
                    left = smallPic.clientWidth - maskDiv.offsetWidth;
                }
                if(top < 0){
                    top = 0
                }else if(top > smallPic.clientHeight - maskDiv.offsetHeight){
                    top = smallPic.clientHeight - maskDiv.offsetHeight;
                }
                //set attribut of maskDiv left and top 
                maskDiv.style.left = left + "px";
                maskDiv.style.top = top + "px";

                /*bigPic effect set up
                scale = maskDiv move distiance / bigPic move distance
                maskDiv move distance = smallpic's clientWidth(padding+content) 
                                        - maskDiv's offsetWidth(padding+content+border)
                bigPic move distance = bigImg's offsetWidth - bigPic.clientWidth
                */
                var scale = (smallPic.clientWidth - maskDiv.offsetWidth) / (bigImg.clientWidth - bigPic.offsetWidth);
                
                bigImg.style.left = - left / scale + 'px';
                bigImg.style.top = - top / scale + "px";
            }

            //10. remove mask element and bigPic element when mouse out
            smallPic.onmouseleave = function(){
                // smallPic remove mask element
                smallPic.removeChild(maskDiv);
                leftTop.removeChild(bigPic);
            }
             
        }
        
        
        
    }

    //thumbnaiDate rendering
    thumbnaiDateData();
    function thumbnaiDateData(){
        //1. get ul element within class picList
        var ul = document.querySelector("ul");
 
        //2. get array imagessrc from data.js.
        var imagessrc = goodData.imagessrc;
    
        //3. iterate array, create li elements according array length
        for(var i=0; i<imagessrc.length; i++){
            var li = document.createElement("li");
            var img = document.createElement('img');

            //4. set img src attribute
            img.setAttribute("src", imagessrc[i]["s"]);
            
            //5. Append img to li, then append li to ul
            li.appendChild(img);
            ul.appendChild(li);

        }
        
    }

    //click thumbnail pics
    thumbnaiClick();
    function thumbnaiClick(){
        

        //1. get li elements.
        var liNodes = document.querySelectorAll("li");
         //2. get goodDate imagessrc date
         var imagessrc = goodData.imagessrc;

        //3. get samllPic's 1st child element img.
        var smallPicImg = document.getElementsByClassName("smallPic")[0]
        .getElementsByTagName("img")[0];
        //4. Make sure the smallpic is the same with goodData first element's s path
        smallPicImg.src = imagessrc[0].s;
       
        //5. iterate li elements
        for(let i = 0; i<liNodes.length; i++){ //if use var, then we might have asynchronization issue.
            //
            liNodes[i].onclick = function(){
                bigImgIndex = i;
                smallPicImg.src = imagessrc[i].s;
            }   
        }
        
    }

    //arrow click effect
    arrowClick();
    function arrowClick(){
        //1. get left & right arrow
        var prev = document.querySelector(".prev");
        var next = document.querySelector(".next");

        //2 .get picList element, ul element and li element.
        var picList = document.querySelector(".picList");
        var ul = picList.getElementsByTagName("ul")[0]; 
        var liNodes = ul.getElementsByTagName("li");
         
        //3. create start position and move distance every click
        var start = 0;
        var step = (liNodes[0].offsetWidth + 20) * 2;

        //4. create allowable move distance  
        var distance = (liNodes.length -5) * (liNodes[0].offsetWidth + 20);

        //5. bind click event with arrows
        prev.onclick = function() {
            start -= step; 
            if(start < 0){
                start = 0;
            }
            ul.style.left = - start + "px";
        }

        next.onclick = function() {
            start+=step;
            if(start > distance){
                start = distance;
            }
            ul.style.left = -start + "px";
        }
    }

    //right top detail rendering
    rightTopData();
    function rightTopData(){
        //1. get rightTop elements
        var rightTop = document.querySelector(".rightTop");
        
        //2. get goodDetail from goodData source
        var goodsDetail = goodData.goodsDetail;
        
        //3. create a string variable store all layout within rightTop element
        var s= `<h3>${goodsDetail.title}</h3>
                <p class="renewed"><a href="javascript:;">${goodsDetail.renewed}</a></p>
                <div class="priceContainer">
                    <div class="price">
                        <span>Price: </span>
                        <div class="priceValue">
                            <span>$</span>
                            <p>${goodsDetail.price}</p>
                            <i><a href="javascript:;">Buy it again</a></i>
                        </div>
                        <p>
                            <span>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            </span>
                            <span>${goodsDetail.evaluateNum}</span>
                        </p>
                    </div>
                    <div class="promote">
                        <span>Promote: </span>
                        <p>
                        <span>${goodsDetail.promote.type}</span>
                        <span>${goodsDetail.promote.content}</span>
                        </p>
                    </div>
                </div>
                <div class="tradeIn">
                    <span>Trade-in and save</span>
                    <p>${goodsDetail.tradeIn}</p>
                </div>
                <div class="address">
                    <span><i class="fas fa-map-marker-alt"></i>&nbsp Delivery to Kun</span>
                    <p>${goodsDetail.address}</p>
                </div>`

        //4. Append string variable
        rightTop.innerHTML = s;
    }

    // right bottom detail rendering. 
    // rightBottomDate()
    // function rightBottomDate(){
    //    //1. get rightBottom elements
    //    var rightBottom = document.querySelector(".rightBottom");
       
    //    //2. get goodDetail from goodData source
    //    var crumbData = goodData.goodsDetail.crumbData;

    //    //3 iterate crumbData
    //    crumbData.forEach(e => {
    //         //4. Create dl element
    //         var dlNode = document.createElement("dl");
            
    //         //5. Create dt element
    //         var dtNode = document.createElement("dt");
            
    //         //6. Create dd element
    //         e.data.forEach( e => {
    //             var ddNode = document.createElement("dd");
    //             ddNode.innerText = e.type;
    //             console.log(ddNode);
    //         })
             
    //         //7. append dtnode & ddnode to dl node
    //         dlNode.appendChild(dtNode);
    //         dlNode.appendChild(ddNode);
    //    });
    // }
}