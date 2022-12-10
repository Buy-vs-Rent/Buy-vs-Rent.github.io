/*!
    * Start Bootstrap - Creative v6.0.4 (https://startbootstrap.com/theme/creative)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
    */
    (function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 72)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 75
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-scrolled");
    } else {
      $("#mainNav").removeClass("navbar-scrolled");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Magnific popup calls
  $('#portfolio').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1]
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    }
  });

})(jQuery); // End of use strict


//Function to recalculate the values
function myFunction(){
  //Calculate a price that includes a sales tax
  document.getElementById("zeikomikakaku").value = document.getElementById("konyukakaku").value * 1.1;
  document.getElementById("zeikomikakaku").innerHTML = document.getElementById("zeikomikakaku").value.toFixed(0);
  
  //Calculate a loan payment for each month
  var rate_per_period = document.getElementById("riritsu").value / 100 / 12;
  var number_of_payments = document.getElementById("hensaikikan").value * 12;
  var present_value = document.getElementById("zeikomikakaku").value;
  var future_value = 0;
  var monthly_pmt = - pmt(rate_per_period, number_of_payments, present_value, future_value, 0);
  document.getElementById("hensaigetsugaku").innerHTML = monthly_pmt.toFixed(1);
  
  //Calculate the total loan payment
  document.getElementById("hensaigaku").value = monthly_pmt * number_of_payments;
  document.getElementById("hensaigaku").innerHTML = document.getElementById("hensaigaku").value.toFixed(0);

  //Calculate a buying cost
  document.getElementById("syohiyo").value =  document.getElementById("zeikomikakaku").value * 0.1;
  document.getElementById("syohiyo").innerHTML = document.getElementById("syohiyo").value.toFixed(0);

  //Prepare data to create a table with house prices
  var kakaku_percentage = [100, 
  90, 90, 90, 90, 90, 76, 76, 76, 76, 76,
  66, 66, 66, 66, 66,	58, 58, 58, 58, 58,
  41, 41, 41, 41, 41,	34, 34, 34, 34, 34,
  34, 34, 34, 34, 23, 23, 23, 23, 23, 21,
  21, 21, 21, 21, 20, 20, 20, 20, 20, 20,
  20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
  20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
  20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
  20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
  20, 20, 20, 20, 20, 20, 20, 20, 20, 20];

  var hyomen_rimawari = [4.47,
  4.47, 4.47, 4.47, 4.47, 4.47, 4.47, 4.47, 4.47, 4.47, 4.97, 
  4.97, 4.97, 4.97, 4.97, 4.97, 4.97, 4.97, 4.97, 4.97, 6.88, 
  6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 
  6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 
  6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 
  6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 
  6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 
  6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 
  6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 
  6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 6.88, 6.88];

  var zeikomikakaku = [];
  var chikunensu = Number(document.getElementById("chikunensu").value);
  zeikomikakaku[chikunensu] = document.getElementById("zeikomikakaku").value;

  var zeinukikakaku = [];
  var hyojunyachin = [];
  var koshinryo = [];
  var koteishisanzei = [];
  
  //Create the table with house prices
  var kakakusuii_html = "";

  for(i=0; i<101; i++){
    zeikomikakaku[i] = zeikomikakaku[chikunensu]/kakaku_percentage[chikunensu]*kakaku_percentage[i];
    zeinukikakaku[i] = zeikomikakaku[i] / 1.1;
    hyojunyachin[i] = zeikomikakaku[i] * hyomen_rimawari[i] / 100 / 12;
    if(i%2 == 0){
      koshinryo[i] = 0;
    } else {
      koshinryo[i] = hyojunyachin[i];
    }
    koteishisanzei[i] = zeinukikakaku[i] * 0.015 / 6;

    kakakusuii_html += "<tr><td>"+ i +"</td><td>" + 
      kakaku_percentage[i] + "</td><td>"+ 
      zeikomikakaku[i].toFixed(0) +"</td><td class='d-none d-sm-block'>"+ 
      zeinukikakaku[i].toFixed(0) +"</td><td>"+ 
      hyomen_rimawari[i] + "</td><td>"+ 
      hyojunyachin[i].toFixed(1) +"</td><td class='d-none d-sm-block'>"+ 
      koshinryo[i].toFixed(1) +"</td><td class='d-none d-sm-block'>"+ 
      koteishisanzei[i].toFixed(1) +"</td></tr>";

  }

  document.getElementById("kakakusuii").innerHTML  = kakakusuii_html;

  //Calcurate the total of koteishisanzei
  var nyukyokikan = Number(document.getElementById("nyukyokikan").value);
  var total_koteishisanzei = 0;
  for(i=chikunensu; i<chikunensu+nyukyokikan; i++){
    total_koteishisanzei += koteishisanzei[i];

  }
  document.getElementById("koteishisanzei").innerHTML = total_koteishisanzei.toFixed(0);
  document.getElementById("koteishisanzei").value = total_koteishisanzei;
  
  //Calcurate the total of kanrihi
  document.getElementById("kanrihi_sogaku").innerHTML = document.getElementById("kanrihi").value * nyukyokikan * 12;
  document.getElementById("kanrihi_sogaku").value = document.getElementById("kanrihi").value * nyukyokikan * 12;

  //Calcurate the total of syuzentsumitate
  document.getElementById("syuzentsumitate_sogaku").innerHTML = document.getElementById("syuzentsumitate").value * nyukyokikan * 12;
  document.getElementById("syuzentsumitate_sogaku").value = document.getElementById("syuzentsumitate").value * nyukyokikan * 12;			

  //Calucurate the total of parking rent fee
  document.getElementById("chusyajodai_sogaku").innerHTML = document.getElementById("chusyajodai").value * nyukyokikan * 12;
  document.getElementById("chusyajodai_sogaku").value = document.getElementById("chusyajodai").value * nyukyokikan * 12;			

  //Calcurate the total of expenses
  var soshiharaigaku = document.getElementById("chusyajodai_sogaku").value +
  document.getElementById("syuzentsumitate_sogaku").value +
  document.getElementById("kanrihi_sogaku").value +
  document.getElementById("koteishisanzei").value +
  document.getElementById("syohiyo").value +
  document.getElementById("hensaigaku").value;
  document.getElementById("soshiharaigaku").innerHTML = soshiharaigaku.toFixed(0);

  //Calcurate bukkenzanzonkachi
  document.getElementById("zanzonkachi").innerHTML = zeinukikakaku[chikunensu+nyukyokikan].toFixed(0);
  document.getElementById("zanzonkachi").value = zeinukikakaku[chikunensu+nyukyokikan];

  //Calcurate jisshitufutansogaku
  var jisshitsufutansogaku = soshiharaigaku - 300 - document.getElementById("zanzonkachi").value;
  document.getElementById("jisshitsufutansogaku").innerHTML = jisshitsufutansogaku.toFixed(0);

  //Retrieve values for Mochiie to values for Chintai-Teigaku
  document.getElementById("kanrihi_chintai").value = document.getElementById("yachin").value * 0.1;
  document.getElementById("kanrihi_chintai").innerHTML = document.getElementById("kanrihi_chintai").value.toFixed(1);
  document.getElementById("nyukyokikan_chintai").innerHTML = document.getElementById("nyukyokikan").value;
  document.getElementById("nyukyokikan_chintai").value = document.getElementById("nyukyokikan").value;

  //Calcurate chinryosogaku
  document.getElementById("chinryosogaku").innerHTML = document.getElementById("yachin").value * document.getElementById("nyukyokikan_chintai").value * 12;
  document.getElementById("chinryosogaku").value = document.getElementById("yachin").value * document.getElementById("nyukyokikan_chintai").value * 12;

  //Calcurate kanrihi sogaku for chintai
  document.getElementById("kanrihi_sogaku_chintai").innerHTML = document.getElementById("kanrihi_sogaku").value;
  document.getElementById("kanrihi_sogaku_chintai").value = document.getElementById("kanrihi_sogaku").value;

  //Calcurate koshinryo for teigaku chintai
  document.getElementById("koshinryo_teigaku").innerHTML = document.getElementById("yachin").value;
  document.getElementById("koshinryo_teigaku").value = document.getElementById("yachin").value;	
  
  //Calcurate koshinryo sogaku
  document.getElementById("koshinryo_sogaku").value = document.getElementById("koshinryo_teigaku").value * (document.getElementById("nyukyokikan_chintai").value - (document.getElementById("nyukyokikan_chintai").value % 2)) / 2;
  document.getElementById("koshinryo_sogaku").innerHTML = document.getElementById("koshinryo_sogaku").value;			

  //Calcurate chusyajodai
  document.getElementById("chusyajodai_chintai").innerHTML = document.getElementById("chusyajodai").value;
  document.getElementById("chusyajodai_chintai").value = document.getElementById("chusyajodai").value;
  document.getElementById("chusyajodai_sogaku_chintai").innerHTML = document.getElementById("chusyajodai_sogaku").value;
  document.getElementById("chusyajodai_sogaku_chintai").value = document.getElementById("chusyajodai_sogaku").value;

  //Calcurate soshiharaigaku for teigaku chintai
  document.getElementById("soshiharaigaku_chintai").value = 
    document.getElementById("chinryosogaku").value +
    document.getElementById("kanrihi_sogaku_chintai").value +
    document.getElementById("koshinryo_sogaku").value +
    document.getElementById("chusyajodai_sogaku_chintai").value;
  document.getElementById("soshiharaigaku_chintai").innerHTML = document.getElementById("soshiharaigaku_chintai").value;

  //Calcurate yachinhojo sogaku
  document.getElementById("yachinhojo_sogaku").value = document.getElementById("yachinhojo").value * 
    document.getElementById("nyukyokikan_chintai").value * 12;
  document.getElementById("yachinhojo_sogaku").innerHTML = document.getElementById("yachinhojo_sogaku").value;

  //Calcurate jisshitsu futan sogaku for teigaku chintai
  document.getElementById("jisshitsufutansogaku_chintai").value = document.getElementById("soshiharaigaku_chintai").value - document.getElementById("yachinhojo_sogaku").value;
  document.getElementById("jisshitsufutansogaku_chintai").innerHTML = document.getElementById("jisshitsufutansogaku_chintai").value;

  //Retrive data for mochiie to data for hendo
  document.getElementById("nyukyokikan_hendo").value = document.getElementById("nyukyokikan").value;
  document.getElementById("nyukyokikan_hendo").innerHTML = document.getElementById("nyukyokikan_hendo").value;

  //Calcurate chinryo sogaku for hendo
  var chinryosogaku_hendo = 0;
  for(i=chikunensu; i<chikunensu+nyukyokikan; i++){
    chinryosogaku_hendo += hyojunyachin[i] * 12;
  }
  document.getElementById("chinryosogaku_hendo").value = chinryosogaku_hendo;
  document.getElementById("chinryosogaku_hendo").innerHTML = chinryosogaku_hendo.toFixed(0);

  //Calcurate shokiyachin
  document.getElementById("shokiyachin").value = hyojunyachin[chikunensu];
  document.getElementById("shokiyachin").innerHTML = document.getElementById("shokiyachin").value.toFixed(0);

  //Calcurate shukiyachin
  document.getElementById("shukiyachin").value = hyojunyachin[chikunensu+nyukyokikan];
  document.getElementById("shukiyachin").innerHTML = document.getElementById("shukiyachin").value.toFixed(0);

  //Calcurate kanrihisogaku
  document.getElementById("kanrihisogaku_hendo").value = document.getElementById("chinryosogaku_hendo").value * 0.1;
  document.getElementById("kanrihisogaku_hendo").innerHTML = document.getElementById("kanrihisogaku_hendo").value.toFixed(0);

  //Calcurate koshinryo sogaku
  var koshinryo_sogaku_hendo = 0;
  for(i=chikunensu; i<chikunensu+nyukyokikan; i++){
    koshinryo_sogaku_hendo += koshinryo[i];
  }		
  document.getElementById("koshinryo_sogaku_hendo").value = koshinryo_sogaku_hendo;
  document.getElementById("koshinryo_sogaku_hendo").innerHTML = document.getElementById("koshinryo_sogaku_hendo").value.toFixed(0);

  //Calcurate chusyajodai for hendo
  document.getElementById("chusyajodai_hendo").value = document.getElementById("chusyajodai").value;
  document.getElementById("chusyajodai_hendo").innerHTML = document.getElementById("chusyajodai_hendo").value;

  //Calcurate chusyajodai_sogaku_hendo
  document.getElementById("chusyajodai_sogaku_hendo").value = 
    document.getElementById("chusyajodai_hendo").value * 
    document.getElementById("nyukyokikan_hendo").value * 12;
  document.getElementById("chusyajodai_sogaku_hendo").innerHTML = document.getElementById("chusyajodai_sogaku_hendo").value;
  
  //Calcurate soshiharaigaku_hendo
  document.getElementById("soshiharaigaku_hendo").value =
    document.getElementById("chusyajodai_sogaku_hendo").value +
    document.getElementById("koshinryo_sogaku_hendo").value +
    document.getElementById("kanrihisogaku_hendo").value +
    document.getElementById("chinryosogaku_hendo").value;
  document.getElementById("soshiharaigaku_hendo").innerHTML = document.getElementById("soshiharaigaku_hendo").value.toFixed(0);

  //Calcurate yachinhojo_sogaku_hendo
  document.getElementById("yachinhojo_sogaku_hendo").value =
    document.getElementById("yachinhojo_hendo").value *
    document.getElementById("nyukyokikan_hendo").value * 12;
  document.getElementById("yachinhojo_sogaku_hendo").innerHTML = document.getElementById("yachinhojo_sogaku_hendo").value;

  //Calcurate jisshitsufutansogaku_hendo
  document.getElementById("jisshitsufutansogaku_hendo").value =
    document.getElementById("soshiharaigaku_hendo").value -
    document.getElementById("yachinhojo_sogaku_hendo").value;
  document.getElementById("jisshitsufutansogaku_hendo").innerHTML = document.getElementById("jisshitsufutansogaku_hendo").value.toFixed(0);

}

//Function to calculate monthly payments
function pmt(rate_per_period, number_of_payments, present_value, future_value, type){
  future_value = typeof future_value !== 'undefined' ? future_value : 0;
  type = typeof type !== 'undefined' ? type : 0;

  if(rate_per_period != 0.0){
    // Interest rate exists
    var q = Math.pow(1 + rate_per_period, number_of_payments);
    return -(rate_per_period * (future_value + (q * present_value))) / ((-1 + q) * (1 + rate_per_period * (type)));

  } else if(number_of_payments != 0.0){
    // No interest rate, but number of payments exists
    return -(future_value + present_value) / number_of_payments;
  }

  return 0;
}


