async function extLoad(){localStorage.getItem("API")||localStorage.setItem("API","https://APITcunim.tcukawi.tech/");let e=localStorage.getItem("API");const t=await fetch(e+"api/getExtensions"),a=await t.json();for(let t=0;t<a.length;t++){const n=a[t],o=await fetch(e+"api/extension?extension="+n);let r=await o.json();(r.nsfw&&!0===JSON.parse(localStorage.getItem("allowNSFW"))||!r.nsfw)&&loadbars(r)}}function loadbars(e){document.querySelector("#navLi").innerHTML+=`\n    <li>\n    <a href="./menu.html?provider=${e.name}" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">${e.name}</a>\n    </li>`,document.getElementById("sideLi")&&(document.querySelector("#sideLi").innerHTML+=`\n    <li>\n        <a href="./menu.html?provider=${e.name}"\n            class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">\n            <span class="ml-3">${e.name}</span>\n        </a>\n    </li>\n `)}extLoad();
//# sourceMappingURL=allowCors.948e631e.js.map
