const inputEl = document.getElementById('password')

const upperCaseCheckEl = document.getElementById("uppercase-check")
const numberCheckEl = document.getElementById("number-check")
const symbolCheckEl = document.getElementById("symbol-check")
const securityIndicatorBarEl = document.getElementById('security-indicator-bar')


let passwordRange = 16


    function generatePassword() {
      let chars = "abcdefghjkmnpqrstuvwxyz"

        const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ"
        const numberChars = "123456789"
        const symbolChars = "?!@&*()[]"

        if (upperCaseCheckEl.checked) {
          chars += upperCaseChars
        }

        if (numberCheckEl.checked) {
          chars += numberChars
        }

        if (symbolCheckEl.checked) {
          chars += symbolChars
        }


        let password = ""

        for (let i = 0; i < passwordRange; i++) {
            const randomNumber = Math.floor(Math.random() * chars.length)
            password += chars.substring(randomNumber, randomNumber + 1)
          }

          inputEl.value = password

          calculateQuality()
          calculateFontSize()
        }

        function calculateQuality(){

          const percent = Math.round((passwordRange / 64) * 25 + 
          (upperCaseCheckEl.checked ? 15 : 0) +
          (numberCheckEl.checked ? 25 : 0) +
          (symbolCheckEl.checked ? 35 : 0)

          )

          securityIndicatorBarEl.style.width = `${percent}%`

          if (percent > 69){
            securityIndicatorBarEl.classList.remove('critical')
            securityIndicatorBarEl.classList.remove('warning')
            securityIndicatorBarEl.classList.add('safe')

          }else if (percent > 50) {
            securityIndicatorBarEl.classList.remove('critical')
            securityIndicatorBarEl.classList.remove('safe')
            securityIndicatorBarEl.classList.add('warning')

          }else {
            securityIndicatorBarEl.classList.remove('safe')
            securityIndicatorBarEl.classList.remove('warning')
            securityIndicatorBarEl.classList.add('critical')

          }

          if (percent >= 100){
            securityIndicatorBarEl.classList.add('completed')
          }else {
            securityIndicatorBarEl.classList.remove('completed')
          }

        }

        function calculateFontSize(){
          if (passwordRange > 45) {
            inputEl.classList.remove('font-grande')
            inputEl.classList.remove('font-media')
            inputEl.classList.add('font-pequena')

          }else if (passwordRange > 32) {
            inputEl.classList.remove('font-grande')
            inputEl.classList.add('font-media')
            inputEl.classList.remove('font-pequena')

          }else if (passwordRange > 22){
            inputEl.classList.add('font-grande')
            inputEl.classList.remove('font-media')
            inputEl.classList.remove('font-pequena')

          }else {
            inputEl.classList.remove('font-grande')
            inputEl.classList.remove('font-media')
            inputEl.classList.remove('font-pequena')
          }
        }
        


        function copy() {
            navigator.clipboard.writeText(inputEl.value)
        }


        const passwordRangeEl = document.getElementById('password-range')
        passwordRangeEl.addEventListener('input', function () {
        passwordRange = passwordRangeEl.value

        document.getElementById('password-length-text').innerText = passwordRange

        generatePassword()
      })

      upperCaseCheckEl.addEventListener('click', generatePassword)
      numberCheckEl.addEventListener('click', generatePassword)
      symbolCheckEl.addEventListener('click', generatePassword)

      document.getElementById('renew').addEventListener('click', generatePassword)
      

      document.getElementById('copy-1').addEventListener('click', copy)
      document.getElementById('copy-2').addEventListener('click', copy)

      generatePassword()

      
