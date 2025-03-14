/**
 * Displays a random pet photo with an encouraging message
 *
 * During the COVID closures, we had a "pet therapy" page with photos of staff pets.
 * One of five random pets was displayed on each homepage load with a link to the
 * Pet Therapy page. This script chose that pet and displayed it.
 */
document.addEventListener('DOMContentLoaded', function () {
    const virtual_pet_holder = document.querySelector('.virtual-pet');
    const pet = randomPet();
    const url = "https://library.bc.edu/images/virtual-pet-therapy/" + pet.img + ".png";

    if (! virtual_pet_holder) {
        return;
    }

    document.querySelector('.virtual-pet__img').setAttribute("src", url);
    document.querySelector('.virtual-pet__message').innerHTML = randomMessage(pet.name);
    virtual_pet_holder.style.display = "block";

    function randomPet() {
        var pets = [
            { img: 'hodge2', name: 'Hodge' },
            { img: 'pixel', name: 'Pixel' },
            { img: 'tucker4', name: 'Tucker'},
            { img: 'hershey', name: 'Hershey'},
            { img: 'fay', name: 'Fay'}
        ];
        return randomElement(pets);
    }

    function randomMessage(name) {
        var messages = [
            "De-stress with " + name,
            name + " says relax!",
            "Spend some me time with " + name,
            "Take it easy with " + name,
            "Meet " + name + ", pet therapist"
    ];
        return randomElement(messages);
    }

    function randomElement(array) {
        return array[Math.floor(Math.random() * array.length)]
    }

}, false);
