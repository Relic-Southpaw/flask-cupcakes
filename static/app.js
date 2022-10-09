"use strict";

// alert ("JavaScript is connected")
const $showList = $("#cupcakes_list");
const HOME_URL = "http://127.0.0.1:5000/"

showCupcakes();

async function showCupcakes() {
    let res = await axios.get(`${HOME_URL}api/cupcakes`)
    let cupcakes = res.data.cupcakes;
    console.log(cupcakes)
    makeCupcakesList(cupcakes)
}

function makeCupcakesList(cupcakes) {
    $showList.empty();

    for (let c of cupcakes) {
        const $show = $(
            `<li class ="cupcake">
            <img
            src="${c.image}"
            class="cupcake_img">
            <ul>
            <li>FLAVOR: ${c.flavor}</li>
            <li>SIZE: ${c.size}</li>
            <li>RATING: ${c.rating}</li>
            </ul>
            <button class="delete_btn" data-id="${c.id}">Remove</button>
            </li>
            <br>
            `);
        $showList.append($show)
    }
    $('.delete_btn').click(deleteCupcake)
}

$('#add-form').on('submit', async function (e) {
    e.preventDefault();
    let flavor = $('#h-flavor').val();
    let size = $('#h-size').val();
    let rating = $('#h-rating').val();
    let image = $('#h-image').val();
    if ($('#h-image').val() != '') {
        image = $('#h-image').val()
    } else {
        image = "https://tinyurl.com/demo-cupcake"
    }

    let res = await axios.post(`${HOME_URL}/api/cupcakes`, {
        flavor,
        size,
        rating,
        image
    });
    showCupcakes()
    $("#add-form").trigger("reset");
})

$('.delete_btn').click(deleteCupcake)

async function deleteCupcake() {
    const id = $(this).data('id')
    await axios.delete(`${HOME_URL}/api/cupcakes/${id}`)
    alert("deleted")
    showCupcakes()
}