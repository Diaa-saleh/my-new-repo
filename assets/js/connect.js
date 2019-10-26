


let btn = document.getElementById("btn");
let input = document.getElementById("input-test");
let container = document.getElementById("test-to-do");


btn.addEventListener("click", () => {
    let value = input.value
    if(value == "") return false;
    let obj = {
        value : value,
    }
    
    // let img = document.createElement("img");
    // img.classList.add("img-test")
    // img.src = data.image
    // p.appendChild(img)
    // p.innerHTML = value
    
    fetch("/hello", {
        method : 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
        
    })
        
    .then(response => response.json())
    .then(data => {
        console.log(data)
        let p = document.createElement("p");
        p.classList.add("alert" ,"alert-danger");
        p.innerHTML = data.value
        container.appendChild(p);
    })
})
// window.onload = function() {
//     fetch("/", {
//         method : 'POST',
//         body: JSON.stringify(obj),
//         headers: {
//             "Content-Type": "application/json",
//             // 'Content-Type': 'application/x-www-form-urlencoded',
//         }
        
//     })
        
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
        
//     })
// }
let cache = {};


// const withCache = func => key => {
//     if(key in cache === false) {
//         cache[key] = func(key);
//     }

//     return cache[key];
// }
function withCache(func){
    return function(key) {
        if(key in cache === false) {
            cache[key] = func(key);
        }
        return cache[key];
    }
    
}
const action = key => key + key;

// the first argument take action 
const actionCache = withCache(action);
// the second function take "aa" as argument
console.log(actionCache("aa"))


document.getElementById("display-btn").addEventListener("click", () => {
    fetch("/kk", {
        method : 'POST',
        
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
        
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        for(let i = 0; i < data.length; i++) {
            let p = document.createElement("p");
            p.classList.add("alert" ,"alert-danger");
            p.innerHTML = data[i+2].value
            container.appendChild(p);
        }
    });
    document.getElementById("display-btn").style.display = "none"
})