function test() {
  let docTitle = document.title;
  document.head.innerHTML = "";
  document.title = docTitle;
  let body = document.body;
  body.innerHTML = "";
  body.style.margin = "0px";
  body.style.backgroundColor = "black";
  let div = document.createElement("div");
  div.style.display = "flex";
  div.style.flexFlow = "row nowrap";
  div.style.justifyContent = "left";
  div.style.alignItems = "center";

  //inside loop
  let imageSource2 = `https://abemebr.lmsywulicdlc.hath.network/h/e55369610326af571d18f05b20d3deea4c4090e4-352521-1050-1500-jpg/keystamp=1590182400-9da1977a74;fileindex=21658098;xres=org/eatrich_05.jpg`;
  let order2 = "2";
  let width2 = imageSource2.split("-")[2];
  let height2 = imageSource2.split("-")[3];
  let divContainer2 = document.createElement("div");
  divContainer2.id = order2;
  // because of rotation, width will become height and height will become width
  divContainer2.setAttribute(
    "style",
    "min-width:" + height2 + "px;" + "min-height:" + width2 + "px;"
  );
  let image2 = document.createElement("img");
  image2.setAttribute(
    "style",
    "transform-origin:top left; transform: rotate(270deg) translateX(-100%);height:" +
      height2 +
      "px;width:" +
      width2 +
      "px;"
  );
  image2.loading = "lazy";
  image2.src = imageSource2;
  divContainer2.appendChild(image2);
  div.appendChild(divContainer2);

  let divContainer1 = document.createElement("div");
  let order1 = "1";
  divContainer1.id = order1;
  let imageSource1 = `https://lofinia.oygnuytmfwzk.hath.network:4096/h/7d6a16c45bdad399bb1b934e01f0a209dff8581d-364051-1050-1500-jpg/keystamp=1590182400-7bd9576c5d;fileindex=18113747;xres=org/eatrich_04.jpg`;
  let width1 = imageSource1.split("-")[2];
  let height1 = imageSource1.split("-")[3];
  divContainer1.setAttribute(
    "style",
    "min-width:" + height1 + "px;" + "min-height:" + width1 + "px;"
  );
  let image1 = document.createElement("img");
  image1.setAttribute(
    "style",
    "transform-origin:top left; transform: rotate(270deg) translateX(-100%);height:" +
      height1 +
      "px;width:" +
      width1 +
      "px;"
  );
  image1.loading = "lazy";
  image1.src = imageSource1;
  divContainer1.appendChild(image1);
  div.appendChild(divContainer1);

  sorting(div);
  body.appendChild(div);
}
function sorting(div) {
  // get child divs
  let children = div.getElementsByTagName("div");
  let ids = [],
    obj,
    i,
    len;
  // build an array of objects that has both the element
  // and a parsed div number in it so we can sort
  for (i = 0, len = children.length; i < len; i++) {
    obj = {};
    obj.element = children[i];
    obj.idNum = parseInt(children[i].id.replace(/[^\d]/g, ""), 10);
    ids.push(obj);
  }
  // sort the array
  ids.sort(function (a, b) {
    return a.idNum - b.idNum;
  });
  // append in sorted order
  for (i = 0; i < ids.length; i++) {
    div.appendChild(ids[i].element);
  }
}
test();

// testing transform
function test2() {
  let css =
    "#container{width:1050px;height:1500px;overflow:hidden;}#container.rotate90,#container.rotate270{width:1500px;height:1050px}#image{transform-origin:top left;-webkit-transform-origin:top left;-ms-transform-origin:top left;}#container.rotate90 #image{transform:rotate(90deg) translateY(-100%);-webkit-transform:rotate(90deg) translateY(-100%);-ms-transform:rotate(90deg) translateY(-100%);}#container.rotate180 #image{transform:rotate(180deg) translate(-100%,-100%);-webkit-transform:rotate(180deg) translate(-100%, -100%);-ms-transform:rotate(180deg) translateX(-100%,-100%);}#container.rotate270 #image{transform:rotate(270deg) translateX(-100%);-webkit-transform:rotate(270deg) translateX(-100%);-ms-transform:rotate(270deg) translateX(-100%);}";
  document.head.innerHTML = "";
  document.body.innerHTML = "";
  let button = document.createElement("button");
  button.id = "button";
  button.innerText = "Click me!";
  let img = document.createElement("img");
  img.src =
    "https://thzaexqketdoxorsmqpe.hath.network/om/17141914/60d97c50e1e6349a0df06039d369ab5abc8b254d-259487-1050-1500-jpg/x/0/7zji4fk0cozqr13n4w/eatrich_02.jpg";
  img.id = "image";
  let div = document.createElement("div");
  div.id = "container";
  div.appendChild(img);
  let style = document.createElement("style");
  style.setAttribute("type", "text/css");
  style.innerText = css;
  document.body.appendChild(button);
  document.body.appendChild(div);
  document.body.appendChild(style);
  var angle = 0;
  img = document.getElementById("container");
  document.getElementById("button").onclick = function () {
    angle = (angle + 90) % 360;
    img.className = "rotate" + angle;
  };
}
test2();

