(function () {
  "use strict";
  var jQueryPlugin = (window.jQueryPlugin = function (ident, func) {
    return function (arg) {
      if (this.length > 1) {
        this.each(function () {
          var $this = $(this);

          if (!$this.data(ident)) {
            $this.data(ident, func($this, arg));
          }
        });

        return this;
      } else if (this.length === 1) {
        if (!this.data(ident)) {
          this.data(ident, func(this, arg));
        }

        return this.data(ident);
      }
    };
  });
})();

(function () {
  "use strict";
  function meta($root) {
    const element = $root;
    const seo_min = $root.data("seo-min");
    let seo_max = $root.data("seo-max");
    const seo_input = $root.find("[data-seo-input]");
    $(element).append("<seo-progress><span></span></seo-progress>");
    const progress = $root.find("seo-progress span");

    function seo() {
      const seo_input_lenght = $(seo_input).val().length;
      var progress_el = (seo_input_lenght * 100) / seo_max;
      progress.css("width", progress_el + "%");
      if (seo_input_lenght > seo_max - 15 && seo_input_lenght <= seo_max) {
        progress.css("background-color", "orange");
      } else if (seo_input_lenght > seo_max || seo_input_lenght < seo_min) {
        progress.css("background-color", "red");
      } else {
        progress.css("background-color", "green");
      }
    }
    seo();

    $(seo_input).on("input", function () {
      seo();
    });
  }
  $.fn.seoInput = jQueryPlugin("seoInput", meta);
  $("[data-meta]").seoInput();
})();

$('[data-seo-input="title"]')
  .keyup(function () {
    var value = $(this).val();
    $(".snip-title").text(value);
  })
  .keyup();

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/ü/g, "u")
    .replace(/ö/g, "o")
    .replace(/ğ/g, "g")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ç/g, "c")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
    .replace(/[\s_-]+/g, "-");
}

$('[data-seo-input="title"]')
  .keyup(function () {
    $slug = slugify($(this).val());
    $(".snip-url").text("http://teknoloji-haberleri.com/yapay-zeka/" + $slug);
  })
  .keyup();

$('[data-seo-input="description"]')
  .keyup(function () {
    var value = $(this).val();
    $(".snip-description").text(value);
  })
  .keyup();
