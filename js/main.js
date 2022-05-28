//Home Button 
let  home=document.querySelector(".goHome");
home.onclick=function(){
    window.scroll({
        top: 0,
        left: 0,
        });
}
// Start Header Section
let menu =document.querySelector(".landing header  .menu");
let nav=document.querySelector("header .nav");
menu.onclick=function(){
    nav.classList.toggle("open-menu");
    if(nav.classList.contains("open-menu")){
        
        window.addEventListener("click",(e)=>{
           
            if(e.target!==menu && e.target!==nav){
                nav.classList.remove("open-menu")
              
            }
        })
    }
}

// End Header Section
// __________________________________________

let landing=document.querySelector(".landing")
let landingBackground=["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg","06.png","07.jpg","08.jpg","09.jpg","10.jpg"]
let stop =false
landing.style.backgroundImage= `url(/images/${landingBackground[0]})`;
let x=true;
let randomOption=document.querySelectorAll(".setting .random-background .random-options span");
randomOption[0].onclick=()=>x=false;

let backgroundRandom= setInterval(()=>{
    if(localStorage.getItem("stop")==="true"){
        clearInterval(backgroundRandom);
    }
    else if(x==false){  console.log("done") ; ;clearInterval(backgroundRandom);}
    let random=Math.floor(Math.random()*landingBackground.length)
    landing.style.backgroundImage= `url(/images/${landingBackground[random]})`;
},10000)
// -----------------------------------
// Start Setting Section
let settingIcon=document.querySelector(".setting .setting-icon i");
let settingTap=document.querySelector(".setting");
let colorTheme=document.querySelectorAll(".theme .colors .color");

settingIcon.onclick = function(){
settingTap.classList.toggle("open");
settingIcon.classList.toggle("fa-spin");
}

colorTheme.forEach((e)=>{
    //add active class for current theme from localstorage
    if(localStorage.getItem("theme")!==null){
        if(e.id==localStorage.getItem("theme")){ 
            e.classList.add("active-theme") 
        }
        else{
            e.classList.remove("active-theme")
        }
    }
    else{
        colorTheme[0].classList.add("active-theme")
    }
    
    e.addEventListener("click",()=>{
        colorTheme.forEach(e=>e.classList.remove("active-theme"));
        e.classList.add("active-theme")
        localStorage.setItem("theme",`${e.id}`)
        document.documentElement.style.setProperty("--main-color",`${localStorage.getItem("theme")}`)
    })
})
if(localStorage.getItem("theme")!==null){
    document.documentElement.style.setProperty("--main-color",`${localStorage.getItem("theme")}`)
}


randomOption.forEach((e)=>{

    e.addEventListener("click",()=>{
        randomOption.forEach((ele)=>ele.classList.remove("active-option"))
        e.classList.add("active-option")
        if(e.innerHTML==="No"){localStorage.setItem("stop",true);
        }
        else{localStorage.setItem("stop",false)
        let backgroundRandom= setInterval(()=>{
            let random=Math.floor(Math.random()*landingBackground.length)
            landing.style.backgroundImage= `url(/images/${landingBackground[random]})`;
            if(localStorage.getItem("stop")==="true"){
                clearInterval(backgroundRandom);
            }
        },10000)
            }
    })
})
if(localStorage.getItem("stop")==="true"){randomOption[1].classList.add("active-option");
randomOption[0].classList.remove("active-option");
}
else{randomOption[0].classList.add("active-option");
    randomOption[1].classList.remove("active-option")
}

//active-bullets
let bulletsOption=document.querySelectorAll(".setting .show-bullets .bullet-options span");
let bullets=document.querySelector(".bullets");
bulletsOption.forEach((e)=>{
    e.addEventListener("click",()=>{
        bulletsOption.forEach((ele)=>{ele.classList.remove("active-option")})
        e.classList.add("active-option")
        localStorage.setItem("bulletsOption",e.dataset.display)
        if(localStorage.getItem("bulletsOption")=="hide"){
            
            bullets.style.display="none"
        }
        else{
            bullets.style.display="block"
        }
    })
})
if(localStorage.getItem("bulletsOption")=="hide"){
    bulletsOption[0].classList.remove("active-option")
    bulletsOption[1].classList.add("active-option")    
    bullets.style.display="none"
}
else{
    bulletsOption[0].classList.add("active-option")
    bulletsOption[1].classList.remove("active-option")    
    bullets.style.display="block"
}

//-------------
//reset button
let resetButton=document.querySelector(".reset .button");
resetButton.onclick=function(){
    localStorage.removeItem("theme");
    localStorage.removeItem("bulletsOption");
    localStorage.removeItem("stop");
    location.reload();
}
// End Setting Section
// -------------------------------------
//Start Our Skills Section
let skills=document.querySelector(".skills");
let progressAmount= document.querySelectorAll(".skills .container .skill .progress-bar>div")
window.onscroll=function(){
    //top element distance
    let skillsOffsetTop=skills.offsetTop;
    //use the clientHeight property, which returns an element’s height, including its vertical padding. Basically, 
// it returns the actual space used by the displayed content.
    let skillsOuterHeight=skills.offsetHeight

//window height
let windowInnerHeight=this.innerHeight;
//current position scroll 
let pageYOffset=window.pageYOffset
if(pageYOffset >= ((skillsOffsetTop + skillsOuterHeight) - windowInnerHeight)){
    progressAmount.forEach((e)=>{
        e.style.width=e.dataset.prog;
    })
}
}
//End Our Skills Section
// ________________________________________________
// Start gallery Section
let image=document.querySelectorAll(".gallery .container .image img");
image.forEach((e)=>{
    e.addEventListener("click",()=>{
        let overlayGallery=document.createElement("div");
        overlayGallery.className="overlay-gallery";
        document.body.appendChild(overlayGallery)
        let popupBox=document.createElement("div");
        popupBox.className="popup-box";
        const clone = e.cloneNode(true);
        if(screen.width<678){ clone.className="image-gallery-ss";}
        else{
            clone.className="image-gallery-ls";
        }
        popupBox.appendChild(clone);
        overlayGallery.appendChild(popupBox)
        let buttonClose=document.createElement("div");
        buttonClose.innerHTML="X"
        buttonClose.className="button-close";
        popupBox.appendChild(buttonClose);
        buttonClose.onclick=function(){
            overlayGallery.remove()
            popupBox.remove()
        }
    })
})
// End gallery Section
