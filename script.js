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

// 表示中のアプリに合わせてサイドバーのリンクを強調
function initSideNavHighlight() {
    const links = document.querySelectorAll('.side-link');
    const linkById = new Map([...links].map(link => [link.getAttribute('href').slice(1), link]));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            links.forEach(link => link.classList.remove('is-active'));
            const active = linkById.get(entry.target.id);
            if (!active) return;
            active.classList.add('is-active');
            // モバイルの横スクロールバーで強調中のリンクが隠れないようにする
            const sidebar = active.closest('.sidebar');
            if (sidebar.scrollWidth > sidebar.clientWidth) {
                sidebar.scrollTo({ left: active.offsetLeft - 80, behavior: 'smooth' });
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    document.querySelectorAll('.app-card').forEach(card => observer.observe(card));
}

document.addEventListener('DOMContentLoaded', () => {
    initDownloadTracking();
    initSideNavHighlight();
});
