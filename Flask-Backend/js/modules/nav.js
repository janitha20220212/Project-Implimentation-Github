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

import Headroom from "headroom.js";
import {setEdgePadding} from "./helpers";

function drawNav() {
    const header = document.querySelector('.header');
    const menu = document.querySelector('.header_nav');
    const menuTrigger = document.querySelector('.header_trigger');
    const logo = document.querySelector('.header_logo');


    menuTrigger.addEventListener('click', () => {
        menuTrigger.classList.toggle('active');
        menu.classList.toggle('active');
        document.documentElement.classList.toggle('fixed');
    })

    function closeMenu() {
        menuTrigger.classList.remove('active');
        menu.classList.remove('active');
        document.documentElement.classList.remove('fixed');
    }

    function setElementMargin() {
        if (window.innerWidth < 992) {
            logo.style.marginLeft = `${setEdgePadding().left}px`;
            menuTrigger.style.marginRight = `${setEdgePadding().right}px`;
        } else {
            logo.style.marginLeft = `0px`;
            menuTrigger.style.marginRight = `0px`;
        }
    }


    initHeadroom(header);
    setActivePageClass(header);
    setDropdownMenu();
    setElementMargin();

    window.addEventListener('resize', closeMenu);
    window.addEventListener('resize', setDropdownMenu);
    window.addEventListener('resize', setElementMargin);
}

// hide header on scroll
function initHeadroom(headerEl) {
    const headroom = new Headroom(headerEl, {
        offset: 500,
        classes: {
            pinned: "header--pinned",
            unpinned: "header--unpinned",
        }
    });
    headroom.init();
}

// set activity class for the current page
function setActivePageClass(headerEl) {
    const menuListItems = document.querySelectorAll('.nav-item');

    menuListItems.forEach(item => {
        if (item.dataset.page === headerEl.dataset.page) {
            item.classList.add('active');
        }
    })

}

// dropdown menus (mobile/desktop)
function setDropdownMenu() {
    const dropdownElems = document.querySelectorAll('.dropdown');
    const triggers = document.querySelectorAll('.dropdown-toggle');
    const menuLists = document.querySelectorAll('.dropdown-menu');

    triggers.forEach((el, i) => {

        function closeMenu() {
            el.classList.remove('active');
            menuLists[i].classList.remove('active');
        }

        if (window.innerWidth < 992) {
            el.addEventListener('click', () => {
                el.classList.toggle('active');
                menuLists[i].classList.toggle('active');
            })
            window.addEventListener('resize', closeMenu)
        } else {
            window.addEventListener('resize', closeMenu);
            window.addEventListener('scroll', closeMenu)
        }

    })


    dropdownElems.forEach(el => {

        el.addEventListener('mouseover', function (e) {
            let trigger = this.querySelector('a[data-bs-toggle]');
            let menu = trigger.nextElementSibling;
            trigger.classList.add('active');
            menu.classList.add('active');
        });

        el.addEventListener('mouseleave', function (e) {
            let trigger = this.querySelector('a[data-bs-toggle]');
            let menu = trigger.nextElementSibling;
            trigger.classList.remove('active');
            menu.classList.remove('active');
        })
    })

}

export default drawNav;