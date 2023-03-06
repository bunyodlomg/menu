const api = 'https://msshohruh.github.io/menu-api/data.json',
    allbtn = document.querySelector('#all-btn'),
    breakfastbtn = document.querySelector('#breakfast-btn'),
    lunchbtn = document.querySelector('#lunch-btn'),
    shakesbtn = document.querySelector('#shakes-btn'),
    container = document.querySelector('.section-center'),
    loader = document.querySelector('.loader')


AOS.init();
let mainData
const fetchApi = async (url) => {
    try {
        const request = await fetch(url),
            data = await request.json()
        loader.classList.add('hidden');

        mainData = data.menu
        return [...data.menu]
    } catch (error) {
        console.log(error.message);
    }
}




fetchApi(api).then(data => {
    createMenu(data)
})

breakfastbtn.addEventListener('click', () => {
    filterData('breakfast')
})
shakesbtn.addEventListener('click', () => {
    filterData('shakes')
})
lunchbtn.addEventListener('click', () => {
    filterData('lunch')
})
allbtn.addEventListener('click', () => {
    filterData('all')
})

function createMenu(recipes) {
    container.innerHTML = ''
    recipes.forEach(recipe => {
        const { img, title, desc, price } = recipe,
            div = document.createElement('article')
        div.classList.add('menu-item')
        div.setAttribute('data-aos', 'zoom-out-down')
        div.innerHTML = `
            <img src=${img} alt=${title} class="photo" />
            <div class="item-info">
                <header>
                    <h4>${title}</h4>
                    <h4 class="price">$${price}</h4>
                </header>
                <p class="item-text">
                    ${desc}
                </p>
            </div>
        `;
        container.appendChild(div);
    });
}

function filterData(param) {
    if (param === 'all') {
        createMenu(mainData)
    } else {

        const newData = mainData.filter((item) => {
            return item.category === param
        })
        createMenu(newData)
    }
}