document.addEventListener('DOMContentLoaded', function() {
    // Memory Section
    const memoriesContainer = document.getElementById('memories-container');
    const memoryText = document.getElementById('memory-text');

    function loadMemories() {
        const memories = JSON.parse(localStorage.getItem('memories') || '[]');
        memoriesContainer.innerHTML = '';
        memories.forEach(memory => {
            const memoryElement = document.createElement('div');
            memoryElement.classList.add('memory-item');
            memoryElement.innerHTML = `<p>${memory.text}</p><button onclick="deleteMemory('${memory.id}')">حذف</button>`;
            memoriesContainer.appendChild(memoryElement);
        });
    }

    window.addMemory = function() {
        const text = memoryText.value.trim();
        if (text) {
            const memories = JSON.parse(localStorage.getItem('memories') || '[]');
            const id = Date.now().toString();
            memories.push({ id, text });
            localStorage.setItem('memories', JSON.stringify(memories));
            loadMemories();
            memoryText.value = '';
        }
    }

    window.deleteMemory = function(id) {
        let memories = JSON.parse(localStorage.getItem('memories') || '[]');
        memories = memories.filter(memory => memory.id !== id);
        localStorage.setItem('memories', JSON.stringify(memories));
        loadMemories();
    }

    if (memoriesContainer) loadMemories();

    // Gallery Section
    const imageUpload = document.getElementById('image-upload');
    const galleryContainer = document.getElementById('gallery-container');
    const imageUsername = document.getElementById('image-username');

    function loadImages() {
        const images = JSON.parse(localStorage.getItem('images') || '[]');
        galleryContainer.innerHTML = '';
        images.forEach(image => {
            const imageElement = document.createElement('div');
            imageElement.classList.add('image-container');
            imageElement.innerHTML = `<img src="${image.src}" alt="image"><div>${image.username}</div><button onclick="deleteImage('${image.id}')">حذف</button>`;
            galleryContainer.appendChild(imageElement);
        });
    }

    window.uploadImage = function() {
        const files = imageUpload.files;
        const username = imageUsername.value.trim() || 'مستخدم مجهول';
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onload = function(e) {
                const images = JSON.parse(localStorage.getItem('images') || '[]');
                const id = Date.now().toString();
                images.push({ id, src: e.target.result, username });
                localStorage.setItem('images', JSON.stringify(images));
                loadImages();
            }

            reader.readAsDataURL(file);
        }
    }

    window.deleteImage = function(id) {
        let images = JSON.parse(localStorage.getItem('images') || '[]');
        images = images.filter(image => image.id !== id);
        localStorage.setItem('images', JSON.stringify(images));
        loadImages();
    }

    if (galleryContainer) loadImages();

    // Videos Section
    const videoUpload = document.getElementById('video-upload');
    const videosContainer = document.getElementById('videos-container');
    const videoUsername = document.getElementById('video-username');

    function loadVideos() {
        const videos = JSON.parse(localStorage.getItem('videos') || '[]');
        videosContainer.innerHTML = '';
        videos.forEach(video => {
            const videoElement = document.createElement('div');
            videoElement.classList.add('video-container');
            videoElement.innerHTML = `<video src="${video.src}" controls></video><div>${video.username}</div><button onclick="deleteVideo('${video.id}')">حذف</button>`;
            videosContainer.appendChild(videoElement);
        });
    }

    window.uploadVideo = function() {
        const files = videoUpload.files;
        const username = videoUsername.value.trim() || 'مستخدم مجهول';
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onload = function(e) {
                const videos = JSON.parse(localStorage.getItem('videos') || '[]');
                const id = Date.now().toString();
                videos.push({ id, src: e.target.result, username });
                localStorage.setItem('videos', JSON.stringify(videos));
                loadVideos();
            }

            reader.readAsDataURL(file);
        }
    }

    window.deleteVideo = function(id) {
        let videos = JSON.parse(localStorage.getItem('videos') || '[]');
        videos = videos.filter(video => video.id !== id);
        localStorage.setItem('videos', JSON.stringify(videos));
        loadVideos();
    }

    if (videosContainer) loadVideos();
});