// transform is not working, try canvas
// canvas requires at least two pixel -> so margin it out
// document.body.setAttribute("style","margin-top:-4px;margin-left:-4px;")
// context.drawImage(image, 3, 3)
javascript: (function () {
  let imageSource = "https://d2ph5fj80uercy.cloudfront.net/04/cat2594.jpg";
  document.head.innerHTML = "";
  document.body.innerHTML = "";
  document.body.setAttribute("style", "margin:5;");
  let canvas = document.createElement("canvas");
  canvas.id = "canvas";
  canvas.width = 1000;
  canvas.height = 1000;
  canvas.setAttribute("style", "border:10px solid black;");
  let image = document.createElement("img");
  image.src = imageSource;
  let context = canvas.getContext("2d");
  context.drawImage(image, 30, 30);
  // context.rotate(90*Math.PI/180)
  document.body.appendChild(canvas);
})();

// minified by hand
javascript: (function () {
  let cat = "https://d2ph5fj80uercy.cloudfront.net/04/cat2594.jpg"
  document.head.innerHTML = "";
  document.body.innerHTML = "";
  document.body.setAttribute("style", "margin:5px;");
  let c = document.createElement("canvas");
  c.id = "canvas";
  c.width = 1000;
  c.height = 1000;
  c.setAttribute("style", "border:1px solid black;");
  let i = document.createElement("img");
  i.src = cat;
  let x = c.getContext("2d");
  // x.rotate(90*Math.PI/180)
  x.drawImage(i, 300, 300);
  document.body.appendChild(c);
})();














// canvas does not work
javascript: (function () {
  (document.head.innerHTML = ""),
    (document.body.innerHTML = ""),
    document.body.setAttribute("style", "margin:0;");
  let e = document.createElement("canvas");
  (e.id = "canvas"),
    (e.width = 300),
    (e.height = 300),
    e.setAttribute("style", "border:1px solid black;"),
    document.body.appendChild(e);
  let t = document.createElement("img");
  (t.src = "https://d2ph5fj80uercy.cloudfront.net/04/cat2594.jpg"),
    e.getContext("2d").drawImage(t, 30, 30);
})();
