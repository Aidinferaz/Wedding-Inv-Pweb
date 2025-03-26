document.addEventListener('DOMContentLoaded', function() {
    // RSVP Form handling
    const rsvpForm = document.getElementById('rsvp-form');
    const rsvpMessage = document.getElementById('rsvp-message');

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const attending = document.querySelector('input[name="attending"]:checked');
            
            if (name && email && attending) {
                // Simulate form submission
                rsvpForm.classList.add('sending');
                
                setTimeout(() => {
                    rsvpMessage.textContent = `Terima kasih, ${name}! Konfirmasi kehadiran Anda telah kami terima.`;
                    rsvpMessage.style.color = 'var(--success-color)';
                    rsvpMessage.style.backgroundColor = 'rgba(74, 143, 84, 0.1)';
                    rsvpMessage.style.padding = '15px';
                    rsvpForm.reset();
                    rsvpForm.classList.remove('sending');
                    
                    // Scroll to message
                    rsvpMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 1500);
            } else {
                rsvpMessage.textContent = 'Mohon lengkapi nama, email, dan status kehadiran Anda.';
                rsvpMessage.style.color = '#d23b3b';
                rsvpMessage.style.backgroundColor = 'rgba(210, 59, 59, 0.1)';
                rsvpMessage.style.padding = '15px';
            }
        });
    }

    // Smooth scroll for internal links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Guest name personalization
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');
    
    if (guestName) {
        const guestNameElements = document.querySelectorAll('.guest-name');
        guestNameElements.forEach(el => {
            el.textContent = guestName;
        });
    }
    
    // Handle form inputs animation
    const formInputs = document.querySelectorAll('#rsvp-form input, #rsvp-form select, #rsvp-form textarea');
    
    formInputs.forEach(input => {
        const formGroup = input.closest('.form-group');
        
        input.addEventListener('focus', () => {
            formGroup.classList.add('input-focused');
        });
        
        input.addEventListener('blur', () => {
            if (input.value === '') {
                formGroup.classList.remove('input-focused');
            }
        });
        
        // Check if input has value on load
        if (input.value !== '') {
            formGroup.classList.add('input-focused');
        }
    });
    
    // Initialize AOS (if using)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
});

// Copy to clipboard function
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(function() {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Tersalin';
        button.classList.add('copied');
        
        setTimeout(function() {
            button.innerHTML = originalText;
            button.classList.remove('copied');
        }, 2000);
    }).catch(function(err) {
        console.error('Gagal menyalin teks: ', err);
    });
}