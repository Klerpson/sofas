// Visitor Counter
const createVisitorCounter = () => {
    const countElement = document.querySelector('.visitor-count');
    if (!countElement) return;

    const updateCount = () => {
        const min = 8;
        const max = 15;
        const newCount = Math.floor(Math.random() * (max - min + 1) + min);
        
        countElement.textContent = newCount;
    };

    updateCount();
    setInterval(updateCount, Math.random() * 30000 + 15000);
};

// Countdown Timer
const createCountdown = () => {
    const timerElement = document.querySelector('.timer');
    if (!timerElement) return;

    const endTime = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 hours from now

    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = endTime - now;

        const hours = String(Math.floor(distance / (1000 * 60 * 60))).padStart(2, '0');
        const minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
        const seconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');

        timerElement.textContent = `${hours}:${minutes}:${seconds}`;

        if (distance < 0) {
            clearInterval(timerInterval);
            timerElement.textContent = "00:00:00";
        }
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
};

// WhatsApp Dynamic Messages
const initWhatsAppLinks = () => {
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', (e) => {
            let message = "Hola! Me interesa conocer más sobre sus sofás.";
            
            const productCard = link.closest('.product-card');
            if (productCard) {
                const productName = productCard.querySelector('h3').textContent;
                message = `Hola! Me interesa el ${productName}. ¿Podrían darme más información?`;
            }

            const newHref = `https://wa.me/+573XXXXXXXX?text=${encodeURIComponent(message)}`;
            link.href = newHref;

            // Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'WhatsApp',
                    'event_label': link.dataset.tracking || 'generic',
                    'value': 1
                });
            }
        });
    });
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createVisitorCounter();
    createCountdown();
    initWhatsAppLinks();
});