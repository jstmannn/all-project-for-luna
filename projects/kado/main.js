onload = () => {
    document.body.classList.remove("container");
    
    // Cek apakah user sudah berinteraksi dari halaman sebelumnya
    const audioEnabled = sessionStorage.getItem('audioEnabled');
    const audio = document.getElementById('bgMusic');
    
    if (audio) {
        // Coba putar musik
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Musik berhasil diputar
                console.log('Audio playing successfully');
            }).catch(error => {
                // Jika gagal, tambahkan event listener untuk tap/click pertama
                console.log('Autoplay prevented, waiting for user interaction');
                
                const startAudio = () => {
                    audio.play().then(() => {
                        console.log('Audio started after user interaction');
                    }).catch(e => {
                        console.error('Failed to play audio:', e);
                    });
                    
                    // Hapus event listener setelah audio dimulai
                    document.removeEventListener('click', startAudio);
                    document.removeEventListener('touchstart', startAudio);
                };
                
                // Tambahkan event listener untuk interaksi pertama
                document.addEventListener('click', startAudio);
                document.addEventListener('touchstart', startAudio);
            });
        }
    }
};