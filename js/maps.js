// Группы объектов
var groups = [
        {
            name: "Школы",
            style: "islands#redIcon",
            items: [
                {
                    center: [52.2867314523376, 76.97476243524292],
                    name: "ГУ СОШ №1 города Павлодара"
                }
            ]},
        {
            name: "Дет. сады",
            style: "islands#greenIcon",
            items: [
                {
                    center: [52.27736643779841, 76.97090422715989],
                    name: "ГККП Ясли-сад №1 города Павлодара"
                }
            ]},
        {
            name: "Центры",
            style: "islands#orangeIcon",
            items: [
                {
                    center: [76.9145637854458, 52.3123213505412],
                    name: "ГККП Детско-юношеский центр экологии и туризма карты"
                }
            ]},
        {
            name: "Муз. школы",
            style: "islands#blueIcon",
            items: [
                {
                    center: [52.28467094276467, 76.95369956673721],
                    name: "ГККП Детская музыкальная школа №1 им. Курмангазы"
                }
            ]},
        {
            name: "Худ. школы",
            style: "islands#yellowIcon",
            items: [
                {
                    center: [52.29509222264681, 76.94649353293539],
                    name: "Детская художественная школа №1"
                }
            ]},
        {
            name: "Тех. школы",
            style: "islands#grayIcon",
            items: [
                {
                    center: [52.27720644225984, 76.96568875428076],
                    name: "Детская техническая школа, ГККП;"
                }
            ]},
    ];


ymaps.ready(init);

function init() {

    // Создание экземпляра карты.
    var myMap = new ymaps.Map('map', {
            center: [50.443705, 30.530946],
            zoom: 14
        }, {
            searchControlProvider: 'yandex#search'
        }),
        // Контейнер для меню.
        menu = $('<ul class="menu"/>');
        
    for (var i = 0, l = groups.length; i < l; i++) {
        createMenuGroup(groups[i]);
    }

    function createMenuGroup (group) {
        // Пункт меню.
        var menuItem = $('<li><a href="#">' + group.name + '</a></li>'),
        // Коллекция для геообъектов группы.
            collection = new ymaps.GeoObjectCollection(null, { preset: group.style }),
        // Контейнер для подменю.
            submenu = $('<ul class="submenu"/>');

        // Добавляем коллекцию на карту.
        myMap.geoObjects.add(collection);
        // Добавляем подменю.
        menuItem
            .append(submenu)
            // Добавляем пункт в меню.
            .appendTo(menu)
            // По клику удаляем/добавляем коллекцию на карту и скрываем/отображаем подменю.
            .find('a')
            .bind('click', function () {
                if (collection.getParent()) {
                    myMap.geoObjects.remove(collection);
                    submenu.hide();
                } else {
                    myMap.geoObjects.add(collection);
                    submenu.show();
                }
            });
        for (var j = 0, m = group.items.length; j < m; j++) {
            createSubMenu(group.items[j], collection, submenu);
        }
    }

    function createSubMenu (item, collection, submenu) {
        // Пункт подменю.
        var submenuItem = $('<li><a href="#">' + item.name + '</a></li>'),
        // Создаем метку.
            placemark = new ymaps.Placemark(item.center, { balloonContent: item.name });

        // Добавляем метку в коллекцию.
        collection.add(placemark);
        // Добавляем пункт в подменю.
        submenuItem
            .appendTo(submenu)
            // При клике по пункту подменю открываем/закрываем баллун у метки.
            .find('a')
            .bind('click', function () {
                if (!placemark.balloon.isOpen()) {
                    placemark.balloon.open();
                } else {
                    placemark.balloon.close();
                }
                return false;
            });
    }

    // Добавляем меню в тэг BODY.
    menu.appendTo($('body'));
    // Выставляем масштаб карты чтобы были видны все группы.
    myMap.setBounds(myMap.geoObjects.getBounds());
}