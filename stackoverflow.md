I am working on a [bookmarklet][1] for Safari iOS 13 and I can't get the CSS transform and transform-origin properties to work. Here is a sample code modified from this answer https://stackoverflow.com/a/14233398/10083781:

```
javascript: (function () {
  document.head.innerHTML = "";
  document.body.innerHTML = "";
  let div = document.createElement("div");
  div.id = "container_2";
  let css = "#container_2{width: 100px;height: 100px;border: 1px solid red;transform: rotate(45deg);}";
  let style = document.createElement("style");
  style.setAttribute("type", "text/css");
  style.innerText = css;
  let div2 = document.createElement("div")
  div2.innerText = "hello world"
  document.body.appendChild(div);
  document.body.appendChild(div2);
  document.body.appendChild(style);
})();
```

What this code does, is basically create two divs and a style tag to insert the CSS. To run this script, just paste it in the console and press enter. You should see a hello world and a red square rotated by 45 degrees. It works as intended in Chrome in Windows 10, but in Safari iOS 13 it shows only the hello world text and not the rotated square. Do you have any idea what is causing this?


Basically I want to rotate images in Safari iOS 13.

  [1]: https://en.wikipedia.org/wiki/Bookmarklet