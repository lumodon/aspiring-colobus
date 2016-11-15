let count = 0
let countBy = 1
let dom_errorMessage = document.getElementById("errorMessage")
let dom_upgradeCost_1 = document.getElementById("upgradeCost_1")

class Upgrade {
  constructor(cost, func) {
    this.cost = cost
    this.me = func
  }
}

const incUpgrade = (upgrade) => {
  if(count >= upgrade.cost) {
    count -= upgrade.cost
    upgrade.me()
  }
  else {
    console.log("I'm running for some reason")
    dom_errorMessage.innerHTML = "Not enough electrons! Need "+(upgrade.cost-count)+" more electrons!"
  }
}

const upgrade1 = new Upgrade( 5, () => {
  console.log(this, this.cost)
  this.cost += 5
  dom_upgradeCost_1.innerHTML = this.cost
  countBy++
})

// Initialization
if (typeof(Storage) !== "undefined") {
    $("<p id='counter'>0</p>").insertAfter("#cookie")

    dom_errorMessage.innerHTML = ""
    dom_upgradeCost_1.innerHTML = upgrade1.cost

    $("#cookie").click( () => {
      count += countBy
      counter.innerHTML = count
    })

    $("#upgrade_1").click( () => {
      incUpgrade(upgrade1)
    })

} else {
    document.getElementById("result").innerHTML="Sorry! No Web Storage support.."
}
