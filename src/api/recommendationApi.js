// import OpenAI from "openai";

// const fetch = require('node-fetch');
// const apiKey = "voc-912598181104020273548265f0c59c074831.67956388"
// //const openai = new OpenAI()

// export const getRecommendation = async (genre, emotion, weather) => {
//     //If someone wants to listen to pop and is sad and the weather is rainy. Give me one song recommendation. List the artist name and song title

//     const prompt = `I want a song recommendation based on the following genre: ${genre},
//      emotion, ${emotion}, and weather:${weather}. 
//      Provide the artist name and song title as a json object with the following 
//      keys: artistName and songTitle`;
//     const url = 'https://api.openai.com/v1/engines/davinci/completions'

//     // const options = {
//     //     method: "POST",
//     //     headers: {
//     //         'Authorization': `Bearer ${apiKey}`,
//     //         'Content-Type': 'application/json',
//     //     },
//     //     body: JSON.stringify({
//     //         model: "gpt-3.5-turbo",
//     //         messages: [{ role: "system", content: "how are you?" }],
//     //         max_tokens: 100,
//     //     })
//     // }

//     const requestBody = JSON.stringify({
//         prompt: "Once upon a time, ",
//         max_tokens: 100
//     });

//     // Define the request headers
//     const requestHeaders = {
//         'Authorization': `Bearer ${apiKey}`,
//         'Content-Type': 'application/json'
//     };

//     try {
//         const res = await fetch(url, {
//             method: 'POST',
//             headers: requestHeaders,
//             body: requestBody
//         });

//         console.log(await res.json());
//     } catch (error) {
//         console.error('Error:', error);
//     }

//     // console.log(res)
// };


// export const retryRecommendation = (prompt) => {
//     //The user does not like the recommendation and instead wants: {prompt}.  List the artist name and song title
//     return;
// }

// export const getMusicData = async (artistName, songTitle) => {
//     console.log(artistName, songTitle)
//     const response = await fetch(
//         `https://itunes.apple.com/search?term=${encodeURIComponent(artistName)}+${encodeURIComponent(songTitle)}&entity=musicTrack&attribute=songTerm`
//     );
//     const data = await response.json()
//     let res = []
//     data.results.forEach(elem => {
//         if (elem.artistName.toLocaleLowerCase() === artistName.toLocaleLowerCase() && res.length <= 4) {
//             res.push(elem)
//         }

//     });
//     console.log(res)
//     return res

// }

// export const outputRecommendation = async (genre, emotion, weather) => {
//     //harding coding api call for now to test
//     await getRecommendation("pop", "happy", "sunny")
//     return await getMusicData("Taylor Swift", "Cruel Summer")

// }



const fetch = require('node-fetch');

// const apiKey = "voc-912598181104020273548265f0c59c074831.67956388";

const getRecommendation = async (genre, emotion, weather) => {
    const prompt = `I want a song recommendation based on the following genre: ${genre},
     emotion, ${emotion}, and weather:${weather}. 
     Provide the artist name and song title as a json object with the following 
     keys: artistName and songTitle`;
    const url = 'http://localhost:3001/generate'; // Backend endpoint

    const requestBody = JSON.stringify({ prompt });

    const requestHeaders = {
        // 'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    };

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: requestHeaders,
            body: requestBody
        });

        console.log(await res.json());
    } catch (error) {
        console.error('Error:', error);
    }
};

const retryRecommendation = (prompt) => {
    //The user does not like the recommendation and instead wants: {prompt}.  List the artist name and song title
    return;
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
    console.log(res);
    return res;
};

const outputRecommendation = async (genre, emotion, weather) => {
    //hardcoding api call for now to test
    await getRecommendation("pop", "happy", "sunny");
    return await getMusicData("Taylor Swift", "Cruel Summer");
};

// Example usage
outputRecommendation("pop", "happy", "sunny");