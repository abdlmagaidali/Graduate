import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-storage.js";

const db = getFirestore();
const storage = getStorage();

document.addEventListener('DOMContentLoaded', function() {
    // Memory Section
    const memoriesContainer = document.getElementById('memories-container');
    const memoryText = document.getElementById('memory-text');

    async function loadMemories() {
        const querySnapshot = await getDocs(collection(db, 'memories'));
        memoriesContainer.innerHTML = '';
        querySnapshot.forEach(doc => {
            const memory = doc.data();
            const memoryElement = document.createElement('div');
            memoryElement.classList.add('memory-item');
            memoryElement.innerHTML = `<p>${memory.text}</p><button onclick="deleteMemory('${doc.id}')">حذف</button>`;
            memoriesContainer.appendChild(memoryElement);
        });
    }

    window.addMemory = async function() {
        const text = memoryText.value.trim();
        if (text) {
            await addDoc(collection(db, 'memories'), { text });
            loadMemories();
            memoryText.value = '';
        }
    }

    window.deleteMemory = async function(id) {
        await deleteDoc(doc(db, 'memories', id));
        loadMemories();
    }

    if (memoriesContainer) loadMemories();

    // Gallery Section
    const imageUpload = document.getElementById('image-upload');
    const galleryContainer = document.getElementById('gallery-container');
    const imageUsername = document.getElementById('image-username');

    async function loadImages() {
        const querySnapshot = await getDocs(collection(db, 'images'));
        galleryContainer.innerHTML = '';
        querySnapshot.forEach(doc => {
            const image = doc.data();
            const imageElement = document.createElement('div');
            imageElement.classList.add('image-container');
            imageElement.innerHTML = `<img src="${image.url}" alt="image"><div>${image.username}</div><button onclick="deleteImage('${doc.id}')">حذف</button>`;
            galleryContainer.appendChild(imageElement);
        });
    }

    window.uploadImage = async function() {
        const files = imageUpload.files;
        const username = imageUsername.value.trim() || 'مستخدم مجهول';
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const storageRef = ref(storage, `images/${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            const url = await getDownloadURL(snapshot.ref);
            await addDoc(collection(db, 'images'), { url, username });
            loadImages();
        }
    }

    window.deleteImage = async function(id) {
        const docRef = doc(db, 'images', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const image = docSnap.data();
            const storageRef = ref(storage, image.url);
            await deleteObject(storageRef);
            await deleteDoc(docRef);
            loadImages();
        }
    }

    if (galleryContainer) loadImages();

    // Videos Section
    const videoUpload = document.getElementById('video-upload');
    const videosContainer = document.getElementById('videos-container');
    const videoUsername = document.getElementById('video-username');

    async function loadVideos() {
        const querySnapshot = await getDocs(collection(db, 'videos'));
        videosContainer.innerHTML = '';
        querySnapshot.forEach(doc => {
            const video = doc.data();
            const videoElement = document.createElement('div');
            videoElement.classList.add('video-container');
            videoElement.innerHTML = `<video src="${video.url}" controls></video><div>${video.username}</div><button onclick="deleteVideo('${doc.id}')">حذف</button>`;
            videosContainer.appendChild(videoElement);
        });
    }

    window.uploadVideo = async function() {
        const files = videoUpload.files;
        const username = videoUsername.value.trim() || 'مستخدم مجهول';
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const storageRef = ref(storage, `videos/${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            const url = await getDownloadURL(snapshot.ref);
            await addDoc(collection(db, 'videos'), { url, username });
            loadVideos();
        }
    }

    window.deleteVideo = async function(id) {
        const docRef = doc(db, 'videos', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const video = docSnap.data();
            const storageRef = ref(storage, video.url);
            await deleteObject(storageRef);
            await deleteDoc(docRef);
            loadVideos();
        }
    }

    if (videosContainer) loadVideos();
});