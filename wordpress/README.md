# Fluent Forms → Next.js wiring

The Next.js site submits **Get Started** (form `3`) and **Request a Quote** (form `4`) into Fluent Forms via a small WordPress endpoint.

## 1. Install the WordPress snippet

Use either:

- **Code Snippets** plugin → add new PHP snippet → paste contents of [`fluentform-external-submit.php`](./fluentform-external-submit.php) (without the plugin header if using Code Snippets), run everywhere, activate  
  **or**
- Upload `fluentform-external-submit.php` as a must-use / small plugin

## 2. Set the shared secret on WordPress

In `wp-config.php` (recommended):

```php
define('FORMASHARP_FF_SUBMIT_SECRET', 'paste-a-long-random-secret-here');
```

Or store the same value in WP option `formasharp_ff_submit_secret`.

## 3. Set the secret on Next / Netlify

```
FLUENTFORMS_SUBMIT_SECRET=paste-a-long-random-secret-here
```

Redeploy after setting.

## 4. Match Fluent field Name Attributes

In Fluent Forms → Edit each form → select each field → **Advanced** / Name Attribute must be:

### Form 3 — Get Started / Contact

| Field | Name Attribute |
|-------|----------------|
| Full name | `full_name` |
| Email | `email` |
| Phone | `phone` |
| Company | `company` |
| Message | `message` |

### Form 4 — Request a Quote

| Field | Name Attribute |
|-------|----------------|
| Full name | `full_name` |
| Email | `email` |
| Phone | `phone` |
| Company | `company` |
| Service | `service` |
| Project stage | `stage` |
| Timeline | `timeline` |
| Budget | `budget` |
| Description | `description` |

Use **Text** or **Textarea** inputs for dropdown values (we send human-readable labels, not slugs).

## 5. Email notifications

In each Fluent form → Settings → Email Notifications → send to `admin@formasharp.com` (or the client inbox).

## 6. Test

1. Confirm endpoint exists: `POST /wp-json/fluentform/v1/external-submit` (401 without secret is OK)  
2. Submit Get Started popup and Request a Quote on the Next site  
3. Check **Fluent Forms → Entries** for forms 3 and 4
