//TODO: Open AI
export const getRecommendation = (genre, emotion, weather) => {
    //If someone wants to listen to pop and is sad and the weather is rainy. Give me one song recommendation. List the artist name and song title
    return;
}
export const retryRecommendation = (prompt) => {
    //The user does not like the reccomendation and instead wants: {prompt}.  List the artist name and song title
    return;
}

export const getMusicData = async (artistName, songTitle) => {
    console.log(artistName, songTitle)
    const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(artistName)}+${encodeURIComponent(songTitle)}&entity=musicTrack&attribute=songTerm` 
    );
    const data = await response.json()
    let res = []
    data.results.forEach(elem => {
        if(elem.artistName.toLocaleLowerCase() === artistName.toLocaleLowerCase()){
            res.push(elem)
        }
        
    });
    console.log(res)
    return res

}

export const outputRecommendation = () => {

}