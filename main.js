
             
        const today = new Date()

const weekday = new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(today)
const month = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(today)
const date = today.getDate()
const year = today.getFullYear()

const dayLabel = document.getElementById('day')
dayLabel.textContent = weekday

const dateLabel = document.getElementById('date')
dateLabel.textContent = `${month} ${date}, ${year}`

            
                

