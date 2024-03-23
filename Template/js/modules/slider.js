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

import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
Swiper.use([Navigation, Pagination, Autoplay]);

export function initHeroSlider(parentEl, container, options) {
    const swiper = new Swiper(container, {...options});
    const parent = document.querySelector(parentEl);
    const swiperSlides = document.querySelectorAll(`${container} .swiper-slide`);
    swiper.on('activeIndexChange', function () {
        setHeroBg();
    });

    function setHeroBg() {
        const path = swiperSlides[swiper.activeIndex].dataset.bg;
        parent.style.backgroundImage = `url("${path}")`;
    }
    setHeroBg();
}

// basic swiper initialization
export function initSwiperSlider(container, options) {
    const swiper = new Swiper(container, {...options});
}
