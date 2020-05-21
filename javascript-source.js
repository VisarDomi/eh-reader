// we activate this script on the gallery

// be aware while minifying to escape \, in other words it should be: .split("nl('")[1].split("')\\\"")

// width is not consistent (on older galleries)
async function mainF() {
  let gdt = document.getElementById("gdt")
  document.head.innerHTML=""
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
    let imageUrlFromGallery = child.children[0].children[0].href
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
            image.style.display = "flex"
            image.style.margin = "auto"
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
    // wait for 50 miliseconds between requests
    await new Promise(r => setTimeout(r, 50));
  }
}

mainF()

function pleaseDontDelete() {
  document.head.innerHTML=""
  document.body.innerHTML=""
  let body = document.body
  body.style.backgroundColor = "black"


  imageSource = `https://jniarkeqjjkndiqoxyzo.hath.network/om/8758230/de66ad44e1e6c57096269a967b9f3cac1b5651cf-725429-2116-2996-jpg/20bb952147f2c606a83f838e260f62a595ac35d2-256135-1280-1812-jpg/1280/5gm2dz2746qbnf3l1g/Another_You_01.jpg`
  image = document.createElement("img")
  image.style.display = "flex"
  image.style.margin = "auto"
  image.src = imageSource
  body.appendChild(image)

  imageSource2 = `https://ipnlnjt.lmsywulicdlc.hath.network/h/a21db77a0cc1c4eeaae50de7dca4eba18be7b4ae-136028-1280-904-jpg/keystamp=1590039000-957a91e0c4;fileindex=9303905;xres=1280/Another_You_01a.jpg`
  image2 = document.createElement("img")
  image2.style.display = "flex"
  image2.style.margin = "auto"
  image2.src = imageSource2
  body.appendChild(image2)

}
