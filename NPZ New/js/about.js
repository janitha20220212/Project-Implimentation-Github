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

import initGallery from "./modules/gallery";
import { initSwiperSlider } from "./modules/slider";

document.addEventListener('DOMContentLoaded', () => {
    initGallery('.gallery_list');

    initSwiperSlider('.reviews_slider', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: {
            992: {
                slidesPerView: 2,
                spaceBetween: 40
            },
            1200: {
                slidesPerView: 2,
                spaceBetween: 70
            },
        },
        navigation: {
            nextEl: '.reviews_controls-control--next',
            prevEl: '.reviews_controls-control--prev',
        },
        autoplay: {
            delay: 3000
        },
        speed: 2000,
    })
})