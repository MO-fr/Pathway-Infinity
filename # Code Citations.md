# Code Citations

## License: unknown
https://github.com/dylanblokhuis/remix-cms/blob/00a4fa88191e8d0dbaa6245162e7517389f1b827/prisma/schema.prisma

```
client {
  provider = "
```


## License: unknown
https://github.com/dylanblokhuis/remix-cms/blob/00a4fa88191e8d0dbaa6245162e7517389f1b827/prisma/schema.prisma

```
client {
  provider = "prisma-client-js"
}

datasource
```


## License: unknown
https://github.com/dylanblokhuis/remix-cms/blob/00a4fa88191e8d0dbaa6245162e7517389f1b827/prisma/schema.prisma

```
client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql
```


## License: unknown
https://github.com/dylanblokhuis/remix-cms/blob/00a4fa88191e8d0dbaa6245162e7517389f1b827/prisma/schema.prisma

```
client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env
```


## License: unknown
https://github.com/dylanblokhuis/remix-cms/blob/00a4fa88191e8d0dbaa6245162e7517389f1b827/prisma/schema.prisma

```
client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User
```


## License: unknown
https://github.com/dylanblokhuis/remix-cms/blob/00a4fa88191e8d0dbaa6245162e7517389f1b827/prisma/schema.prisma

```
client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        
```


## License: unknown
https://github.com/dylanblokhuis/remix-cms/blob/00a4fa88191e8d0dbaa6245162e7517389f1b827/prisma/schema.prisma

```
client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
```


## License: unknown
https://github.com/dylanblokhuis/remix-cms/blob/00a4fa88191e8d0dbaa6245162e7517389f1b827/prisma/schema.prisma

```
client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @
```


## License: unknown
https://github.com/dylanblokhuis/remix-cms/blob/00a4fa88191e8d0dbaa6245162e7517389f1b827/prisma/schema.prisma

```
client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
```


## License: unknown
https://github.com/dylanblokhuis/remix-cms/blob/00a4fa88191e8d0dbaa6245162e7517389f1b827/prisma/schema.prisma

```
client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  password  String
  cre
```


## License: unknown
https://github.com/dylanblokhuis/remix-cms/blob/00a4fa88191e8d0dbaa6245162e7517389f1b827/prisma/schema.prisma

```
client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  password  String
  createdAt DateTime @default(now())
```


## License: unknown
https://github.com/Jaimin25/ConvoNest/blob/73d726782cdfd37bb74802eb483eb3c5befa3571/src/lib/db.ts

```
} from '@prisma/client';

const
```


## License: unknown
https://github.com/Jaimin25/ConvoNest/blob/73d726782cdfd37bb74802eb483eb3c5befa3571/src/lib/db.ts

```
} from '@prisma/client';

const globalForPrisma = global as unknown as {
```


## License: unknown
https://github.com/Jaimin25/ConvoNest/blob/73d726782cdfd37bb74802eb483eb3c5befa3571/src/lib/db.ts

```
} from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };
```


## License: unknown
https://github.com/Jaimin25/ConvoNest/blob/73d726782cdfd37bb74802eb483eb3c5befa3571/src/lib/db.ts

```
} from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const db = globalForP
```


## License: unknown
https://github.com/Jaimin25/ConvoNest/blob/73d726782cdfd37bb74802eb483eb3c5befa3571/src/lib/db.ts

```
} from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma || new Prisma
```


## License: unknown
https://github.com/Jaimin25/ConvoNest/blob/73d726782cdfd37bb74802eb483eb3c5befa3571/src/lib/db.ts

```
} from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma || new PrismaClient();

if (process.env
```


## License: unknown
https://github.com/Jaimin25/ConvoNest/blob/73d726782cdfd37bb74802eb483eb3c5befa3571/src/lib/db.ts

```
} from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !==
```


## License: unknown
https://github.com/Jaimin25/ConvoNest/blob/73d726782cdfd37bb74802eb483eb3c5befa3571/src/lib/db.ts

```
} from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma
```


## License: unknown
https://github.com/Jaimin25/ConvoNest/blob/73d726782cdfd37bb74802eb483eb3c5befa3571/src/lib/db.ts

```
} from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
```

