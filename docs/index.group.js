var OptionIcon =
{
 iconSize: [25, 41],
 iconAnchor: [12, 41],
 popupAnchor: [1, -34],
};

var LeafIcon = L.Icon.extend({options: OptionIcon});

var Group =
{
 green: L.layerGroup([], {title: 'Всё в порядке', short: 'Ok', icon: new LeafIcon({iconUrl: './img/marker-icon-green.png'}), }),
 blue: L.layerGroup([], {title: 'Почти всё в порядке', short: 'УНП', icon: new LeafIcon({iconUrl: './img/marker-icon-blue.png'}), }),
 red: L.layerGroup([], {title: 'Неверные подписи', short: 'Подпись', icon: new LeafIcon({iconUrl: './img/marker-icon-red.png'}), }),
 black: L.layerGroup([], {title: 'Не подписан', short: 'Пусто', icon: new LeafIcon({iconUrl: './img/marker-icon-black.png'}), }),
};
