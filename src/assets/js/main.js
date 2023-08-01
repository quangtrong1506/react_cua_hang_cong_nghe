"use strict";

(function ($) {
  $(window).on("load", function () {
    $(".loader").fadeOut();
    $("#preloder").delay(200).fadeOut("slow");
    $(".featured__controls li").on("click", function () {
      $(".featured__controls li").removeClass("active");
      $(this).addClass("active");
    });
    if ($(".featured__filter").length > 0) {
      var containerEl = document.querySelector(".featured__filter");
      var mixer = mixitup(containerEl);
    }
  });
  $(".set-bg").each(function () {
    var bg = $(this).data("setbg");
    $(this).css("background-image", "url(" + bg + ")");
  });
  $(".humberger__open").on("click", function () {
    $(".humberger__menu__wrapper").addClass("show__humberger__menu__wrapper");
    $(".humberger__menu__overlay").addClass("active");
    $("body").addClass("over_hid");
  });

  $(".humberger__menu__overlay").on("click", function () {
    $(".humberger__menu__wrapper").removeClass(
      "show__humberger__menu__wrapper"
    );
    $(".humberger__menu__overlay").removeClass("active");
    $("body").removeClass("over_hid");
  });

  /*------------------
		Navigation
	--------------------*/
  $(".mobile-menu").slicknav({
    prependTo: "#mobile-menu-wrap",
    allowParentLinks: true,
  });

  /*-----------------------
        Categories Slider
    ------------------------*/
  $(".categories__slider").owlCarousel({
    loop: true,
    margin: 0,
    items: 4,
    dots: false,
    nav: true,
    navText: [
      "<span class='fa fa-angle-left'><span/>",
      "<span class='fa fa-angle-right'><span/>",
    ],
    animateOut: "fadeOut",
    animateIn: "fadeIn",
    smartSpeed: 1200,
    autoHeight: false,
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },

      480: {
        items: 2,
      },

      768: {
        items: 3,
      },

      992: {
        items: 4,
      },
    },
  });

  $(".hero__categories__all").on("click", function () {
    $(".hero__categories ul").slideToggle(400);
  });

  /*--------------------------
        Latest Product Slider
    ----------------------------*/
  $(".latest-product__slider").owlCarousel({
    loop: true,
    margin: 0,
    items: 1,
    dots: false,
    nav: true,
    navText: [
      "<span class='fa fa-angle-left'><span/>",
      "<span class='fa fa-angle-right'><span/>",
    ],
    smartSpeed: 1200,
    autoHeight: false,
    autoplay: true,
  });

  /*-----------------------------
        Product Discount Slider
    -------------------------------*/
  $(".product__discount__slider").owlCarousel({
    loop: true,
    margin: 0,
    items: 3,
    dots: true,
    smartSpeed: 1200,
    autoHeight: false,
    autoplay: true,
    responsive: {
      320: {
        items: 1,
      },

      480: {
        items: 2,
      },

      768: {
        items: 2,
      },

      992: {
        items: 3,
      },
    },
  });

  /*---------------------------------
        Product Details Pic Slider
    ----------------------------------*/
  $(".product__details__pic__slider").owlCarousel({
    loop: true,
    margin: 20,
    items: 4,
    dots: true,
    smartSpeed: 1200,
    autoHeight: false,
    autoplay: true,
  });

  /*-----------------------
		Price Range Slider
	------------------------ */
  var rangeSlider = $(".price-range"),
    minamount = $("#minamount"),
    maxamount = $("#maxamount"),
    minPrice = rangeSlider.data("min"),
    maxPrice = rangeSlider.data("max");
  rangeSlider.slider({
    range: true,
    min: minPrice,
    max: maxPrice,
    values: [minPrice, maxPrice],
    slide: function (event, ui) {
      var max = parseInt(ui.values[1]) * 1000;
      max = new Intl.NumberFormat("vi-VN").format(max);
      var min = parseInt(ui.values[0]) * 1000;
      min = new Intl.NumberFormat("vi-VN").format(min);
      minamount.val(min);
      maxamount.val(max);
    },
  });
  // minamount.val(
  //   new Intl.NumberFormat("vi-VN").format(rangeSlider.slider("values", 0))
  // );
  // maxamount.val(
  //   new Intl.NumberFormat("vi-VN").format(rangeSlider.slider("values", 1)) +
  //     ".000"
  // );
  if (document.querySelector("#minamount")) {
    document
      .querySelector("#minamount")
      .addEventListener("change", function () {
        var min = document.querySelector("#minamount").value;
        var max = document.querySelector("#maxamount").value;
        min = parseInt(min.replace(/[,.\s]/g, ""));
        max = parseInt(max.replace(/[,.\s]/g, ""));
        if (min < max && min > 0) {
          $(".price-range").slider("values", 0, parseInt(min / 1000));
          document.querySelector("#minamount").value = new Intl.NumberFormat(
            "vi-VN"
          ).format(min);
        } else {
          $(".price-range").slider("values", 0, 0);
          document.querySelector("#minamount").value = new Intl.NumberFormat(
            "vi-VN"
          ).format(0);
        }
      });
    document.querySelector("#minamount").addEventListener("input", function () {
      var min = document.querySelector("#minamount").value;
      if (min === "" || min === undefined || min === null) min = "0";
      min = parseInt(min.replace(/[,.\s]/g, ""));
      document.querySelector("#minamount").value = new Intl.NumberFormat(
        "vi-VN"
      ).format(min);
    });
    document
      .querySelector("#maxamount")
      .addEventListener("change", function () {
        var min = document.querySelector("#minamount").value;
        var max = document.querySelector("#maxamount").value;
        min = parseInt(min.replace(/[,.\s]/g, ""));
        max = parseInt(max.replace(/[,.\s]/g, ""));
        if (min < max && max < 10000000) {
          $(".price-range").slider("values", 1, parseInt(max / 1000));
          document.querySelector("#maxamount").value = new Intl.NumberFormat(
            "vi-VN"
          ).format(max);
        } else {
          $(".price-range").slider("values", 1, 0);
          document.querySelector("#maxamount").value = new Intl.NumberFormat(
            "vi-VN"
          ).format(10000000);
        }
      });
    document.querySelector("#maxamount").addEventListener("input", function () {
      var max = document.querySelector("#maxamount").value;
      if (max === "" || max === undefined || max === null) max = "0";
      max = parseInt(max.replace(/[,.\s]/g, ""));
      document.querySelector("#maxamount").value = new Intl.NumberFormat(
        "vi-VN"
      ).format(max);
    });
  }

  /*--------------------------
        Select
    ----------------------------*/
  $("select").niceSelect();

  /*------------------
		Single Product
	--------------------*/
  $(".product__details__pic__slider img").on("click", function () {
    var imgurl = $(this).data("imgbigurl");
    var bigImg = $(".product__details__pic__item--large").attr("src");
    if (imgurl != bigImg) {
      $(".product__details__pic__item--large").attr({
        src: imgurl,
      });
    }
  });

  /*-------------------
		Quantity change
	--------------------- */
  var proQty = $(".pro-qty");
  proQty.prepend('<span class="dec qtybtn">-</span>');
  proQty.append('<span class="inc qtybtn">+</span>');
  proQty.on("click", ".qtybtn", function () {
    var $button = $(this);
    var oldValue = $button.parent().find("input").val();
    if ($button.hasClass("inc")) {
      var newVal = parseFloat(oldValue) + 1;
    } else {
      // Don't allow decrementing below zero
      if (oldValue > 0) {
        var newVal = parseFloat(oldValue) - 1;
      } else {
        newVal = 0;
      }
    }
    $button.parent().find("input").val(newVal);
  });
})(jQuery);

