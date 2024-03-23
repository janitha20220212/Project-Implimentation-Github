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

const _KEY = 'PasteYourGoogleMapsApiKeyHere';

import {Loader} from "@googlemaps/js-api-loader";
import mapTheme from "./map-theme";

function initMap() {
    const loader = new Loader({
        apiKey: _KEY,
        version: "weekly",

    });
    const mapContainer = document.querySelector('#map');

    loader.load().then(() => {
        const map = new google.maps.Map(mapContainer, {
            center: {lat: 40.74956081164776, lng: -73.98700531672688},
            zoom: 8,
            styles: [...mapTheme],
            disableDefaultUI: true,
        });
    });
}

export default initMap;