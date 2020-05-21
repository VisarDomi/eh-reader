// we activate this script on the gallery with large thumbnails

// be aware while minifying https://javascript-minifier.com/ to escape \
// in other words it should be: .split("nl('")[1].split("')\\\"")
// or [^\\\d]/g

// width is not consistent

function main() {
  let gdt = document.getElementById("gdt")
  let docTitle = document.title
  document.head.innerHTML=""
  document.title = docTitle
  let body = document.body
  body.innerHTML=""
  body.style.backgroundColor = "black"
  for (let index in gdt.children) {
    // don't iterate the last element
    if (index === gdt.children.length-1) {
      break
    }
    let child = gdt.children[index]
    // lists all gallery imageUrls
    let imageUrlFromGallery = child.children[0].href
    // for each image url, do a request to get nl
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        let res = xhr.responseText
        // now i need the number after nl('
        nl = res.split("nl('")[1].split("')\"")[0]
        let imageUrlFromNl = imageUrlFromGallery + "?nl=" + nl
        let request = new XMLHttpRequest();
        request.onreadystatechange = function() {
          if (request.readyState === 4) {
            let res = request.responseText
            // now i need the image source
            imageSource = res.split("src=\"")[5].split("\"")[0]
            image = document.createElement("img")
            let title = child.children[0].children[0].title
            let order = parseInt(title.split("Page")[1].split(":")[0].trim())
            image.id = order
            image.style.display = "flex"
            image.style.margin = "auto"
            image.loading = "lazy"
            image.src = imageSource
            body.appendChild(image)
          }
        };
        request.open("GET", imageUrlFromNl)
        request.send()
      }
    };
    xhr.open("GET", imageUrlFromGallery)
    xhr.send()
    // sort on the last image
    if (index === gdt.children.length-2) {
      setTimeout(function(){
        sorting(body)
      }, 500)
    }
    setTimeout(function(){
      sorting(body)
    }, 5000)
    setTimeout(function(){
      sorting(body)
    }, 30000)
    setTimeout(function(){
      sorting(body)
    }, 180000)
  }
};
function sorting(body) {
  // get child divs
  let children = body.getElementsByTagName("img");
  let ids = [], obj, i, len;
  // build an array of objects that has both the element
  // and a parsed div number in it so we can sort
  for (i = 0, len = children.length; i < len; i++) {
    obj = {};
    obj.element = children[i];
    obj.idNum = parseInt(children[i].id.replace(/[^\d]/g, ""), 10);
    ids.push(obj);
  }
  // sort the array
  ids.sort(function(a, b) {return(a.idNum - b.idNum);});
  // append in sorted order
  for (i = 0; i < ids.length; i++) {
    body.appendChild(ids[i].element);
  }
}
main()
