from flask import Flask, request, jsonify
from openai import OpenAI
from flask_cors import CORS
app = Flask(__name__)
CORS(app) 


key = "voc-912598181104020273548265f0c59c074831.67956388"
@app.route('/recommendation',  methods=['POST'])
def getRecommendation():
    data = request.json
    genre = data.get('genre')
    emotion = data.get('emotion')
    weather = data.get('weather')
    prompt = f'''I want 3 song recommendations based on the following genre: {genre},
    emotion, {emotion}, and weather:{weather}. 
    Return the list of artistName and songTitle each seperated by $$$ and no blank space. 
    After each pair write "DONE".
    Do not write anything else in the response''';
    
    client = OpenAI(base_url="https://openai.vocareum.com/v1", api_key="voc-1171081500104020299037465f0c4ce94a490.99330066")
    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": prompt},
        {"role": "user", "content": "Hello!"}
    ]

    )
    res = completion.choices[0].message.content
    res = res.split('DONE')
    res = [val.strip() for val in res]
    res = [val.split('$$$') for val in res]
    return jsonify(res)

@app.route('/recommendation/retry',  methods=['POST'])
def getRecommendationMoreDetail():
    data = request.json
    prompt = data.get('prompt')
    prompt = f'''I want 3 song recommendations based on the following prompt: {prompt}. 
    Return the list of artistName and songTitle each seperated by $$$ and no blank space. 
    After each pair write "DONE".
    Do not write anything else in the response''';
    
    client = OpenAI(base_url="https://openai.vocareum.com/v1", api_key="voc-1171081500104020299037465f0c4ce94a490.99330066")
    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": prompt},
        {"role": "user", "content": "Hello!"}
    ]

    )
    res = completion.choices[0].message.content
    res = res.split('DONE')
    res = [val.strip() for val in res]
    res = [val.split('$$$') for val in res]
    return jsonify(res)


if __name__ == '__main__':
    app.run(debug=True)