javascript: (function () {
  let js = `function test2(){document.head.innerHTML="",document.body.innerHTML="";let t=document.createElement("button");t.id="button",t.innerText="Click me!";let e=document.createElement("img");e.src="https://thzaexqketdoxorsmqpe.hath.network/om/17141914/60d97c50e1e6349a0df06039d369ab5abc8b254d-259487-1050-1500-jpg/x/0/7zji4fk0cozqr13n4w/eatrich_02.jpg",e.id="image";let n=document.createElement("div");n.id="container",n.appendChild(e);let a=document.createElement("style");a.setAttribute("type","text/css"),a.innerText="#container{width:1050px;height:1500px;overflow:hidden;}#container.rotate90,#container.rotate270{width:1500px;height:1050px}#image{transform-origin:top left;-webkit-transform-origin:top left;-ms-transform-origin:top left;}#container.rotate90 #image{transform:rotate(90deg) translateY(-100%);-webkit-transform:rotate(90deg) translateY(-100%);-ms-transform:rotate(90deg) translateY(-100%);}#container.rotate180 #image{transform:rotate(180deg) translate(-100%,-100%);-webkit-transform:rotate(180deg) translate(-100%, -100%);-ms-transform:rotate(180deg) translateX(-100%,-100%);}#container.rotate270 #image{transform:rotate(270deg) translateX(-100%);-webkit-transform:rotate(270deg) translateX(-100%);-ms-transform:rotate(270deg) translateX(-100%);}",document.body.appendChild(t),document.body.appendChild(n),document.body.appendChild(a);var r=0;e=document.getElementById("container"),document.getElementById("button").onclick=function(){r=(r+90)%360,e.className="rotate"+r}}test2();`;
  document.body.appendChild(document.createElement("script")).innerText = js;
})();

// testing transform
function test3() {
  let css =
    "#wrapper{position:absolute;top: 100px;left: 100px;max-height: 100px;min-height: 100px;border: 2px solid red;}";
  document.head.innerHTML = "";
  document.body.innerHTML = "";
  let input = document.createElement("input");
  input.id = "button";
  input.type = "button";
  input.value = "Rotate";
  let img = document.createElement("img");
  img.src =
    "https://thzaexqketdoxorsmqpe.hath.network/om/17141914/60d97c50e1e6349a0df06039d369ab5abc8b254d-259487-1050-1500-jpg/x/0/7zji4fk0cozqr13n4w/eatrich_02.jpg";
  img.id = "image";
  let div = document.createElement("div");
  div.id = "wrapper";
  div.appendChild(img);
  let style = document.createElement("style");
  style.setAttribute("type", "text/css");
  style.innerText = css;
  let script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute(
    "src",
    "http://cdn.sobekrepository.org/includes/jquery-rotate/2.2/jquery-rotate.min.js"
  );
  let js = `var angle = 0;$("#button").on("click", function () {angle += 90;$("#wrapper").rotate(angle);});`;
  script.innerText = js;
  document.body.appendChild(input);
  document.body.appendChild(div);
  document.body.appendChild(style);
  document.body.appendChild(script);
}
test3();

javascript: (function () {
  document.head.innerHTML = "";
  document.body.innerHTML = "";
  document.body.setAttribute("style", "background-color: #eeeeee;");
  let div1 = document.createElement("div");
  div1.id = "container_1";
  let div2 = document.createElement("div");
  div2.id = "container_2";
  div2.innerText = "hello world";
  let css =
    "#container_1{background-color: white; display:block; width: 100px;height: 100px;border: 1px solid red;transform: rotate(45deg);}#container_2{background-color: #aaaaaa; display:block;";
  let style = document.createElement("style");
  style.setAttribute("type", "text/css");
  style.innerText = css;
  document.body.appendChild(div1);
  document.body.appendChild(div2);
  document.body.appendChild(style);
})();


//woooooooooooooooooooooooooooooorks
javascript:(function(){document.head.innerHTML="";document.body.innerHTML="";document.body.setAttribute("style","background-color:#eeeeee;");div1=document.createElement("div");div1.id="container_1";div2=document.createElement("div");div2.id="container_2";div2.innerText="hello world";css="#container_1{background-color:white;display:block;width:100px;height:100px;border:1px solid red;transform:rotate(45deg);}#container_2{background-color:#aaaaaa;display:block;";style=document.createElement("style");style.setAttribute("type","text/css");style.innerText=css;document.body.appendChild(div1);document.body.appendChild(div2);document.body.appendChild(style);})();

// working not working example
javascript: (function () {
  (document.head.innerHTML = ""), (document.body.innerHTML = "");
  let e = document.createElement("div");
  e.id = "container_2";
  let t = document.createElement("style");
  t.setAttribute("type", "text/css"),
    (t.innerText =
      "#container_2{width: 100px;height: 100px;border: 1px solid red;transform: rotate(45deg);}");
  let n = document.createElement("div");
  (n.innerText = "hello world"),
    document.body.appendChild(e),
    document.body.appendChild(n),
    document.body.appendChild(t);
})();
