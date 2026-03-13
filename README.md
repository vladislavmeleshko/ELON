# НПК «ЭЛОН» — Корпоративный сайт

Полностью статический корпоративный сайт для **Научно-производственного кооператива «ЭЛОН»** (Минск, Беларусь).

## Стек технологий

- Чистый **HTML5** + **CSS3** + **Vanilla JavaScript** (без фреймворков)
- Адаптивная вёрстка (mobile-first), CSS Grid + Flexbox
- Шрифты: Playfair Display (заголовки) + Inter (основной текст) — Google Fonts
- Карта: OpenStreetMap (iframe embed, без API-ключа)
- Изображения: Unsplash CDN (конструктивные фото)

## Структура проекта

```
ELON/
├── index.html              # Главная страница (SPA с якорями)
├── assets/
│   ├── css/
│   │   └── style.css       # Все стили сайта
│   └── js/
│       └── main.js         # Интерактивность
└── README.md
```

## Разделы сайта

| Якорь        | Раздел                           |
|--------------|----------------------------------|
| `#hero`      | Главная / Hero с анимированными цифрами |
| `#about`     | О компании (история, ценности, реквизиты) |
| `#services`  | Услуги (4 направления деятельности) |
| `#portfolio` | Портфолио объектов (12 проектов, фильтры) |
| `#licenses`  | Лицензии и аттестаты соответствия |
| `#clients`   | Действующие заказчики |
| `#contacts`  | Контакты, карта, форма обратной связи |

## Запуск локально

### Вариант 1 — Python (быстро)
```bash
cd ELON
python3 -m http.server 8080
# Открыть: http://localhost:8080
```

### Вариант 2 — Node.js (npx)
```bash
cd ELON
npx serve .
# Или:
npx http-server . -p 8080
```

### Вариант 3 — VS Code
Установить расширение **Live Server** → ПКМ на `index.html` → *Open with Live Server*

## Деплой

### GitHub Pages
1. Создать репозиторий на GitHub
2. Поместить файлы в ветку `main` (корень репозитория)
3. Settings → Pages → Source: `main` / `/ (root)`
4. Сайт будет доступен по адресу `https://<username>.github.io/<repo>/`

### Netlify (рекомендуется)
```bash
# Через Netlify CLI:
npm install -g netlify-cli
netlify deploy --dir=. --prod

# Или перетащить папку ELON/ на app.netlify.com/drop
```

### Vercel
```bash
npm install -g vercel
cd ELON
vercel --prod
```

### Nginx / Apache (VPS)
```nginx
server {
    listen 80;
    server_name elon.by www.elon.by;
    root /var/www/elon;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    # Кэширование статики
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## Настройка формы обратной связи

В текущей версии форма симулирует отправку. Для реальной отправки замените в `assets/js/main.js` блок `setTimeout` на fetch-запрос к вашему бэкенду:

### Formspree (бесплатно, без бэкенда)
```html
<!-- В index.html замените action формы: -->
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Собственный PHP-обработчик
```javascript
// В main.js заменить setTimeout на:
const data = new FormData(form);
const response = await fetch('/send-mail.php', {
  method: 'POST',
  body: data,
});
```

## SEO

Сайт включает:
- `<meta>` теги (description, keywords, robots)
- Open Graph разметку
- Schema.org JSON-LD (`GeneralContractor` + `LocalBusiness`)
- Семантический HTML5 (`<header>`, `<main>`, `<section>`, `<footer>`, `<address>`, `<article>`)
- `alt`-атрибуты для всех изображений
- Адаптивный viewport meta
- `<link rel="canonical">`

## Производительность

- Lazy loading изображений (`loading="lazy"`)
- Hero-изображение с `fetchpriority="high"` + `loading="eager"`
- Google Fonts с `preconnect`
- Минимум зависимостей (нет jQuery, Bootstrap и т.д.)
- CSS custom properties для единой темизации

## Реквизиты компании

| Поле            | Значение                                   |
|-----------------|--------------------------------------------|
| Полное название | Научно-производственный кооператив «ЭЛОН»  |
| Адрес           | 220114, г. Минск, ул. Кедышко 26 Б, к.204 |
| УНП             | 100270914                                  |
| ОКПО            | 28716674                                   |
| Телефон         | (017) 303-87-04, (017) 369-77-82           |
| Email           | npkelon@gmail.com                          |
| Сайт            | www.elon.by                                |

---

*Сайт разработан на основе официальных данных НПК «ЭЛОН».*
