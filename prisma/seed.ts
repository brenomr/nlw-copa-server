import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Bob Russo',
      email: 'mrrusso@mail.com',
      avatarUrl: 'https://github.com/brenomr.png',
    }
  });

  const pool = await prisma.pool.create({
    data: {
      title: 'New Bolão',
      code: 'AMI123',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        }
      }
    }
  });

  await prisma.game.create({
    data: {
      date: '2022-11-01T10:30:00.850Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'JP',
    }
  });

  await prisma.game.create({
    data: {
      date: '2022-11-03T14:15:02.850Z',
      firstTeamCountryCode: 'AR',
      secondTeamCountryCode: 'JP',
      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 3,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              }
            }
          }
        }
      }
    }
  });
};

main ();