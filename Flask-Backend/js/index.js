/**
 * Barbercrop
 * Barbercrop is a full featured barber shop template
 * Exclusively on https://1.envato.market/barbercrop-html
 *
 * @encoding        UTF-8
 * @version         1.0.4
 * @copyright       (C) 2018 - 2022 Merkulove ( https://merkulov.design/ ). All rights reserved.
 * @license         Envato License https://1.envato.market/KYbje
 * @contributors    Lamber Lilith (winter.rituel@gmail.com)
 * @support         help@merkulov.design
 **/
'use strict';

import {initHeroSlider} from "./modules/slider";
import drawNotification from "./modules/notification";

let isShown = false;

document.addEventListener('DOMContentLoaded', () => {

    window.addEventListener('scroll', openPromoModal);

    initHeroSlider('.hero', '.hero_slider', {
        direction: 'horizontal',
        loop: true,
        speed: 1000,
        slidesPerView: 1,
        pagination: {
            el: '.swiper-pagination',
            type: "progressbar",
        },
        navigation: {
            nextEl: '.hero_slider-control--next',
            prevEl: '.hero_slider-control--prev',
        },
        autoplay: {
            delay: 5000
        },

    })
})

function openPromoModal() {
    if (window.pageYOffset > 1000 && !isShown) {
        drawNotification({
            title: 'Bring a friend and get a 10% discount card',
            showCloseButton: true,
            closeButtonHtml: `
                <i class="icon-close"></i>
            `,
            html: `
                    <p class="main text">Vitae nunc, dolor, blandit eget eleifend etiam id.
                        <span class="linebreak">Amet arcu lobortis sed pulvinar cursus pretium sit pretium.</span>
                    </p>
                    <a class="btn theme-element" href="#">Book now</a>
                `,
            customClass: {
                popup: 'promo_popup',
                title: 'promo_popup-title',
                htmlContainer: 'promo_popup-content',
                closeButton: 'promo_popup-close',
                container: 'promo_popup-container'
            },
        })
        isShown = true;
    }
}