const form = document.getElementById('form')
const search = document.getElementById('search')
const result = document.getElementById('result')
const more = document.getElementById('more')

// search.value = 'bodyslam'

const apiURL = "https://api.lyrics.ovh/"
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const songtxt = search.value.trim()
  if(!songtxt){
    alert('คุณป้อนข้อมูลไม่ถูกต้อง')
  }else{
    searchLyric(songtxt)
  }
})
async function searchLyric(songtxt){
  const res = await fetch(`${apiURL}suggest/${songtxt}`)
  const allSongs = await res.json()
  console.log(allSongs)
  showData(allSongs)
}
function showData(songs){
  result.innerHTML = `
    <ul class="songs">
      ${songs.data.map(song => {
        return `<li>
          <span>
            <strong>${song.artist.name} - ${song.title}</strong>
          </span>          
          <button class="btn"
            data-artist="${song.artist.name}"
            data-title="${song.title}"            
          >เนื้อเพลง</button>
        </li>`
      }).join("")}
    </ul>
  `
  if(songs.next || songs.prev){
    more.innerHTML=`
      ${songs.prev ? `<button class="btn" onClick="getMoreSongs('${songs.prev}')"><< ก่อนหน้า</button>` : ''}
      ${songs.next ? `<button class="btn" onClick="getMoreSongs('${songs.next}')">ถัดไป >></button>` : ''}
    `
  }else{
    more.innerHTML=''
  }
}

async function getMoreSongs(songsUrl){
  // console.log(next)
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${songsUrl}`)
  const allSongs = await res.json()
  // console.log(allSongs)
  showData(allSongs)
}

result.addEventListener("click", e => {
  const clickEl = e.target
  if(clickEl.tagName == 'BUTTON'){
    const artist = clickEl.getAttribute('data-artist')
    const title = clickEl.getAttribute('data-title')
    getLyric(artist, title)    
  }
})

async function getLyric(artist, title){
  const res = await fetch(`${apiURL}v1/${artist}/${title}`)
    const lyrics = await res.json()
    if(lyrics.lyrics){
      result.innerHTML = `<h2>${artist} - ${title}</h2>
        <pre>${lyrics.lyrics}</pre>
      `
    }else{
      result.innerHTML = `<h2>${artist} - ${title}</h2>
        <p>ไม่พบเนื้อเพลง</p>
      `
    }
    // const prevBtn = document.createElement("button")
    // prevBtn.className="btn"
    // prevBtn.innerHTML="ย้อนกลับ"
    // prevBtn.setAttribute('onClick', ()=>searchLyric(search.value))
    // result.appendChild(prevBtn)
    more.innerHTML=""
    console.log(lyrics)
}
