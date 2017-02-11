/**
 * test_site.js
 * Este código es de uso exclusivo del tester de páginas Janium.
 * Hacer caso omiso del mismo.
 */

// Lista Temas de Janium
var janium_skins = [
  "dummy",
  "skin-black",
  "skin-blue",
  "skin-blue-grey",
  "skin-blush",
  "skin-bright-red",
  "skin-brown",
  "skin-clementine",
  "skin-cranberry",
  "skin-curious-blue",
  "skin-cyan",
  "skin-dark-cyan",
  "skin-dark-green",
  "skin-dark-lime",
  "skin-dark-magenta",
  "skin-dark-pink",
  "skin-dark-red",
  "skin-deep-orange",
  "skin-deep-purple",
  "skin-fuchsia",
  "skin-green",
  "skin-grey",
  "skin-indigo",
  "skin-janium",
  "skin-librarian",
  "skin-light-cyan",
  "skin-light-grey",
  "skin-light-orange",
  "skin-lime",
  "skin-maroon",
  "skin-navy",
  "skin-ocean",
  "skin-olive",
  "skin-orange",
  "skin-pure-yellow",
  "skin-purple",
  "skin-red",
  "skin-san-marino",
  "skin-soft-blue",
  "skin-summer-sky",
  "skin-teal",
  "skin-thunderbird",
  "skin-vivid-blue",
  "skin-yellow",
  "skin-black-light",
  "skin-blue-light",
  "skin-blue-grey-light",
  "skin-blush-light",
  "skin-bright-red-light",
  "skin-brown-light",
  "skin-clementine-light",
  "skin-cranberry-light",
  "skin-curious-blue-light",
  "skin-cyan-light",
  "skin-dark-cyan-light",
  "skin-dark-green-light",
  "skin-dark-lime-light",
  "skin-dark-magenta-light",
  "skin-dark-pink-light",
  "skin-dark-red-light",
  "skin-deep-orange-light",
  "skin-deep-purple-light",
  "skin-fuchsia-light",
  "skin-green-light",
  "skin-grey-light",
  "skin-indigo-light",
  "skin-janium-light",
  "skin-librarian-light",
  "skin-light-cyan-light",
  "skin-light-grey-light",
  "skin-light-orange-light",
  "skin-lime-light",
  "skin-maroon-light",
  "skin-navy-light",
  "skin-ocean-light",
  "skin-olive-light",
  "skin-orange-light",
  "skin-pure-yellow-light",
  "skin-purple-light",
  "skin-red-light",
  "skin-san-marino-light",
  "skin-soft-blue-light",
  "skin-summer-sky-light",
  "skin-teal-light",
  "skin-thunderbird-light",
  "skin-vivid-blue-light",
  "skin-yellow-light"
];

$( document ).ready(function() {

  var current_skin = get('skin');
  //console.log('CSK: ', current_skin);

  if (current_skin && $.inArray(current_skin, janium_skins)) {
    //console.log('EXIST CSK: ', current_skin);
    change_skin( current_skin );
  }

  $("[data-skin]").on('click', function (e) {
   // e.preventDefault();
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
