// requirements:
// 1. iPhone 10s (screen resolution 2435x1125)
// 2. exhentai.org account - to activate an ex account, you need to register to e-hentai.org forums and wait a week
// 3. if you encounter sad panda when visiting ex, that means your account is too new, and you need to delete the cookie named "yay"
// 4. go to settings and activate large thumbnails and set virtual viewport to 2200, which is twice the width of the iPhone 10s, 2x1125, minus 50 pixel, to make safari's toolbar disappear
// 5. activate this script on the gallery with large thumbnails


// be aware while minifying https://javascript-minifier.com/ to escape \
// in other words it should be: .split("nl(")[1].split(")\\\"")
// or [^\\\d]/g

// be aware of spaces inside strings - it's a death sentence to bookmarklets

// width is not consistent - nobody cares

function main() {
  const IPHONE_WIDTH = 1125
  // get gallery links
  let gdt = document.getElementById("gdt");
  // get title
  let docTitle = document.title;
  // empty head
  document.head.innerHTML = "";
  // set title back
  document.title = docTitle;
  // empty body
  let body = document.body;
  body.innerHTML = "";
  // set body style
  body.style.margin = "0px"
  body.style.backgroundColor = "black"
  // create wrapping div
  let div = document.createElement("div");
  body.appendChild(div)
  div.style.display = "flex"
  div.style.flexDirection = "row"
  div.style.flexWrap = "nowrap"
  div.style.justifyContent = "left"
  div.style.alignItems = "center"
  // load all the images
  for (index = 0; index < gdt.children.length - 1; index++) {
    let multiplier = index
    // do not set timeout for the first 10 loops
    if (index < 10) {
      multiplier = 0
    }
    setTimeout(loop(gdt, index, IPHONE_WIDTH, div), 500*multiplier)
  }
  // sort after 0.05, 0.5, 5, 50, 500 seconds
  setTimeout(sort(div), 50)
  setTimeout(sort(div), 500)
  setTimeout(sort(div), 5000)
  setTimeout(sort(div), 50000)
  setTimeout(sort(div), 500000)
}
function loop(gdt, index, IPHONE_WIDTH, div) {
  // current element of the gallery
  let child = gdt.children[index];
  // get image page url
  let imagePageUrl = child.children[0].href;
  // for each image page url, do a request to get nl, which is the backup links that work 100%
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      // get response text from image page url
      let res = xhr.responseText;
      // now i need the number after nl(
      nl = res.split("nl(")[1].split(")\"")[0];
      // get image page nl url
      let imagePageNlUrl = imagePageUrl + "?nl=" + nl;
      // call this nl to get the source of the nl image
      let request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (request.readyState === 4) {
          // get response text from image page nl url
          let res = request.responseText;
          // get image nl source
          let imageSource = res.split("src=\"")[5].split("\"")[0];
          // create image object
          let image = new Image()
          // reload image on error
          // let start = performance.now()
          image.onerror = function() {
            // let end = performance.now()
            // console.log("imageSource", imageSource)
            // console.log("Seconds elapsed", (end-start)/1000)
            setTimeout(function(){image.src = imageSource}, 500)
            setTimeout(sort(div), 1000)
          }
          // set title of the image from the image url
          let title = child.children[0].children[0].title;
          // set order number, width and height
          let order = title.split("Page")[1].split(":")[0].trim();
          let width = imageSource.split("-")[2]
          let height = imageSource.split("-")[3]
          // now transform the height and width to match iPhone 10s
          let ratioHW = height/width
          let finalHeight = parseInt(IPHONE_WIDTH*ratioHW)
          width = IPHONE_WIDTH
          height = finalHeight
          // create a div container and set its order number
          let divContainer = document.createElement("div")
          divContainer.id = order
          // set container style
          // because of the 270 degree clockwise rotation,
          // width will become height and height will become width
          divContainer.setAttribute("style", "min-width:"+height+"px;"+"min-height:"+width+"px;")
          // set image style where the rotation occurs
          // rotation is calculated as follows:
          // matrix(cos(x), sin(x), -sin(x), cos(x), tx, ty)
          // where x is 270 degrees rotation of the object clockwise
          // and just substite 270 in sin(x) and cos(x)
          // which would mean a usual trigonometric counter-clockwise 270 degrees on the unit circle
          // and tx and ty are the translations horizontally and vertically
          // translation should be translateX(-100%)
          // which means that the object should be translated vertically by the width value
          // which means tx=0 and ty=width - no
          // empirical values are: tx=232 and ty=-232
          // 1125/232 = 4.8
          // 1588/232 = 6.8
          // 1280/232 = 5.5
          // 1807/232 = 7.8
          image.setAttribute("style", "transform:matrix(0,-1,1,0,232,-232);height:"+height+"px;width:"+width+"px;")
          // set loading to lazy, and remember to activate this experimental feature in safari
          // image.loading = "lazy";
          // set source
          image.src = imageSource;
          // append image to container div
          divContainer.appendChild(image)
          // append container to wrapping div
          div.appendChild(divContainer);
        }
      };
      request.open("GET", imagePageNlUrl);
      request.send();
    }
  };
  xhr.open("GET", imagePageUrl);
  xhr.send();
}
function sort(div) {
  // get a list of child divs
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
    obj.idNum = parseInt(children[i].id, 10);
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
main();
