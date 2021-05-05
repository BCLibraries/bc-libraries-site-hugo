document.addEventListener('DOMContentLoaded', function () {
    const virtual_pet_holder = document.querySelector('.virtual-pet');
    const pet = randomPet();
    const url = "https://library.bc.edu/images/virtual-pet-therapy/" + pet.img + ".png";
    const minScreenWidth = 767;

    if (! virtual_pet_holder) {
        return;
    }

    document.querySelector('.virtual-pet__img').setAttribute("src", url);
    document.querySelector('.virtual-pet__message').innerHTML = randomMessage(pet.name);

    showOrHidePet();

    window.addEventListener('resize', showOrHidePet);

    function showOrHidePet() {
        if (document.body.clientWidth > minScreenWidth) {
            showPet();
        } else {
            hidePet();
        }
    }

    function showPet() {
        if (virtual_pet_holder.style.display != "block") {
            virtual_pet_holder.style.display = "block";
        }
    }

    function hidePet() {
        if (virtual_pet_holder.style.display != "none") {
            virtual_pet_holder.style.display = "none";
        }
    }

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