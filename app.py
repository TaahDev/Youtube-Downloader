from flask import Flask, render_template, request, jsonify, send_file
from pytube import YouTube

app = Flask(__name__, static_url_path='/static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/download', methods=['POST'])
def download():
    data = request.json
    url = data['url']
    format = data['format']

    try:
        yt = YouTube(url)
        
        if format == 'mp3':
            stream = yt.streams.filter(only_audio=True).first()
            temp_file = stream.download()

        else:
            stream = yt.streams.get_highest_resolution()
            temp_file = stream.download()

        return send_file(temp_file, as_attachment=True)
    
    except Exception as e:
        print(f"Download Error: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
