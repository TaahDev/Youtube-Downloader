// static/script.js

document.getElementById('download-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const url = document.getElementById('youtube-url').value;
    const format = document.getElementById('format').value;

    try {
        const response = await fetch('/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: url, format: format }),
        });

        if (!response.ok) {
            throw new Error('Failed to download');
        }

        const blob = await response.blob();
        const urlObject = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = urlObject;
        a.download = `video.${format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(urlObject);
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to download video. Please try again later.');
    }
});