/*-------------------
		Tùy ý đi
	--------------------- */
function onInputPassInput_1(e) {
  if (document.querySelector(".login__mes-1").style.display == "inline-block") {
    document.querySelector(".login__mes-1").style.display = "none";
  }
}
function onKeydownPassInput_1(e) {
  if (e.keyCode == 13 && e.which == 13) {
    document.getElementById("pass-input").focus();
  }
}
function onInputPassInput_2(e) {
  if (document.querySelector(".login__mes-2").style.display == "inline-block") {
    document.querySelector(".login__mes-2").style.display = "none";
  }
}
function onKeydownPassInput_2(e) {
  if (e.keyCode == 13 && e.which == 13) {
    document.querySelector(".dn--btn").click();
  }
  if (document.querySelector("#pass-input").value == "")
    document.querySelector("#pass-input").type = "text";
  else document.querySelector("#pass-input").type = "password";
}

function closeFormLogin() {
  if (document.querySelector(".login"))
    document.querySelector(".login").remove();
  document.querySelector(".blur-login").remove();
}

function onInputPassInput_3(e) {
  if (document.querySelector(".login__mes-3").style.display == "inline-block") {
    document.querySelector(".login__mes-3").style.display = "none";
  }
}
function onKeydownPassInput_3(e) {
  if (e.keyCode == 13 && e.which == 13) {
    document.querySelector("#pass-input-2").focus();
  }
  if (document.querySelector("#pass-input-2").value == "")
    document.querySelector("#pass-input-2").type = "text";
  else document.querySelector("#pass-input-2").type = "password";
}

