ONBOARDING: Ready steps for joining the org and syncing this work
===============================================================

This file contains an explicit, copy-pasteable checklist so you're ready
to integrate this work into the group's repository as soon as you're
invited. No interactive steps here — just follow the commands.

Before you start (locally)
- Ensure you have `git` and Docker installed.
- You're currently working on branch `feature/smart-menu` in your fork.

Quick checklist when you're invited to the org repo
1) Add the org repo as `upstream` (replace `ORG/REPO`):

   git remote add upstream git@github.com:ORG/REPO.git
   git fetch upstream

   # (If your environment doesn't use SSH, use HTTPS)
   # git remote add upstream https://github.com/ORG/REPO.git

2) Make sure you're on the feature branch:

   git checkout feature/smart-menu

3) Rebase onto the org's `main` and resolve conflicts (if any):

   git fetch upstream
   git rebase upstream/main

   # If there are conflicts, resolve files, then:
   git add <resolved-files>
   git rebase --continue

4) Push your updated branch to your remote fork (force-with-lease):

   git push --force-with-lease origin feature/smart-menu

5) Open a Pull Request on GitHub
   - Create a PR from `your-username/feature/smart-menu` -> `ORG/main`.
   - Use a clear title and describe the changes. Mention that the DB
     is seeded via `db/menu.sql` and include the Docker commands below.

If you are given write access to the org repo and prefer to push the
branch directly there you can instead push the branch to `upstream`:

   git push upstream feature/smart-menu

Local dev / run instructions (copy-paste)
1) Start MySQL in Docker and import seed data:

   docker run --name smartmenu-mysql -e MYSQL_ROOT_PASSWORD=rootpw -e MYSQL_DATABASE=feature2_db -p 3306:3306 -d mysql:8
   docker cp db/menu.sql smartmenu-mysql:/menu.sql
   docker exec -i smartmenu-mysql sh -c 'mysql -uroot -prootpw feature2_db < /menu.sql'

2) Install and run the app (defaults use root/rootpw):

   npm install
   MYSQL_HOST=127.0.0.1 MYSQL_USER=root MYSQL_PASSWORD=rootpw MYSQL_DATABASE=feature2_db npm start

3) Open the app: http://localhost:3000

Helper notes
- The code was adjusted to use env vars for DB settings (see `app.js`).
- I created `feature/smart-menu` with the UI and DB fixes and pushed it to
  your fork at `origin/feature/smart-menu`.

If you want, after they invite you I can:
- Add `upstream` for you and rebase the branch (if you give me the
  upstream URL), or
- Open the PR targeting the org directly.
