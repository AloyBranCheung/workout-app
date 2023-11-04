# workout-app

## Technologies

<div>
  <img alt="typescript" width="45px" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg">
  <img alt="next.js" width="45px" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original-wordmark.svg">
  <img alt="tailwindcss" width="45px" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-plain.svg">
  <img alt="supabase" width="75px" src="https://supabase.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-preview.50e72501.jpg&w=1920&q=75">
  <img alt="postgres" width="45px" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg">
  <img alt="prisma" width="60" src="https://logowik.com/content/uploads/images/prisma2244.jpg">
</div>

## Workout App

- [ ] Create your own workout plan
- [ ] Add your own exercises
- [ ] Track your workouts
- [ ] Track your progress (BMI, weight etc.)

## Getting Started

1. Configure `.env` file
   - Supabase API Settings
   - Copy `Project URL` to `DATABASE_URL` and `NEXT_PUBLIC_SUPABASE_URL`
   - Copy `Project API Keys: anon/public key` to `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. Run `yarn install && npx prisma generate`
3. Run `./reset_db.sh`
4. Run `./dev.sh` (make sure have docker)
5. Disable email confirmation under Authentication > Providers > Email in Supabase UI
6. run `create_user.sh` in `scripts` folder

Debugging:

- make sure you are not ip banned on the supabase admin dashboard (if you failed to login)

## Prisma

https://www.prisma.io/docs/concepts/components/prisma-migrate/mental-model

`prisma migrate dev` for development environment

`prisma migrate deploy` for deployment (PRD) environment

## Resources

- [Figma](https://www.figma.com/file/R0i3v0IsjhkOhDSYITeWHU/Workout-App?type=design&node-id=0%3A1&mode=design&t=4R5sghDXxfNWkufE-1)

## Notes to self

- index.tsx is the 'container'
- wrap logic in hooks where possible
- kebab-case for non-react file names
- PascalCase for class files
- camelCase by default

## To-do list

- [ ] Landing Page
- [ ] Login Page
- [ ] Home Page
- [ ] Workout Plan
- [ ] Execute Workout Plan and track history/progress
- [ ] Run Plan/History
