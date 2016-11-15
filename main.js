let count = 0
let countBy = 1

if (typeof(Storage) !== "undefined") {
    resultObject = document.getElementById("result").innerHTML
    localStorage.setItem("Frank", "Sinatra")
    let res = localStorage.getItem("Frank")
    resultObject.innerHTML = res
    $("<p id='counter'>0</p>").insertAfter("#cookie")

    $("#cookie").click( () => {
      count += countBy
      counter.innerHTML = count
    })

    $("#upgrade_1").click( () => {
      countBy++
    })

} else {
    document.getElementById("result").innerHTML="Sorry! No Web Storage support.."
}
