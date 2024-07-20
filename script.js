document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('loginSection');
    const registerSection = document.getElementById('registerSection');
    const exploreSection = document.getElementById('exploreSection');
    const playlistsSection = document.getElementById('playlistsSection');

    const btnLogin = document.getElementById('btnLogin');
    const btnRegister = document.getElementById('btnRegister');
    const btnExplore = document.getElementById('btnExplore');
    const btnPlaylists = document.getElementById('btnPlaylists');

    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    let users = [];
    let loggedInUser = null;
    let currentAudio = null;

    btnLogin.addEventListener('click', () => {
        showSection(loginSection);
    });

    btnRegister.addEventListener('click', () => {
        showSection(registerSection);
    });

    btnExplore.addEventListener('click', () => {
        if (!loggedInUser) {
            alert('You need to log in first!');
            showSection(loginSection);
        } else {
            showSection(exploreSection);
            fetchMusic();
        }
    });

    btnPlaylists.addEventListener('click', () => {
        if (!loggedInUser) {
            alert('You need to log in first!');
            showSection(loginSection);
        } else {
            showSection(playlistsSection);
            displayPlaylists();
        }
    });


    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            loggedInUser = user;
            alert('Login successful!');
            showSection(exploreSection);
            fetchMusic();
        } else {
            alert('Invalid username or password.');
        }
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        if (users.some(user => user.username === username)) {
            alert('Username already exists.');
        } else {
            users.push({ username, email, password, playlists: [] });
            alert('Registration successful!');
            registerForm.reset();
            showSection(loginSection);
        }
    });

    function showSection(section) {
        document.querySelectorAll('section').forEach(sec => sec.classList.add('hidden'));
        section.classList.remove('hidden');
    }

    function fetchMusic() {
        // Simulate fetching music data from an API
        const musicList = document.getElementById('musicList');
        musicList.innerHTML = '<p>Loading music...</p>';

        setTimeout(() => {
           const musicData = [
                { title: 'Tum Hi Ho', image: '1.jpg', id: 1, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
                { title: 'Shape of You', image: '1.jpg', id: 2, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
                { title: 'Kal Ho Naa Ho', image: '1.jpg', id: 3, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
                { title: 'Blinding Lights', image: '1.jpg', id: 4, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
                { title: 'Tera Ban Jaunga', image: '1.jpg', id: 5, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
                { title: 'Bad Guy', image: '1.jpg', id: 6, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
                { title: 'Tujhe Kitna Chahne Lage', image: '1.jpg', id: 7, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
                { title: 'Senorita', image: '1.jpg', id: 8, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
                { title: 'Kabira', image: '1.jpg', id: 9, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
                { title: 'Someone Like You', image: '1.jpg', id: 10, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3' },
                { title: 'Shayad', image: '1.jpg', id: 11, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3' },
                { title: 'Rolling in the Deep', image: '1.jpg', id: 12, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3' },
                { title: 'Makhna', image: '1.jpg', id: 13, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3' },
                { title: 'Stay', image: '1.jpg', id: 14, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3' },
                { title: 'Bekhayali', image: '1.jpg', id: 15, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3' },
                { title: 'Levitating', image: '1.jpg', id: 16, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3' },
                { title: 'Ghungroo', image: '1.jpg', id: 17, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3' },
                { title: 'Peaches', image: '1.jpg', id: 18, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-18.mp3' },
                { title: 'Hawayein', image: '1.jpg', id: 19, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-19.mp3' },
                { title: 'Stitches', image: '1.jpg', id: 20, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-20.mp3' }
            ];


            musicList.innerHTML = '';
            musicData.forEach(song => {
                const div = document.createElement('div');
                div.classList.add('music-item');
                div.innerHTML = `
                    <img src="${song.image}" alt="${song.title}">
                    <h3>${song.title}</h3>
                    <button data-url="${song.url}">Play</button>
                `;
                musicList.appendChild(div);
            });

            document.querySelectorAll('.music-item button').forEach(btn => {
                btn.addEventListener('click', togglePlayPause);
            });
        }, 1000); // Simulate loading delay
    }

    function togglePlayPause() {
        const url = this.getAttribute('data-url');
        const button = this;

        if (currentAudio && currentAudio.src === url && !currentAudio.paused) {
            currentAudio.pause();
            button.textContent = 'Play';
        } else {
            if (currentAudio) {
                currentAudio.pause();
                document.querySelectorAll('.music-item button').forEach(btn => {
                    if (btn.textContent === 'Pause') btn.textContent = 'Play';
                });
            }
            currentAudio = new Audio(url);
            currentAudio.play();
            button.textContent = 'Pause';
        }

        currentAudio.onended = () => {
            button.textContent = 'Play';
        };
    }

    function displayPlaylists() {
        if (!loggedInUser) return;

        const playlistsList = document.getElementById('playlistsList');
        playlistsList.innerHTML = '';

        if (loggedInUser.playlists.length === 0) {
            playlistsList.innerHTML = '<p>No playlists available.</p>';
        } else {
            loggedInUser.playlists.forEach(playlist => {
                const div = document.createElement('div');
                div.classList.add('playlist-item');
                div.innerHTML = `
                    <img src="https://via.placeholder.com/100" alt="${playlist.name}">
                    <h3>${playlist.name}</h3>
                    <ul>${playlist.songs.map(song => `<li>${song}</li>`).join('')}</ul>
                `;
                playlistsList.appendChild(div);
            });
        }
    }
});
