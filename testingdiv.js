
function testingDiv(){
  document.head.innerHTML = "";
  let body = document.body;
  body.innerHTML = "";
  let div = document.createElement("div")
  image2 = document.createElement("img");
  div.appendChild(image2)
  image = document.createElement("img");
  div.appendChild(image)
  body.appendChild(div)
}
testingDiv()
