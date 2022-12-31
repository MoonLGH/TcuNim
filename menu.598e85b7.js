const query=new URLSearchParams(window.location.search);let provider=query.get("provider");console.log(`MainMenu of ${provider}`);let page=1;async function menu(){let e=localStorage.getItem("API");try{document.querySelector("#prov").value=provider;let t=await fetch(e+"api/extension?extension="+provider);t=await t.json(),document.querySelector("#topCard").innerHTML+=`\n            <div class="w-full p-4 text-center bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">\n                <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">${t.name}</h5>\n                <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">${getCountryName(t.lang)}</p>\n            </div>\n        `;let r=await fetch(e+"api/menu?provider="+provider);const a=await r.json();loadLatest(a),loadPopular(a)}catch(e){document.querySelector("#topCard").innerHTML+='\n            <div class="w-full p-4 text-center bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">\n                <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Not Found</h5>\n                <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Make sure you are connected to api</p>\n            </div>\n        '}}async function more(){let e=localStorage.getItem("API");page++;let t=await fetch(e+"api/menu?provider="+provider+`&page=${page}`);const r=await t.json();loadLatest(r),loadPopular(r)}async function loadLatest(e){for(let t=0;t<e.latest.length;t++){let r=e.latest[t];document.querySelector("#latest dl").innerHTML+=`\n    <div class="flex flex-col items-center justify-center">\n    <div class="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">\n       <a href="./detail.html?provider=${provider}&id=${r.url.split("/anime/")[1]}">\n           <img class="p-8 roundex-lg rounded-t-lg m-auto" src="${r.thumbnail_url}" alt="product image" />\n       </a>\n       <div class="px-5 pb-5">\n           <a href="./detail.html?provider=${provider}&id=${r.url.split("/anime/")[1]}">\n               <h5 class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">${r.title}</h5>\n           </a>\n           <div class="flex items-center justify-between">\n               <span class="text-xl font-bold text-gray-900 dark:text-white">${r.totalEps}</span>\n               <a href="./detail.html?provider=${provider}&id=${r.url.split("/anime/")[1]}" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Watch</a>\n           </div>\n       </div>\n   </div>\n </div>`}}async function loadPopular(e){for(let t=0;t<e.popular.length;t++){let r=e.popular[t];document.querySelector("#popular dl").innerHTML+=`\n    <div class="flex flex-col items-center justify-center">\n    <div class="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">\n       <a href="./detail.html?provider=${provider}&id=${r.url.split("/anime/")[1]}">\n           <img class="p-8 rounded-lg rounded-t-lg m-auto" src="${r.thumbnail_url}" alt="product image" />\n       </a>\n       <div class="px-5 pb-5">\n           <a href="./detail.html?provider=${provider}&id=${r.url.split("/anime/")[1]}">\n               <h5 class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">${r.title}</h5>\n           </a>\n           <div class="flex items-center justify-between">\n               <span class="text-xl font-bold text-gray-900 dark:text-white">${r.totalEps}</span>\n               <a href="./detail.html?provider=${provider}&id=${r.url.split("/anime/")[1]}" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Watch</a>\n           </div>\n       </div>\n   </div>\n </div>`}}menu();
//# sourceMappingURL=menu.598e85b7.js.map
