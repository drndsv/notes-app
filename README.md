# Задание: Создание приложения для управления заметками

- Создайте новый Angular-проект с помощью [Angular CLI](https://v20.angular.dev/tools/cli/setup-local#create-a-workspace-and-initial-application);
- Создайте интерфейс Note с полями id, title, content;
- Создайте два сервиса:
  - Один для работы с заметками через API (NotesApiService)
    - Используйте `json-server` для имитации бэкенда, [инструкция](#json-server) по установке и базовой настройке лежит ниже;
  - Другой для работы с заметками через localStorage (LocalStorageNotesService);
  - Реализуйте методы для получения, добавления заметок;
- Создайте сервис, который будет сохранять информацию о том, какой тип сервиса используется (API или localStorage);
- В `app.component` поместите логику создания новой заметки, получения заметок и переключения между сервисами используя DI (переключение должно вызывать перезагрузку страницы);
- Проверьте выполнение всех заданий, запустив Angular приложение. Убедитесь, что зависимости инжектируются корректно. Также убедитесь, что заметки загружаются из соответствующего сервиса в зависимости от выбранного типа сервиса.

## json-server
- Установите json-server для имитации backend:`npm install -g json-server`;
- В корне проекта создайте файл `db.json` с данными для заметок:
```
{
  "notes": [
    {
      "id": 1,
      "title": "First Note",
      "content": "This is the content of the first note."
    },
    {
      "id": 2,
      "title": "Second Note",
      "content": "This is the content of the second note."
    }
  ]
}
```
- Запустите json-server в watch-режиме: `json-server --watch db.json`.
