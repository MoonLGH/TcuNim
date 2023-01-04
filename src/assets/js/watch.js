const query = new URLSearchParams(window.location.search)

let provider = query.get("provider")
let id = query.get("id")

console.log(`provider of ${provider}`)
console.log(`query of ${id}`)

let videoList = []
menu()
async function menu() {
    let api = localStorage.getItem("API");
    try {
        let data = await fetch(api + "api/extension?extension=" + provider)
        data = await data.json();
        console.log(data)
        document.querySelector("#topCard").innerHTML += `
            <div class="w-full p-4 text-center bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">${data.name}</h5>
                <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">${getCountryName(data.lang)}</p>
            </div>
        `

        let watch = await fetch(api+`api/watch?provider=${provider}&id=${id}`)
        watch = await watch.json()
        await loadData(watch)
        loadVideo(videoList)
    } catch (error) {
        console.log(error)
        document.querySelector("#topCard").innerHTML += `
            <div class="w-full p-4 text-center bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Not Found</h5>
                <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Make sure you are connected to api</p>
            </div>
        `
    }
}

async function loadData(data){
    document.querySelector("#title").innerText = data.title
    try {
        for (let i = 0; i < data.video.length; i++) {
            let video = data.video[i]
            if(video.url.toLowerCase().includes("zippy")){
                let link = await parseZippy(video.url)
                videoList.push({url:link,quality:video.quality})
            } else {
                videoList.push({url:video.url,quality:video.quality})
            }
        }
    } catch (err) {
        document.querySelector("#topCard").innerHTML += `
        <div class="w-full p-4 text-center bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Video is detected from "ip-based website"</h5>
            <a class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">if you want to play the video here, you can download the app version of this web in <a href="./download.html">Here</a> or use this <a href="https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf">Extension (Not Recommended)</a> please <a href="./allowCors.html">README</a> if you want to use the extension</a>
            <a class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">or just download manually... i guess</a>
        </div>`
        document.querySelector("#Notice").innerHTML += `<a href="./allowCors.html" class="btn btn-primary">README</a>`
        document.querySelector("#Notice").classList.toggle("hidden")
    }
    // loop data.downloads
    for (let i = 0; i < data.downloads.length; i++) {
        let download = data.downloads[i]
        document.querySelector("#dls").innerHTML += `
                <div class="Quality">
                <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">${download.quality}</h2>
                <ul class="space-y-1 max-w-md list-disc list-inside text-gray-500 dark:text-gray-400">
                    ${download.links.map((link) => `<li><a href="${link.url}">${link.provider}</a></li>`).join("")}
                </ul>
            </div>
            `
    }
    if(data.prev){
        document.querySelector("#prev").setAttribute("href", `./watch.html?provider=${provider}&id=${data.prev}`)
        document.querySelector("#prev").classList.toggle("hidden")
    }
    if(data.next){
        document.querySelector("#next").setAttribute("href", `./watch.html?provider=${provider}&id=${data.next}`)
        document.querySelector("#next").classList.toggle("hidden")
    }
}

async function parseZippy(url) {
    let res = (await (await fetch(url)).text())
    // const $ = load(res.data);
    res = res.split("document.getElementById('dlbutton').href")[1]
    let link = url.substring(0, url.indexOf("/d/"));
    const firstString = res.substring(
      res.indexOf(" = \"") + 4,
      res.indexOf("\" + ("),
    );
    const num = parseInt(res.split("+ (")[1].split("%")[0]);
    // console.log(num);
    const lastString = res.substring(
      res.indexOf("913) + \"") + 8,
      res.indexOf("\";"),
    );
    const nums = (num % 51245 + num % 913);
    link += firstString + nums.toString() + lastString;
    console.log(link)
    return link;
  }
  
function loadVideo(data){
    // loop data
    selectVideo(data[0].quality)
    if(data.length < 2) return
    for (let i = 0; i < data.length; i++) {
        document.querySelector("#quality").innerHTML += `<option>${data[i].quality}</option>`        
    }
    document.querySelector("#selQua").classList.toggle("hidden")
}

function selectVideo(selector){
    console.log(selector)
    let video = videoList.find((el) => el.quality === selector)
    console.log(video)
    document.querySelector("#watchUrl").setAttribute("src",video.url)
}