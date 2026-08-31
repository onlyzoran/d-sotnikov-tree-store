# Tree Store

Тестовое задание MStroy: класс `TreeStore` для работы с иерархическими данными и Vue 3 таблица на AG Grid Enterprise.

## Стек

- Vue 3 + TypeScript
- Vite
- AG Grid Enterprise (tree data)
- Vitest

## Запуск

```bash
npm install
npm run dev
```

Приложение откроется на `http://localhost:5173`. Данные загружаются из `public/data/items.json` через `fetch` с задержкой 2 секунды.

## Сборка

```bash
npm run build
npm run preview
```

## Тесты

```bash
npm run test:unit   # TreeStore + Vue components
npm run test:perf   # performance benchmarks
```

Покрытие: unit-тесты `TreeStore`, performance-тесты, тесты компонентов `App` и `TreeGrid`.

## TreeStore API

```typescript
const store = new TreeStore([])

store.getAll()
store.getItem(id)
store.getChildren(id)
store.getAllChildren(id)
store.getAllParents(id)
store.setItems(items)
store.addItem(item)
store.removeItem(id)
store.updateItem(item)
```

`getAllParents(id)` возвращает цепочку от элемента до корня включительно.

## Структура

```
src/
  tree-store/       # класс TreeStore
  composables/      # загрузка данных
  components/       # TreeGrid (AG Grid)
  utils/            # подготовка rowData для таблицы
public/data/        # items.json
tests/tree-store/   # unit и performance тесты
```
