function roll(min, max, floatFlag) {
    let r = Math.random() * (max - min) + min
    return floatFlag ? r : Math.floor(r)
}

let possibleProducts = ["🍇", "🍈", "🍉", "🍊", "🍋", "🍌", "🍍", "🥭", "🍎", "🍏", "🍐", "🍑", "🍒", "🍓", "🥝", "🍅", "🥥", "🥑", "🍆", "🥔", "🥕", "🌽", "🌶", "🥒", "🥬", "🥦"]

let products = [...Array(5)].map((_, i) => {
    return {
        index: i,
        title: possibleProducts[roll(0, possibleProducts.length)],
        price: roll(2, 10, 1).toFixed(2),
        count: roll(1, 6),
        weight:roll(1,10, true)
    }
})

// Calculate the Cart Total using .reduce
let cartTotal = products.reduce(function(accumulator, product) {
    return accumulator + parseFloat(product.price) * product.count 
}, 0).toFixed(2)
let weightTotal = products.reduce((acc, product) => {

     return acc + parseFloat(product.weight) * product.count


}, 0)
console.log(weightTotal)
// roll() for a random Tax Rate between 5% and 9%
// rounding to the nearest 10th
let taxRate = roll(5, 9, 1).toFixed(1)

// Apply that Tax Rate to the Cart Total 
function taxed(value) {
    return taxRate / 100 * cartTotal + parseFloat(cartTotal)
}
let taxedTotal = taxed(cartTotal).toFixed(2)


let cart = document.getElementById("Products")
let cartHtml = ''
products.forEach(product => {
    cartHtml += `<div class="product">
        <div>${product.title}</div>
        <div>💲${product.price}</div>
        <div>x${product.count}</div>
        <div>${(product.weight * product.count).toFixed(2)}</div>
    </div>`
})
cart.innerHTML = cartHtml

let summary = document.getElementById("Summary")
let summaryHtml = ''
summaryHtml += `<div>Total: 💲${cartTotal}</div>`
summaryHtml += `<div>Tax Rate: ${taxRate}%</div>`
summaryHtml += `<div>Taxed Total: 💲${taxedTotal}</div>`
summaryHtml += `<div>Total Weight: ${weightTotal.toFixed(2)}Kg</div>`
summary.innerHTML = summaryHtml