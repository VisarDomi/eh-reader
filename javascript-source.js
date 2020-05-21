// we activate this script on the gallery with large thumbnails

// be aware while minifying https://javascript-minifier.com/ to escape \
// in other words it should be: .split("nl('")[1].split("')\\\"")
// or [^\\\d]/g

// width is not consistent (on older galleries)

function main() {
  let gdt = document.getElementById("gdt")
  document.head.innerHTML=""
  document.head.title = "EH"
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












function pleaseDontDelete() {
  document.head.innerHTML=""
  document.body.innerHTML=""
  let body = document.body
  body.style.backgroundColor = "black"
  
  //inside loop
  imageSource2 = `https://ipnlnjt.lmsywulicdlc.hath.network/h/a21db77a0cc1c4eeaae50de7dca4eba18be7b4ae-136028-1280-904-jpg/keystamp=1590039000-957a91e0c4;fileindex=9303905;xres=1280/Another_You_01a.jpg`
  let order = "2"
  image2 = document.createElement("img")
  image2.id = order
  image2.style.display = "flex"
  image2.style.margin = "auto"
  image2.loading = "lazy"
  image2.src = imageSource2
  body.appendChild(image2)
  
  imageSource = `https://jniarkeqjjkndiqoxyzo.hath.network/om/8758230/de66ad44e1e6c57096269a967b9f3cac1b5651cf-725429-2116-2996-jpg/20bb952147f2c606a83f838e260f62a595ac35d2-256135-1280-1812-jpg/1280/5gm2dz2746qbnf3l1g/Another_You_01.jpg`
  order = "1"
  image = document.createElement("img")
  image.id = order
  image.style.display = "flex"
  image.style.margin = "auto"
  image.loading = "lazy"
  image.src = imageSource
  body.appendChild(image)

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












