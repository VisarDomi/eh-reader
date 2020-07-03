function main() {
  const BEGINNING_PAGE_NUMBER = prompt("Begin:", "1"); //21
  if (BEGINNING_PAGE_NUMBER !== null && BEGINNING_PAGE_NUMBER !== "") {
    // const IPHONE_WIDTH = 1125;
    let imageSources = [];
    let loadedLinks = 0;
    let thumbnailPages = [];
    const GDT = document.getElementById("gdt");
    if (parseInt(BEGINNING_PAGE_NUMBER) <= 200) {
      // true
      for (let i = BEGINNING_PAGE_NUMBER - 1; i < GDT.children.length - 1; i++) {
        // start from 21
        thumbnailPages.push(GDT.children[i].children[0].href);
      }
    }
    const NUMBER_THUMBNAIL_PAGES = parseInt(
      document
        .getElementById("gdd")
        .children[0].children[0].children[5].children[1].innerHTML.split(
          "pages"
        )[0]
    );
    const REQUESTED_PAGES = NUMBER_THUMBNAIL_PAGES - BEGINNING_PAGE_NUMBER + 1; // total should be 2 (22-21+1)
    if (NUMBER_THUMBNAIL_PAGES > 200 && NUMBER_THUMBNAIL_PAGES <= 400) {
      let xhr1 = new XMLHttpRequest();
      xhr1.open("GET", window.location.href + "?p=1");
      xhr1.send();
      xhr1.onreadystatechange = function () {
        if (xhr1.readyState === 4) {
          const RESPONSE_TEXT_1 = xhr1.responseText;
          for (let i = 1; i <= NUMBER_THUMBNAIL_PAGES - 200; i++) {
            thumbnailPages.push(
              RESPONSE_TEXT_1.split("gdtl")[i].split('href="')[1].split('">')[0]
            );
          }
          engine(REQUESTED_PAGES, thumbnailPages, imageSources, loadedLinks);
        }
      };
    } else if (NUMBER_THUMBNAIL_PAGES <= 200) {
      engine(REQUESTED_PAGES, thumbnailPages, imageSources, loadedLinks);
    }
  }
}
function engine(REQUESTED_PAGES, thumbnailPages, imageSources, loadedLinks) {
  for (let i = 0; i < REQUESTED_PAGES; i++) {
    setTimeout(function () {
      let xhr2 = new XMLHttpRequest();
      xhr2.open("GET", thumbnailPages[i]);
      xhr2.send();
      xhr2.onreadystatechange = function () {
        if (xhr2.readyState === 4) {
          const RESPONSE_TEXT_2 = xhr2.responseText;
          const NL = RESPONSE_TEXT_2.split("nl('")[1].split("')")[0];
          const URL_FROM_NL = thumbnailPages[i] + "?nl=" + NL;
          let xhr3 = new XMLHttpRequest();
          xhr3.open("GET", URL_FROM_NL);
          xhr3.send();
          xhr3.onreadystatechange = function () {
            if (xhr3.readyState === 4) {
              const RESPONSE_TEXT_3 = xhr3.responseText;
              const IMAGE_SOURCE = RESPONSE_TEXT_3.split('src="')[5].split(
                '"'
              )[0];
              imageSources.push(IMAGE_SOURCE); // async here, problems ahead
              loadedLinks++;
              let body = document.body;
              let div = document.createElement("div");
              body.innerHTML = "";
              body.style.margin = "0px";
              body.style.backgroundColor = "#000000";
              let percentage = loadedLinks / REQUESTED_PAGES;
              div.setAttribute(
                "style",
                "background-color:#aaaaaa;height:100px;width:" +
                  percentage * 100 +
                  "%;"
              );
              body.appendChild(div);
              if (loadedLinks === REQUESTED_PAGES) {
                body.innerHTML = "";
                let image = null;
                for (let j = 0; j < REQUESTED_PAGES; j++) {
                  setTimeout(function () {
                    let divContainer = document.createElement("div");
                    image = new Image();
                    image.src = imageSources[j];
                    divContainer.append(image);
                    body.appendChild(divContainer);
                  }, j * 500);
                }
              }
            }
          };
        }
      };
    }, i * 100);
  }
}
main()