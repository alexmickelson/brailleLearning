# Client

## Auth

Google - use ID token
```
{
  "given_name": "Alex",
  "family_name": "Mickelson",
  "nickname": "minithemite",
  "name": "Alex Mickelson",
  "picture": "url",
  "locale": "en",
  "updated_at": "2023-03-16T04:11:32.714Z",
  "email": "minithemite@gmail.com",
  "email_verified": true,
  "iss": "https://dev-n2rx4pobpvp10xql.us.auth0.com/",
  "aud": "OAfVRmI199zxt7UI1cBZOiMBQEMKA6gz",
  "iat": 1678939893,
  "exp": 1678975893,
  "sub": "google-oauth2|116904366731977132824",
  "sid": "hvPUxgkUOY-Uac6WPfmdfy5yRjf43B8K"
}
```

Microsoft uses same ID token

```
{
  "given_name": "alex",
  "family_name": "mickelson",
  "nickname": "alex mickelson",
  "name": "alex mickelson",
  "picture": "url",
  "locale": "en-US",
  "updated_at": "2023-03-16T04:27:13.861Z",
  "email_verified": false,
  "iss": "https://dev-n2rx4pobpvp10xql.us.auth0.com/",
  "aud": "OAfVRmI199zxt7UI1cBZOiMBQEMKA6gz",
  "iat": 1678940834,
  "exp": 1678976834,
  "sub": "windowslive|072de8836860ee9a",
  "sid": "WS41isLIdu-HMuDm-hEc_PfLGcsykmB3"
}
```