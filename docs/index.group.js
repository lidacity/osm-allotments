var OptionIcon =
{
 iconSize: [25, 41],
 iconAnchor: [12, 41],
 popupAnchor: [1, -34],
};

var LeafIcon = L.Icon.extend({options: OptionIcon});

var Group =
{
 green: L.layerGroup([], {title: 'Всё в порядке', short: 'Ок', icon: new LeafIcon({iconUrl: './img/marker-icon-green.png'}), }),
 orange: L.layerGroup([], {title: 'Почти всё в порядке (УНП, дата)', short: 'Дата', icon: new LeafIcon({iconUrl: './img/marker-icon-orange.png'}), }),
 gold: L.layerGroup([], {title: 'Почти всё в порядке (УНП)', short: 'УНП', icon: new LeafIcon({iconUrl: './img/marker-icon-gold.png'}), }),
 blue: L.layerGroup([], {title: 'Без данных', short: 'Пусто', icon: new LeafIcon({iconUrl: './img/marker-icon-blue.png'}), }),
 red: L.layerGroup([], {title: 'Неверные подписи', short: 'Подпись', icon: new LeafIcon({iconUrl: './img/marker-icon-red.png'}), }),
 black: L.layerGroup([], {title: 'Не подписан', short: 'Пусто', icon: new LeafIcon({iconUrl: './img/marker-icon-black.png'}), }),
};
