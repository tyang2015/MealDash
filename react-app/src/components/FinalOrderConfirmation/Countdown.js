// const MinuteCountdown = (countdown) => {
//   let countdownInSec = countdown* 60
//   let deliveryInterval = setInterval(()=> {
//     console.log('timer:', countdownInSec)
//     if (countdownInSec <= 0) {
//       clearInterval(deliveryInterval);
//     }
//     countdownInSec-=1
//     // setCountdown(Math.ceil(countdownInSec/60))
//     countdown = Math.ceil(countdownInSec/60)
//   }, 1000)
// }

// export default MinuteCountdown


// const countdownFunc = async () => {
//   console.log('trigger countdown state in use effect INSIDE FUNCTION:', triggerCountdown)
//   if (!triggerCountdown) return
//   // added here
//   orderStarted = false
//   let countdownInSec = countdown* 60
//   let deliveryInterval = setInterval(()=> {
//     console.log('timer:', countdownInSec)
//     if (countdownInSec <= 0) {
//       setCountdown(0)
//       clearInterval(deliveryInterval);
//       updateExistingOrderInStore(storedOrder)
//       localStorage.setItem('orders', JSON.stringify({...JSON.parse(localStorage.getItem('orders')), [orderId? orderId: order.id]: {...storedOrder, countdown: 0, orderCompleted: true} }))
//       setStoredOrder({...storedOrder, countdown: 0, orderCompleted: true })
//       // setTriggerCountdown(false)
//       triggerCountdown = false
//       orderStarted = true
//       console.log("countdown completed")
//       return
//     }
//     countdownInSec-=1
//     if (Math.ceil(countdownInSec/60) != localStorage.getItem('countdown')){
//       setTriggerMinuteChange(!triggerMinuteChange)
//     }
//     localStorage.setItem('orders', JSON.stringify({...JSON.parse(localStorage.getItem('orders')),[orderId? orderId: order.id]: {...storedOrder, countdown: Math.ceil(countdownInSec/60)}  }))
//     localStorage.setItem('countdown', Math.ceil(countdownInSec/60) )
//     setStoredOrder( {...storedOrder, countdown: Math.ceil(countdownInSec/60) })
//     setCountdown(Math.ceil(countdownInSec/60))
//   }, 1000)
// }

// export default countdownFunc
