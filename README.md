# boilerplate

Simple webpack configuration with babel, sass and webpack-dev-server.

Js and css will minify in production mode.

## Development mode

```
yarn dev
```

In this mode _.css and _.js will remove from /dist folder.

## Production mode

```
yarn build
```

Assets (_.css and _.js) will save in /dist folder.

## Основная структура страницы

```
<body>
  <div class="content">
    {{> sections/header }}

    <main>
      <!-- section -->
      <!-- section -->
      <!-- section -->
    </main>

    {{> sections/footer }}
  </div>
</body>
```

## Handebars

Все компоненты хранятся в `src/modules`.

если компонент находится в `src/modules/examples/example.hbs`, то получить его можно

```
{{> examples/example }}
```

## Модальные окна

Реализация модальных окон сделана в `src/js/components/Modal.js`

Класс модальных окон добавлен в window, у класса есть статические методы

```
Modal.close(id)
Modal.open(id)
Modal.setCloseCallback(id, callback)
Modal.setOpenCallback(id, callback)
```

`id` это id html элемента окна

Пример использования API

```
Modal.setOpenCallback('example-id', exampleCallback);
Modal.open('example-id');

function exampleCallback($target) {
  console.log($target);
}

const $modal = document.querySelector('#example-id');

$modal.modal.open();

console.log($modal.modal) // => экземпляр класса Modal;
```

## Дропдауны

Все то же самое, только имя класса Dropdown
