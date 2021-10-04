const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const cdWidth = cd.offsetWidth
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [{
            name: 'Chung ta sau nay',
            singer: 'TRI',
            path: './assets/music/ChungTaSauNay-TRI-6929586.mp3',
            image: './assets/img/chungtasaunay.jpeg'
        },
        {
            name: 'Co hen voi thanh xuan',
            singer: 'MONSTAR',
            path: './assets/music/cohenvoithanhxuan-MONSTAR-7050201.mp3',
            image: './assets/img/cohenvoithanhxuan.jpeg'
        },
        {
            name: 'Cuoi thoi',
            singer: 'Masew',
            path: './assets/music/CuoiThoi-MasewMasiuBRayTAPVietNam-7085648.mp3',
            image: './assets/img/cuoithoi.jpeg'
        },
        {
            name: 'Niu duyen',
            singer: 'Le Bao Binh',
            path: './assets/music/NiuDuyen-LeBaoBinh-6872127.mp3',
            image: './assets/img/niuduyen.jpeg'
        },
        {
            name: 'Thuc giac',
            singer: 'DaLAB',
            path: './assets/music/ThucGiac-DaLAB-7048212.mp3',
            image: './assets/img/thucgiac.jpeg'
        },
        {
            name: 'Chung ta sau nay',
            singer: 'TRI',
            path: './assets/music/ChungTaSauNay-TRI-6929586.mp3',
            image: './assets/img/chungtasaunay.jpeg'
        },
        {
            name: 'Co hen voi thanh xuan',
            singer: 'MONSTAR',
            path: './assets/music/cohenvoithanhxuan-MONSTAR-7050201.mp3',
            image: './assets/img/cohenvoithanhxuan.jpeg'
        },
        {
            name: 'Cuoi thoi',
            singer: 'Masew',
            path: './assets/music/CuoiThoi-MasewMasiuBRayTAPVietNam-7085648.mp3',
            image: './assets/img/cuoithoi.jpeg'
        },
        {
            name: 'Niu duyen',
            singer: 'Le Bao Binh',
            path: './assets/music/NiuDuyen-LeBaoBinh-6872127.mp3',
            image: './assets/img/niuduyen.jpeg'
        },
        {
            name: 'Co hen voi thanh xuan',
            singer: 'MONSTAR',
            path: './assets/music/cohenvoithanhxuan-MONSTAR-7050201.mp3',
            image: './assets/img/cohenvoithanhxuan.jpeg'
        },
        {
            name: 'Cuoi thoi',
            singer: 'Masew',
            path: './assets/music/CuoiThoi-MasewMasiuBRayTAPVietNam-7085648.mp3',
            image: './assets/img/cuoithoi.jpeg'
        },
        {
            name: 'Niu duyen',
            singer: 'Le Bao Binh',
            path: './assets/music/NiuDuyen-LeBaoBinh-6872127.mp3',
            image: './assets/img/niuduyen.jpeg'
        },
        {
            name: 'Thuc giac',
            singer: 'DaLAB',
            path: './assets/music/ThucGiac-DaLAB-7048212.mp3',
            image: './assets/img/thucgiac.jpeg'
        },
        {
            name: 'Chung ta sau nay',
            singer: 'TRI',
            path: './assets/music/ChungTaSauNay-TRI-6929586.mp3',
            image: './assets/img/chungtasaunay.jpeg'
        },
        {
            name: 'Co hen voi thanh xuan',
            singer: 'MONSTAR',
            path: './assets/music/cohenvoithanhxuan-MONSTAR-7050201.mp3',
            image: './assets/img/cohenvoithanhxuan.jpeg'
        },
        {
            name: 'Cuoi thoi',
            singer: 'Masew',
            path: './assets/music/CuoiThoi-MasewMasiuBRayTAPVietNam-7085648.mp3',
            image: './assets/img/cuoithoi.jpeg'
        },
        {
            name: 'Niu duyen',
            singer: 'Le Bao Binh',
            path: './assets/music/NiuDuyen-LeBaoBinh-6872127.mp3',
            image: './assets/img/niuduyen.jpeg'
        },
    ],

    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${index === this.currentIndex ? 'active' : ''}">
                    <div class="thumb" 
                        style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        $('.playlist').innerHTML = htmls.join('')
    },

    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },

    handleEvents: function() {
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity
        });
        cdThumbAnimate.pause()

        document.onscroll = function() {
            const scrollTop = window.scrollY;
            const newCdWidth = cdWidth - scrollTop;

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }
        playBtn.onclick = function(){
            if(app.isPlaying){
                audio.pause()
            }else{      
                audio.play()
            }
        }
        audio.onpause = function(){
            app.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }
        audio.onplay = function(){
            app.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }
        audio.ontimeupdate = function(){
            if(audio.duration){
                const progressPercent = audio.currentTime / audio.duration * 100
                progress.value = progressPercent
            }
        }
        progress.oninput = function (e) {
            audio.pause();
            setTimeout(() => {
              audio.play();
            }, 300);
            const seekTime = e.target.value * (audio.duration / 100);
            audio.currentTime = seekTime;
        }
        nextBtn.onclick = function(){
            if(app.isRandom){
                app.playRandomSong()
            }else{
                app.nextSong()
            }
            audio.play()
            app.render()
            app.scrollToActiveSong()
        }
        prevBtn.onclick = function(){
            if(app.isRandom){
                app.playRandomSong()
            }else{
                app.prevSong()
            }
            audio.play()
            app.render()
            app.scrollToActiveSong()
        }
        randomBtn.onclick = function(e){
            if(app.isRandom){
                app.isRandom = false
                randomBtn.classList.remove('active')
            }else{
                app.isRandom = true
                randomBtn.classList.add('active')
            }
        }
        repeatBtn.onclick = function(e){
            if(app.isRepeat){
                app.isRepeat = false
                repeatBtn.classList.remove('active')
            }else{
                app.isRepeat = true
                repeatBtn.classList.add('active')
            }
        }
        audio.onended = function(){
            if(app.isRepeat){
                audio.play()
            }else{
                nextBtn.click()
            }
        }
    },
    scrollToActiveSong: function(){
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            })
        }, 200)
    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    nextSong: function(){
        this.currentIndex++
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function(){
        this.currentIndex--
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    playRandomSong: function(){
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        }while(newIndex === this.currentIndex)

        this.currentIndex = newIndex
        this.loadCurrentSong()
    },

    start: function() {
        this.defineProperties()
        this.handleEvents()
        this.loadCurrentSong()
        this.render()
    }
}
app.start();