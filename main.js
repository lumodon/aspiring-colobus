let count = 0
let countBy = 1
let dom_errorMessage = document.getElementById("errorMessage")
let dom_upgradeCost_1 = document.getElementById("upgradeCost_1")
let dom_counter = document.getElementById("counter")

// two point seven, year $20 president got elected (Andrew Jackson), 45 degree triangle, fibonaci, degrees in circle, to eat an airplane -> gets you 27 digits of euler's number
const E = 2.71828182845904523536028747

class Cost = {
  constructor (cost) {
    this.cost = cost
    this.deltaCost = cost
  }

  increase() {
    this.deltaCost += this.cost * 0.1
    this.cost += this.deltaCost
  }

  get cost() {
    return this.cost
  }
}

let cycle = (prev, count) => {
  if(count > 0) {
    let newVal = COST_DELTA(prev)
    cycle(newVal, --count )
    console.log(newVal)
  }
}

console.log( dom_counter )

class Upgrade {
  constructor(cost, img, func) {
    this.cost = new Cost(cost)
    this.img = img
    this.me = func
  }

  handleCost() {
    count -= this.cost
    dom_counter.innerHTML = count
    this.cost.increase()
  }
}

const increaseUpgrade = (upgrade) => {
  if(count >= upgrade.cost) {
    upgrade.handleCost()
    upgrade.me()
  }
  else {
    dom_errorMessage.innerHTML = "Not enough electrons! Need "+(upgrade.cost-count)+" more electrons!"
  }
}

const upgradeWire = new Upgrade( 5, './wire.jpg', () => {
  upgradeWire.cost += 5
  dom_upgradeCost_1.innerHTML = upgradeWire.cost
  countBy++
})

// Initialization
if (typeof(Storage) !== "undefined") {
    dom_errorMessage.innerHTML = ""
    dom_upgradeCost_1.innerHTML = upgradeWire.cost

    $("#cookie").click( () => {
      count += countBy
      dom_counter.innerHTML = count
    })

    $("#upgrade_1").click( () => {
      increaseUpgrade(upgradeWire)
    })

} else {
    document.getElementById("result").innerHTML="Sorry! No Web Storage support.."
}
