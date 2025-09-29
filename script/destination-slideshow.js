function startSlideshow(wrapper) {
	const images = wrapper.querySelectorAll('.overlay-img')
	if (images.length < 2) return null
	let current = 0
	images.forEach((img, i) => img.classList.toggle('active', i === 0))
	return setInterval(() => {
		images[current].classList.remove('active')
		current = (current + 1) % images.length
		images[current].classList.add('active')
	}, 5000)
}

function stopSlideshow(intervalId) {
	if (intervalId) clearInterval(intervalId)
}

document.addEventListener('DOMContentLoaded', function () {
	const overlays = document.querySelectorAll('.vs-custom-overlay')
	overlays.forEach(overlay => {
		let intervalId = null
		const wrapper = overlay.querySelector('.overlay-img-wrapper')
		const observer = new MutationObserver(() => {
			const isVisible = getComputedStyle(overlay).display !== 'none'
			if (isVisible && !intervalId) {
				intervalId = startSlideshow(wrapper)
			} else if (!isVisible && intervalId) {
				stopSlideshow(intervalId)
				intervalId = null
			}
		})
		observer.observe(overlay, { attributes: true, attributeFilter: ['style', 'class'] })
	})
}) 