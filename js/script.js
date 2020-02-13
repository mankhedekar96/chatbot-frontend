let id = 1;
let inputBox = document.getElementById("userBox");
let inputColor = document.getElementById("inputColor");
let chatBox = document.getElementById("chatBox");
let toggleViewBtn = document.getElementById("toggleViewBtn");
let chatContainer = document.getElementById("chatContainer");
let themeContainer = document.getElementById("themes");
let chatBoxHeader = document.getElementById("chatBoxHeader");
let colors = ['black','darkgreen','red','darkblue'];

let gatewayUrl = "your-gateway-url-here"; // Your DialogFlow gateway api url


// When user hit send the message following function executes. 
const userAction = async () => {
  let input = inputBox.value;
  inputBox.value = "";
  if(input!=""){
    addMe(input, "sent", id++);
    const response = await fetch(gatewayUrl, { 
        method: "POST",
        body: JSON.stringify({
        q: input,
        session_id: "test",
        lang: "hi"
        }),
        headers: {
        "Content-Type": "application/json"
        }
    });
    const myJson = await response.json();
    // do something with myJson
    let res = myJson.queryResult.fulfillmentText;
    if(res.trim()!=''){
        addMe(res, "received", id++);
    }
    }
};

// This function adds messafe when message is sent or received
function addMe(input, msgDetails, id) {
  chatContainer.innerHTML +=
    '<div id="msg' + id + '" class="' + msgDetails + ' box-shadow">' + input + "</div>";
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Toggling chatbox (Minimizing and maximizing)
function toggleView() {
  if (toggleViewBtn.innerText == "-") {
    toggleViewBtn.innerText = "^";
    chatBox.style.height = "50px";
    inputBox.style.display = "none";
  } else {
    toggleViewBtn.innerText = "-";
    chatBox.style.height = "450px";
    inputBox.style.display = "block";
  }
}

// Add color function 
function addColor() {
    if (/^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(inputColor.value)) { // matching hex values
        //Match
        if(!colors.includes(inputColor.value)){
            colors.push(inputColor.value);
            renderThemes();
            }
        changeTheme(inputColor.value);
    } else if(inputColor.value!='white'&&isColor(inputColor.value)){
            if(!colors.includes(inputColor.value)){
                colors.push(inputColor.value);
                renderThemes();
            }
            changeTheme(inputColor.value);
        } else {
            alert('Please choose a valid color');
        }
    
}

// Theme changing function 
function changeTheme(color){
    chatBoxHeader.style.backgroundColor = color;
    chatBoxHeader.style.color = 'white';
    toggleViewBtn.style.backgroundColor = color;
    toggleViewBtn.style.color = 'white';
    chatBox.style.backgroundImage= 'linear-gradient(to bottom, white 40%, '+color+')';
}

// Render themes
function renderThemes(){
    themeContainer.innerHTML = "";
    for(let i of colors){
        themeContainer.innerHTML += `<div class="theme-box box-shadow" style="background-color:${i};color:white;" onclick="changeTheme('${i}')">${i.toUpperCase()}</div>`;
    }
}

// Is color valid
function isColor(strColor){
    var s=new Option().style;
     s.color = strColor;
    return s.color == strColor;
}

changeTheme('black');
renderThemes();