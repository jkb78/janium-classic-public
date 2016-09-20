// test.js //
/**
 * test.js
 * Este código es de uso exclusivo del tester de páginas
 * Janium
 */

// Lista Temas de Janium
var janium_skins = [
  "skin-blue",
  "skin-blush",
  "skin-clementine",
  "skin-curious-blue",
  "skin-fuchsia",
  "skin-green",
  "skin-janium",
  "skin-librarian",
  "skin-maroon",
  "skin-navy",
  "skin-ocean",
  "skin-olive",
  "skin-orange",
  "skin-purple",
  "skin-red",
  "skin-san-marino",
  "skin-summer-sky",
  "skin-teal",
  "skin-thunderbird",
  "skin-yellow"
];

$( document ).ready(function() {

  var current_skin = get('skin');

  if (current_skin && $.inArray(current_skin, janium_skins)) {
    change_skin( current_skin );
  }

  $("[data-skin]").on('click', function (e) {
    e.preventDefault();
    change_skin($(this).data('skin'));
  });

});

/**
 * Cambia el tema original por el seleccionado
 */
function change_skin(selected_skin) {
  $.each(janium_skins, function (i) {
    $("body").removeClass(janium_skins[i]);
  });

  $("body").addClass(selected_skin);
  store('skin', selected_skin);
  return false;
}

/**
 * Almacenar nuevo parámetro en el navegador
 */
function store(name, val) {
  if (typeof (Storage) !== "undefined") {
    localStorage.setItem(name, val);
  } else {
    window.alert('Por favor, utilice un navegador moderno para ver correctamente esta página!');
  }
}

/**
 * Recupera parámetro almacenado
 */
function get(name) {
  if (typeof (Storage) !== "undefined") {
    return localStorage.getItem(name);
  } else {
    window.alert('Por favor, utilice un navegador moderno para ver correctamente esta página!');
  }
}
