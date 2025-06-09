// モバイルメニューの開閉
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('active');
}

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

// スクロールアニメーション
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// ページ読み込み時にアニメーション要素を監視
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.fade-in').forEach((el) => {
        observer.observe(el);
    });
});

// ヘッダーのスクロール効果
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// パララックス効果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-visual');
    if (parallax && window.innerWidth > 768) {
        const speed = 0.5;
        parallax.style.transform = `translateY(${scrolled * speed}px)`;
    }
});

// カードのホバー効果
document.querySelectorAll('.card-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateZ(20px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateZ(0) scale(1)';
    });
});

// アプリカードのクリック効果
document.querySelectorAll('.app-cta:not(.coming-soon)').forEach(button => {
    button.addEventListener('click', function(e) {
        // リップル効果
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// 統計カウントアップアニメーション
const animateCount = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        if (target === 1000) {
            element.textContent = Math.floor(current) + '+';
        } else if (target === 3) {
            element.textContent = Math.floor(current);
        } else {
            element.textContent = element.textContent;
        }
    }, 20);
};

// 統計セクションのアニメーション
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const statItems = entry.target.querySelectorAll('.stat-item h3');
            statItems.forEach(item => {
                const text = item.textContent;
                if (text.includes('1000+')) {
                    animateCount(item, 1000);
                } else if (text === '3') {
                    animateCount(item, 3);
                }
            });
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats-container');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// モバイルでのタッチ効果
if ('ontouchstart' in window) {
    document.querySelectorAll('.btn, .app-card').forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

// ページ読み込み完了時のアニメーション
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // ヒーローセクションのアニメーション
    setTimeout(() => {
        document.querySelector('.hero-content')?.classList.add('visible');
    }, 100);
    
    setTimeout(() => {
        document.querySelector('.hero-visual')?.classList.add('visible');
    }, 300);
});

// リサイズ時の処理
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // モバイルメニューを閉じる
        if (window.innerWidth > 768) {
            document.getElementById('mobileNav').classList.remove('active');
        }
        
        // パララックス効果のリセット
        if (window.innerWidth <= 768) {
            const parallax = document.querySelector('.hero-visual');
            if (parallax) {
                parallax.style.transform = '';
            }
        }
    }, 250);
});

// リップル効果のスタイル追加
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .app-cta {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);