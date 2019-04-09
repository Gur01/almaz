import './scss/main.scss';
import toastr from "toastr";

import i from './js/index.js';

$(function () {

  i.sendEmail(toastr);
  i.humburgerActive();

}) 