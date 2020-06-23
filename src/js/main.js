import buzz from 'buzz'

const rataplanMainSound = new buzz.sound('sounds/rataplan-main.mp3')
const rataplanPointSound = new buzz.sound('sounds/rataplan-point.mp3')

rataplanMainSound.setVolume(100)
rataplanPointSound.setVolume(100)

const startButton = document.querySelector('.controls__control--start')
const stopButton = document.querySelector('.controls__control--stop')

let isActiveMetronome = false

startButton.addEventListener('click', e => {
  e.preventDefault()

  startButton.style.display = 'none'
  stopButton.style.display = 'block'
  stopButton.classList.add('animation-pulse')

  isActiveMetronome = true
  startMetronome([rataplanMainSound, rataplanPointSound, rataplanPointSound])
})

stopButton.addEventListener('click', e => {
  e.preventDefault()

  startButton.style.display = 'block'
  stopButton.style.display = 'none'

  stopButton.classList.remove('animation-pulse')

  isActiveMetronome = false
})

function playedSound(sound, index) {
  return new Promise(resolve => {
    if (!isActiveMetronome) return resolve()

    sound.play()

    if (index % 3 === 0) {
      stopButton.classList.add('animation-pulse')
      isActiveMetronome = isActiveMetronome
    }

    sound.bindOnce('ended', () => {
      resolve()

      if (index % 3 === 2) {
        stopButton.classList.remove('animation-pulse')
        isActiveMetronome = isActiveMetronome
      }
    })
  })
}

async function startMetronome(sounds) {
  for (let i = 0; isActiveMetronome; i++) {
    await playedSound(sounds[i % 3], [i % 3])
  }
}
