let count = 0
let countBy = 1
let dom_errorMessage = document.getElementById("errorMessage")
//let dom_upgradeCost_1 = document.getElementById("upgradeCost_1")
let dom_counter = document.getElementById("counter")

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
    this._cost = new Cost(cost)
    this.me = func
    this.$dom_upgName = $('<p>'+this.upgName+'</p>')
    this.$dom_img = $('<img class="upgradePics" src='+this.img+'>')
    this.$dom_cost = $('<p id="upgrade'+this.upgName+'"></p>')

    let $tempDiv = $('<div id="upgrade-item"></div>').appendTo('#upgrades')
    this.$dom_upgName.appendTo($tempDiv)
    this.$dom_img.click( () => {
      increaseUpgrade(this)
    }).appendTo($tempDiv)
    this.$dom_cost.appendTo($tempDiv)
    this.$dom_cost.html(this._cost.cost)
  }

  handleCost() {
    count -= this._cost.cost
    dom_counter.innerHTML = count
    this._cost.increase()
    this.$dom_cost.html(this._cost.cost)
  }

  get cost() {
    return this._cost.cost
  }

  set cost(newVal) {
    this._cost.cost = newVal
  }
}

const increaseUpgrade = (upgrade) => {
  if(count >= upgrade.cost) {
    upgrade.handleCost()
    upgrade.me()
    dom_errorMessage.innerHTML = ""
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

const upgradeNuclear = new Upgrade( 'Nuclear Plant', './nuclear.png', 500,
  () => {
    window.setTimer()
  }
)
const upgradeTower = new Upgrade( 'Power Tower', './powertower.jpg', 500,
  () => {
    window.setTimer()
  }
)
const upgradeGenerator = new Upgrade( 'Generator', './generator.jpg', 500,
  () => {
    window.setTimer()
  }
)
const upgradeWindMill = new Upgrade( 'Wind Mill', './windmill.png', 500,
  () => {
    window.setTimer()
  }
)
const upgradeTransformer = new Upgrade( 'Transformer', './transformer.jpg', 500,
  () => {
    window.setTimer()
  }
)
const upgradeSolarPanel = new Upgrade( 'Solar Panel', './solarpanel.jpg', 500,
  () => {
    window.setTimer()
  }
)

// Initialization
if (typeof(Storage) !== "undefined") {
    dom_errorMessage.innerHTML = ""
    dom_counter.innerHTML = count

    $("#cookie").click( () => {
      count += countBy
      dom_counter.innerHTML = count
    })

} else {
    dom_errorMessage.innerHTML="Sorry! No Web Storage support.."
}
