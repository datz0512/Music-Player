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

const app = {
    currentIndex: 0,
    isPlaying: false,
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
    ],
    render: function() {
        const htmls = this.songs.map(song => {
            return `
                <div class="song">
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
        audio.onplay = function(){
            app.isPlaying = true
            player.classList.add('playing')
        }
        audio.onpause = function(){
            app.isPlaying = false
            player.classList.remove('playing')
        }
        audio.ontimeupdate = function(){
            if(audio.duration){
                const progressPercent = audio.currentTime / audio.duration * 100
                progress.value = progressPercent
            }
        }
        progress.onchange = function(e){
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime;
        }
    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    start: function() {
        this.defineProperties()
        this.handleEvents()
        this.loadCurrentSong()
        this.render()
    }
}
app.start();