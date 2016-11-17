let count = 0
let countBy = 1
let dom_errorMessage = document.getElementById("errorMessage")
let dom_counter = document.getElementById("counter")
let dom_result = document.getElementById("result")

// two point seven, year $20 president got elected (Andrew Jackson), 45 degree triangle, fibonaci, degrees in circle, to eat an airplane -> gets you 27 digits of euler's number

//1828 the presidents got into a debate, the decade that started with two because depression was true
const E = 2.71828182845904523536028747

class Cost {
  constructor (cost) {
    this._cost = cost
    this.deltaCost = cost
  }

  increase() {
    this.deltaCost += Math.floor(this._cost * 0.1)
    this._cost += this.deltaCost
  }

  get cost() {
    return this._cost
  }

  set cost(setVal) {
    this._cost = setVal
  }
}

class Upgrade {
  constructor(upgName, img, cost, func) {
    this.upgName = upgName
    this.img = img
    this.price = new Cost(cost)
    this.me = func
    this.$dom_img = $("<img src="+this.img+">")
    this.$dom_cost = $('<p id="upgrade'+this.upgName+'"></p>')

    let $tempDiv = $("<div></div>").appendTo("#upgrades")
    this.$dom_img.click( () => {
      increaseUpgrade(this)
    }).appendTo($tempDiv)
    this.$dom_cost.appendTo($tempDiv)
    this.$dom_cost.html(this.price.cost)
  }

  handleCost() {
    count -= this.price.cost
    dom_counter.innerHTML = count
    this.price.increase()
    this.$dom_cost.html(this.price.cost)
  }

  get cost() {
    return this.price.cost
  }

  set cost(newVal) {
    this.price.cost = newVal
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

const upgradeWire = new Upgrade( 'Wire', './wire.jpg', 5,
  () => {
    countBy++
  }
)

const upgradeNuclear = new Upgrade( 'Nuclear Plant', './nuclear.png', 50,
  () => {
    timer.addPoint(upgradeNuclear.upgName)
  }
)
// This upgrade works on a timer. TODO: Organize to be self-implementing
timer.upgradePoints.push(upgradeNuclear.upgName)

let timer = {
  upgradePoints: [],
  intervalTimer: undefined,
  timerCount: 0,
  // Public Methods
  addPoint: (upgradeName) => {
    timer.upgradePoints[upgradeName]++
    return timer
  },
  enableTimer: () => {
    timer.intervalTimer = window.setInterval(timer.tick, 1000)
    return timer
  },
  disableTimer: () => {
    if(timer.intervalTimer !== undefined) {
      window.clearInterval( timer.intervalTimer )
      return timer
    }
  },

  // Private Methods
  Initialization: () => {
    upgradeList.forEach( (index) => {
      timer.upgradePoints[index.upgName] = 0
    })
  },
  tick: () => {

    dom_result.innerHTML = "Value: " + timer.timerCount++
  },

}



// Initialization
if (typeof(Storage) !== "undefined") {
    dom_errorMessage.innerHTML = ""
    dom_counter.innerHTML = count

    timer.Initialization()

    $("#cookie").click( () => {
      count += countBy
      dom_counter.innerHTML = count
    })

} else {
    dom_errorMessage.innerHTML="Sorry! No Web Storage support.."
}
