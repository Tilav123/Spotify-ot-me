const options = {
    headers: {
        'Content-Type': 'application/json'
    }
};
let dow_num = 0
let act;
let checkResponse;
async function download(id) {
    if (dow_num == 0) {
        dow_num = 1
        act = active_obj
        alert(`Are you sure you want to download the song: ${act.name}?`)
        let nim = act.name + ' - ' + act.album.artists[0].name
        let nam_track = nim.replace(/ /g, '%20')
        const url = `https://spotify-scraper.p.rapidapi.com/v1/track/download?track=${nam_track}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'e3b615bee6msh8f6b1824ffda622p17c52ajsn9b8e4c368be5',
                'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
            }
        };
        fetch(url, options)
            .then(res => res.json())
            .then(result => {
                console.log(result.youtubeVideo.audio[0].url);
                let links = result.youtubeVideo.audio[0].url
                function down() {
                    let ling = document.createElement('a')
                    ling.href = links
                    ling.download = ``
                    ling.click()
                    dow_num = 0
                    download_music_arr.unshift(act)
                    download_music_arr[0].album.release_date = date()
                    download_music_arr[0].preview_url = links
                    if (download_music_arr.length > 0) {
                        download_music_arr = remove_duplicates(download_music_arr)
                        localStorage.setItem('Download Songs', JSON.stringify(download_music_arr))
                    }
                    alert(`Song: ${act.name} downloaded!`)
                }
                setTimeout(() => {
                    down()
                }, 5000)
            })
    } else {
        alert(`Please wait, song ${act.name} is loading...`)
    }
}