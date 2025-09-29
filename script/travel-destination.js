document.addEventListener('DOMContentLoaded', function () {
	const DESTINATION_PRICES = {
		'Bali': 5500000,
		'Raja Ampat': 15000000,
		'Mount Bromo': 2750000,
		'Yogyakarta': 3500000,
		'Labuan Bajo': 12500000,
		'Lombok': 5700000,
	}

	const destinationSelect = document.getElementById('destination')
	const totalPriceDiv = document.getElementById('totalPrice')
	const participantInput = document.getElementById('participants')
	const phoneInput = document.getElementById('phone')
	const phoneError = document.getElementById('phoneError')
	const decrementBtn = document.querySelector('.participant-btn.decrement')
	const incrementBtn = document.querySelector('.participant-btn.increment')
	const departureInput = document.getElementById('departure')
	const returnInput = document.getElementById('return')
	const dateError = document.getElementById('dateError')
	const bookingModal = document.getElementById('bookingModal')
	const bookingModalDesc = document.getElementById('bookingModalDesc')
	const bookingYesBtn = document.getElementById('bookingYesBtn')
	const bookingNoBtn = document.getElementById('bookingNoBtn')
	const bookingStatusModal = document.getElementById('bookingStatusModal')
	const bookingStatusMsg = document.getElementById('bookingStatusMsg')
	const bookingForm = document.querySelector('.booking-form')
	const participantError = document.getElementById('participantError')
	const firstNameInput = document.getElementById('firstName')
	const lastNameInput = document.getElementById('lastName')
	const firstNameError = document.getElementById('firstNameError')
	const lastNameError = document.getElementById('lastNameError')
	const bookNowBtn = document.querySelector('.book-now-btn')
	const formGeneralError = document.getElementById('formGeneralError')

	function updateTotalPrice () {
		const dest = destinationSelect.value
		const price = DESTINATION_PRICES[dest] || 0
		const participants = parseInt(participantInput.value) || 1
		if (dest) {
			totalPriceDiv.textContent = 'Total: Rp' + (price * participants).toLocaleString('id-ID')
		} else {
			totalPriceDiv.textContent = ''
		}
	}

	function validatePhone () {
		const value = phoneInput.value.replace(/\D/g, '')
		if (value.length < 8 || value.length > 13) {
			if (value.length < 8) {
				phoneError.textContent = 'Phone number must be at least 8 digits.'
			} else {
				phoneError.textContent = 'Phone number must be 8-13 digits.'
			}
			phoneInput.classList.add('input-error')
		} else {
			phoneError.textContent = ''
			phoneInput.classList.remove('input-error')
		}
	}

	function validateDates () {
		const departure = departureInput.value
		const ret = returnInput.value
		if (departure && ret) {
			if (ret <= departure) {
				dateError.textContent = 'Return date must be after the departure date.'
				returnInput.classList.add('input-error')
			} else {
				dateError.textContent = ''
				returnInput.classList.remove('input-error')
			}
		} else {
			dateError.textContent = ''
			returnInput.classList.remove('input-error')
		}
	}

	function validateNameInput (input, errorElem, label) {
		const value = input.value
		if (!/^[a-zA-Z\s]*$/.test(value)) {
			errorElem.textContent = `${label} error: Name can only contain alphabetic characters.`
			input.classList.add('input-error')
		} else {
			errorElem.textContent = ''
			input.classList.remove('input-error')
		}
	}

	function updateBookNowState () {
		const hasError = !!(
			firstNameError.textContent ||
			lastNameError.textContent ||
			phoneError.textContent ||
			participantError.textContent
		)
		bookNowBtn.disabled = hasError
		if (hasError) {
			bookNowBtn.classList.add('disabled')
		} else {
			bookNowBtn.classList.remove('disabled')
		}
	}

	function hasAnyError () {
		return !!(
			firstNameError.textContent ||
			lastNameError.textContent ||
			phoneError.textContent ||
			participantError.textContent ||
			dateError.textContent
		)
	}

	destinationSelect.addEventListener('change', updateTotalPrice)
	participantInput.addEventListener('input', updateTotalPrice)
	participantInput.addEventListener('change', updateTotalPrice)
	phoneInput.addEventListener('input', function (e) {
		const cleaned = phoneInput.value.replace(/\D/g, '')
		if (phoneInput.value !== cleaned) {
			phoneInput.value = cleaned
		}
		validatePhone()
	})
	phoneInput.addEventListener('blur', validatePhone)
	departureInput.addEventListener('change', function () {
		validateDates()
		if (departureInput.value) {
			const depDate = new Date(departureInput.value)
			depDate.setDate(depDate.getDate() + 1)
			const minReturn = depDate.toISOString().split('T')[0]
			returnInput.min = minReturn
			if (returnInput.value && returnInput.value < minReturn) {
				returnInput.value = ''
			}
		} else {
			returnInput.min = ''
		}
	})
	returnInput.addEventListener('change', validateDates)

	decrementBtn.addEventListener('click', function () {
		let value = parseInt(participantInput.value) || 1
		if (value > 1) {
			participantInput.value = value - 1
			participantError.textContent = ''
			updateTotalPrice()
		} else {
			participantError.textContent = 'Participant value must be at least 1.'
		}
	})

	incrementBtn.addEventListener('click', function () {
		let value = parseInt(participantInput.value) || 1
		participantInput.value = value + 1
		participantError.textContent = ''
		updateTotalPrice()
	})

	participantInput.addEventListener('input', function () {
		let cleaned = participantInput.value.replace(/\D/g, '')
		if (cleaned === '' || cleaned === '0') {
			participantInput.value = 1
		} else {
			participantInput.value = cleaned
		}
		participantError.textContent = ''
		updateTotalPrice()
	})

	participantInput.addEventListener('blur', function () {
		let value = parseInt(participantInput.value)
		if (!value || value < 1) {
			participantInput.value = 1
			participantError.textContent = ''
			updateTotalPrice()
		}
	})

	firstNameInput.addEventListener('input', function () {
		validateNameInput(firstNameInput, firstNameError, 'First name')
	})
	lastNameInput.addEventListener('input', function () {
		validateNameInput(lastNameInput, lastNameError, 'Last name')
	})

	function formatDateDMY(dateStr) {
		if (!dateStr) return ''
		const [y, m, d] = dateStr.split('-')
		return `${d}-${m}-${y}`
	}

	bookingForm.addEventListener('submit', function (e) {
		e.preventDefault()
		if (hasAnyError()) {
			formGeneralError.textContent = 'There is an error in your input. Please fix the highlighted fields.'
			formGeneralError.style.display = 'block'
			return
		}
		formGeneralError.style.display = 'none'
		const dest = destinationSelect.options[destinationSelect.selectedIndex].text.split(' - ')[0]
		const participants = parseInt(participantInput.value) || 1
		const price = DESTINATION_PRICES[destinationSelect.value] || 0
		const firstName = firstNameInput.value
		const lastName = lastNameInput.value
		const phone = phoneInput.value
		const departureDate = departureInput.value
		const returnDate = returnInput.value
		bookingModalDesc.innerHTML = `
			<table style='width:100%;text-align:left;font-size:1.05em;'>
				<tr><td><b>First Name</b></td><td>: ${firstName}</td></tr>
				<tr><td><b>Last Name</b></td><td>: ${lastName}</td></tr>
				<tr><td><b>Phone Number</b></td><td>: ${phone}</td></tr>
				<tr><td><b>Destination Order</b></td><td>: ${dest}</td></tr>
				<tr><td><b>Departure Date</b></td><td>: ${formatDateDMY(departureDate)}</td></tr>
				<tr><td><b>Return Date</b></td><td>: ${formatDateDMY(returnDate)}</td></tr>
				<tr><td><b>Total Participant(s)</b></td><td>: ${participants}</td></tr>
				<tr><td><b>Total Price</b></td><td>: Rp${(price * participants).toLocaleString('id-ID')}</td></tr>
			</table>`
		bookingModal.classList.remove('hidden')
	})

	bookingNoBtn.addEventListener('click', function () {
		bookingModal.classList.add('hidden')
	})

	bookingYesBtn.addEventListener('click', function () {
		bookingModal.classList.add('hidden')
		bookingStatusMsg.textContent = 'Sending The Order...'
		bookingStatusModal.classList.remove('hidden')
		setTimeout(function () {
			bookingStatusMsg.textContent = 'Booking Order Completed!'
			setTimeout(function () {
				bookingStatusModal.classList.add('hidden')
			}, 1500)
		}, 1500)
	})

	[firstNameInput, lastNameInput, phoneInput, participantInput].forEach(input => {
		input.addEventListener('input', updateBookNowState)
		input.addEventListener('blur', updateBookNowState)
	})

	const errorObserver = new MutationObserver(updateBookNowState)
	[firstNameError, lastNameError, phoneError, participantError].forEach(errElem => {
		errorObserver.observe(errElem, { childList: true })
	})

	updateBookNowState()

	updateTotalPrice()

	function setDepartureMinToday () {
		const today = new Date()
		today.setHours(0,0,0,0)
		const yyyy = today.getFullYear()
		const mm = String(today.getMonth() + 1).padStart(2, '0')
		const dd = String(today.getDate()).padStart(2, '0')
		const minDate = `${yyyy}-${mm}-${dd}`
		departureInput.setAttribute('min', minDate)
		if (departureInput.value && departureInput.value < minDate) {
			departureInput.value = minDate
			dateError.textContent = 'Departure date cannot be before today.'
			departureInput.classList.add('input-error')
		} else {
			if (dateError.textContent === 'Departure date cannot be before today.') {
				dateError.textContent = ''
				departureInput.classList.remove('input-error')
			}
		}
	}
	setDepartureMinToday()
	departureInput.addEventListener('input', setDepartureMinToday)
	departureInput.addEventListener('change', setDepartureMinToday)
	departureInput.addEventListener('blur', setDepartureMinToday)

	bookNowBtn.addEventListener('click', function (e) {
		if (bookNowBtn.disabled) {
			e.preventDefault()
			bookNowBtn.blur()
			return false
		}
	})
}) 