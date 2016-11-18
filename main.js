let count = 0
let countBy = 1
let dom_errorMessage = document.getElementById("errorMessage")
let dom_counter = document.getElementById("counter")
let dom_result = document.getElementById("result")
let listOfUpgrades = []

// two point seven, year $20 president got elected (Andrew Jackson), 45 degree
// triangle, fibonaci, degrees in circle, to eat an airplane -> gets you 27
// digits of euler's number

//1828 the presidents got into a debate, the decade that started with two
// because depression was true
const E = 2.71828182845904523536028747

class Cost {
  constructor (cost, percentage=10) {
    this._cost = cost
    this.deltaCost = cost
    this.percentage = percentage
  }

  increase() {
    this.deltaCost += Math.floor(this._cost * (this.percentage / 100))
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
    this.upgName = upgName.replace(/\s/g, ''); // Removes spaces
    this.img = img
    this.price = new Cost(cost)
    this.me = func
    this.$dom_upgName = $('<p>'+this.upgName+'</p>')
    this.$dom_img = $('<img class="upgradePics" src='+this.img+'>')
    this.$dom_cost = $('<p id="upgrade'+this.upgName+'Cost"></p>')
    this.dom_timeCount = document.createElement("p", "id=upgrade"+this.upgName+"Time")
    this.dom_timeCount.style.marginTop = "0px"
    this.dom_timeCount.style.marginBottom = "10px"

    let $tempDiv = $('<div class="upgrade-item"></div>').appendTo('#upgrades')
    this.$dom_upgName.appendTo($tempDiv)
    this.$dom_img.click( () => {
      increaseUpgrade(this)
    }).appendTo($tempDiv)
    this.$dom_cost.appendTo($tempDiv).html(this.price.cost)
    $tempDiv[0].appendChild( this.dom_timeCount )
    $tempDiv[0].style.height = ($tempDiv[0].offsetHeight + 31) + "px"

    listOfUpgrades.push(this)
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
    dom_errorMessage.innerHTML = ""
  }
  else {
    dom_errorMessage.innerHTML = "Not enough electrons! Need "+
    (upgrade.cost-count)+" more electrons!"
  }
}


// Problem discovered:
// https://derickbailey.com/2015/09/28/do-es6-arrow-functions-really-solve-this-in-javascript/

let timer = {
  // I would normally make upgradeList a class with += operator overload so that
  // one could just do 'timer.upgradeList += this' to run the addTo function
  upgradeList: {},
  intervalTimer: undefined,
  timerCount: 0,
  countToAdd: 0,

  // Public Methods
  addPoint: (upgradeName) => {
    timer.upgradeList[upgradeName].level++
    timer.updateCountToAdd()
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
  addTo: ({name, interval, value, level=0, dom_timeCount}) => {
    timer.upgradeList[name] = {interval, value, level, timeRemaining: interval, dom_timeCount}
    // timer.upgradeList[name].timeRemaining = interval
    timer.updateCountToAdd()
  },
  lowerInterval: () => {
    for( let iteratee in timer.upgradeList ) {
      let upg = timer.upgradeList[iteratee]
      // skip loop if the property is from prototype or upgrade not upgraded yet
      if(!timer.upgradeList.hasOwnProperty(iteratee) || upg.level < 1) continue

      if(upg.interval > 5) upg.interval--
      else if(upg.interval > 1 && upg.interval <= 5) upg.interval -= 0.2
    }
  },

  // Private Methods
  tick: () => {
    timer.updateCountToAdd()
    count += timer.countToAdd
    dom_counter.innerHTML = count

    dom_result.innerHTML = "Value: " + timer.timerCount++
  },
  updateCountToAdd: () => {
    timer.countToAdd = 0
    for( let iteratee in timer.upgradeList ) {
      let upg = timer.upgradeList[iteratee]
      // skip loop if the property is from prototype or upgrade not upgraded yet
      if(!timer.upgradeList.hasOwnProperty(iteratee) || upg.level < 1) continue

      if(upg.timeRemaining <= 1) {
        upg.timeRemaining = Math.ceil(upg.interval)
        timer.countToAdd += upg.level * upg.value
      } else {
        upg.timeRemaining--
      }
      upg.dom_timeCount.innerHTML = upg.timeRemaining
    }
  }
}

const upgradeWire = new Upgrade( 'Wire', './wire.jpg', 5,
  () => {
    countBy++
  }
)

// Gives you electrons every 5 seconds
const upgradeNuclear = new Upgrade( 'Nuclear Plant', './nuclear.png', 2000,
  () => {
    timer.addPoint(upgradeNuclear.upgName)
  }
)

// This upgrade works on a timer. TODO: Organize to be self-implementing
timer.addTo({name: upgradeNuclear.upgName, interval: 20, value: 250,
  dom_timeCount: upgradeNuclear.dom_timeCount})

// Increases the speed other timer-based upgrades give you electrons
// Set up the function to give diminishing returns, but still gives returns
// also, only decreases the time on currently purchased upgrades.
// Should we keep it this way, or switch it to decrease time on all upgrades?
const upgradeTower = new Upgrade( 'Power Tower', './powertower.jpg', 500,
  () => {
    timer.lowerInterval()
  }
)

// faster than nuclear but less electrons
const upgradeGenerator = new Upgrade( 'Generator', './generator.jpg', 2000,
  () => {
    timer.addPoint(upgradeGenerator.upgName)
  }
)
timer.addTo({name: upgradeGenerator.upgName, interval: 10, value: 75,
  dom_timeCount: upgradeGenerator.dom_timeCount})

// cheaper copy of generator
const upgradeWindMill = new Upgrade( 'Wind Mill', './windmill.png', 150,
  () => {
    timer.addPoint(upgradeWindMill.upgName)
  }
)
timer.addTo({name: upgradeWindMill.upgName, interval: 15, value: 10,
  dom_timeCount: upgradeWindMill.dom_timeCount})

// Decreases cost of all other upgrades
const upgradeTransformer = new Upgrade( 'Transformer', './transformer.jpg', 250,
  () => {

  }
)

// decreases rate at which costs increase (not retroactive on purpose)
const upgradeSolarPanel = new Upgrade( 'Solar Panel', './solarpanel.jpg', 500,
  () => {

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

    timer.enableTimer()

} else {
    dom_errorMessage.innerHTML="Sorry! No Web Storage support.."
}
