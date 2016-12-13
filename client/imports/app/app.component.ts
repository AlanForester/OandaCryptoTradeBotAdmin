import { Component, OnInit, AfterViewInit } from '@angular/core';
//noinspection TypeScriptCheckImport
import style from './app.component.scss';
//noinspection TypeScriptCheckImport
import template from './app.component.html';
import {InjectUser} from "angular2-meteor-accounts-ui";

import "metismenu";
import "jquery-slimscroll"

declare var $:JQueryStatic;
@Component({
  selector: 'app',
  template,
  styles: [ style ]
})
@InjectUser('user')
export class AppComponent implements OnInit, AfterViewInit {
  //opts: ISlimScrollOptions;
  constructor() {

  }

  logout() {
    Meteor.logout();
  }

  ngOnInit() {
    // this.opts = {
    //   barOpacity: "0.4",
    //   gridOpacity: "0.0",
    //   barWidth: "8",
    //   barBackground: '#000000'
    // }
    // Add body-small class if window less than 768px
    if ($(document).width() < 769) {
      $('body').addClass('body-small')
    } else {
      $('body').removeClass('body-small')
    }

    // MetsiMenu
    $('#side-menu').metisMenu();

    // Collapse ibox function
    $('.collapse-link').click(function () {
      var ibox = $(this).closest('div.ibox');
      var button = $(this).find('i');
      var content = ibox.find('div.ibox-content');
      content.slideToggle(200);
      button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
      ibox.toggleClass('').toggleClass('border-bottom');
      setTimeout(function () {
        ibox.resize();
        ibox.find('[id^=map-]').resize();
      }, 50);
    });

    // Close ibox function
    $('.close-link').click(function () {
      var content = $(this).closest('div.ibox');
      content.remove();
    });

    // Fullscreen ibox function
    $('.fullscreen-link').click(function () {
      var ibox = $(this).closest('div.ibox');
      var button = $(this).find('i');
      $('body').toggleClass('fullscreen-ibox-mode');
      button.toggleClass('fa-expand').toggleClass('fa-compress');
      ibox.toggleClass('fullscreen');
      setTimeout(function () {
        $(window).trigger('resize');
      }, 100);
    });

    // Close menu in canvas mode
    $('.close-canvas-menu').click(function () {
      $("body").toggleClass("mini-navbar");
    });

    // Run menu of canvas
    $('body.canvas-menu .sidebar-collapse').slimScroll({
      height: '100%',
      railOpacity: 0.9
    });

    // Open close right sidebar
    $('.right-sidebar-toggle').click(function () {
      $('#right-sidebar').toggleClass('sidebar-open');
    });

    // Initialize slimscroll for right sidebar
    $('.sidebar-container').slimScroll({
      height: '100%',
      railOpacity: 0.4,
      wheelStep: 10
    });

    // Open close small chat
    $('.open-small-chat').click(function () {
      $(this).children().toggleClass('fa-comments').toggleClass('fa-remove');
      $('.small-chat-box').toggleClass('active');
    });

    // Initialize slimscroll for small chat
    $('.small-chat-box .content').slimScroll({
      height: '234px',
      railOpacity: 0.4
    });

    // Append config box / Only for demo purpose
    // Uncomment on server mode to enable XHR calls
    //$.get("skin-config.html", function (data) {
    //    if (!$('body').hasClass('no-skin-config'))
    //        $('body').append(data);
    //});

    // Minimalize menu
    $('.navbar-minimalize').click(function () {
      $("body").toggleClass("mini-navbar");

    });


    // Full height of sidebar
    function fix_height() {
      var heightWithoutNavbar = $("body > #wrapper").height() - 61;
      $(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");

      var navbarHeigh = $('nav.navbar-default').height();
      var wrapperHeigh = $('#page-wrapper').height();

      if (navbarHeigh > wrapperHeigh) {
        $('#page-wrapper').css("min-height", navbarHeigh + "px");
      }

      if (navbarHeigh < wrapperHeigh) {
        $('#page-wrapper').css("min-height", $(window).height() + "px");
      }

      if ($('body').hasClass('fixed-nav')) {
        if (navbarHeigh > wrapperHeigh) {
          $('#page-wrapper').css("min-height", navbarHeigh - 60 + "px");
        } else {
          $('#page-wrapper').css("min-height", $(window).height() - 60 + "px");
        }
      }

    }

    fix_height();

    // Fixed Sidebar
    $(window).bind("load", function () {
      if ($("body").hasClass('fixed-sidebar')) {
        $('.sidebar-collapse').slimScroll({
          height: '100%',
          railOpacity: 0.9
        });
      }
    });

    // Move right sidebar top after scroll
    $(window).scroll(function () {
      if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav')) {
        $('#right-sidebar').addClass('sidebar-top');
      } else {
        $('#right-sidebar').removeClass('sidebar-top');
      }
    });

    $(window).bind("load resize scroll", function () {
      if (!$("body").hasClass('body-small')) {
        fix_height();
      }
    });



    // Add slimscroll to element
    $('.full-height-scroll').slimScroll({
      height: '100%'
    })

  }

  ngAfterViewInit() {

  }

}
