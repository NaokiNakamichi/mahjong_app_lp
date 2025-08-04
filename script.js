// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// カルーセル機能
const carousel = {
    currentSlide: 0,
    slides: [],
    indicators: [],
    track: null,
    realSlideCount: 0,
    
    init() {
        this.slides = document.querySelectorAll('.screenshot-item');
        this.indicators = document.querySelectorAll('.carousel-indicator');
        this.track = document.querySelector('.carousel-track');
        this.realSlideCount = this.indicators.length; // 実際のスライド数（クローンを除く）
        
        if (this.slides.length > 0) {
            this.showSlide(0);
            this.startAutoPlay();
            this.bindEvents();
        }
    },
    
    showSlide(index, instant = false) {
        // トラックを移動
        if (this.track) {
            if (instant) {
                this.track.style.transition = 'none';
            } else {
                this.track.style.transition = 'transform 0.5s ease-in-out';
            }
            this.track.style.transform = `translateX(-${index * 100}%)`;
        }
        
        // インジケーターを更新（クローンの場合は最初のインジケーターをアクティブに）
        const indicatorIndex = index >= this.realSlideCount ? 0 : index;
        this.indicators.forEach(indicator => indicator.classList.remove('active'));
        if (this.indicators[indicatorIndex]) {
            this.indicators[indicatorIndex].classList.add('active');
        }
        
        this.currentSlide = index;
    },
    
    nextSlide() {
        const next = this.currentSlide + 1;
        
        if (next >= this.slides.length) {
            // 最後のクローンスライドまで行ったら、瞬間的に最初に戻る
            this.showSlide(next);
            setTimeout(() => {
                this.showSlide(0, true); // 瞬間移動
            }, 500);
        } else if (next === this.realSlideCount) {
            // 最後の実スライドからクローンへ移動
            this.showSlide(next);
        } else {
            // 通常の移動
            this.showSlide(next);
        }
    },
    
    startAutoPlay() {
        setInterval(() => {
            this.nextSlide();
        }, 4000); // 4秒ごとに切り替え
    },
    
    bindEvents() {
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.showSlide(index);
            });
        });
    }
};

// アプリカルーセル機能
const appCarousels = {
    carousels: [],
    
    init() {
        const carouselElements = document.querySelectorAll('.app-carousel');
        carouselElements.forEach(element => {
            const carouselId = element.getAttribute('data-carousel');
            const track = element.querySelector('.app-carousel-track');
            const items = element.querySelectorAll('.app-carousel-item');
            
            if (items.length > 1) {
                const carouselObj = {
                    id: carouselId,
                    element: element,
                    track: track,
                    items: items,
                    currentSlide: 0
                };
                
                this.carousels.push(carouselObj);
                this.startAutoPlay(carouselObj);
            }
        });
    },
    
    showSlide(carousel, index) {
        if (carousel.track) {
            carousel.track.style.transform = `translateX(-${index * 100}%)`;
            carousel.currentSlide = index;
        }
    },
    
    nextSlide(carousel) {
        const next = (carousel.currentSlide + 1) % carousel.items.length;
        this.showSlide(carousel, next);
    },
    
    startAutoPlay(carousel) {
        setInterval(() => {
            this.nextSlide(carousel);
        }, 3000); // 3秒ごとに切り替え
    }
};

// Google Analyticsイベント追跡
function trackDownload(appName, platform, url) {
    // Google Analytics 4のイベント送信
    if (typeof gtag !== 'undefined') {
        gtag('event', 'app_download_click', {
            'app_name': appName,
            'platform': platform,
            'link_url': url,
            'event_category': 'downloads',
            'event_label': `${appName}_${platform}`
        });
    }
    
    // ログ出力（開発時の確認用）
    console.log(`Download tracked: ${appName} - ${platform}`);
}

// ダウンロードリンクにクリック追跡を追加
function initDownloadTracking() {
    // App Storeリンクの追跡
    document.querySelectorAll('a[href*="apps.apple.com"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const url = this.href;
            let appName = 'unknown';
            
            // URLからアプリ名を判定
            if (url.includes('清一色1000') || url.includes('1559676655')) {
                appName = 'mentin';
            } else if (url.includes('何切るai') || url.includes('6741804459')) {
                appName = 'nanikiru_ai';
            } else if (url.includes('6748280970')) {
                appName = 'nanikiru_haikouritsu';
            }
            
            trackDownload(appName, 'ios', url);
        });
    });
    
    // Google Playリンクの追跡
    document.querySelectorAll('a[href*="play.google.com"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const url = this.href;
            let appName = 'unknown';
            
            // URLからアプリ名を判定
            if (url.includes('Mentin')) {
                appName = 'mentin';
            } else if (url.includes('nanikiru&')) {
                appName = 'nanikiru_ai';
            } else if (url.includes('nanikiru_haikouritsu')) {
                appName = 'nanikiru_haikouritsu';
            }
            
            trackDownload(appName, 'android', url);
        });
    });
}

// カルーセル初期化
document.addEventListener('DOMContentLoaded', () => {
    carousel.init();
    appCarousels.init();
    initDownloadTracking();
});

// スクロールアニメーション
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// アニメーション対象要素
document.querySelectorAll('.course-card, .app-showcase').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// ナビゲーションのスクロール効果
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});