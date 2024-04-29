### Self-signed certificate used by BFF that Next.js API route connects to
- `bff` - BFF server using self-signed certificate chain
- `nextjs` - Next.js app connecting to it via API route, trusting the certificate chain


Add `bff.local` to your local `/etc/hosts`:
```
127.0.0.1 bff.local
```
