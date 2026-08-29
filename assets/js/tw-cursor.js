if ($("body").not(".is-mobile").hasClass("tw-magic-cursor")) {
  $(".tw-magnetic-item").wrap('<div class="tw-magnetic-wrap"></div>');

  if ($("a.tw-magnetic-item").length) {
    $("a.tw-magnetic-item").addClass("not-hide-cursor");
  }

  var $mouse = { x: 0, y: 0 };
  var $pos = { x: 0, y: 0 };
  var $ratio = 0.15;
  var $active = false;
  var $ball = $("#ball");

  var $ballWidth = 5;
  var $ballHeight = 5;
  var $ballScale = 1;
  var $ballOpacity = 1;
  var $ballBorderWidth = 1;

  gsap.set($ball, {
    xPercent: -50,
    yPercent: -50,
    width: $ballWidth,
    height: $ballHeight,
    borderWidth: $ballBorderWidth,
    opacity: $ballOpacity,
    pointerEvents: "none",
  });

  document.addEventListener("mousemove", mouseMove);

  function mouseMove(e) {
    $mouse.x = e.clientX;
    $mouse.y = e.clientY;
  }

  gsap.ticker.add(updatePosition);

  function updatePosition() {
    if (!$active) {
      $pos.x += ($mouse.x - $pos.x) * $ratio;
      $pos.y += ($mouse.y - $pos.y) * $ratio;

      gsap.set($ball, { x: $pos.x, y: $pos.y });
    }
  }

  // Hide on hover
  $("a, button, .tw-cart-minus, .tw-cart-plus")
    .not(".cursor-hide")
    .on("mouseenter", function () {
      gsap.to($ball, { duration: 0.3, scale: 0, opacity: 0 });
    })
    .on("mouseleave", function () {
      gsap.to($ball, {
        duration: 0.3,
        scale: $ballScale,
        opacity: $ballOpacity,
      });
    });

  // Hide on click
  $("a")
    .not('[target="_blank"]')
    .not(".cursor-hide")
    .not('[href^="#"]')
    .not('[href^="mailto"]')
    .not('[href^="tel"]')
    .not(".lg-trigger")
    .not(".tw-btn-disabled a")
    .on("click", function () {
      gsap.to($ball, { duration: 0.3, scale: 1.3, autoAlpha: 0 });
    });

  // Show/hide on document leave/enter
  $(document)
    .on("mouseleave", function () {
      gsap.to("#magic-cursor", { duration: 0.3, autoAlpha: 0 });
    })
    .on("mouseenter", function () {
      gsap.to("#magic-cursor", { duration: 0.3, autoAlpha: 1 });
    });

  // Show as the mouse moves
  $(document).mousemove(function () {
    gsap.to("#magic-cursor", { duration: 0.3, autoAlpha: 1 });
  });

  // Cursor view on hover (Fixed: single crisp text, no duplication)
  $("[data-cursor]").each(function () {
    var cursorText = $(this).attr("data-cursor") || "View";
    $(this)
      .on("mouseenter", function () {
        $("#ball").addClass("with-blur");
        $ball.empty();
        var $ballView = $('<div class="ball-view"></div>').text(cursorText);
        $ball.append($ballView);
        gsap.to($ball, {
          duration: 0.3,
          yPercent: -75,
          width: 140,
          height: 140,
          opacity: 1,
          borderWidth: 1,
          zIndex: 99999,
          backdropFilter: "blur(14px)",
          backgroundColor: "#ff6644",
          boxShadow: "0px 1px 3px 0px rgba(18, 20, 32, 0.14)",
        });
        gsap.to($ballView, { duration: 0.3, scale: 1, autoAlpha: 1 });
      })
      .on("mouseleave", function () {
        gsap.to($ball, {
          duration: 0.3,
          yPercent: -50,
          width: $ballWidth,
          height: $ballHeight,
          opacity: $ballOpacity,
          borderWidth: $ballBorderWidth,
          backgroundColor: "#1c1d21",
        });
        gsap.to($ball.find(".ball-view"), {
          duration: 0.2,
          scale: 0,
          autoAlpha: 0,
          onComplete: function () {
            $ball.empty();
          },
        });
        $("#ball").removeClass("with-blur");
      });
    $(this).addClass("not-hide-cursor");
  });
}
