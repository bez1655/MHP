---
name: Dependency firewall
description: Handling Replit package-firewall blocks during clean installs and post-merge setup.
---

When a clean npm install is blocked by the package firewall, inspect the lockfile for outdated transitive dependencies and update them to compatible versions allowed by the security policy.

**Why:** Retrying installs or skipping dependency setup does not resolve blocked package archives and can leave the project without required modules.

**How to apply:** Use the package-management flow to update or override affected transitive versions, regenerate the lockfile, and rerun post-merge setup. Never bypass the firewall.
