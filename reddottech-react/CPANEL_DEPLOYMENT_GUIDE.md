# 🚀 Complete cPanel Deployment Master Guide & Troubleshooting Blueprint

This guide document provides the exact end-to-end steps to deploy full-stack Node.js / React SSR applications on **cPanel (CloudLinux / LiteSpeed)**, along with a complete post-mortem of every issue encountered and how to prevent them in future projects.

---

## 📑 Table of Contents
1. [End-to-End Deployment Walkthrough](#-end-to-end-deployment-walkthrough)
2. [Post-Mortem & Troubleshooting Handbook](#-post-mortem--troubleshooting-handbook)
3. [The Golden Rules for Future Deployments](#-the-golden-rules-for-future-deployments)

---

## 🛠️ End-to-End Deployment Walkthrough

### STEP 1: Create Database in cPanel
1. In cPanel, open **MySQL® Database Wizard**.
2. **Database Name**: e.g., `reddot_db` &rarr; Full name will be `youruser_reddot_db`.
3. **Database User**: e.g., `reddot_user` &rarr; Full user will be `youruser_reddot_user`.
4. **Password**: Generate and copy a strong password.
5. **Privileges**: Check **ALL PRIVILEGES** &rarr; click **Make Changes**.
6. Note down the full credentials:
   - Database Name: `youruser_reddot_db`
   - Database User: `youruser_reddot_user`
   - Password: `yourpassword`

### STEP 2: Import Database Schema (phpMyAdmin)
1. In cPanel, open **phpMyAdmin**.
2. Click your database in the left sidebar (`youruser_reddot_db`).
3. Click the **Import** tab &rarr; Choose `server/schema.sql` &rarr; click **Import**.

### STEP 3: Point Domain Document Root (cPanel Domains)
1. In cPanel, open **Domains**.
2. Click **Manage** next to your domain (`reddottech.com.np`).
3. Set **Document Root** to your application folder:
   👉 `reddottech` *(Do NOT add `/public` unless it is a PHP site)*.
4. Click **Update**.

### STEP 4: Package & Upload Application
1. In your local project, run the packager:
   ```bash
   npm run package:cpanel
   ```
2. In cPanel **File Manager**, create a folder `/home/youruser/reddottech`.
3. Upload **`cpanel-deploy.tar.gz`** (never `.zip` to avoid antivirus false positives).
4. Right-click **`cpanel-deploy.tar.gz`** &rarr; **Extract** &rarr; **Extract File(s)**.

### STEP 5: Setup Node.js App in cPanel
1. In cPanel, open **Setup Node.js App** (Node.js Selector) &rarr; **Create Application**.
2. Configure fields:
   - **Node.js Version**: `20.x` (e.g., `20.20.2`)
   - **Application Mode**: `Production`
   - **Application Root**: `reddottech`
   - **Application URL**: Select `reddottech.com.np` from the dropdown and **LEAVE THE SUBPATH BOX EMPTY**.
   - **Application Startup File**: `server/prod-entry.js`
3. Add **Environment Variables**:
   - `NODE_ENV` = `production`
   - `PORT` = `5000`
   - `DB_HOST` = `localhost`
   - `DB_PORT` = `3306`
   - `DB_NAME` = `youruser_reddot_db` *(Must include cPanel prefix)*
   - `DB_USER` = `youruser_reddot_user` *(Must include cPanel prefix)*
   - `DB_PASSWORD` = `yourpassword`
   - `JWT_SECRET` = `your_strong_jwt_key`
   - `CORS_ORIGINS` = `https://reddottech.com.np,https://www.reddottech.com.np`
4. Click **Create** / **Save**.

### STEP 6: Install Modules & Start
1. Open cPanel &rarr; **Terminal**.
2. Run the environment command + install:
   ```bash
   source /home/youruser/nodevenv/reddottech/20/bin/activate && cd /home/youruser/reddottech && npm install
   ```
3. Return to **Setup Node.js App** &rarr; click **🔄 RESTART**.
4. Visit `https://yourdomain.com`!

---

## 🔍 Post-Mortem & Troubleshooting Handbook

Here is a summary of all 7 issues resolved during this deployment:

### 1. Antivirus False Positive (`Sanesecurity.Foxhole.JS_Zip_13`)
- **Symptom**: cPanel File Manager cancels `.zip` upload with a virus warning.
- **Cause**: ClamAV Sanesecurity rules block any `.zip` containing `.js` files (antispam heuristic).
- **Prevention**: Always package as **`.tar.gz`**. ClamAV only scans `.zip` archives. cPanel extracts `.tar.gz` natively.

### 2. Misconfigured Application URL Subpath
- **Symptom**: `Web application is inaccessible by its address "http://domain.com/domain.com"`.
- **Cause**: Typing the domain name into the subpath text input next to the domain dropdown.
- **Prevention**: Select the domain in the dropdown and **leave the text box completely empty**.

### 3. LiteSpeed CommonJS Require vs Top-Level Await (`ERR_REQUIRE_ASYNC_MODULE`)
- **Symptom**: Server crashes with `require() cannot be used on an ESM graph with top-level await`.
- **Cause**: LiteSpeed's `lsnode.js` loads the startup file using `require()`. In Node 20+, `require()` supports ESM only if there is no top-level `await`.
- **Prevention**: In `server/prod-entry.js`, load SSR handlers lazily inside functions via dynamic `import().then(...)` instead of top-level `const x = await import(...)`.

### 4. CloudLinux Selector Missing `.htaccess` (`FileNotFoundError: .htaccess`)
- **Symptom**: Node.js Selector errors when stopping/restarting with `FileNotFoundError: .htaccess`.
- **Cause**: CloudLinux `cl_selector.py` manages Passenger by writing directives into `/home/user/app/.htaccess`.
- **Prevention**: Ensure an empty `.htaccess` is included in the deployment package or run `touch .htaccess`.

### 5. Missing Database Prefix (`Access denied for user 'reddot_user'@'localhost'`)
- **Symptom**: Backend fails to initialize MySQL connection.
- **Cause**: cPanel automatically prefixes MySQL users and database names with the cPanel account username.
- **Prevention**: Always use `cpanelusername_dbname` and `cpanelusername_dbuser`.

### 6. Old Website Files Loading (`mysqli_sql_exception`)
- **Symptom**: Domain displays old PHP errors instead of Node.js app.
- **Cause**: cPanel Domains had Document Root set to old `/domain/public` directory.
- **Prevention**: Update Document Root in cPanel **Domains** &rarr; **Manage** to point to the Node application root folder.

### 7. TanStack Router/Start Mismatch (`TypeError: matchedRoutes is not iterable`)
- **Symptom**: SSR returns 500 error on route matching.
- **Cause**: `@tanstack/react-router` 1.170 returns `[matchedRoutes, rawParams, foundRoute]` as a tuple, but older `@tanstack/react-start` 1.168 tried to destructure `{ matchedRoutes }`.
- **Prevention**: Always keep all `@tanstack/*` packages aligned to matching major/minor versions.

---

## 🏆 The Golden Rules for Future Deployments

1. **Always use `.tar.gz` archives** for cPanel File Manager uploads.
2. **Never use top-level `await`** in your Node.js entry point file when deploying on LiteSpeed (`lsnode`).
3. **Always include cPanel username prefix** in MySQL database environment variables (`cpaneluser_db`).
4. **Keep an empty `.htaccess`** in your Node root folder for CloudLinux.
5. **Use cPanel Terminal** to run `npm install` inside the virtual environment for 100% reliable module installations.
