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
import initFilter from "./modules/filter";

document.addEventListener('DOMContentLoaded', () => {
    initGallery('.gallery_content-media');
    initFilter('.gallery_content-media', '.gallery_content-filters_filter', {
        itemSelector: '.gallery_content-media_item'
    });
})