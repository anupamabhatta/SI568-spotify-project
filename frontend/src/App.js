import logo from './logo.svg';
import './App.css';
import {getMusicData, outputRecommendation} from './api/recommendationApi'
import React, { useState, setState } from 'react';

function App() {
  //console.log(getMusicData("Taylor Swift", "Red"));
  const [showRecommendation, setShowRecommendation] = useState(false)
  const [showMusic, setShowMusic] = useState(true)
  const [showRecommendationFeedback, setShowRecommendationFeedback] = useState(false)
  const [formData, setFormData] = useState({
    genre: '',
    emotion: '',
    weather: '',
    feedback: ''
  });
  const [recommendedSongs, setRecommendedSongs] = useState([])
  const [playlist, setPlaylist] = useState([])

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

  }

  const getRecommendation = async (e) => {
    e.preventDefault();
    const { genre, emotion, weather, feedback } = formData
    console.log("getting recommendation", feedback)
    console.log(e)

    //get reccomendation using genre, emotion, weather
    if(feedback === ""){
      const res = await outputRecommendation(genre, emotion, weather);
      console.log(res)
      setRecommendedSongs([...res])
    }
    setFormData({
      genre: '',
      emotion: '',
      weather: '',
      feedback: ''
    })
  }

  const addToPlaylist = (songIndex) => {
    console.log(songIndex)
    setPlaylist([...playlist, recommendedSongs[songIndex]])

    //added song should be removed from recommended display
    const updatedRecommendation = recommendedSongs.filter((item, index) => index !== songIndex);
    console.log(updatedRecommendation)
    setRecommendedSongs([...updatedRecommendation])

    //maybe add to local storage
  }

  const changeView = (isToPlaylist) => {
    if(isToPlaylist){
      setShowMusic(true)
      setShowRecommendation(false)
      setShowRecommendationFeedback(false)
    }
    else{
      setShowMusic(false)
      setShowRecommendation(true)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
      </header>

        <div className = "playlist-top">
          <div className = "playlist-image">
            <h2>Image</h2>
          </div>
          <div className = "playlist-metadata">
            <h2>Playlist</h2>
            <p>Number of Songs: {playlist.length}</p>
            <p>Description</p>
            <div className = "playlist-metadata-buttons">
              <button onClick = {() => changeView(false)}>Get song recommendation</button>
            </div>
          </div>

        </div>
        <div className = "playlist-songs">
          <div className = "recommendation-section" style={{display: showRecommendation ? 'block' : 'none' }}>
            <p>Please fill out the form to get a song recommendation</p>
            <div id="popupForm" class="popup-form">
                <button style = {{margin:'2%'}} onClick = {() => changeView(true)}>Close and go to playlist</button>
                <form id="myForm" onSubmit={(e) => getRecommendation(e)}>
                <label for="genre">Genre:</label>
                  <input type="text" id="name" name="genre" value={formData.genre} onChange = {(e) => handleFormChange(e)}/><br></br>

                  <label for="emotion">Emotion:</label>
                  <input type="text" id="name" name="emotion" value={formData.emotion} onChange = {(e) => handleFormChange(e)}/><br></br>

                  <label for="weather">Weather:</label>
                  <input type="text" id="name" name="weather" value={formData.weather} onChange = {(e) => handleFormChange(e)}/><br></br>

                  <input type="submit" value="Submit"/>
                </form>
              </div>
            <div className= "recommendations" style = {{display: recommendedSongs.length === 0 ? 'none' : 'block'}}>
              <div>
                <button style = {{margin:'2%'}} onClick = {() => setShowRecommendationFeedback(true)}>Add further details to get new recomendation</button>
              </div>
              <div className = "reccomendationTwo" style={{display: showRecommendationFeedback ? 'block' : 'none' }}>
                  <div id="popupFormFeedback" class="popup-form">
                    <form id="feedbackForm" onSubmit={(e) => getRecommendation(e)}>
                      <label for="feedback">Please give feedback on how to improve the song recommendation:</label>
                        <input type="text" id="name" name="feedback" onChange = {(e) => handleFormChange(e)}/>
                        <input type="submit" value="Submit" />
                    </form>
                  </div>  
                </div>
                Recommended Songs: {recommendedSongs.length}
                {recommendedSongs.map((item, index) => (
                    <div key={index} className = "recommended-song">
                      <img src = {item.artworkUrl100} alt = "song cover"/>
                      <div style={{display:'flex', flexDirection: 'column', marginLeft: '5%'}}>
                        Artist Name: {item.artistName} <br></br>
                        Genre: {item.primaryGenreName} <br></br>
                        Track Name: {item.trackName} <br></br>
                        <audio controls>
                          <source src={item.previewUrl} type="audio/mpeg" />
                        </audio>
                        <button onClick = {() => addToPlaylist(index)}> Add song to playlist</button>
                      </div>
                    </div>
                  ))}
              <div>
                <button style = {{margin:'2%'}} onClick = {() => changeView(true)}>Close and go to playlist</button>
                <button style = {{margin:'2%'}} onClick = {() => changeView(false)}>Add further details to get new recomendation</button>
              </div>
            </div>
          </div>
          <div className = "song-section" style={{display: showMusic ? 'block' : 'none' }}>
            Songs
            <div class="row" style = {{backgroundColor: 'white'}}>
              <div class="column">Song</div>
              <div class="column">Artist</div>
              <div class="column">Genre</div>
              <div class="column">Play Song</div>
            </div>
            
            {playlist.map((item, index) => (
              <div key={index} className = "row">
                <div class="column">{item.trackName}</div>
                <div class="column">{item.artistName}</div>
                <div class="column">{item.primaryGenreName}</div>
                <div class="column" >
                  <audio controls style={{width:'100%', height:'100%'}}>
                    <source src={item.previewUrl} type="audio/mpeg"/>
                  </audio>
                </div>
              </div>
              ))}
          </div>
        </div>

    </div>
  );
}

export default App;
