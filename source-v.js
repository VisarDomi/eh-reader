// we activate this script on the gallery with large thumbnails

// be aware while minifying https://javascript-minifier.com/ to escape \
// in other words it should be: .split("nl('")[1].split("')\\\"")
// or [^\\\d]/g

// width is not consistent


// this fucking code works perfectly
// loads first 16 images

function main() {
  let gdt = document.getElementById("gdt")
  let docTitle = document.title
  document.head.innerHTML=""
  document.title = docTitle
  let body = document.body
  body.innerHTML=""
  body.style.backgroundColor = "black"
  for (let index in gdt.children) {
    let numberImages = gdt.children.length-1 //40
    if (parseInt(index)<numberImages && isNaN(parseInt(index))!==true){
      let child = gdt.children[index]
      let imageUrlFromGallery = child.children[0].href
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          let res = xhr.responseText
          nl = res.split("nl('")[1].split("')\"")[0]
          let imageUrlFromNl = imageUrlFromGallery + "?nl=" + nl
          let request = new XMLHttpRequest();
          request.onreadystatechange = function() {
            if (request.readyState === 4) {
              let res = request.responseText
              imageSource = res.split("src=\"")[5].split("\"")[0]
              image = document.createElement("img")
              let title = child.children[0].children[0].title
              let order = parseInt(title.split("Page")[1].split(":")[0].trim())
              let width = imageSource.split("-")[6]
              let height = imageSource.split("-")[7]
              image.id = order
              image.width = width
              image.height = height
              image.style.display = "flex"
              image.style.margin = "auto"
              image.loading = "lazy"
              image.src = imageSource
              body.appendChild(image)
              if(parseInt(index)===numberImages-1){
                sorting(body)
              }
            }
          };
          request.open("GET", imageUrlFromNl)
          request.send()
        }
      };
      xhr.open("GET", imageUrlFromGallery)
      xhr.send()
    }
  }
};
function sorting(body) {
  let children = body.children;
  let ids = [], obj, i, len;
  for (i = 0, len = children.length; i < len; i++) {
    obj = {};
    obj.element = children[i];
    obj.idNum = parseInt(children[i].id.replace(/[^\d]/g, ""), 10);
    ids.push(obj);
  }
  ids.sort(function(a, b) {return(a.idNum - b.idNum);});
  for (i = 0; i < ids.length; i++) {
    body.appendChild(ids[i].element);
  }
}
main()