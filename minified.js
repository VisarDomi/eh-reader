javascript:(function(){function main(){const t=prompt("Begin:","1"),e=document.getElementById("gdt"),n=document.title;document.head.innerHTML="",document.title=n;let i=document.body;i.innerHTML="",i.style.margin="0px",i.style.backgroundColor="#000000";let s=0;const o=e.children.length-1;for(const n of e.children)if("c"!==n.classList.value){const e=n.children[0].children[0].title,l=parseInt(e.split("Page")[1].split(":")[0].trim());if(l<parseInt(t))continue;const r=n.children[0].href;let c=new XMLHttpRequest;c.open("GET",r),c.send(),c.onreadystatechange=function(){if(4===c.readyState){const t=c.responseText.split("nl('")[1].split("')\"")[0],e=r+"?nl="+t;let n=new XMLHttpRequest;n.open("GET",e),n.send(),n.onreadystatechange=function(){if(4===n.readyState){const t=n.responseText.split('src="')[5].split('"')[0];let e=new Image,r=t.split("-")[2],c=t.split("-")[3];const d=parseInt(1125*(c/r));r=1125,c=d;let a=document.createElement("div");a.id=l,a.appendChild(e),i.appendChild(a),e.width=r,e.height=c,e.style.display="flex",e.style.margin="auto",e.loading="eager",e.src=t,e.onerror=function(){setTimeout(function(){e.src=t},1e3)},e.onload=function(){if(sorting(i),++s===o){i.style.display="flex",i.style.flexDirection="row",i.style.flexWrap="nowrap",i.style.justifyContent="left",i.style.alignItems="center";const t=i.children;for(let e of t)e.setAttribute("style","min-width:"+c+"px;min-height:"+r+"px;width:"+c+"px;height:"+r+"px;");const e=i.getElementsByTagName("img");for(let t of e)t.setAttribute("style","transform:matrix(0,-1,1,0,232,-232);height:"+c+"px;width:"+r+"px;")}}}}}}}}function sorting(t){const e=t.children;let n=[],i={};for(const t of e){(i={}).element=t;const e=t.id.replace(/[^\d]/g,"");i.idNumber=parseInt(e,10),n.push(i)}n.sort(function(t,e){return t.idNumber-e.idNumber});for(const e of n)t.appendChild(e.element)}main();})();