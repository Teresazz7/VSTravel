document.addEventListener('DOMContentLoaded', function () {
	const departureInput = document.getElementById('departure')
	const dateError = document.getElementById('dateError')
	const form = document.querySelector('.booking-form')

	function formatDate (date) {
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const day = String(date.getDate()).padStart(2, '0')
		return `${year}-${month}-${day}`
	}

	const today = new Date()
	const minDate = formatDate(today)

	departureInput.setAttribute('min', minDate)
	departureInput.removeAttribute('max')

	form.addEventListener('submit', function (e) {
		const selected = departureInput.value
		if (!selected) return
		if (selected < minDate) {
			e.preventDefault()
			dateError.textContent = 'Departure date cannot be before today.'
			departureInput.focus()
		} else {
			dateError.textContent = ''
		}
	})
}) 