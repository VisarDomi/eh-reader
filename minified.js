javascript:(function(){function main(){const e=prompt("Begin:","1");if(null!==e&&""!==e){let t=[],n=0,i=[];const l=document.getElementById("gdt");if(parseInt(e)<=200)for(let t=e-1;t<l.children.length-1;t++)i.push(l.children[t].children[0].href);const o=parseInt(document.getElementById("gdd").children[0].children[0].children[5].children[1].innerHTML.split("pages")[0]),s=o-e+1;if(o>200&&o<=400){let e=new XMLHttpRequest;e.open("GET",window.location.href+"?p=1"),e.send(),e.onreadystatechange=function(){if(4===e.readyState){const l=e.responseText;for(let e=1;e<=o-200;e++)i.push(l.split("gdtl")[e].split('href="')[1].split('">')[0]);engine(s,i,t,n)}}}else o<=200&&engine(s,i,t,n)}}function engine(e,t,n,i){for(let l=0;l<e;l++)setTimeout(function(){let o=new XMLHttpRequest;o.open("GET",t[l]),o.send(),o.onreadystatechange=function(){if(4===o.readyState){const s=o.responseText.split("nl('")[1].split("')")[0],d=t[l]+"?nl="+s;let r=new XMLHttpRequest;r.open("GET",d),r.send(),r.onreadystatechange=function(){if(4===r.readyState){const t=r.responseText.split('src="')[5].split('"')[0];n.push(t),i++;let l=document.body,o=document.createElement("div");l.innerHTML="",l.style.margin="0px",l.style.backgroundColor="#000000";let s=i/e;if(o.setAttribute("style","background-color:#aaaaaa;height:100px;width:"+100*s+"%;"),l.appendChild(o),i===e){l.innerHTML="";let t=null;for(let i=0;i<e;i++)setTimeout(function(){let e=document.createElement("div");(t=new Image).src=n[i],e.append(t),l.appendChild(e)},500*i)}}}}}},100*l)}main();})();