function actionLinkSingUp() {
  var newElement = document.createElement("form");
  newElement.classList = "form-signup";
  newElement.innerHTML = `
  <h2 class="login-header">Đăng ký</h2>
  <div class="login-signup">
    <input
      id="acc-input"
      class="form-control mr-sm-2"
      type="text"
      placeholder="Phone or email"
      autocomplete="off"
      oninput="onInputPassInput_1(event)"
      onkeydown="onKeydownPassInput_1(event)"
    />
    <span class="login__mes-1" style="color: red; display: none"
      >Tài khoản không tồn tại</span
    >
    <input
      id="pass-input"
      class="form-control mr-sm-2 mt-2"
      type="text"
      placeholder="Password"
      autocomplete="off"
      oninput="onInputPassInput_3(event)"
      onkeydown="onKeydownPassInput_3(event)"
    />
    <span class="login__mes-2" style="color: red; display: none"
      >Mật khẩu không chính xác</span
    >
    <input
      id="pass-input-2"
      class="form-control mr-sm-2 mt-2"
      type="text"
      placeholder="Confirm Password"
      autocomplete="off"
      oninput="onInputPassInput_2(event)"
      onkeydown="onKeydownPassInput_2(event)"
    />
    <span class="login__mes-3" style="color: red; display: none"
      >Xác nhận mật khẩu không chính xác</span
    >
    <button
      type="button"
      class="btn btn-form mt-2 center--btn dn--btn"
    >
      Đăng ký
    </button>
  </div>
  <div class="action-link mt-3">
    <span class="pb-3" onclick="actionLinkSingIn()">Đăng nhập</span>
  </div>`;
  if (document.querySelector(".login .form-signin"))
    document.querySelector(".login .form-signin").remove();
  document.querySelector(".login").appendChild(newElement);
  if (!document.querySelector(".blur-login")) {
    var x = document.createElement("div");
    x.classList = "blur-login";
    document.body.appendChild(x);
    x.onclick = function () {
      closeFormLogin();
    };
  }
}

function actionLinkSingIn() {
  var newElement = document.createElement("form");
  newElement.classList = "form-signin";
  newElement.innerHTML = `
  <h2 class="login-header">Đăng nhập</h2>
  <div class="login-signin">
    <input
      id="acc-input"
      class="form-control mr-sm-2"
      type="text"
      placeholder="Phone or email"
      autocomplete="off"
      oninput="onInputPassInput_1(event)"
      onkeydown="onKeydownPassInput_1(event)"
    />
    <span class="login__mes-1" style="color: red; display: none"
      >Tài khoản không tồn tại</span
    >
    <input
      id="pass-input"
      class="form-control mr-sm-2 mt-2"
      type="text"
      placeholder="Password"
      autocomplete="off"
      oninput="onInputPassInput_2(event)"
      onkeydown="onKeydownPassInput_2(event)"
    />
    <span class="login__mes-2" style="color: red; display: none"
      >Mật khẩu không chính xác</span
    >
    <button
      type="button"
      class="btn btn-form mt-2 center--btn dn--btn"
    >
      Đăng nhập
    </button>
  </div>
  <div class="action-link mt-3 pb-4">
    <span onclick="actionLinkSingUp()">Đăng ký</span>
    <span onclick="actionLinkForgotPassword()">Quên mật khẩu</span>
  </div>`;
  if (document.querySelector(".login .form-signup"))
    document.querySelector(".login .form-signup").remove();
  if (document.querySelector(".login"))
    document.querySelector(".login").appendChild(newElement);
  else {
    var x = document.createElement("div");
    x.classList = "login";
    document.body.appendChild(x);
    x.appendChild(newElement);
  }
}

function loginInHeader() {
  if (document.querySelector(".login")) {
    document.querySelector(".login").remove();
  }
  if (!document.querySelector(".blur-login")) {
    var x = document.createElement("div");
    x.classList = "blur-login";
    document.body.appendChild(x);
    x.onclick = function () {
      closeFormLogin();
    };
  }
  actionLinkSingIn();
}
function actionLinkForgotPassword() {
  var newElement = document.createElement("form");
  newElement.classList = "form-signup";
  newElement.innerHTML = `
  <h2 class="login-header">Quên mật khẩu</h2>
  <div class="login-forgot">
    <input
      id="acc-input"
      class="form-control mr-sm-2"
      type="text"
      placeholder="Phone or email"
      autocomplete="off"
      oninput="onInputPassInput_1(event)"
      onkeydown="onKeydownPassInput_1(event)"
    />
    <span class="login__mes-1" style="color: red; display: none"
      >Tài khoản không tồn tại</span
    >
    <button
      type="button"
      class="btn btn-form mt-2 center--btn dn--btn"
    >
      Xác nhận
    </button>
  </div>
  <div class="action-link mt-3">
    <span class="pb-3" onclick="actionLinkSingIn()">Đăng nhập</span>
  </div>`;
  if (document.querySelector(".login .form-signin"))
    document.querySelector(".login .form-signin").remove();
  document.querySelector(".login").appendChild(newElement);
  if (!document.querySelector(".blur-login")) {
    var x = document.createElement("div");
    x.classList = "blur-login";
    document.body.appendChild(x);
    x.onclick = function () {
      closeFormLogin();
    };
  }
}

var arrBtnLogin = document.querySelectorAll(".header__top__right__auth a.none");
for (var i = 0; i < arrBtnLogin.length; i++) {
  arrBtnLogin[i].addEventListener("click", loginInHeader);
}
