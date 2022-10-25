const MinuteCountdown = (countdown) => {
  let countdownInSec = countdown* 60
  let deliveryInterval = setInterval(()=> {
    console.log('timer:', countdownInSec)
    if (countdownInSec <= 0) {
      clearInterval(deliveryInterval);
    }
    countdownInSec-=1
    // setCountdown(Math.ceil(countdownInSec/60))
    countdown = Math.ceil(countdownInSec/60)
  }, 1000)
}

export default MinuteCountdown
