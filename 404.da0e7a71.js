async function main(){localStorage.getItem("API")||localStorage.setItem("API","https://APITcunim.tcukawi.tech/");let t=localStorage.getItem("API");try{const e=await fetch(t+"api/getExtensions"),a=await e.json();for(let e=0;e<a.length;e++){const n=a[e],r=await fetch(t+"api/extension?extension="+n);loadExt(await r.json())}}catch(t){return void(document.querySelector("#main").innerHTML+="Faliled to fetching data, try refreshing the page or change api url")}}function loadExt(t){document.querySelector("#main").innerHTML+=`\n        <a href="./menu.html?provider=${t.name}" class="block mt-12 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">\n        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${t.name}</h5>\n            <p class="font-normal text-gray-700 dark:text-gray-400">${getCountryName(t.lang)}</p>\n        </a>\n     `}main();
//# sourceMappingURL=404.da0e7a71.js.map
