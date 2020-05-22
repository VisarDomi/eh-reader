function test() {
  let docTitle = document.title;
  document.head.innerHTML = "";
  document.title = docTitle;
  let body = document.body;
  body.innerHTML = "";
  body.style.margin = "0px"
  body.style.backgroundColor = "black"
  let div = document.createElement("div");
  div.style.display = "flex"
  div.style.flexFlow = "row nowrap"
  div.style.justifyContent = "left"
  div.style.alignItems = "center"

  //inside loop
  let divContainer2 = document.createElement("div")
  let order2 = "2";
  divContainer2.id = order2
  let imageSource2 = `https://abemebr.lmsywulicdlc.hath.network/h/e55369610326af571d18f05b20d3deea4c4090e4-352521-1050-1500-jpg/keystamp=1590182400-9da1977a74;fileindex=21658098;xres=org/eatrich_05.jpg`;
  let width2 = imageSource2.split("-")[2]
  let height2 = imageSource2.split("-")[3]
  // because of rotation, width will become height and height will become width
  divContainer2.setAttribute("style", "min-width:"+height2+"px;"+"min-height:"+width2+"px;")
  let image2 = document.createElement("img");
  image2.setAttribute("style", "transform-origin:top left; transform: rotate(270deg) translateX(-100%);height:"+height2+"px;width:"+width2+"px;")
  image2.loading = "lazy";
  image2.src = imageSource2;
  divContainer2.appendChild(image2)
  div.appendChild(divContainer2);

  let divContainer1 = document.createElement("div")
  let order1 = "1";
  divContainer1.id = order1
  let imageSource1 = `https://lofinia.oygnuytmfwzk.hath.network:4096/h/7d6a16c45bdad399bb1b934e01f0a209dff8581d-364051-1050-1500-jpg/keystamp=1590182400-7bd9576c5d;fileindex=18113747;xres=org/eatrich_04.jpg`;
  let width1 = imageSource1.split("-")[2]
  let height1 = imageSource1.split("-")[3]
  divContainer1.setAttribute("style", "min-width:"+height1+"px;"+"min-height:"+width1+"px;")
  let image1 = document.createElement("img");
  image1.setAttribute("style", "transform-origin:top left; transform: rotate(270deg) translateX(-100%);height:"+height1+"px;width:"+width1+"px;")
  image1.loading = "lazy";
  image1.src = imageSource1;
  divContainer1.appendChild(image1)
  console.log("container1", divContainer1)
  div.appendChild(divContainer1);

  sorting(div);
  body.appendChild(div)
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

