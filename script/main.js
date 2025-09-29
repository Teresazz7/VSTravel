const navToggle = document.querySelector('.nav-toggle')
const nav = document.querySelector('nav')
if (navToggle && nav) {
	navToggle.addEventListener('click', () => {
		nav.classList.toggle('open')
	})
}

document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('destinationOverlay');
    const openBtn = document.querySelector('.destination-card .see-more-btn');
    const closeBtn = document.querySelector('.close-btn');

    if (openBtn && overlay && closeBtn) {
        openBtn.addEventListener('click', () => {
        overlay.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
			overlay.style.display = 'none';
        }
	});
    }
});

const typewriterText = 'Embrace Your Journey'
const typewriterElem = document.querySelector('.typewriter')
if (typewriterElem) {
	let i = 0
	function typeWriter () {
		if (i < typewriterText.length) {
			typewriterElem.textContent += typewriterText.charAt(i)
			i++
			setTimeout(typeWriter, 60)
		}
	}
	typeWriter()
}

document.addEventListener('DOMContentLoaded', function () {
	const bookingForm = document.querySelector('.booking-form')
	const sendingModal = document.getElementById('sendingModal')
	const sendingText = document.getElementById('sendingText')
	const dotLoading = document.getElementById('dotLoading')
	if (bookingForm && sendingModal && sendingText && dotLoading) {
		bookingForm.addEventListener('submit', function (e) {
			e.preventDefault()
			sendingModal.classList.add('show')
			sendingText.textContent = 'Sending The Message'
			dotLoading.textContent = '.'
			let dots = 1
			let loadingInterval = setInterval(() => {
				dots = (dots % 3) + 1
				dotLoading.textContent = '.'.repeat(dots)
			}, 400)
			setTimeout(() => {
				clearInterval(loadingInterval)
				dotLoading.textContent = ''
				sendingText.textContent = 'Message Sended'
				setTimeout(() => {
					sendingModal.classList.remove('show')
				}, 1200)
			}, 1800)
		})
	}
})

document.addEventListener('DOMContentLoaded', function () {
	const contactForm = document.querySelector('.contact-form')
	if (contactForm) {
		contactForm.addEventListener('submit', function (e) {
			e.preventDefault()
			alert('Message sent!')
		})
	}
})

function openOverlay (destination) {
	document.querySelectorAll('.vs-custom-overlay').forEach(function (overlay) {
		overlay.style.display = 'none'
	})
	const overlay = document.getElementById('overlay-' + destination)
	if (overlay) {
		overlay.style.display = 'flex'
		document.body.classList.add('modal-open')
		document.body.style.overflow = 'hidden'
	}
}

function closeOverlay (destination) {
	const overlay = document.getElementById('overlay-' + destination)
	if (overlay) {
		overlay.style.display = 'none'
		const anyOpen = Array.from(document.querySelectorAll('.vs-custom-overlay')).some(o => o.style.display === 'flex')
		if (!anyOpen) {
			document.body.classList.remove('modal-open')
			document.body.style.overflow = ''
		}
	}
}

window.addEventListener('click', function (e) {
	const overlays = document.querySelectorAll('.vs-custom-overlay')
	overlays.forEach(function (overlay) {
		if (
			overlay.style.display === 'flex' &&
			!overlay.querySelector('.overlay-content').contains(e.target) &&
			!e.target.classList.contains('btn-card')
		) {
			overlay.style.display = 'none'
			const anyOpen = Array.from(document.querySelectorAll('.vs-custom-overlay')).some(o => o.style.display === 'flex')
			if (!anyOpen) {
				document.body.classList.remove('modal-open')
				document.body.style.overflow = ''
			}
		}
	})
})