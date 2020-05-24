function main() {
  // settings
  const HORIZONTAL = true
  const IPHONE_WIDTH = 1125

  // code
  let gdt = document.getElementById("gdt")
  let docTitle = document.title
  document.head.innerHTML=""
  document.title = docTitle
  let body = document.body
  body.innerHTML=""
  body.style.margin = "0px"
  body.style.backgroundColor = "black"
  let loadedImages = 0
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
              image = new Image()
              let title = child.children[0].children[0].title
              let order = parseInt(title.split("Page")[1].split(":")[0].trim())
              let width = imageSource.split("-")[6]
              let height = imageSource.split("-")[7]
              // rework width and height
              let ratioHW = height/width
              let finalHeight = parseInt(IPHONE_WIDTH*ratioHW)
              width = IPHONE_WIDTH
              height = finalHeight

              // make wrapping divs around images
              let divContainer = document.createElement("div")
              divContainer.id = order
              divContainer.appendChild(image)
              body.appendChild(divContainer)
              // set image attributes
              image.id = "img"+order.toString()
              image.width = width
              image.height = height
              image.style.display = "flex"
              image.style.margin = "auto"
              image.loading = "eager"
              image.src = imageSource
              // reload after one second of error
              image.onerror = function(){
                setTimeout(function() {image.src=imageSource}, 1000)
              }
              // image loaded successfully - now change from vertical to horizontal
              image.onload = function(){
                loadedImages++
                if (loadedImages===numberImages && HORIZONTAL===true) {
                  // console.log("changing from vertical to horizontal...")
                  // make body flex
                  body.style.display = "flex"
                  body.style.flexDirection = "row"
                  body.style.flexWrap = "nowrap"
                  body.style.justifyContent = "left"
                  body.style.alignItems = "center"
                  // make image rotate
                  // select all divs and all images
                  let containers = body.children
                  for (let container of containers) {
                    container.setAttribute("style", "min-width:"+height+"px;min-height:"+width+"px;width:"+height+"px;height:"+width+"px;")
                  }
                  let images = body.getElementsByTagName("img")
                  for (let singleImage of images) {
                    singleImage.setAttribute("style", "transform:matrix(0,-1,1,0,232,-232);height:"+height+"px;width:"+width+"px;")
                  }
                }
              }
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
function sorting(div) {
  let children = div.children;
  let ids = [], obj, i, len;
  for (i = 0, len = children.length; i < len; i++) {
    obj = {};
    obj.element = children[i];
    obj.idNum = parseInt(children[i].id.replace(/[^\d]/g, ""), 10);
    ids.push(obj);
  }
  ids.sort(function(a, b) {return(a.idNum - b.idNum);});
  for (i = 0; i < ids.length; i++) {
    div.appendChild(ids[i].element);
  }
}
main()