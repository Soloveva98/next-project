# Адаптивный интернет-магазин пиццерии на Next.js и TypeScript с административной панелью

### Ссылка на сайт: <a href="https://next-project-ochre-eta.vercel.app/">Next Pizza</a>

#### :hammer_and_wrench: Стек технологий:
<a href="https://nextjs.org" target="_blank" rel="noreferrer">
   <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/nextjs.svg" width="36" height="36" alt="NextJS" />
</a>
<a href="https://www.typescriptlang.org" target="_blank" rel="noreferrer">
   <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/typescript-colored.svg" width="36" height="36" alt="TypeScript" />
</a>
<a href="https://react.dev" target="_blank" rel="noreferrer">
   <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/react-colored.svg" width="36" height="36" alt="React" />
</a>
<a href="https://zustand-demo.pmnd.rs" target="_blank" rel="noreferrer">
   <img src="https://user-images.githubusercontent.com/958486/218346783-72be5ae3-b953-4dd7-b239-788a882fdad6.svg" width="36" height="36" alt="Zustand" />
</a>
<a href="https://tailwindcss.com" target="_blank" rel="noreferrer">
   <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/tailwindcss-colored.svg" width="36" height="36" alt="TailwindCSS" />
</a>
<a href="https://www.prisma.io" target="_blank" rel="noreferrer">
   <img src="https://avatars.githubusercontent.com/u/17219288?s=200&v=4" width="36" height="36" alt="Prisma" />
</a>
<a href="https://github.com/premieroctet/next-admin" target="_blank" rel="noreferrer">
   <img src="https://img.icons8.com/?size=100&id=j7g3MWhe9PJ9&format=png&color=000000" width="36" height="36" alt="NextAdmin" />
</a>
<a href="https://github.com/nextauthjs/next-auth" target="_blank" rel="noreferrer">
   <img src="https://avatars.githubusercontent.com/u/67470890?s=48&v=4" width="36" height="36" alt="NextAuth" />
</a>
<a href="https://ui.shadcn.com" target="_blank" rel="noreferrer">
   <img src="https://avatars.githubusercontent.com/u/139895814?s=48&v=4" width="36" height="36" alt="Shadcn-ui" />
</a>
<a href="https://developer.mozilla.org/en-US/docs/Glossary/HTML5" target="_blank" rel="noreferrer">
   <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/html5-colored.svg" width="36" height="36" alt="HTML5" />
</a>

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
