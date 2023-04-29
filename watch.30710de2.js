const query=new URLSearchParams(window.location.search);let api=localStorage.getItem("API"),provider=query.get("provider"),id=query.get("id");console.log(`provider of ${provider}`),console.log(`query of ${id}`);let videoList=[];async function initData(){let e=await fetch(api+`api/watch?provider=${provider}&id=${id}`);e=await e.json(),await loadData(e),loadVideo(videoList)}async function menu(){try{let e=await fetch(api+"api/extension?extension="+provider);e=await e.json(),console.log(e),document.querySelector("#topCard").innerHTML+=`\n            <div class="w-full p-4 text-center bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">\n                <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">${e.name}</h5>\n                <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">${getCountryName(e.lang)}</p>\n            </div>\n        `}catch(e){console.log(e),document.querySelector("#topCard").innerHTML+='\n            <div class="w-full p-4 text-center bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">\n                <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Not Found</h5>\n                <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Make sure you are connected to api</p>\n            </div>\n        '}}async function loadData(e){document.querySelector("#title").innerText=e.title,document.querySelector("title").innerText=`TcuNim(${provider}) - ${e.title}`;try{for(let t=0;t<e.video.length;t++){let r=e.video[t];videoList.push({url:r.url,quality:r.quality,iframe:!!r.iframe&&r.iframe})}}catch(e){document.querySelector("#topCard").innerHTML+='\n        <div class="w-full p-4 text-center bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">\n            <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Video is detected from "ip-based website"</h5>\n            <a class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">if you want to play the video here, you can download the app version of this web in <a href="./download.html">Here</a> or use this <a href="https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf">Extension (Not Recommended)</a> please <a href="./allowCors.html">README</a> if you want to use the extension</a>\n            <a class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">or just download manually... i guess</a>\n        </div>',document.querySelector("#Notice").innerHTML+='<a href="./allowCors.html" class="btn btn-primary">README</a>',document.querySelector("#Notice").classList.toggle("hidden")}for(let t=0;t<e.downloads.length;t++){let r=e.downloads[t];document.querySelector("#dls").innerHTML+=`\n                <div class="Quality">\n                <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">${r.quality}</h2>\n                <ul class="space-y-1 max-w-md list-disc list-inside text-gray-500 dark:text-gray-400">\n                    ${r.links.map((e=>`<li><a href="${e.url}">${e.provider}</a></li>`)).join("")}\n                </ul>\n            </div>\n            `}e.prev&&(document.querySelector("#prev").setAttribute("href",`./watch.html?provider=${provider}&id=${e.prev}`),document.querySelector("#prev").classList.toggle("hidden")),e.next&&(document.querySelector("#next").setAttribute("href",`./watch.html?provider=${provider}&id=${e.next}`),document.querySelector("#next").classList.toggle("hidden"))}function loadVideo(e){if(selectVideo(e[0].quality),!(e.length<2)){for(let t=0;t<e.length;t++)document.querySelector("#quality").innerHTML+=`<option>${e[t].quality}</option>`;document.querySelector("#selQua").classList.toggle("hidden")}}function selectVideo(e){console.log(e);let t=videoList.find((t=>t.quality===e));console.log(t),t.iframe?(document.querySelector("#watchUrl").classList.add("hidden"),document.querySelector("#watchUrliframe").classList.remove("hidden"),document.querySelector("#watchUrliframe").setAttribute("src",t.url)):(document.querySelector("#watchUrl").classList.remove("hidden"),document.querySelector("#watchUrliframe").classList.add("hidden"),document.querySelector("#watchUrl").setAttribute("src",t.url))}initData(),menu();
//# sourceMappingURL=watch.30710de2.js.map