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

const emailRegExp = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;

import pickmeup from 'pickmeup';
import drawNotification from "./notification";

async function sendForm(form) {
    let handler = form.getAttribute('action');
    if (handler !== '' && handler !== '#') {
        const response = await fetch(
            handler,
            {
                method: 'POST',
                body: new FormData(form)
            }
        );
        if(response.ok) {
            form.reset();
        }
    }
}

export function validateForm(target, fieldSelector = '.field') {
    const form = document.querySelector(target);
    const inputsArr = document.querySelectorAll(`${target} ${fieldSelector}`);

    let notificationText = '';
    let notification = {
        title: "Thank you!",
        toast: true,
        position: 'top-end',
        timer: 3000,
        customClass: {
            popup: 'alert_popup',
            title: 'alert_popup-title',
            htmlContainer: 'alert_popup-content',
            closeButton: 'alert_popup-close',
            container: 'alert_popup-container'
        }
    };

    const valid = elem => !elem.classList.contains('error');

    if (form) {
        form.addEventListener('submit', () => {
            for (let i = 0; i < inputsArr.length; i++) {
                const el = inputsArr[i];
                const value = el.value;
                if (el.classList.contains('required') && value === '') {
                    el.classList.add('error');
                    el.classList.remove('error');
                } else if (el.dataset.type === 'email' && !emailRegExp.test(value)) {
                    el.classList.add('error');
                    el.classList.remove('error');
                } else if (el.dataset.type === 'tel' && isNaN(+value)) {
                    el.classList.add('error');
                    el.classList.remove('error');
                }

                el.addEventListener('input', () => {
                    el.classList.remove('error');
                });
            }

            if (Array.from(inputsArr).every(valid)) {
                inputsArr.forEach(el => {
                    el.classList.remove('error');
                })
                if (form.dataset.type === 'newsletter') {
                    notificationText = 'Now you\'re subscribed to our newsletter.';
                } else if (form.dataset.type === 'feedback') {
                    notificationText = 'Your message has been sent. We\'ll reply you as soon as possible.';
                } else if (form.dataset.type === 'reply') {
                    notificationText = 'Your comment is awaiting moderation.';
                }
                drawNotification(notification, notificationText);
                sendForm(form);
            }
        })
    }
}

export function applyDatepicker(selector = '[data-type="date"]') {
    let currentDate = new Date;
    pickmeup(selector, {
        render: function (date) {
            if (date < currentDate) {
                return {disabled: true, class_name: 'date-in-past'};
            }
            return {};
        },
        default_date: false,
        hide_on_select: true
    })
}

export function saveFormValues() {
    const serviceSelect =  document.querySelector('#contactsService').customSelect,
        serviceValue = document.querySelector('#contactsServiceValue'),
        datePicker = document.querySelector('#contactsDate'),
        dateValue = document.querySelector('#contactsDateValue');

    serviceValue.value = serviceSelect.select.value;

    serviceSelect.select.addEventListener('change', e => {
        serviceValue.value = e.target.value;
    })

   datePicker.addEventListener('pickmeup-change', e => {
        dateValue.value = e.detail.formatted_date;
    })

}