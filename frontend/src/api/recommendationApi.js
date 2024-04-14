export const outputRecommendation = async (genre, emotion, weather) => {
    const res = await fetch('http://127.0.0.1:5000/recommendation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            genre: genre,
            emotion: emotion,
            weather: weather
        })
    })
    const recomendations = await res.json()
    console.log(recomendations);
    let finalRecommendations = []
    for(const pair of recomendations){
        const music = await getMusicData(pair[0], pair[1])
        finalRecommendations = [...finalRecommendations, ...music]
    }
    return finalRecommendations
};

export const retryRecommendation = async(prompt) => {
    //The user does not like the recommendation and instead wants: {prompt}.  List the artist name and song title
    const res = await fetch('http://127.0.0.1:5000/recommendation/retry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: prompt,
        })
    })
    const recomendations = await res.json()
    console.log(recomendations);
    let finalRecommendations = []
    for(const pair of recomendations){
        const music = await getMusicData(pair[0], pair[1])
        finalRecommendations = [...finalRecommendations, ...music]
    }
    return finalRecommendations
};

const getMusicData = async (artistName, songTitle) => {
    const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(artistName)}+${encodeURIComponent(songTitle)}&entity=musicTrack&attribute=songTerm`
    );
    const data = await response.json();
    let res = [];
    data.results.forEach(elem => {
        if (elem.artistName.toLocaleLowerCase() === artistName.toLocaleLowerCase() && res.length <= 4) {
            res.push(elem);
        }
    });
    return res;
};


