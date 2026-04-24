# Адаптивный интернет-магазин пиццерии на Next.js и TypeScript с административной панелью

### Ссылка на сайт: <a href="https://next-project-ochre-eta.vercel.app/">Next Pizza</a>

#### :hammer_and_wrench: Стек технологий:
<p align="left">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nextjs,ts,react,tailwind,prisma,html" />
  </a>
</p>

<p>NextJS, TypeScript, React, Zustand, TailwindCSS, Prisma, NextAdmin, NextAuth, Shadcn-ui, HTML5</p>

---
#### На сайте реализовано:

###### Главная страница с отображением продуктов и фильтрации с помощью компонентов shadcn и стилизации на TailwindCSS:
![](/gifs/root-page.gif)

###### Фильтрация товаров по: типу теста, размеру пиццы, цене и игредиентам:
![](/gifs/filters.gif)

###### Поиск по продуктам:
![](/gifs/search.gif)

###### Отображение продуктов в модальном окне с выбором варианта товара и возможностью добавления доп. ингредиентов:
![](/gifs/product-modal.gif)

###### Корзина:
![](/gifs/cart.gif)

###### Оформление заказов с оплатой через ЮKassa и отправкой писем через Resend:
![](/gifs/order.gif)

###### Отображение акций в виде insta-stories с помощью react-insta-stories:
![](/gifs/stories.gif)

###### Регистрация/авторизация (стандартная, через google, через github) с помощью next-auth и react-hook-form, а также личный кабинет с возможностью правки данных:
![](/gifs/auth.gif)

###### Административная панель для управления магазином с помощью next-admin:
![](/gifs/admin.gif)

---
### Запуск проекта:

Для работы интернет-магазина в проекте должен быть .env файл с ключами: DATABASE_URL, NEXT_PUBLIC_API_URL, RESEND_API_KEY, YOOKASSA_SHOP_ID, YOOKASSA_API_SECRET_KEY, YOOKASSA_CALLBACK_URL, NEXTAUTH_URL, NEXTAUTH_SECRET, GITHUB_ID, GITHUB_SECRET, GOOGLE_CLIENT_ID, GOOGLE_SECRET.

<ul>
  <li> npm i в корне проекта </li>
  <li> npx prisma generate в корне проекта </li>
  <li> npx prisma db push в корне проекта </li>
  <li> npm run start </li>
</ul>
