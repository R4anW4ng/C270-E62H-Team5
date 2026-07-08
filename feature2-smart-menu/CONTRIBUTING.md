# Contributing / Run instructions

This repository contains the Smart Menu app (Node.js + Express + MySQL).

Local setup (recommended using Docker):

1. Start MySQL and seed the database:

```bash
docker run --name smartmenu-mysql -e MYSQL_ROOT_PASSWORD=rootpw -e MYSQL_DATABASE=feature2_db -p 3306:3306 -d mysql:8
# copy SQL and import
docker cp db/menu.sql smartmenu-mysql:/menu.sql
docker exec -i smartmenu-mysql sh -c 'mysql -uroot -prootpw feature2_db < /menu.sql'
```

2. Install dependencies:

```bash
npm install
```

3. Start the app (env vars optional):

```bash
# default connects to 127.0.0.1:3306 with root/rootpw
MYSQL_HOST=127.0.0.1 MYSQL_USER=root MYSQL_PASSWORD=rootpw MYSQL_DATABASE=feature2_db npm start
# or
npm start
```

4. Open the app:

```
http://localhost:3000
```

When you're invited to the organization's repository

- Add the org repo as `upstream` and fetch:

```bash
git remote add upstream git@github.com:ORG/REPO.git
git fetch upstream
```

- Rebase or keep your branch up-to-date:

```bash
git checkout feature/smart-menu
git fetch upstream
git rebase upstream/main
# resolve conflicts if any, then push
git push --force-with-lease origin feature/smart-menu
```

- Open a Pull Request from `feature/smart-menu` → `upstream/main` on GitHub.

If you want, I can open the PR for you once you are added to the organization.
