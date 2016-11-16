let count = 0
let countBy = 1
let dom_errorMessage = document.getElementById("errorMessage")
let dom_upgradeCost_1 = document.getElementById("upgradeCost_1")
let dom_counter = document.getElementById("counter")

//console.log( dom_counter )

class Upgrade {
  constructor(cost, func) {
    this.cost = cost
    this.me = func
  }
}

const increaseUpgrade = (upgrade) => {
  if(count >= upgrade.cost) {
    count -= upgrade.cost
    dom_counter.innerHTML = count
    upgrade.me()
  }
  else {
    dom_errorMessage.innerHTML = "Not enough electrons! Need "+(upgrade.cost-count)+" more electrons!"
  }
}

const upgrade1 = new Upgrade( 5, () => {
  upgrade1.cost += 5
  dom_upgradeCost_1.innerHTML = upgrade1.cost
  countBy++
})

// Initialization
if (typeof(Storage) !== "undefined") {
    dom_errorMessage.innerHTML = ""
    dom_upgradeCost_1.innerHTML = upgrade1.cost
    dom_counter.innerHTML = count

    $("#cookie").click( () => {
      count += countBy
      dom_counter.innerHTML = count
    })

    $("#upgrade_1").click( () => {
      increaseUpgrade(upgrade1)
    })

} else {
    document.getElementById("result").innerHTML="Sorry! No Web Storage support.."
}
