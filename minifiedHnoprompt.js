javascript:(function(){function main(){const e=parseInt(document.getElementById("gdd").children[0].children[0].children[5].children[1].innerHTML.split("pages")[0]);if(e<=400){let t=[],n=0,i=[];const l=document.getElementById("gdt");for(let e=0;e<l.children.length-1;e++)i.push(l.children[e].children[0].href);const s=e-1+1;for(let e=0;e<s;e++)t.push({id:e,source:""});if(e>200){let l=new XMLHttpRequest;l.open("GET",window.location.href+"?p=1"),l.send(),l.onreadystatechange=function(){if(4===l.readyState){const r=l.responseText;addSecondPage(e,i,r,1),engine(s,i,t,n)}}}else engine(s,i,t,n)}}function addSecondPage(e,t,n,i){if(i>=200)for(let l=i-200;l<=e-200;l++)t.push(n.split("gdtl")[l].split('href="')[1].split('">')[0]);else for(let i=1;i<=e-200;i++)t.push(n.split("gdtl")[i].split('href="')[1].split('">')[0])}function engine(e,t,n,i){for(let l=0;l<e;l++){let s=new XMLHttpRequest;s.open("GET",t[l]),s.send(),s.onreadystatechange=function(){if(4===s.readyState){const r=s.responseText.split("nl('")[1].split("')")[0],o=t[l]+"?nl="+r;let d=new XMLHttpRequest;d.open("GET",o),d.send(),d.onreadystatechange=function(){if(4===d.readyState){const t=d.responseText.split('src="')[5].split('"')[0];n[l].id===l&&(n[l].source=t),i++;let s=document.body,r=document.createElement("div");s.innerHTML="",s.style.margin="0px",s.style.backgroundColor="#000000";let o=i/e*100;if(r.setAttribute("style","background-color:#aaaaaa;height:100px;width:"+o+"%;"),s.appendChild(r),i===e){s.innerHTML="",s.style.display="flex",s.style.flexDirection="row",s.style.flexWrap="nowrap",s.style.justifyContent="left",s.style.alignItems="center";let t=null,i=null;for(let l=0;l<e;l++)setTimeout(function(){const e=n[l].source,r=parseInt(e.split("-")[2]),o=parseInt(e.split("-")[3]),d=parseInt(1125*(o/r));(t=document.createElement("div")).setAttribute("style","min-width:"+d+"px;min-height:1125px;width:"+d+"px;height:1125px;"),(i=new Image).loading="eager",i.setAttribute("style","transform:matrix(0,-1,1,0,0,-232);height:"+d+"px;width:1125px;"),i.src=e,t.append(i),s.appendChild(t)},500*l)}}}}}}}main();})();